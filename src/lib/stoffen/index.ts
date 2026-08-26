import { STOFFEN_A } from "./data-a";
import { STOFFEN_B } from "./data-b";
import type { Stof } from "./types";

export type { Stof, StofFaq, StofBron } from "./types";

/** Alle stof-pagina's, gesorteerd op categorie + naam. */
export const STOFFEN: Stof[] = [...STOFFEN_A, ...STOFFEN_B];

export function getStof(slug: string): Stof | undefined {
  return STOFFEN.find((s) => s.slug === slug);
}

/** Vind de stof-pagina die bij een product-slug hoort (voor cross-links). */
export function stofForProductSlug(productSlug: string): Stof | undefined {
  return STOFFEN.find((s) => s.productSlugs.includes(productSlug));
}
