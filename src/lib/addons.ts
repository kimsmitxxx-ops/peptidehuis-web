/**
 * Accessoire-opties bij een peptide-vial: bacteriostatisch water, insulinespuiten
 * en alcoholdoekjes. De basisprijs van een vial is inclusief 2 ml water; alles
 * daarboven is een toeslag die aansluit op onze losse prijzen in de categorie
 * benodigdheden (10 ml water 9,95 / spuiten 4,95 / doekjes 3,95).
 *
 * Dit bestand wordt zowel client-side (prijs tonen) als server-side (prijs
 * valideren in /api/orders) gebruikt, zodat er maar een bron van waarheid is.
 */

export type AddonGroupKey = "water" | "spuiten" | "doekjes";

export type AddonChoice = {
  value: string;
  label: string;
  /** Toeslag in centen bovenop de productprijs. */
  priceDelta: number;
  /** Korte omschrijving in de winkelwagen en op de pakbon. */
  cartLabel?: string;
};

export type AddonGroup = {
  key: AddonGroupKey;
  label: string;
  hint?: string;
  choices: AddonChoice[];
};

export const ADDON_GROUPS: AddonGroup[] = [
  {
    key: "water",
    label: "Bacteriostatisch water",
    hint: "Nodig om het poeder op te lossen. 2 ml zit standaard bij de vial.",
    choices: [
      { value: "2ml", label: "2 ml (inbegrepen)", priceDelta: 0 },
      { value: "10ml", label: "10 ml", priceDelta: 1000, cartLabel: "10 ml water" },
    ],
  },
  {
    key: "spuiten",
    label: "Insulinespuiten",
    hint: "10 stuks, U100, steriel verpakt.",
    choices: [
      { value: "geen", label: "Geen", priceDelta: 0 },
      { value: "05ml", label: "10x 0,5 ml", priceDelta: 500, cartLabel: "10x 0,5 ml spuiten" },
      { value: "1ml", label: "10x 1 ml", priceDelta: 500, cartLabel: "10x 1 ml spuiten" },
    ],
  },
  {
    key: "doekjes",
    label: "Alcoholdoekjes",
    hint: "70% IPA, voor het ontsmetten van de rubber stop.",
    choices: [
      { value: "nee", label: "Geen", priceDelta: 0 },
      { value: "ja", label: "10 doekjes", priceDelta: 300, cartLabel: "alcoholdoekjes" },
    ],
  },
];

/** Standaardkeuze per groep: de variant zonder toeslag. */
export const DEFAULT_ADDONS: Record<AddonGroupKey, string> = {
  water: "2ml",
  spuiten: "geen",
  doekjes: "nee",
};

export type AddonSelection = Record<string, string>;

function choiceFor(group: AddonGroup, selection: AddonSelection): AddonChoice {
  const picked = selection?.[group.key];
  return group.choices.find((c) => c.value === picked) ?? group.choices[0];
}

/** Totale toeslag in centen voor een keuze. Onbekende waarden tellen als 0. */
export function addonDeltaCents(selection: AddonSelection | null | undefined): number {
  if (!selection) return 0;
  return ADDON_GROUPS.reduce((sum, g) => sum + choiceFor(g, selection).priceDelta, 0);
}

/** Korte samenvatting voor winkelwagen en orderregel, of null als niets is bijbesteld. */
export function addonSummary(selection: AddonSelection | null | undefined): string | null {
  if (!selection) return null;
  const parts = ADDON_GROUPS.map((g) => choiceFor(g, selection))
    .filter((c) => c.priceDelta > 0 && c.cartLabel)
    .map((c) => c.cartLabel as string);
  return parts.length ? parts.join(", ") : null;
}

/**
 * Stabiele sleutel voor een keuze, zodat twee verschillende samenstellingen van
 * hetzelfde product als aparte regels in de winkelwagen staan.
 */
export function addonKey(selection: AddonSelection | null | undefined): string {
  return ADDON_GROUPS.map((g) => `${g.key}:${choiceFor(g, selection ?? {}).value}`).join("|");
}

/** Keuze opschonen tot alleen bekende waarden. Beschermt de prijsvalidatie. */
export function normalizeAddons(selection: unknown): AddonSelection {
  const out: AddonSelection = {};
  for (const g of ADDON_GROUPS) {
    const raw = (selection as AddonSelection | null)?.[g.key];
    const hit = g.choices.find((c) => c.value === raw);
    out[g.key] = (hit ?? g.choices[0]).value;
  }
  return out;
}

/** Accessoires horen niet bij de categorie benodigdheden zelf. */
export function supportsAddons(categorySlug: string | null | undefined): boolean {
  return categorySlug !== "benodigdheden";
}
