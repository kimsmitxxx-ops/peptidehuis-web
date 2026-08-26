// Merken die als brand getoond mogen worden in de winkel-filter.
// Peptidehuis voert (nog) geen merk-tags: producten zijn eigen-label vials.
// Zodra er merk-tags op producten staan, vul je BRAND_ORDER + BRAND_LABELS
// aan en verschijnt het merk-filter vanzelf in de sidebar.
export const BRAND_ORDER: string[] = [];
export const KNOWN_BRANDS = new Set(BRAND_ORDER);

// Volle merknamen voor display (tag value blijft korte code voor filter-state).
export const BRAND_LABELS: Record<string, string> = {};

export function brandLabel(tag: string): string {
  return BRAND_LABELS[tag] || tag;
}

export function filterBrandsOnly(tags: string[]): string[] {
  return tags.filter((t) => KNOWN_BRANDS.has(t));
}

// Sort brands volgens voorkeurs-volgorde, onbekende achteraan.
export function sortBrands(brands: string[]): string[] {
  const index = (b: string) => {
    const i = BRAND_ORDER.indexOf(b);
    return i === -1 ? 999 : i;
  };
  return [...brands].sort((a, b) => index(a) - index(b));
}
