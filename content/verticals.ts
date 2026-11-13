import type { Locale } from "./locales";
import type { VerticalId } from "./schema";

/**
 * Datos no traducibles de las seis verticales (especificación §4.4).
 * Los textos de cada ficha viven en el diccionario de idioma (content/<locale>.ts).
 */
export type VerticalFont = "spaceGrotesk" | "archivo" | "nunitoSans" | "literata" | "jetbrainsMono" | "newsreader";

export type Vertical = {
  id: VerticalId;
  index: string;
  name: string;
  /** Variable CSS del acento (styles/tokens.css). */
  accentVar: `--accent-${VerticalId}`;
  font: VerticalFont;
  domain: string;
  /** Portada de la vertical y, cuando exista, su versión por idioma. */
  url: { default: string } & Partial<Record<Locale, string>>;
  /** false → "Próximamente" en lugar del botón, sin enlace. */
  published: boolean;
};

export const verticals: readonly Vertical[] = [
  {
    id: "intelligence",
    index: "01",
    name: "Fifth Intelligence",
    accentVar: "--accent-intelligence",
    font: "spaceGrotesk",
    domain: "fifth-intelligence.com",
    url: { default: "https://www.fifth-intelligence.com" },
    published: true,
  },
  {
    id: "foundry",
    index: "02",
    name: "Fifth Foundry",
    accentVar: "--accent-foundry",
    font: "archivo",
    domain: "fifth-foundry.com",
    // Dominio por confirmar por los socios (especificación §4.4 y §12).
    url: { default: "https://fifth-foundry.com" },
    published: true,
  },
  {
    id: "landing",
    index: "03",
    name: "Fifth Landing",
    accentVar: "--accent-landing",
    font: "nunitoSans",
    domain: "fifth-landing.com",
    url: { default: "https://fifth-landing.com" },
    published: true,
  },
  {
    id: "academy",
    index: "04",
    name: "Fifth Academy",
    accentVar: "--accent-academy",
    font: "literata",
    domain: "fifth-academy.com",
    url: { default: "https://fifth-academy.com" },
    published: true,
  },
  {
    id: "labs",
    index: "05",
    name: "Fifth Labs",
    accentVar: "--accent-labs",
    font: "jetbrainsMono",
    domain: "fifth-labs.com",
    url: { default: "https://fifth-labs.com" },
    published: true,
  },
  {
    id: "valira",
    index: "06",
    name: "Valira Valley",
    accentVar: "--accent-valira",
    font: "newsreader",
    domain: "valiravalley.com",
    url: { default: "https://valiravalley.com" },
    published: true,
  },
];

/**
 * Orden del círculo (especificación 1.3, §4.4): el orden en que se muestran en la
 * sección de verticales y en las tarjetas móviles. El pie mantiene el orden de la tabla.
 */
export const circleOrder: readonly VerticalId[] = ["valira", "intelligence", "academy", "labs", "foundry", "landing"];

export const verticalById = Object.fromEntries(verticals.map((v) => [v.id, v])) as Record<VerticalId, Vertical>;

export const verticalsInCircleOrder: readonly Vertical[] = circleOrder.map((id) => verticalById[id]);

export type LinkSection = "verticales" | "movil" | "pie";

/** Enlace de salida con los cuatro UTM de la especificación §4.4. Misma pestaña. */
export function verticalHref(v: Vertical, locale: Locale, section: LinkSection): string {
  const url = new URL(v.url[locale] ?? v.url.default);
  url.searchParams.set("utm_source", "level5");
  url.searchParams.set("utm_medium", "grupo");
  url.searchParams.set("utm_campaign", "portada");
  url.searchParams.set("utm_content", section);
  return url.toString();
}
