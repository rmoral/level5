import { es } from "./es";
import { dictionarySchema, type Dictionary } from "./schema";
import type { Locale } from "./locales";

/**
 * Diccionarios disponibles. En W1 solo existe el castellano; en W3 se añaden
 * ca, fr y en (cada uno con `satisfies Dictionary`).
 */
const dictionaries: Partial<Record<Locale, Dictionary>> = { es };

// Validación estricta en build: falla si a un diccionario le falta o le sobra una clave.
for (const [locale, dict] of Object.entries(dictionaries)) {
  const result = dictionarySchema.safeParse(dict);
  if (!result.success) {
    throw new Error(`content/${locale}.ts no cumple el esquema:\n${result.error.message}`);
  }
}

export function availableLocales(): Locale[] {
  return Object.keys(dictionaries) as Locale[];
}

export function hasDictionary(locale: Locale): boolean {
  return locale in dictionaries;
}

export function getDictionary(locale: Locale): Dictionary {
  const dict = dictionaries[locale];
  if (!dict) throw new Error(`No hay diccionario para ${locale}`);
  return dict;
}

export type { Dictionary };
