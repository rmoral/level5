import type { VerticalId } from "./schema";

/**
 * Fotografías de banco (especificación §7.1), servidas desde public/img/.
 * Cada archivo se registra en docs/IMAGES.md. Mientras un hueco no tenga foto
 * elegida (src null), se pinta el bloque de color del canvas.
 */
export type Photo = { src: string; width: number; height: number } | null;

export const images: {
  hero: Photo;
  heroMobile: Photo;
  andorra: Photo;
  verticals: Record<VerticalId, Photo>;
} = {
  hero: { src: "/img/hero.jpg", width: 2400, height: 1400 },
  heroMobile: { src: "/img/hero-mobile.jpg", width: 1280, height: 1600 },
  andorra: { src: "/img/andorra.jpg", width: 2400, height: 1350 },
  verticals: {
    intelligence: null,
    foundry: null,
    landing: { src: "/img/v-landing.jpg", width: 1600, height: 900 },
    academy: null,
    labs: { src: "/img/v-labs.jpg", width: 1600, height: 900 },
    valira: null,
  },
};
