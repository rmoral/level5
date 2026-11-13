import "server-only";

import { createHash } from "node:crypto";
import { getDbEnv } from "./supabase";

/*
 * Antispam sin terceros (especificación §5.3): campo trampa, tiempo mínimo entre
 * carga y envío, y límite de ritmo por IP y por correo. La IP no se guarda: solo un
 * hash con una sal que rota cada día (RATE_LIMIT_SALT + fecha UTC).
 */

export const MIN_FILL_MS = 3_000;
export const RATE_LIMIT_PER_HOUR = 5;

export function dailyHash(kind: "ip" | "email", value: string): string {
  const day = new Date().toISOString().slice(0, 10);
  return createHash("sha256")
    .update(`${getDbEnv().RATE_LIMIT_SALT}:${day}:${kind}:${value.trim().toLowerCase()}`)
    .digest("hex");
}

/** IP del visitante según el proxy de la plataforma (Vercel fija x-forwarded-for). */
export function clientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || headers.get("x-real-ip")?.trim() || "0.0.0.0";
}

/** Dominios de correo temporal más comunes. Lista corta y revisable. */
const DISPOSABLE = new Set([
  "mailinator.com", "guerrillamail.com", "guerrillamail.net", "guerrillamail.org", "sharklasers.com",
  "10minutemail.com", "10minutemail.net", "temp-mail.org", "tempmail.com", "tempmail.net", "tempmailo.com",
  "yopmail.com", "yopmail.fr", "yopmail.net", "trashmail.com", "trashmail.de", "getnada.com", "nada.email",
  "throwawaymail.com", "dispostable.com", "maildrop.cc", "mintemail.com", "mohmal.com", "fakeinbox.com",
  "emailondeck.com", "mailnesia.com", "mytemp.email", "tempr.email", "discard.email", "spamgourmet.com",
  "burnermail.io", "inboxkitten.com", "moakt.com", "tmpmail.org", "tmail.ws", "luxusmail.org",
]);

export function isDisposableEmail(email: string): boolean {
  const domain = email.split("@")[1]?.toLowerCase().trim();
  return !!domain && DISPOSABLE.has(domain);
}
