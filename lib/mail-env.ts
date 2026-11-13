import { z } from "zod";

/*
 * Variables de correo (especificación §9). Se validan al arrancar el servidor
 * (instrumentation.ts) y antes de crear el transporte. Los mensajes nombran la
 * variable y el problema, nunca su valor.
 */

const emailAddress = z.email({ message: "contiene una dirección de correo no válida" });

/** "correo@dominio" o "Nombre <correo@dominio>". */
const mailbox = z
  .string()
  .trim()
  .refine((v) => emailAddress.safeParse(v.match(/<([^>]+)>\s*$/)?.[1] ?? v).success, {
    message: "debe ser una dirección de correo o «Nombre <correo@dominio>»",
  });

const envSchema = z.object({
  SMTP_HOST: z.string().trim().min(1),
  SMTP_PORT: z.coerce
    .number()
    .int()
    .refine((p) => p === 465 || p === 587, { message: "debe ser 465 (TLS implícito) o 587 (STARTTLS)" }),
  SMTP_USER: z.string().min(1),
  SMTP_PASS: z.string().min(1),
  MAIL_FROM: mailbox,
  NOTIFY_EMAILS: z
    .string()
    .transform((v) =>
      v
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    )
    .pipe(z.array(emailAddress).min(1, "debe tener al menos una dirección")),
  SITE_URL: z.url().default("https://level5.ad"),
});

export type MailEnv = z.infer<typeof envSchema>;

export class MailConfigError extends Error {
  constructor(issues: string[]) {
    super(
      "Configuración de correo incompleta o no válida (revisa .env.local o las variables del despliegue):\n" +
        issues.map((i) => `  - ${i}`).join("\n"),
    );
    this.name = "MailConfigError";
  }
}

let cachedEnv: MailEnv | undefined;

export function getMailEnv(): MailEnv {
  if (cachedEnv) return cachedEnv;
  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    const issues = parsed.error.issues.map((i) => {
      const name = String(i.path[0] ?? "?");
      const value = process.env[name];
      return value === undefined || value.trim() === "" ? `${name}: no está definida` : `${name}: ${i.message}`;
    });
    throw new MailConfigError([...new Set(issues)]);
  }
  cachedEnv = parsed.data;
  return cachedEnv;
}
