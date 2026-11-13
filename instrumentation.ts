/**
 * Se ejecuta una vez al arrancar el servidor. En el runtime Node.js valida las
 * variables de correo: si falta alguna, el servidor no arranca y el mensaje dice
 * cuál (sin mostrar valores).
 */
export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;
  const { getMailEnv } = await import("./lib/mail-env");
  getMailEnv();
}
