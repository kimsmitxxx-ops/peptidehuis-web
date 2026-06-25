// Echte merken die als brand getoond mogen worden in filter.
// Volgorde = display order in sidebar (UT = onze focus, eerst).
export const BRAND_ORDER = ["UT", "UP", "LYY", "AP", "PR", "Pharmacom", "Magnus", "Driada Medical", "ZPHC", "Euro Pharmacies"];
export const KNOWN_BRANDS = new Set(BRAND_ORDER);

// Volle merknamen voor display (tag value blijft korte code voor filter-state).
export const BRAND_LABELS: Record<string, string> = {
  "UT": "United Tabs",
  "UP": "Unique Pharma",
  "LYY": "Long Yi Yao",
  "AP": "Adex Pharma",
  "PR": "Prime Pharma",
  "Pharmacom": "Pharmacom",
  "Magnus": "Magnus Pharmaceuticals",
  "Driada Medical": "Driada Medical",
  "ZPHC": "ZPHC",
  "Euro Pharmacies": "Euro Pharmacies",
};
export function brandLabel(tag: string): string {
  return BRAND_LABELS[tag] || tag;
}

export function filterBrandsOnly(tags: string[]): string[] {
  return tags.filter((t) => KNOWN_BRANDS.has(t));
}

// Sort brands volgens onze voorkeurs-volgorde (UT eerst), onbekende achteraan
export function sortBrands(brands: string[]): string[] {
  const index = (b: string) => {
    const i = BRAND_ORDER.indexOf(b);
    return i === -1 ? 999 : i;
  };
  return [...brands].sort((a, b) => index(a) - index(b));
}
