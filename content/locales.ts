/** Idiomas del sitio (especificación §3.5). El castellano se sirve en la raíz sin prefijo. */
export const locales = ["es", "ca", "fr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";

/** Código que muestra el selector de la cabecera (ES · CA · FR · EN). */
export const localeCodes: Record<Locale, string> = { es: "ES", ca: "CA", fr: "FR", en: "EN" };

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Ruta de la portada en un idioma: "/" para el castellano, "/ca", "/fr", "/en" para el resto. */
export function localeHome(locale: Locale): string {
  return locale === defaultLocale ? "/" : `/${locale}`;
}

/** Prefijo para rutas internas (legales, etc.). */
export function localePath(locale: Locale, path: string): string {
  return locale === defaultLocale ? path : `/${locale}${path}`;
}
