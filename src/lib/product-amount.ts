/**
 * Haalt de hoeveelheid werkzame stof uit een productnaam, zodat de
 * reconstitutie-calculator de mg (of IU) van een gekozen product zelf weet.
 * Namen zien eruit als "BPC-157 (5 mg)", "Retatrutide 15 mg" of "HCG (5000 IU)".
 */

export type AmountUnit = "mg" | "IU";

export type ProductAmount = {
  slug: string;
  name: string;
  categorySlug: string | null;
  amount: number;
  unit: AmountUnit;
};

/** Laatste getal met een eenheid erachter; "176-191" telt dus niet mee. */
export function parseAmount(name: string): { amount: number; unit: AmountUnit } | null {
  const matches = [...name.matchAll(/(\d+(?:[.,]\d+)?)\s*(mg|iu)\b/gi)];
  if (!matches.length) return null;
  const last = matches[matches.length - 1];
  const amount = Number(last[1].replace(",", "."));
  if (!Number.isFinite(amount) || amount <= 0) return null;
  return { amount, unit: last[2].toLowerCase() === "iu" ? "IU" : "mg" };
}

/**
 * Producten die je kunt reconstitueren: alles met een mg- of IU-hoeveelheid,
 * buiten de benodigdheden (BAC-water, spuiten, doekjes) en buiten bundels,
 * want die bevatten meerdere vials.
 */
export function toReconstituteerbaar(
  products: Array<{ slug: string; name: string; availability?: string | null; categories?: { slug: string } | null }>,
): ProductAmount[] {
  return products
    .filter((p) => p.availability !== "OutOfStock")
    .filter((p) => p.categories?.slug !== "benodigdheden" && p.categories?.slug !== "bundels")
    .map((p) => {
      const parsed = parseAmount(p.name);
      if (!parsed) return null;
      return {
        slug: p.slug,
        name: p.name,
        categorySlug: p.categories?.slug ?? null,
        amount: parsed.amount,
        unit: parsed.unit,
      };
    })
    .filter((p): p is ProductAmount => p !== null)
    .sort((a, b) => a.name.localeCompare(b.name, "nl"));
}
