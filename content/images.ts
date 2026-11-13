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
  hero: null,
  heroMobile: null,
  andorra: null,
  verticals: {
    intelligence: null,
    foundry: null,
    landing: null,
    academy: null,
    labs: null,
    valira: null,
  },
};
