import "server-only";

import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

/*
 * Cliente de Supabase solo para el servidor (especificación §5.4): clave de servicio,
 * esquema level5 del proyecto de Fifth Landing, sin sesión. El navegador nunca lo usa.
 * Las variables se validan al usarse (no al arrancar) para que una vista previa sin
 * base de datos siga sirviendo la página.
 */

const envSchema = z.object({
  SUPABASE_URL: z.url(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(20),
  RATE_LIMIT_SALT: z.string().min(16),
});

export class DbConfigError extends Error {
  constructor(names: string[]) {
    super(`Configuración de base de datos incompleta o no válida: ${names.join(", ")}`);
    this.name = "DbConfigError";
  }
}

type DbEnv = z.infer<typeof envSchema>;
let cachedEnv: DbEnv | undefined;

export function getDbEnv(): DbEnv {
  if (cachedEnv) return cachedEnv;
  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    throw new DbConfigError([...new Set(parsed.error.issues.map((i) => String(i.path[0])))]);
  }
  cachedEnv = parsed.data;
  return cachedEnv;
}

function makeClient() {
  const env = getDbEnv();
  return createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
    db: { schema: "level5" },
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });
}

const globalForDb = globalThis as unknown as { level5Db?: ReturnType<typeof makeClient> };

export function db() {
  globalForDb.level5Db ??= makeClient();
  return globalForDb.level5Db;
}

/** Versión vigente del texto de consentimiento (level5.settings.consent_version). */
let cachedVersion: { value: string; at: number } | undefined;

export async function consentVersion(): Promise<string> {
  if (cachedVersion && Date.now() - cachedVersion.at < 5 * 60_000) return cachedVersion.value;
  const { data, error } = await db().from("settings").select("value").eq("key", "consent_version").single();
  if (error || typeof data?.value !== "string") throw error ?? new Error("consent_version no encontrada");
  cachedVersion = { value: data.value, at: Date.now() };
  return data.value;
}

/** Registra un fallo de base de datos sin datos personales: solo la operación y el código. */
export function logDbFailure(operation: string, error: unknown) {
  const e = (error ?? {}) as { code?: unknown; name?: unknown };
  console.error(
    JSON.stringify({
      event: "db_failed",
      operation,
      error: typeof e.name === "string" ? e.name : "Error",
      code: typeof e.code === "string" ? e.code : undefined,
    }),
  );
}
