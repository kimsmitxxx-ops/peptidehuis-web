/**
 * Verzendkosten: een bron voor de hele site.
 *
 * Dit stond eerder op vier plekken los in de code (hier, in de orders-API, in
 * de bulk-discount-berekening en als platte tekst op /bezorging). Die waren uit
 * elkaar gaan lopen: de site beloofde een ander bedrag dan er werd gerekend.
 * Alles leest nu deze tabel, zodat tarief en belofte niet meer kunnen afwijken.
 */

import type { CartItem } from "@/lib/cart-context";

export type Land = "NL" | "BE" | "DE" | "EU";

/** Tarief per zending, per bestemming. */
export const VERZENDKOSTEN_CENTS: Record<Land, number> = {
  NL: 700,
  BE: 1000,
  DE: 1000,
  EU: 1850,
};

/** Standaardbestemming als er nog geen land gekozen is. */
export const STANDAARD_LAND: Land = "NL";

/** Blijft bestaan voor de schema-markup en oudere imports. */
export const SHIPPING_FEE_CENTS = VERZENDKOSTEN_CENTS.NL;

const EU_LANDEN = new Set([
  "AT", "BG", "CY", "CZ", "DK", "EE", "ES", "FI", "FR", "GR", "HR", "HU", "IE",
  "IT", "LT", "LU", "LV", "MT", "PL", "PT", "RO", "SE", "SI", "SK",
]);

/** Landcode naar tariefgroep; onbekende bestemmingen vallen in het EU-tarief. */
export function tariefGroep(landcode: string | null | undefined): Land {
  const c = (landcode || STANDAARD_LAND).toUpperCase();
  if (c === "NL" || c === "NEDERLAND") return "NL";
  if (c === "BE" || c === "BELGIE" || c === "BELGIË") return "BE";
  if (c === "DE" || c === "DUITSLAND") return "DE";
  if (EU_LANDEN.has(c)) return "EU";
  return "EU";
}

export function verzendkostenVoorLand(landcode: string | null | undefined): number {
  return VERZENDKOSTEN_CENTS[tariefGroep(landcode)];
}

export type ShippingMethod = "ut" | "rest";

const METHOD_LABELS: Record<ShippingMethod, string> = {
  ut: "NL-magazijn",
  rest: "NL-magazijn",
};

export function shippingMethodForTags(_tags: string[] | null | undefined): ShippingMethod {
  return "rest";
}

export type ShippingBreakdown = {
  methods: ShippingMethod[];
  shippingCents: number;
  lines: Array<{ method: ShippingMethod; label: string; cents: number; itemCount: number }>;
};

/**
 * Alles gaat vanuit een NL-magazijn, dus een bestelling is een zending. Het
 * methode-mechanisme blijft staan voor als er ooit een tweede locatie bijkomt.
 */
export function computeShipping(items: CartItem[], landcode: string = STANDAARD_LAND): ShippingBreakdown {
  if (items.length === 0) {
    return { methods: [], shippingCents: 0, lines: [] };
  }
  const tarief = verzendkostenVoorLand(landcode);
  const byMethod = new Map<ShippingMethod, number>();
  for (const it of items) {
    const m = (it.shipping_method as ShippingMethod) || "rest";
    byMethod.set(m, (byMethod.get(m) || 0) + it.qty);
  }
  const methods = Array.from(byMethod.keys());
  const lines = methods.map((m) => ({
    method: m,
    label: METHOD_LABELS[m],
    cents: tarief,
    itemCount: byMethod.get(m) || 0,
  }));
  return { methods, shippingCents: methods.length * tarief, lines };
}

export const shippingLabel = (m: ShippingMethod) => METHOD_LABELS[m];
