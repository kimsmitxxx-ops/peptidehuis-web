// Echte merken die als brand getoond mogen worden in filter.
// Stof-namen (bold, dianabol, anavar etc) komen ook als tag voor maar zijn geen merk.
// Pure module (geen "use client") -> mag van server EN client geimporteerd worden.
export const KNOWN_BRANDS = new Set([
  "LYY", "AP", "PR", "UT",
  "Pharmacom", "Magnus", "Driada Medical", "ZPHC", "Euro Pharmacies",
]);

export function filterBrandsOnly(tags: string[]): string[] {
  return tags.filter((t) => KNOWN_BRANDS.has(t));
}
