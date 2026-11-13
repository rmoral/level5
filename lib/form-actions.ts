"use server";

import { after } from "next/server";
import { headers } from "next/headers";
import { z } from "zod";
import { hasDictionary } from "@/content";
import { defaultLocale, isLocale, type Locale } from "@/content/locales";
import { interestIds } from "@/content/schema";
import { clientIp, dailyHash, isDisposableEmail, MIN_FILL_MS, RATE_LIMIT_PER_HOUR } from "./antispam";
import { deliverInquiryMail, deliverNewsConfirmation } from "./mail";
import { consentVersion, db, logDbFailure } from "./supabase";

/*
 * Acciones de servidor del formulario (especificación §5). Se ejecutan en el runtime
 * Node.js. Orden: validar → antispam → guardar en Supabase → enviar correos después de
 * responder (after). Un fallo de correo nunca pierde una consulta: ya está guardada.
 * Ningún dato personal va a la URL ni a los registros.
 */

export type ErrorKey =
  | "required"
  | "email"
  | "disposable"
  | "tooLong"
  | "consent"
  | "tooFast"
  | "rateLimited"
  | "generic";

export type InquiryField = "name" | "email" | "company" | "interest" | "message" | "consent_inquiry";

export type InquiryValues = {
  name: string;
  email: string;
  company: string;
  interest: string;
  message: string;
  consent_inquiry: boolean;
  consent_news: boolean;
};

export type InquiryState =
  | { status: "idle" }
  | { status: "sent" }
  | { status: "error"; fieldErrors: Partial<Record<InquiryField, ErrorKey>>; formError?: ErrorKey; values: InquiryValues };

export type NewsState = { status: "idle" } | { status: "sent" } | { status: "error"; error: ErrorKey; email: string };

export type TokenState = { status: "idle" } | { status: "done"; result: string } | { status: "error" };

/* ---------- Utilidades ---------- */

const str = (fd: FormData, k: string) => {
  const v = fd.get(k);
  return typeof v === "string" ? v : "";
};

function readLocale(fd: FormData): Locale {
  const l = str(fd, "locale");
  return isLocale(l) && hasDictionary(l) ? l : defaultLocale;
}

const optionalShort = z
  .string()
  .trim()
  .max(200)
  .transform((v) => v || null);

const sourcePage = z
  .string()
  .trim()
  .max(200)
  .transform((v) => (v.startsWith("/") ? v : null));

function emailIssue(email: string): ErrorKey | undefined {
  if (!email) return "required";
  if (email.length > 254 || !z.email().safeParse(email).success) return "email";
  if (isDisposableEmail(email)) return "disposable";
  return undefined;
}

/** true si el envío llegó antes del tiempo mínimo. Sin JavaScript no hay marca: no se aplica. */
function tooFast(fd: FormData): boolean {
  const loaded = Number(str(fd, "loaded_at"));
  return Number.isFinite(loaded) && loaded > 0 && Date.now() - loaded < MIN_FILL_MS;
}

async function withinRate(kind: "inquiry" | "news", email: string): Promise<boolean> {
  const ip = clientIp(await headers());
  const { data, error } = await db().rpc("rate_hit", {
    p_kind: kind,
    p_key_hashes: [dailyHash("ip", ip), dailyHash("email", email)],
    p_limit: RATE_LIMIT_PER_HOUR,
  });
  if (error) throw error;
  return data === true;
}

async function ipHash(): Promise<string> {
  return dailyHash("ip", clientIp(await headers()));
}

/* ---------- Consulta (formulario de contacto) ---------- */

export async function submitInquiry(_prev: InquiryState, fd: FormData): Promise<InquiryState> {
  const locale = readLocale(fd);
  const values: InquiryValues = {
    name: str(fd, "name").trim(),
    email: str(fd, "email").trim().toLowerCase(),
    company: str(fd, "company").trim(),
    interest: str(fd, "interest"),
    message: str(fd, "message").trim(),
    consent_inquiry: str(fd, "consent_inquiry") === "on",
    consent_news: str(fd, "consent_news") === "on",
  };

  // Campo trampa: se responde como si todo hubiera ido bien y no se guarda nada.
  if (str(fd, "website")) return { status: "sent" };

  const fieldErrors: Partial<Record<InquiryField, ErrorKey>> = {};
  if (!values.name) fieldErrors.name = "required";
  else if (values.name.length > 200) fieldErrors.name = "tooLong";
  const emailError = emailIssue(values.email);
  if (emailError) fieldErrors.email = emailError;
  if (values.company.length > 200) fieldErrors.company = "tooLong";
  if (!(interestIds as readonly string[]).includes(values.interest)) fieldErrors.interest = "required";
  if (!values.message) fieldErrors.message = "required";
  else if (values.message.length > 5000) fieldErrors.message = "tooLong";
  if (!values.consent_inquiry) fieldErrors.consent_inquiry = "consent";

  if (Object.keys(fieldErrors).length > 0) return { status: "error", fieldErrors, values };
  if (tooFast(fd)) return { status: "error", fieldErrors, formError: "tooFast", values };

  try {
    if (!(await withinRate("inquiry", values.email))) {
      return { status: "error", fieldErrors, formError: "rateLimited", values };
    }
    const page = sourcePage.parse(str(fd, "source_page"));
    const utm = {
      source: optionalShort.parse(str(fd, "utm_source")),
      medium: optionalShort.parse(str(fd, "utm_medium")),
      campaign: optionalShort.parse(str(fd, "utm_campaign")),
    };
    const { data, error } = await db().rpc("submit_inquiry", {
      p_email: values.email,
      p_name: values.name,
      p_company: values.company || null,
      p_locale: locale,
      p_interest: values.interest,
      p_message: values.message,
      p_consent_news: values.consent_news,
      p_consent_version: await consentVersion(),
      p_source_page: page,
      p_utm_source: utm.source,
      p_utm_medium: utm.medium,
      p_utm_campaign: utm.campaign,
      p_ip_hash: await ipHash(),
    });
    if (error) throw error;
    const row = (Array.isArray(data) ? data[0] : data) as { inquiry_id: string; confirm_token: string | null } | undefined;
    if (!row?.inquiry_id) throw new Error("submit_inquiry sin resultado");

    // La consulta ya está guardada: los correos salen después de responder al visitante.
    after(() =>
      deliverInquiryMail({
        inquiryId: row.inquiry_id,
        name: values.name,
        email: values.email,
        company: values.company || null,
        interest: values.interest as (typeof interestIds)[number],
        message: values.message,
        locale,
        consentNews: values.consent_news,
        sourcePage: page,
        utm,
        confirmToken: row.confirm_token,
      }).then(() => undefined),
    );
    return { status: "sent" };
  } catch (error) {
    logDbFailure("submit_inquiry", error);
    return { status: "error", fieldErrors, formError: "generic", values };
  }
}

/* ---------- Alta a novedades (pie) ---------- */

export async function subscribeNews(_prev: NewsState, fd: FormData): Promise<NewsState> {
  const locale = readLocale(fd);
  const email = str(fd, "email").trim().toLowerCase();
  if (str(fd, "website")) return { status: "sent" };
  const issue = emailIssue(email);
  if (issue) return { status: "error", error: issue, email };
  if (tooFast(fd)) return { status: "error", error: "tooFast", email };

  try {
    if (!(await withinRate("news", email))) return { status: "error", error: "rateLimited", email };
    const { data: token, error } = await db().rpc("subscribe_news", {
      p_email: email,
      p_locale: locale,
      p_consent_version: await consentVersion(),
      p_source_page: sourcePage.parse(str(fd, "source_page")),
    });
    if (error) throw error;
    if (typeof token !== "string") throw new Error("subscribe_news sin token");
    after(() => deliverNewsConfirmation(email, locale, token).then(() => undefined));
    return { status: "sent" };
  } catch (error) {
    logDbFailure("subscribe_news", error);
    return { status: "error", error: "generic", email };
  }
}

/* ---------- Confirmación y baja (/confirmar/[token], /baja/[token]) ---------- */

const token = z.uuid();

export async function confirmSubscription(_prev: TokenState, fd: FormData): Promise<TokenState> {
  const t = token.safeParse(str(fd, "token"));
  if (!t.success) return { status: "done", result: "not_found" };
  try {
    const { data, error } = await db().rpc("confirm_subscription", { p_token: t.data });
    if (error) throw error;
    return { status: "done", result: String(data) };
  } catch (error) {
    logDbFailure("confirm_subscription", error);
    return { status: "error" };
  }
}

export async function unsubscribe(_prev: TokenState, fd: FormData): Promise<TokenState> {
  const t = token.safeParse(str(fd, "token"));
  if (!t.success) return { status: "done", result: "not_found" };
  try {
    const { data, error } = await db().rpc("unsubscribe", {
      p_token: t.data,
      p_locale: readLocale(fd),
      p_consent_version: await consentVersion(),
      p_source_page: "/baja",
    });
    if (error) throw error;
    return { status: "done", result: String(data) };
  } catch (error) {
    logDbFailure("unsubscribe", error);
    return { status: "error" };
  }
}
