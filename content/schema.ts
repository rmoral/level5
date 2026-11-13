import { z } from "zod";

/**
 * Esquema de los diccionarios de idioma. Todos los objetos son estrictos y las
 * listas tienen longitud fija: si a ca.ts, fr.ts o en.ts le falta o le sobra una
 * clave, la compilación falla (tipo) y la validación en build también (zod).
 */

export const verticalIds = ["intelligence", "foundry", "landing", "academy", "labs", "valira"] as const;
export type VerticalId = (typeof verticalIds)[number];

export const interestIds = [...verticalIds, "grupo", "nose"] as const;
export type InterestId = (typeof interestIds)[number];

const text = z.string().min(1);
const triple = <T extends z.ZodType>(item: T) => z.tuple([item, item, item]);

const verticalCopy = z.strictObject({
  /** Línea corta de la lista de pestañas. */
  short: text,
  /** Descriptor en mono de la ficha. */
  kind: text,
  lead: text,
  offer: triple(text),
  who: text,
  /** Paso del círculo, en mono en la pestaña y en la tarjeta móvil ("NOS CONOCEMOS"). */
  step: text,
  /** Frase de la tarjeta móvil (artboard Movil). */
  cardLine: text,
  /** Texto alternativo de la fotografía de la ficha. */
  photoAlt: text,
});

const verticalsCopy = z.strictObject(
  Object.fromEntries(verticalIds.map((id) => [id, verticalCopy])) as Record<VerticalId, typeof verticalCopy>,
);

const interestOptions = z.strictObject(
  Object.fromEntries(interestIds.map((id) => [id, text])) as Record<InterestId, typeof text>,
);

export const dictionarySchema = z.strictObject({
  meta: z.strictObject({
    title: text,
    description: text,
  }),
  a11y: z.strictObject({
    skipLink: text,
    logoLabel: text,
    homeLabel: text,
    mainNav: text,
    languageNav: text,
    menuOpen: text,
    menuClose: text,
    verticalsTablist: text,
    unavailableLanguage: text,
  }),
  nav: z.strictObject({
    group: text,
    verticals: text,
    andorra: text,
    partners: text,
    cta: text,
  }),
  hero: z.strictObject({
    kicker: text,
    title: text,
    lead: text,
    ctaPrimary: text,
    ctaSecondary: text,
    photoAlt: z.literal(""),
  }),
  credentials: z.tuple([text, text, text, text]),
  group: z.strictObject({
    eyebrow: text,
    title: text,
    paragraphs: z.tuple([text, text]),
    principles: triple(z.strictObject({ index: text, title: text, body: text })),
  }),
  verticals: z.strictObject({
    eyebrow: text,
    title: text,
    lead: text,
    /** "Ir a {domain} ↗" */
    goTo: text.includes("{domain}"),
    comingSoon: text,
    items: verticalsCopy,
  }),
  andorra: z.strictObject({
    eyebrow: text,
    title: text,
    reasons: triple(z.strictObject({ title: text, body: text })),
    photoAlt: z.literal(""),
  }),
  partners: z.strictObject({
    eyebrow: text,
    title: text,
    lead: text,
    brighttech: z.strictObject({ label: text, body: text }),
    saikaris: z.strictObject({ label: text, body: text }),
  }),
  contact: z.strictObject({
    eyebrow: text,
    title: text,
    next: triple(text),
    form: z.strictObject({
      name: text,
      email: text,
      company: text,
      optional: text,
      interest: text,
      interestPlaceholder: text,
      interestOptions,
      message: text,
      consentInquiry: text,
      privacyLink: text,
      consentNews: text,
      submit: text,
    }),
    sent: z.strictObject({
      eyebrow: text,
      title: text,
      body: text,
      again: text,
    }),
  }),
  /** Correos al visitante, en su idioma (especificación §5.2). */
  mail: z.strictObject({
    ack: z.strictObject({
      subject: text,
      greeting: text.includes("{name}"),
      received: text,
      topic: text,
      next: z.tuple([text, text]),
      reply: text,
      signature: text,
    }),
    news: z.strictObject({
      subject: text,
      body: text,
      button: text,
      fallback: text,
      ignore: text,
    }),
  }),
  notFound: z.strictObject({
    title: text,
    back: text,
  }),
  footer: z.strictObject({
    newsletter: z.strictObject({
      body: text,
      label: text,
      placeholder: text,
      submit: text,
      submitted: text,
      note: text,
    }),
    verticalsHeading: text,
    siteHeading: text,
    siteLinks: z.strictObject({
      group: text,
      andorra: text,
      partners: text,
      contact: text,
      linkedin: text,
    }),
    legal: z.strictObject({
      notice: text,
      privacy: text,
      cookies: text,
    }),
    companyStatus: z.strictObject({
      en_constitucion: text,
      inscrita: z.string(),
    }),
  }),
});

export type Dictionary = z.infer<typeof dictionarySchema>;
