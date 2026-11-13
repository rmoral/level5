import "server-only";

import { getDictionary } from "@/content";
import { localePath, type Locale } from "@/content/locales";
import { internalMail } from "@/content/mail-internal";
import type { InterestId } from "@/content/schema";
import { company } from "@/content/site";
import { verticalById } from "@/content/verticals";

/** Datos de una consulta que necesitan los correos. */
export type InquiryMailData = {
  inquiryId: string;
  name: string;
  email: string;
  company: string | null;
  interest: InterestId;
  message: string;
  locale: Locale;
  consentNews: boolean;
  sourcePage: string | null;
  utm: { source: string | null; medium: string | null; campaign: string | null };
};

type Rendered = { subject: string; text: string; html: string };

/* ---------- Utilidades ---------- */

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

/** Una sola línea, sin saltos (para asuntos) y con longitud acotada. */
const oneLine = (s: string, max = 80) => s.replace(/[\r\n\t]+/g, " ").replace(/\s+/g, " ").trim().slice(0, max);

const fill = (template: string, values: Record<string, string>) =>
  template.replace(/\{(\w+)\}/g, (m, k: string) => values[k] ?? m);

function companyLine(locale: Locale): string {
  const status = getDictionary(locale).footer.companyStatus[company.status];
  return [status ? `${company.name} (${status})` : company.name, company.country].join(" · ");
}

/** HTML sencillo: sin imágenes ni recursos externos, estilos en línea, colores de la identidad. */
function layout(locale: Locale, bodyHtml: string): string {
  return `<!doctype html>
<html lang="${locale}">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="margin:0;padding:0;background:#FAF9F6;color:#0B2A5B;font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:25px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FAF9F6">
<tr><td align="center" style="padding:24px 12px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#FFFFFF;border:1px solid #D9D7D1;border-radius:6px">
<tr><td style="background:#0B1A33;padding:20px 28px;border-radius:6px 6px 0 0;color:#FFFFFF;font-size:15px;letter-spacing:0.16em;text-transform:uppercase;font-weight:600">Level Five</td></tr>
<tr><td style="padding:28px">${bodyHtml}</td></tr>
<tr><td style="padding:16px 28px;border-top:1px solid #D9D7D1;color:#4C5A73;font-size:13px;line-height:19px">${escapeHtml(companyLine(locale))}</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

const p = (html: string) => `<p style="margin:0 0 16px">${html}</p>`;

/* ---------- Acuse al visitante (su idioma) ---------- */

export function ackTemplate(d: InquiryMailData): Rendered {
  const t = getDictionary(d.locale);
  const m = t.mail.ack;
  const greeting = fill(m.greeting, { name: oneLine(d.name) });
  const topic = t.contact.form.interestOptions[d.interest];
  const text = [
    greeting,
    "",
    m.received,
    `${m.topic}: ${topic}`,
    "",
    ...m.next,
    "",
    m.reply,
    "",
    m.signature,
    "",
    "--",
    companyLine(d.locale),
  ].join("\n");
  const html = layout(
    d.locale,
    [
      p(escapeHtml(greeting)),
      p(escapeHtml(m.received)),
      p(`<span style="color:#4C5A73">${escapeHtml(m.topic)}:</span> ${escapeHtml(topic)}`),
      p(m.next.map(escapeHtml).join("<br>")),
      p(escapeHtml(m.reply)),
      `<p style="margin:0">${escapeHtml(m.signature)}</p>`,
    ].join("\n"),
  );
  return { subject: m.subject, text, html };
}

/* ---------- Confirmación de novedades (doble opt-in, su idioma) ---------- */

export function newsConfirmationTemplate(locale: Locale, confirmToken: string, siteUrl: string): Rendered {
  const m = getDictionary(locale).mail.news;
  const url = new URL(localePath(locale, `/confirmar/${encodeURIComponent(confirmToken)}`), siteUrl).toString();
  const text = [m.body, "", url, "", m.ignore, "", "--", companyLine(locale)].join("\n");
  const html = layout(
    locale,
    [
      p(escapeHtml(m.body)),
      `<p style="margin:0 0 20px"><a href="${escapeHtml(url)}" style="display:inline-block;background:#0B2A5B;color:#FFFFFF;text-decoration:none;font-weight:600;padding:14px 22px;border-radius:4px">${escapeHtml(m.button)}</a></p>`,
      p(`<span style="font-size:14px;color:#4C5A73">${escapeHtml(m.fallback)}<br><a href="${escapeHtml(url)}" style="color:#0B2A5B;word-break:break-all">${escapeHtml(url)}</a></span>`),
      `<p style="margin:0;font-size:14px;color:#4C5A73">${escapeHtml(m.ignore)}</p>`,
    ].join("\n"),
  );
  return { subject: m.subject, text, html };
}

/* ---------- Aviso interno a los socios (castellano) ---------- */

function topicName(interest: InterestId): string {
  if (interest === "grupo" || interest === "nose") return internalMail.topicFallback[interest];
  return verticalById[interest].name;
}

export function internalNoticeTemplate(d: InquiryMailData): Rendered {
  const L = internalMail.labels;
  const es = getDictionary("es");
  const subject = fill(internalMail.subject, {
    topic: topicName(d.interest),
    locale: d.locale.toUpperCase(),
    name: oneLine(d.name, 60),
  });
  const utm = [d.utm.source, d.utm.medium, d.utm.campaign].filter(Boolean).join(" / ");
  const rows: [string, string][] = [
    [L.name, d.name],
    [L.email, d.email],
    [L.company, d.company || internalMail.empty],
    [L.interest, es.contact.form.interestOptions[d.interest]],
    [L.locale, d.locale.toUpperCase()],
    [L.news, d.consentNews ? internalMail.yes : internalMail.no],
    [L.sourcePage, d.sourcePage || internalMail.empty],
    [L.utm, utm || internalMail.empty],
    [L.inquiryId, d.inquiryId],
  ];
  const text = [
    internalMail.intro,
    "",
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    `${L.message}:`,
    d.message,
  ].join("\n");
  const html = layout(
    "es",
    [
      p(escapeHtml(internalMail.intro)),
      `<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-top:1px solid #D9D7D1;margin:0 0 20px;font-size:14px;line-height:21px">`,
      ...rows.map(
        ([k, v]) =>
          `<tr><td style="padding:8px 12px 8px 0;border-bottom:1px solid #D9D7D1;color:#4C5A73;white-space:nowrap;vertical-align:top">${escapeHtml(k)}</td><td style="padding:8px 0;border-bottom:1px solid #D9D7D1">${escapeHtml(v)}</td></tr>`,
      ),
      `</table>`,
      `<p style="margin:0 0 8px;color:#4C5A73;font-size:14px">${escapeHtml(L.message)}</p>`,
      `<p style="margin:0;white-space:pre-wrap">${escapeHtml(d.message)}</p>`,
    ].join("\n"),
  );
  return { subject, text, html };
}

/* ---------- Correo de prueba ---------- */

export function testTemplate(mode: string): Rendered {
  const t = internalMail.test;
  const sent = new Date().toISOString();
  const text = `${t.body}\n\n${t.mode}: ${mode}\n${sent}`;
  const html = layout("es", [p(escapeHtml(t.body)), p(`${escapeHtml(t.mode)}: ${escapeHtml(mode)}<br>${sent}`)].join("\n"));
  return { subject: t.subject, text, html };
}
