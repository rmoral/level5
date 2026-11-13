/**
 * npm run mail:test — comprueba el SMTP (transporter.verify()) y envía un correo de
 * prueba a NOTIFY_EMAILS. Lee .env.local como Next. No imprime credenciales ni
 * direcciones: solo el resultado y, si falla, el error exacto del servidor o de TLS.
 */
import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

async function main() {
  const { runMailTest, getMailEnv } = await import("../lib/mail");
  const env = getMailEnv();
  console.log(`Servidor SMTP: puerto ${env.SMTP_PORT} (${env.SMTP_PORT === 465 ? "TLS implícito" : "STARTTLS obligatorio"}), verificación de certificado activada.`);
  const r = await runMailTest();
  console.log("verify(): conexión, TLS y autenticación correctas.");
  console.log(`Correo de prueba enviado. Message-ID: ${r.messageId}`);
  console.log(`Destinatarios aceptados: ${r.accepted}, rechazados: ${r.rejected}. Respuesta del servidor: ${r.response}`);
}

main().catch((error: unknown) => {
  const e = error as { name?: string; message?: string; code?: string; command?: string; responseCode?: number; reason?: string };
  console.error("La prueba de correo ha fallado.");
  console.error(`  error: ${e.name ?? "Error"}`);
  if (e.code) console.error(`  código: ${e.code}`);
  if (e.command) console.error(`  comando SMTP: ${e.command}`);
  if (e.responseCode) console.error(`  respuesta del servidor: ${e.responseCode}`);
  if (e.reason) console.error(`  motivo TLS: ${e.reason}`);
  console.error(`  mensaje: ${e.message ?? String(error)}`);
  process.exit(1);
});
