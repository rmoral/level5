/** Identificadores sin dependencias (se usan también en el navegador; sin zod). */
export const verticalIds = ["intelligence", "foundry", "landing", "academy", "labs", "valira"] as const;
export type VerticalId = (typeof verticalIds)[number];

export const interestIds = [...verticalIds, "grupo", "nose"] as const;
export type InterestId = (typeof interestIds)[number];
