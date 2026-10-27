import { listProducts } from "@/lib/queries";
import { STOFFEN } from "@/lib/stoffen";
import type { Stof } from "@/lib/stoffen/types";

/**
 * Welke stof heeft een leverbaar product, en welke niet.
 *
 * Een stof hoort precies EEN pagina te hebben. Verkopen we hem, dan is dat de
 * productpagina en stuurt /peptiden/<stof> daarheen door. Verkopen we hem niet,
 * dan blijft de gids die ene pagina.
 *
 * Bewust uit de database en niet uit een handmatige lijst: zodra een product
 * weer op actief gaat in de dash, verschuift de pagina vanzelf mee. Anders zou
 * je bij elke voorraadwijziging ook de code moeten aanpassen en lopen we het
 * risico dat we twee pagina's om dezelfde zoekterm laten concurreren.
 */
export type StofStatus = { stof: Stof; productSlug: string | null };

export async function stofStatussen(): Promise<StofStatus[]> {
  const producten = (await listProducts({ limit: 500 })) as any[];
  // Uitverkocht telt hier wel mee: die productpagina bestaat en bouwt al posities
  // op, dus dat blijft de pagina voor die stof.
  const bestaat = new Set(producten.map((p) => p.slug));
  return STOFFEN.map((stof) => ({
    stof,
    productSlug: stof.productSlugs.find((s) => bestaat.has(s)) ?? null,
  }));
}

export async function productVoorStof(stofSlug: string): Promise<string | null> {
  const alle = await stofStatussen();
  return alle.find((s) => s.stof.slug === stofSlug)?.productSlug ?? null;
}

/** Het adres waar deze stof op dit moment te vinden is. */
export function stofUrl(status: StofStatus): string {
  return status.productSlug ? `/product/${status.productSlug}` : `/peptiden/${status.stof.slug}`;
}
