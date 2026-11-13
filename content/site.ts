/**
 * Datos del sitio que no se traducen.
 *
 * company: espejo local de settings.company_legal (supabase/0001_level5_web.sql).
 * En W2 se lee de Supabase; mientras la sociedad esté en constitución, NRT,
 * domicilio y registro son null y no se muestran (especificación §4.10).
 */
export const company = {
  name: "Level 5, SL",
  status: "en_constitucion" as "en_constitucion" | "inscrita",
  nrt: null as string | null,
  address: null as string | null,
  registry: null as string | null,
  country: "Principat d'Andorra",
};

/** Socios: las dos sociedades (especificación §4.7). Sin personas. */
export const partners = [
  { id: "brighttech", name: "BrightTech", url: "https://brighttechsolutions.io", domain: "brighttechsolutions.io" },
  { id: "saikaris", name: "Saikaris", url: "https://saikaris.com", domain: "saikaris.com" },
] as const;

/** URL de LinkedIn de Level Five: pendiente de los socios (§12). Mientras sea null, el enlace no se muestra. */
export const linkedinUrl: string | null = null;

export const legalPaths = {
  notice: "/legal/aviso-legal",
  privacy: "/legal/privacidad",
  cookies: "/legal/cookies",
} as const;
