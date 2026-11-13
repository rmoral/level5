import "server-only";

import { randomUUID } from "node:crypto";
import nodemailer, { type SendMailOptions, type Transporter } from "nodemailer";
import type { Locale } from "@/content/locales";
import type { InterestId } from "@/content/schema";
import {
  ackTemplate,
  internalNoticeTemplate,
  newsConfirmationTemplate,
  testTemplate,
  type InquiryMailData,
} from "./mail-templates";
import { getMailEnv, type MailEnv } from "./mail-env";

export { getMailEnv, MailConfigError, type MailEnv } from "./mail-env";

/*
 * Correo por SMTP propio (especificación §5.2 y §9). Solo servidor, runtime Node.js:
 * nodemailer necesita sockets TCP/TLS, que no existen en Edge. Quien importe este
 * módulo desde una ruta o acción debe declarar `export const runtime = "nodejs"`.
 */
if (process.env.NEXT_RUNTIME === "edge") {
  throw new Error("lib/mail.ts solo funciona en el runtime Node.js, no en Edge.");
}

/* ---------- Transporte ---------- */

const TIMEOUT_MS = 10_000;
const MESSAGE_ID_DOMAIN = "level5.ad";

// Un único transporte reutilizable, también entre recargas en desarrollo.
const globalForMail = globalThis as unknown as { level5MailTransport?: Transporter };

export function getTransport(): Transporter {
  if (globalForMail.level5MailTransport) return globalForMail.level5MailTransport;
  const env = getMailEnv();
  const implicitTls = env.SMTP_PORT === 465;
  const transport = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: implicitTls, // 465: TLS desde el primer byte
    requireTLS: !implicitTls, // 587: STARTTLS obligatorio; sin él no se envía nada
    auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
    tls: {
      rejectUnauthorized: true, // la verificación del certificado no se desactiva nunca
      minVersion: "TLSv1.2",
      servername: env.SMTP_HOST,
    },
    connectionTimeout: TIMEOUT_MS,
    greetingTimeout: TIMEOUT_MS,
    socketTimeout: TIMEOUT_MS,
  });
  globalForMail.level5MailTransport = transport;
  return transport;
}

/** Message-ID propio del dominio level5.ad. */
function messageId(): string {
  return `<${randomUUID()}@${MESSAGE_ID_DOMAIN}>`;
}

/* ---------- Registro sin datos personales ---------- */

type MailKind = "ack" | "internal" | "news_confirmation" | "test";

type SmtpErrorLike = { code?: unknown; responseCode?: unknown; command?: unknown; name?: unknown };

/**
 * Registra el fallo de un envío sin direcciones, nombres ni contenido: solo el tipo
 * de correo, el idioma y los códigos técnicos. El mensaje de error de nodemailer no
 * se registra porque puede incluir direcciones de destinatarios.
 */
function logMailFailure(kind: MailKind, locale: Locale | undefined, error: unknown) {
  const e = (error ?? {}) as SmtpErrorLike;
  console.error(
    JSON.stringify({
      event: "mail_failed",
      kind,
      locale,
      error: typeof e.name === "string" ? e.name : "Error",
      code: typeof e.code === "string" ? e.code : undefined,
      responseCode: typeof e.responseCode === "number" ? e.responseCode : undefined,
      command: typeof e.command === "string" ? e.command : undefined,
    }),
  );
}

export type SendResult = { ok: true; messageId: string } | { ok: false };

/** Envía y nunca lanza: un fallo de correo no debe romper la acción que lo llama. */
async function sendSafely(kind: MailKind, locale: Locale | undefined, mail: SendMailOptions): Promise<SendResult> {
  try {
    const env = getMailEnv();
    const id = messageId();
    await getTransport().sendMail({ ...mail, from: env.MAIL_FROM, messageId: id });
    return { ok: true, messageId: id };
  } catch (error) {
    logMailFailure(kind, locale, error);
    return { ok: false };
  }
}

/* ---------- Correos del formulario ---------- */

export type InquiryMailInput = InquiryMailData & {
  /** confirm_token que devuelve submit_inquiry si el visitante marcó las novedades. */
  confirmToken: string | null;
};

export type InquiryMailReport = {
  ack: SendResult;
  internal: SendResult;
  newsConfirmation: SendResult | null;
};

/**
 * Correos de una consulta ya guardada (especificación §5.2, paso 3).
 *
 * Contrato con la acción de servidor: primero se guarda la consulta con
 * `submit_inquiry`; después se llama a esta función. Nunca lanza: si el SMTP falla,
 * el error queda registrado sin datos personales, la consulta sigue en la base de
 * datos y el visitante ve la confirmación igualmente.
 */
export async function deliverInquiryMail(input: InquiryMailInput): Promise<InquiryMailReport> {
  let env: MailEnv;
  try {
    env = getMailEnv();
  } catch (error) {
    logMailFailure("internal", input.locale, error);
    return { ack: { ok: false }, internal: { ok: false }, newsConfirmation: input.confirmToken ? { ok: false } : null };
  }

  const ack = ackTemplate(input);
  const internal = internalNoticeTemplate(input);
  const news = input.confirmToken ? newsConfirmationTemplate(input.locale, input.confirmToken, env.SITE_URL) : null;

  const [ackResult, internalResult, newsResult] = await Promise.all([
    // Acuse al visitante, en su idioma; las respuestas van a los socios.
    sendSafely("ack", input.locale, { to: input.email, replyTo: env.NOTIFY_EMAILS[0], ...ack }),
    // Aviso interno a los socios, en castellano; responder contesta al visitante.
    sendSafely("internal", input.locale, { to: env.NOTIFY_EMAILS, replyTo: input.email, ...internal }),
    news
      ? sendSafely("news_confirmation", input.locale, { to: input.email, replyTo: env.NOTIFY_EMAILS[0], ...news })
      : Promise.resolve(null),
  ]);

  return { ack: ackResult, internal: internalResult, newsConfirmation: newsResult };
}

/** Confirmación del alta a novedades del formulario del pie (doble opt-in). Nunca lanza. */
export async function deliverNewsConfirmation(email: string, locale: Locale, confirmToken: string): Promise<SendResult> {
  try {
    const env = getMailEnv();
    return sendSafely("news_confirmation", locale, {
      to: email,
      replyTo: env.NOTIFY_EMAILS[0],
      ...newsConfirmationTemplate(locale, confirmToken, env.SITE_URL),
    });
  } catch (error) {
    logMailFailure("news_confirmation", locale, error);
    return { ok: false };
  }
}

/* ---------- Prueba (npm run mail:test) ---------- */

/**
 * Comprueba la conexión y la autenticación y envía un correo de prueba a
 * NOTIFY_EMAILS. A diferencia del resto, aquí los errores se propagan para que el
 * script muestre el fallo exacto.
 */
export async function runMailTest() {
  const env = getMailEnv();
  const transport = getTransport();
  await transport.verify();
  const id = messageId();
  const info = await transport.sendMail({
    from: env.MAIL_FROM,
    to: env.NOTIFY_EMAILS,
    replyTo: env.NOTIFY_EMAILS[0],
    messageId: id,
    ...testTemplate(env.SMTP_PORT === 465 ? "TLS implícito (465)" : "STARTTLS obligatorio (587)"),
  });
  return {
    messageId: id,
    accepted: info.accepted.length,
    rejected: info.rejected.length,
    response: info.response,
    port: env.SMTP_PORT,
  };
}

export type { InterestId };
