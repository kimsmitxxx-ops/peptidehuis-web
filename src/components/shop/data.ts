// Shared mock data for the anabolen24 shop. No backend, geen fetch.
// Structuur: anabolen (per stof als subcategorie), pct.
const catKuurImg = "/assets/cat-kuur.png";
const catPctImg = "/assets/cat-pct.png";
const catAfvallenImg = "/assets/cat-afvallen.png";

export interface ProductVariant {
  label: string;
  value: string;
  priceDelta?: number;
}

export type GroupSlug = "anabolen" | "pct";

export interface Product {
  slug: string;
  name: string;
  category: string;          // weergave-naam categorie (bv. "Testosteron")
  categorySlug: string;       // subcategorie slug (bv. "testosteron")
  group: GroupSlug;
  shortDescription: string;
  longDescription: string;
  priceFrom: number;
  image: string;
  gallery: string[];
  rating: number;
  ratingCount: number;
  inStock: boolean;
  tag?: string;
  variants: ProductVariant[];
  lab: {
    labName: string;
    batchCode: string;
    testDate: string;
    purityPct: number;
    coaUrl: string;
  };
  specs: { label: string; value: string }[];
  bulkTiers: { qty: number; price: number; previousPrice?: number }[];
  productionLocation?: string;
  brand?: string;
}

const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

// ---------------------------------------------------------------------------
// Products
// ---------------------------------------------------------------------------

export const products: Product[] = [
  // ---------- Testosteron ----------
  {
    slug: "testosteron-enanthate-250",
    name: "Testosteron Enanthate 250 mg/ml",
    category: "Testosteron",
    categorySlug: "testosteron",
    group: "anabolen",
    shortDescription:
      "Langwerkende testosteronester met halfwaardetijd van circa 8 dagen, basis van vrijwel elke kuur.",
    longDescription:
      "Testosteron Enanthate is de meest gebruikte langwerkende testosteronester in onderzoek naar androgene therapie. Onze flacons zijn HPLC-geverifieerd boven 99% en bevatten 250 mg/ml in een gestabiliseerde olie-basis.",
    priceFrom: 44.95,
    image: img("photo-1631549916768-4119b2e5f926"),
    gallery: [img("photo-1631549916768-4119b2e5f926"), img("photo-1582719471384-894fbb16e074")],
    rating: 4.9,
    ratingCount: 624,
    inStock: true,
    tag: "Bestseller",
    variants: [
      { label: "10 ml", value: "10ml" },
      { label: "10 ml × 3", value: "10ml-x3", priceDelta: 89 },
    ],
    lab: { labName: "Janoshik Analytical", batchCode: "TE-2605-A", testDate: "12-05-2026", purityPct: 99.4, coaUrl: "#coa" },
    specs: [
      { label: "Werkzame stof", value: "Testosteron enanthate" },
      { label: "Concentratie", value: "250 mg/ml" },
      { label: "Halfwaardetijd", value: "~8 dagen" },
      { label: "Detectietijd", value: "3 maanden" },
    ],
    bulkTiers: [{ qty: 1, price: 44.95 }, { qty: 3, price: 39.95, previousPrice: 44.95 }],
  },
  {
    slug: "testosteron-cypionate-250",
    name: "Testosteron Cypionate 250 mg/ml",
    category: "Testosteron",
    categorySlug: "testosteron",
    group: "anabolen",
    shortDescription:
      "Cypionaat-variant met vergelijkbaar profiel als enanthate, vaak gekozen om beschikbaarheid.",
    longDescription:
      "Testosteron Cypionate verschilt slechts één koolstofatoom van enanthate; de bloedwaarden en kuurschema's zijn vrijwel identiek. Onafhankelijk getest per batch.",
    priceFrom: 46.95,
    image: img("photo-1582719508461-905c673771fd"),
    gallery: [img("photo-1582719508461-905c673771fd")],
    rating: 4.8,
    ratingCount: 318,
    inStock: true,
    variants: [{ label: "10 ml", value: "10ml" }],
    lab: { labName: "Janoshik Analytical", batchCode: "TC-2604-C", testDate: "20-04-2026", purityPct: 99.21, coaUrl: "#coa" },
    specs: [
      { label: "Werkzame stof", value: "Testosteron cypionate" },
      { label: "Concentratie", value: "250 mg/ml" },
      { label: "Halfwaardetijd", value: "~8 dagen" },
      { label: "Detectietijd", value: "3 maanden" },
    ],
    bulkTiers: [{ qty: 1, price: 46.95 }, { qty: 3, price: 41.95, previousPrice: 46.95 }],
  },
  {
    slug: "sustanon-250",
    name: "Sustanon 250 mg/ml",
    category: "Testosteron",
    categorySlug: "testosteron",
    group: "anabolen",
    shortDescription:
      "Mix van vier testosteronesters (propionate, fenylpropionate, isocaproate, decanoate).",
    longDescription:
      "Sustanon combineert vier esters zodat één injectie zowel een snelle als een langdurige afgifte geeft. Geliefd binnen TRT-onderzoek vanwege de stabiele plasmaspiegels.",
    priceFrom: 48.95,
    image: img("photo-1576086213369-97a306d36557"),
    gallery: [img("photo-1576086213369-97a306d36557")],
    rating: 4.9,
    ratingCount: 421,
    inStock: true,
    tag: "Populair",
    variants: [{ label: "10 ml", value: "10ml" }],
    lab: { labName: "Anabolic Lab", batchCode: "SUS-2605-B", testDate: "02-05-2026", purityPct: 99.05, coaUrl: "#coa" },
    specs: [
      { label: "Esters", value: "Propionate / fenylpropionate / isocaproate / decanoate" },
      { label: "Concentratie", value: "250 mg/ml" },
      { label: "Halfwaardetijd", value: "Gemiddeld ~15 dagen" },
      { label: "Detectietijd", value: "3 maanden" },
    ],
    bulkTiers: [{ qty: 1, price: 48.95 }],
  },

  // ---------- Nandrolon ----------
  {
    slug: "deca-durabolin-250",
    name: "Nandrolon Decanoate 250 mg/ml",
    category: "Nandrolon",
    categorySlug: "nandrolon",
    group: "anabolen",
    shortDescription:
      "Klassiek bekend als Deca-Durabolin. Langzaam vrijkomende nandrolonester voor onderzoek naar gewrichtscomfort en eiwitsynthese.",
    longDescription:
      "Nandrolon Decanoate (Deca) is een 19-nortestosteron-derivaat met een lage androgene en hoge anabole activiteit. Lange halfwaardetijd vraagt om langere kuurduur en aangepaste PCT.",
    priceFrom: 52.95,
    image: img("photo-1559757175-5700dde675bc"),
    gallery: [img("photo-1559757175-5700dde675bc")],
    rating: 4.7,
    ratingCount: 287,
    inStock: true,
    variants: [{ label: "10 ml", value: "10ml" }],
    lab: { labName: "Janoshik Analytical", batchCode: "DEC-2604-A", testDate: "10-04-2026", purityPct: 98.84, coaUrl: "#coa" },
    specs: [
      { label: "Werkzame stof", value: "Nandrolon decanoate" },
      { label: "Concentratie", value: "250 mg/ml" },
      { label: "Halfwaardetijd", value: "~15 dagen" },
      { label: "Detectietijd", value: "Tot 18 maanden" },
    ],
    bulkTiers: [{ qty: 1, price: 52.95 }, { qty: 3, price: 47.95, previousPrice: 52.95 }],
  },
  {
    slug: "npp-100",
    name: "Nandrolon Phenylpropionate 100 mg/ml",
    category: "Nandrolon",
    categorySlug: "nandrolon",
    group: "anabolen",
    shortDescription:
      "Korte NPP-ester voor onderzoekers die snel willen kunnen bijsturen.",
    longDescription:
      "NPP heeft dezelfde basisstof als Deca, maar door de kortere ester is het effect sneller in én sneller uit het systeem.",
    priceFrom: 39.95,
    image: img("photo-1620916566398-39f1143ab7be"),
    gallery: [img("photo-1620916566398-39f1143ab7be")],
    rating: 4.7,
    ratingCount: 121,
    inStock: true,
    variants: [{ label: "10 ml", value: "10ml" }],
    lab: { labName: "Anabolic Lab", batchCode: "NPP-2603-D", testDate: "21-03-2026", purityPct: 99.02, coaUrl: "#coa" },
    specs: [
      { label: "Werkzame stof", value: "Nandrolon fenylpropionaat" },
      { label: "Concentratie", value: "100 mg/ml" },
      { label: "Halfwaardetijd", value: "~3 dagen" },
      { label: "Detectietijd", value: "Tot 12 maanden" },
    ],
    bulkTiers: [{ qty: 1, price: 39.95 }],
  },

  // ---------- Trenbolone ----------
  {
    slug: "trenbolone-acetate-100",
    name: "Trenbolone Acetate 100 mg/ml",
    category: "Trenbolone",
    categorySlug: "trenbolone",
    group: "anabolen",
    shortDescription:
      "Krachtigste klassieke nandrolon-derivaat. Korte ester voor snelle responsevaluatie.",
    longDescription:
      "Trenbolone is een 19-nor-derivaat met sterke binding aan de androgeen receptor. Onze batch wordt los én in een mix-blend aangeboden.",
    priceFrom: 64.95,
    image: img("photo-1614859324967-bdf413c3a334"),
    gallery: [img("photo-1614859324967-bdf413c3a334")],
    rating: 4.8,
    ratingCount: 198,
    inStock: true,
    tag: "Sterk",
    variants: [{ label: "10 ml", value: "10ml" }],
    lab: { labName: "Janoshik Analytical", batchCode: "TRA-2605-F", testDate: "08-05-2026", purityPct: 99.18, coaUrl: "#coa" },
    specs: [
      { label: "Werkzame stof", value: "Trenbolone acetate" },
      { label: "Concentratie", value: "100 mg/ml" },
      { label: "Halfwaardetijd", value: "~3 dagen" },
      { label: "Detectietijd", value: "5 maanden" },
    ],
    bulkTiers: [{ qty: 1, price: 64.95 }, { qty: 3, price: 58.95, previousPrice: 64.95 }],
  },
  {
    slug: "trenbolone-enanthate-200",
    name: "Trenbolone Enanthate 200 mg/ml",
    category: "Trenbolone",
    categorySlug: "trenbolone",
    group: "anabolen",
    shortDescription:
      "Langwerkende trenbolone-ester met halfwaardetijd van circa 7 dagen.",
    longDescription:
      "Trenbolone Enanthate combineert de bekende potentie van trenbolone met een langer interval tussen injecties.",
    priceFrom: 74.95,
    image: img("photo-1612480797665-c96d261eae35"),
    gallery: [img("photo-1612480797665-c96d261eae35")],
    rating: 4.7,
    ratingCount: 142,
    inStock: false,
    tag: "Wachtlijst",
    variants: [{ label: "10 ml", value: "10ml" }],
    lab: { labName: "Anabolic Lab", batchCode: "TRE-2602-A", testDate: "16-02-2026", purityPct: 98.92, coaUrl: "#coa" },
    specs: [
      { label: "Werkzame stof", value: "Trenbolone enanthate" },
      { label: "Concentratie", value: "200 mg/ml" },
      { label: "Halfwaardetijd", value: "~7 dagen" },
      { label: "Detectietijd", value: "5 maanden" },
    ],
    bulkTiers: [{ qty: 1, price: 74.95 }],
  },

  // ---------- Boldenone ----------
  {
    slug: "boldenone-undecylenate-300",
    name: "Boldenone Undecylenate 300 mg/ml",
    category: "Boldenone",
    categorySlug: "boldenone",
    group: "anabolen",
    shortDescription:
      "Bekend als Equipoise. Milde, langzame opbouw met goede tolerantie.",
    longDescription:
      "Boldenone is een testosteron-derivaat met een ongebruikelijk lange ester (undecylenate). Geliefd in langere onderzoekscycli.",
    priceFrom: 54.95,
    image: img("photo-1576086213369-97a306d36557"),
    gallery: [img("photo-1576086213369-97a306d36557")],
    rating: 4.6,
    ratingCount: 167,
    inStock: true,
    variants: [{ label: "10 ml", value: "10ml" }],
    lab: { labName: "Janoshik Analytical", batchCode: "BOL-2604-B", testDate: "04-04-2026", purityPct: 99.13, coaUrl: "#coa" },
    specs: [
      { label: "Werkzame stof", value: "Boldenone undecylenate" },
      { label: "Concentratie", value: "300 mg/ml" },
      { label: "Halfwaardetijd", value: "~14 dagen" },
      { label: "Detectietijd", value: "Tot 5 maanden" },
    ],
    bulkTiers: [{ qty: 1, price: 54.95 }],
  },

  // ---------- Masteron ----------
  {
    slug: "masteron-propionate-100",
    name: "Drostanolone Propionate 100 mg/ml",
    category: "Masteron",
    categorySlug: "masteron",
    group: "anabolen",
    shortDescription:
      "Masteron propionate. DHT-derivaat met antioestrogene eigenschappen.",
    longDescription:
      "Drostanolone (Masteron) bindt sterk aan SHBG en wordt vooral in voorbereidingsperiodes van onderzoek ingezet.",
    priceFrom: 59.95,
    image: img("photo-1582719508461-905c673771fd"),
    gallery: [img("photo-1582719508461-905c673771fd")],
    rating: 4.8,
    ratingCount: 152,
    inStock: true,
    variants: [{ label: "10 ml", value: "10ml" }],
    lab: { labName: "Janoshik Analytical", batchCode: "MAS-2604-A", testDate: "30-04-2026", purityPct: 99.31, coaUrl: "#coa" },
    specs: [
      { label: "Werkzame stof", value: "Drostanolone propionate" },
      { label: "Concentratie", value: "100 mg/ml" },
      { label: "Halfwaardetijd", value: "~2,5 dagen" },
      { label: "Detectietijd", value: "3 weken" },
    ],
    bulkTiers: [{ qty: 1, price: 59.95 }],
  },

  // ---------- Orale anabolen ----------
  {
    slug: "anavar-10",
    name: "Oxandrolone (Anavar) 10 mg · 100 tab",
    category: "Anavar",
    categorySlug: "anavar",
    group: "anabolen",
    shortDescription:
      "Mild oraal anabolicum met DHT-basis, vaak gekozen om relatief gunstig bijwerkingenprofiel.",
    longDescription:
      "Oxandrolone is hepatisch wel actief maar minder belastend dan andere c17-alfa stoffen. Onafhankelijk getest per partij.",
    priceFrom: 49.95,
    image: img("photo-1587854692152-cbe660dbde88"),
    gallery: [img("photo-1587854692152-cbe660dbde88")],
    rating: 4.7,
    ratingCount: 391,
    inStock: true,
    tag: "Populair",
    variants: [
      { label: "100 tab", value: "100" },
      { label: "200 tab", value: "200", priceDelta: 44 },
    ],
    lab: { labName: "Janoshik Analytical", batchCode: "ANA-2605-D", testDate: "11-05-2026", purityPct: 99.42, coaUrl: "#coa" },
    specs: [
      { label: "Werkzame stof", value: "Oxandrolone" },
      { label: "Dosering", value: "10 mg / tablet" },
      { label: "Halfwaardetijd", value: "~8 uur" },
      { label: "Lever-belasting", value: "Mild (c17-α)" },
    ],
    bulkTiers: [{ qty: 1, price: 49.95 }, { qty: 3, price: 44.95, previousPrice: 49.95 }],
  },
  {
    slug: "dianabol-10",
    name: "Methandienone (Dianabol) 10 mg · 100 tab",
    category: "Dianabol",
    categorySlug: "dianabol",
    group: "anabolen",
    shortDescription:
      "Klassieke oral kickstarter met sterke vochtretentie en snelle massa-toename in onderzoek.",
    longDescription:
      "Dianabol is een van de eerste synthetische anabolen. Korte halfwaardetijd, daarom vaak in meerdere doses per dag.",
    priceFrom: 32.95,
    image: img("photo-1587854692152-cbe660dbde88"),
    gallery: [img("photo-1587854692152-cbe660dbde88")],
    rating: 4.6,
    ratingCount: 478,
    inStock: true,
    variants: [{ label: "100 tab", value: "100" }],
    lab: { labName: "Anabolic Lab", batchCode: "DBL-2604-A", testDate: "06-04-2026", purityPct: 98.79, coaUrl: "#coa" },
    specs: [
      { label: "Werkzame stof", value: "Methandienone" },
      { label: "Dosering", value: "10 mg / tablet" },
      { label: "Halfwaardetijd", value: "~5 uur" },
      { label: "Lever-belasting", value: "Hoog (c17-α)" },
    ],
    bulkTiers: [{ qty: 1, price: 32.95 }],
  },
  {
    slug: "winstrol-10",
    name: "Stanozolol (Winstrol) 10 mg · 100 tab",
    category: "Winstrol",
    categorySlug: "winstrol",
    group: "anabolen",
    shortDescription:
      "DHT-derivaat met sterk droog karakter en hoge androgene activiteit per milligram.",
    longDescription:
      "Stanozolol is c17-alfa gealkyleerd voor orale opname. Geliefd in voorbereidingsperiodes wegens lage aromatisatie.",
    priceFrom: 34.95,
    image: img("photo-1587854692152-cbe660dbde88"),
    gallery: [img("photo-1587854692152-cbe660dbde88")],
    rating: 4.7,
    ratingCount: 286,
    inStock: true,
    variants: [{ label: "100 tab", value: "100" }],
    lab: { labName: "Janoshik Analytical", batchCode: "WIN-2604-B", testDate: "18-04-2026", purityPct: 99.05, coaUrl: "#coa" },
    specs: [
      { label: "Werkzame stof", value: "Stanozolol" },
      { label: "Dosering", value: "10 mg / tablet" },
      { label: "Halfwaardetijd", value: "~9 uur" },
      { label: "Lever-belasting", value: "Hoog (c17-α)" },
    ],
    bulkTiers: [{ qty: 1, price: 34.95 }],
  },
  {
    slug: "primobolan-100",
    name: "Methenolone Enanthate (Primobolan) 100 mg/ml",
    category: "Primobolan",
    categorySlug: "primobolan",
    group: "anabolen",
    shortDescription:
      "Mild DHT-derivaat, bekend om hoog kostenniveau en clean profiel.",
    longDescription:
      "Primobolan is een methenolone-derivaat zonder aromatisatie. Onafhankelijk getest om vervalsing uit te sluiten — een notoir veel-vervalste stof.",
    priceFrom: 119.95,
    image: img("photo-1631549916768-4119b2e5f926"),
    gallery: [img("photo-1631549916768-4119b2e5f926")],
    rating: 4.8,
    ratingCount: 73,
    inStock: false,
    tag: "Wachtlijst",
    variants: [{ label: "10 ml", value: "10ml" }],
    lab: { labName: "Janoshik Analytical", batchCode: "PRI-2603-A", testDate: "29-03-2026", purityPct: 99.27, coaUrl: "#coa" },
    specs: [
      { label: "Werkzame stof", value: "Methenolone enanthate" },
      { label: "Concentratie", value: "100 mg/ml" },
      { label: "Halfwaardetijd", value: "~10 dagen" },
      { label: "Aromatisatie", value: "Geen" },
    ],
    bulkTiers: [{ qty: 1, price: 119.95 }],
  },

  // ---------- PCT ----------
  {
    slug: "nolvadex-20",
    name: "Tamoxifen (Nolvadex) 20 mg · 50 tab",
    category: "Nolvadex",
    categorySlug: "nolvadex",
    group: "pct",
    shortDescription:
      "SERM voor PCT-onderzoek. Blokkeert oestrogeen-receptoren in borstweefsel.",
    longDescription:
      "Tamoxifen wordt al decennia onderzocht binnen post-cycle therapy. Onze tabletten zijn HPLC-geverifieerd op 99,5%+.",
    priceFrom: 29.95,
    image: img("photo-1587854692152-cbe660dbde88"),
    gallery: [img("photo-1587854692152-cbe660dbde88")],
    rating: 4.8,
    ratingCount: 312,
    inStock: true,
    variants: [{ label: "50 tab", value: "50" }, { label: "100 tab", value: "100", priceDelta: 18 }],
    lab: { labName: "Janoshik Analytical", batchCode: "TAM-2604-C", testDate: "08-04-2026", purityPct: 99.6, coaUrl: "#coa" },
    specs: [
      { label: "Werkzame stof", value: "Tamoxifen citraat" },
      { label: "Dosering", value: "20 mg / tablet" },
      { label: "Halfwaardetijd", value: "5–7 dagen" },
      { label: "Type", value: "SERM" },
    ],
    bulkTiers: [{ qty: 1, price: 29.95 }, { qty: 3, price: 26.95, previousPrice: 29.95 }],
  },
  {
    slug: "clomid-50",
    name: "Clomifeen (Clomid) 50 mg · 30 tab",
    category: "Clomid",
    categorySlug: "clomid",
    group: "pct",
    shortDescription:
      "Klassieke SERM voor herstel van endogene testosteronproductie na een kuur.",
    longDescription:
      "Clomifen stimuleert LH- en FSH-afgifte via de hypothalamus. Vaak gecombineerd met tamoxifen in PCT-protocollen.",
    priceFrom: 27.95,
    image: img("photo-1587854692152-cbe660dbde88"),
    gallery: [img("photo-1587854692152-cbe660dbde88")],
    rating: 4.7,
    ratingCount: 244,
    inStock: true,
    variants: [{ label: "30 tab", value: "30" }],
    lab: { labName: "Anabolic Lab", batchCode: "CLO-2604-B", testDate: "12-04-2026", purityPct: 99.4, coaUrl: "#coa" },
    specs: [
      { label: "Werkzame stof", value: "Clomifeen citraat" },
      { label: "Dosering", value: "50 mg / tablet" },
      { label: "Halfwaardetijd", value: "~5 dagen" },
      { label: "Type", value: "SERM" },
    ],
    bulkTiers: [{ qty: 1, price: 27.95 }],
  },
  {
    slug: "arimidex-1",
    name: "Anastrozol (Arimidex) 1 mg · 30 tab",
    category: "Arimidex",
    categorySlug: "arimidex",
    group: "pct",
    shortDescription:
      "Aromatase-remmer (AI) ter beheersing van oestrogeen tijdens kuur.",
    longDescription:
      "Anastrozol remt het aromatase-enzym dat testosteron naar oestradiol omzet. Onderzoek vereist nauwkeurige titratie op bloedwaarden.",
    priceFrom: 32.95,
    image: img("photo-1587854692152-cbe660dbde88"),
    gallery: [img("photo-1587854692152-cbe660dbde88")],
    rating: 4.8,
    ratingCount: 187,
    inStock: true,
    variants: [{ label: "30 tab", value: "30" }],
    lab: { labName: "Janoshik Analytical", batchCode: "ANS-2604-A", testDate: "16-04-2026", purityPct: 99.51, coaUrl: "#coa" },
    specs: [
      { label: "Werkzame stof", value: "Anastrozol" },
      { label: "Dosering", value: "1 mg / tablet" },
      { label: "Halfwaardetijd", value: "~48 uur" },
      { label: "Type", value: "AI" },
    ],
    bulkTiers: [{ qty: 1, price: 32.95 }],
  },
  {
    slug: "hcg-5000",
    name: "HCG 5000 IE",
    category: "HCG",
    categorySlug: "hcg",
    group: "pct",
    shortDescription:
      "Humaan choriongonadotrofine. Mimet LH om testikulair volume te behouden.",
    longDescription:
      "HCG wordt onderzocht voor het behoud van endogene testikulaire functie tijdens en na androgene cycli.",
    priceFrom: 34.95,
    image: img("photo-1620916566398-39f1143ab7be"),
    gallery: [img("photo-1620916566398-39f1143ab7be")],
    rating: 4.7,
    ratingCount: 154,
    inStock: true,
    variants: [{ label: "1 amp", value: "1" }, { label: "3 amp", value: "3", priceDelta: 65 }],
    lab: { labName: "Eurofins NL", batchCode: "HCG-2605-A", testDate: "03-05-2026", purityPct: 99.0, coaUrl: "#coa" },
    specs: [
      { label: "Werkzame stof", value: "HCG" },
      { label: "Sterkte", value: "5000 IE per ampul" },
      { label: "Reconstitutie", value: "1–2 ml bacteriostatisch water" },
      { label: "Type", value: "Gonadotrofine" },
    ],
    bulkTiers: [{ qty: 1, price: 34.95 }],
  },

  // (Accessoires verwijderd — niet relevant voor anabolen-only shop)

];

export function findProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function productsByCategory(slug: string) {
  return products.filter((p) => p.categorySlug === slug);
}

export function productsByGroup(group: GroupSlug) {
  return products.filter((p) => p.group === group);
}

// ---------------------------------------------------------------------------
// Categorie-content (SEO-pagina's per anabolen-stof + PCT-stof)
// ---------------------------------------------------------------------------

export interface CategorySection {
  heading: string;
  body: string;
}

export interface CategoryFaq {
  question: string;
  answer: string;
}

export interface CategoryContent {
  slug: string;
  group: GroupSlug;
  name: string;            // "Testosteron"
  aka?: string[];          // ["Test E", "Sustanon"]
  tagline: string;
  heroImage: string;
  heroImageAlt?: string;
  resultImage?: string;
  resultImageAlt?: string;
  intro: string;           // 2–3 zinnen, gebruikt als meta description
  longIntro: string;       // lead onder de h1
  keyFacts: { label: string; value: string }[];
  sections: CategorySection[];
  faqs: CategoryFaq[];
  related: string[];       // andere category slugs
  knowledge: string[];     // kennisbank slugs
}

export const categoryContent: CategoryContent[] = [
  {
    slug: "testosteron",
    group: "anabolen",
    name: "Testosteron",
    aka: ["Test E", "Test C", "Sustanon", "TRT"],
    tagline: "De basis van vrijwel elke anabolenkuur",
    heroImage: "https://rexqfwibxawqnvrzbdoo.supabase.co/storage/v1/object/public/blog-images/stof/testosteron-hero.jpg",
    heroImageAlt: "Donkere editorial foto van testosteron-vial voor de stof-pagina testosteron",
    resultImage: "https://rexqfwibxawqnvrzbdoo.supabase.co/storage/v1/object/public/blog-images/stof/testosteron-resultaat.webp",
    resultImageAlt: "Testosteron kuur resultaat — gespierde bodybuilder toont testosteron gains met kwaliteitsspiermassa en volle schouders",
    intro:
      "Testosteron is de basis waar elke kuur op draait — zonder een testbasis loop je vast op libido, energie en stemming.",
    longIntro:
      "Of je nou een eerste kuur draait of je tiende blast, testosteron-enanthate of -cypionate is bijna altijd het fundament. Het bouwt lean mass op, houdt je libido op gang en compenseert de suppressie die andere stoffen veroorzaken. De keuze tussen esters (kort, lang, blends) bepaalt vooral je prik-frequentie, niet zozeer het eindresultaat.",
    keyFacts: [
      { label: "Type", value: "Androgeen anabool — injectable" },
      { label: "Halfwaardetijd", value: "Propionate 2 dgn · Enanthate/Cypionate 8 dgn · Sustanon ~10 dgn" },
      { label: "Typische dosering", value: "Beginner 300–500 mg/wk · Intermediate 500–750 mg/wk" },
      { label: "Aromatisatie", value: "Ja — AI op indicatie" },
      { label: "Lever-belasting", value: "Geen (injectable, niet c17-α)" },
      { label: "Geschikt voor", value: "Elke cycle als basis, niet voor PCT" },
    ],
    sections: [
      {
        heading: "Wat is testosteron en hoe werkt het",
        body: "Testosteron is het primaire mannelijke geslachtshormoon dat bindt aan de androgeen-receptor in spier-, bot- en hersenweefsel. Het pusht eiwitsynthese, stikstofretentie en de aanmaak van rode bloedcellen — vandaar dat je harder traint en sneller herstelt. Een deel wordt via aromatase omgezet in oestradiol (vandaar potentiële gyno en vochtretentie) en een deel via 5α-reductase in DHT (acne, eventueel haaruitval bij genetische gevoeligheid). Exogeen testosteron schakelt je natuurlijke LH/FSH-as uit binnen 1-2 weken — dat is de reden dat een PCT na de kuur noodzakelijk is.",
      },
      {
        heading: "Doseringen en cycle-protocol",
        body: "Beginners draaien 12-16 weken Test E op 400-500 mg/week, gesplitst in 2 prikken (maandag/donderdag) om bloedwaarden stabiel te houden. Intermediates schuiven richting 500-750 mg/week en stacken vaak met een 19-nor of DHT-derivaat. Een TRT-cruise tussen blasts ligt op 150-200 mg/week. Sustanon 250 prik je idealiter ook 2x per week ondanks de marketing van 'eens per week' — anders krijg je bloedwaarde-pieken. Eerste bloedwerk op week 6: totaal test, vrij test, E2 (sensitive assay), hematocriet, LDL/HDL.",
      },
      {
        heading: "Risico's en bijwerkingen",
        body: "Verwacht acne op rug en schouders, lichte vochtretentie en gestegen libido in de eerste weken. Wat je serieus moet monitoren via <a href=\"/risicos-en-bijwerkingen\">bloedwerk</a>: hematocriet boven 54 betekent bloeddonatie (verhoogd trombose-risico), E2 boven ~45 pg/mL in combinatie met gevoelige tepels betekent <a href=\"/arimidex\">AI</a> bijsturen, LDL kan 20-30% stijgen. Bloeddruk vaak +5/10 mmHg. Na de kuur kan herstel 3-6 maanden duren, en bij hoge dosis/lange kuren is volledig herstel niet gegarandeerd.",
      },
      {
        heading: "Onderzoek en bronnen",
        body: "De klassieke Bhasin-studie liet zien dat 600 mg test enanthate per week zonder training al meer spiermassa opbouwt dan natural training (Bhasin et al., NEJM 1996). Voor langetermijn-cardiovasculaire data zie Basaria et al., 2010 over TRT-risico's bij oudere mannen. HPTA-suppressie en hersteltijden zijn uitgebreid beschreven in de WHO multi-center hormonal-contraception trials (Liu et al. 2003 + opvolg-studies). Echte test van je gear: stuur altijd een sample naar <a href=\"/lab\">JanoshikAnalytical</a> of Simec.cz — vraag elke source naar het COA per batchcode.",
      },
      {
        heading: "Wanneer wel/niet kiezen",
        body: "Wel kiezen als: het je eerste of tweede kuur is, je een stabiele basis wil voor een stack met <a href=\"/nandrolon\">deca</a>/<a href=\"/boldenone\">boldenone</a>/<a href=\"/trenbolone\">tren</a>, of je tussen blasts cruiset. Niet kiezen als: je een doping-gecontroleerde sport doet (detectie tot 3 maanden), je hematocriet al hoog van nature is, of je een familie-geschiedenis hebt van prostaatkanker. Tieners blijven van testosteron af — je groeischijven sluiten vroegtijdig.",
      },
    ],
    faqs: [
      {
        question: "Hoe lang werkt testosteron-enanthate in je lichaam?",
        answer:
          "Test E heeft een halfwaardetijd van ongeveer 8 dagen — dat betekent dat na 8 dagen nog de helft van je laatste prik in je systeem zit, na 16 dagen een kwart, etcetera. Praktisch ben je na 5 halfwaardetijden (zo'n 6 weken) klinisch op nul, maar bloedwerk kan tot 3 maanden later nog suppressie laten zien op LH/FSH. Voor PCT-timing betekent dit: wacht 14 dagen na je laatste Test E-prik voordat je Nolva/Clomid begint, anders vecht je tegen je eigen actieve test. Bij Test C is het vrijwel identiek (halfwaardetijd 8 dagen). Sustanon 250 heeft door de decanoate-ester een effectieve werkingstijd van 18-21 dagen — wacht dan minimaal 3 weken voor PCT-start.",
      },
      {
        question: "Kan ik testosteron stacken met nandrolon op mijn eerste kuur?",
        answer:
          "Technisch wel, praktisch niet aan te raden. De eerste kuur is om je response op één compound te leren kennen — krijg je acne, hoe reageert je libido, hoe sluit je af. Stack je direct met deca, dan weet je niet welke stof welke bijwerking veroorzaakt, en deca-suppressie van libido kan brutaal zijn ('deca dick') als je test-dosering niet hoog genoeg meeschaalt. Standaard advies: kuur 1 = test only, 500 mg/week, 14 weken. Kuur 2 of 3 mag je een 19-nor toevoegen, en houd dan deca op 300 mg en test minimaal op 500 mg. Voeg ook cabergoline 0.25 mg 2x/week toe tegen prolactine.",
      },
      {
        question: "Welke bloedwaardes moet ik checken bij een testosteron-kuur?",
        answer:
          "Baseline (vóór de kuur): totaal en vrij testosteron, LH, FSH, oestradiol (sensitive assay, niet de standaard), SHBG, hematocriet, hemoglobine, lipidenprofiel (LDL/HDL/triglyceriden), ALAT/ASAT, creatinine, prolactine, PSA als je boven de 40 bent. Mid-cycle op week 6: totaal test, E2 sensitive, hematocriet, lipiden. Bij hematocriet boven 54 onmiddellijk doneren of dosis verlagen. Na PCT op week 4-6: totaal test, LH, FSH om te checken of je as is hersteld. Lab-tip: Bloedwaardentest.nl of Huisartslab werken zonder verwijzing en sensitive E2 is daar standaard.",
      },
      {
        question: "Is testosteron geschikt voor een eerste kuur?",
        answer:
          "Ja, testosteron alleen is de gouden standaard voor een eerste kuur. Geen orals erbij (geen dbol kickstart), geen 19-nors, geen DHT-derivaten. Simpel protocol: 500 mg Test E per week, gesplitst maandag/donderdag, 14 weken. Adex 0.25 mg E3D op standby (alleen starten bij E2 boven 45 of duidelijke gyno-signalen). PCT: Nolva 40/40/20/20 en Clomid 50/50/25/25, starten 14 dagen na laatste prik. Dit geeft je een eerlijk beeld van je response, kennis over injectie-techniek en bloedwerk-routine. Verwacht in 14 weken 6-10 kg lean mass bij een caloriesurplus en serieus training-volume.",
      },
      {
        question: "Wat is het verschil tussen Test E, Test C en Sustanon?",
        answer:
          "Test Enanthate en Test Cypionate zijn vrijwel identiek — één extra koolstofatoom in de ester, halfwaardetijd 8 dagen, prik 2x/week. Cypionate is iets dikker in olie, kan wat meer pip (post-injection pain) geven. Beide interchangeable. Sustanon is een blend van 4 esters (propionate 30 mg, phenylpropionate 60 mg, isocaproate 60 mg, decanoate 100 mg per 250 mg). De propionate geeft snel een piek, decanoate houdt de tail lang. In de praktijk moet je Sustanon E3D prikken om bloedwaarden stabiel te houden — anders rijd je op een rollercoaster. Voordeel Sust: snellere onset (voel het in week 1 vs week 3 bij Enanthate). Nadeel: lastiger PCT-timing door die lange decanoate tail.",
      },
      {
        question: "Hoeveel spiermassa kun je realistisch opbouwen op testosteron?",
        answer:
          "Op 500 mg/week, 14 weken, met serieuze training en 300-500 kcal surplus: 6-10 kg gewichtstoename, waarvan 4-7 kg lean mass en de rest vocht/glycogeen. Na PCT en water-loss houd je realistisch 3-5 kg blijvende spier — mits je training en voeding op orde blijft. Tweede en derde kuur leveren minder op (3-4 kg blijvend) omdat je je natural ceiling al hebt overschreden. Beginners die roepen '15 kg in 12 weken' meten gewicht inclusief vet, vocht en darminhoud. Realistische verwachting: na 3 kuren ben je ongeveer 8-12 kg boven je natural max, en daarna heb je serieuze stacks of langere blasts nodig voor verdere progressie.",
      },
    ],
    related: ["nandrolon", "boldenone", "trenbolone", "anavar"],
    knowledge: ["testosteron-kuur-opbouwen", "bloedwerk-voor-tijdens-na", "pct-protocol-uitleg"],
  },
  {
    slug: "nandrolon",
    group: "anabolen",
    name: "Nandrolon",
    aka: ["Deca-Durabolin", "NPP"],
    tagline: "Mild profiel met goede gewrichtsondersteuning",
    heroImage: "https://rexqfwibxawqnvrzbdoo.supabase.co/storage/v1/object/public/blog-images/stof/nandrolon-hero.jpg",
    heroImageAlt: "Donkere foto van nandrolon-ampules op een lab-tafel voor de stof-pagina nandrolon (deca)",
    resultImage: "https://rexqfwibxawqnvrzbdoo.supabase.co/storage/v1/object/public/blog-images/stof/nandrolon-resultaat.webp",
    resultImageAlt: "Nandrolon deca kuur resultaat — thick bodybuilder toont typische deca full-look met brede rug en volle borstspieren",
    intro:
      "Nandrolon (Deca/NPP) is de klassieke 'gewrichtsvriend' onder de anabolen — langzaam, mild en geliefd voor bulks waarin je full body squat zonder krakende knieën.",
    longIntro:
      "Gasten kiezen Deca of NPP als ze stevig willen bulken zonder de cardiovasculaire druk van tren of de oestrogeen-piek van pure test. Het geeft langzame, kwalitatieve gains en doet wonderen voor pump en gewrichtscomfort. De grote catch: prolactine kan klimmen, en 'deca dick' is een echt fenomeen als je test-basis te laag staat of je geen cabergoline op de plank hebt.",
    keyFacts: [
      { label: "Type", value: "19-nor anabool — injectable" },
      { label: "Halfwaardetijd", value: "Decanoate 15 dgn · NPP (fenylpropionate) 3-4 dgn" },
      { label: "Typische dosering", value: "Deca 300-500 mg/wk · NPP 75-150 mg E2D" },
      { label: "Aromatisatie", value: "Laag (~20% van test) maar wel progestageen" },
      { label: "Lever-belasting", value: "Geen (injectable)" },
      { label: "Detectietijd", value: "Tot 18 maanden — niet voor getest atleten" },
    ],
    sections: [
      {
        heading: "Wat is nandrolon en hoe werkt het",
        body: "Nandrolon is testosteron met één koolstofatoom minder (vandaar '19-nor'). Het bindt sterk aan de androgeen-receptor maar wordt door 5α-reductase omgezet in DHN in plaats van DHT — daardoor mild voor je haarlijn en huid. Wat het uniek maakt: hoge collageensynthese (vandaar het 'wet joints'-gevoel), boost van erythropoëse, en sterke effecten op IGF-1. Keerzijde: het bindt aan de progesteron-receptor en kan prolactine pushen, wat gyno en libido-uitval kan triggeren. Daarom hoort cabergoline 0.25 mg 2x/week standaard bij elke deca-stack.",
      },
      {
        heading: "Doseringen en cycle-protocol",
        body: "Beginnersprotocol: <a href=\"/testosteron\">Test E</a> 500 mg/wk + Deca 300 mg/wk, 14 weken. Cabergoline 0.25 mg op maandag en donderdag vanaf week 1. <a href=\"/arimidex\">Adex</a> 0.25 mg E3D op basis van bloedwerk. Intermediate: Test 600 + Deca 500, 16 weken. NPP gebruik je als je sneller wil reageren — 100 mg E2D voor 10-12 weken, bloedspiegels reageren binnen een week. Belangrijk: deca-dose < test-dose, anders boem libido. PCT pas 3 weken na laatste Deca-prik door die lange decanoate-ester. Bij NPP wacht je 10 dagen.",
      },
      {
        heading: "Risico's en bijwerkingen",
        body: "Prolactine stijging is het beruchtste — controleer week 6 en houd het onder 20 ng/mL. Deca dick (libido op nul) komt door progestagene werking + te lage test-dosis. Bloeddruk stijgt door vochtretentie en verhoogde hematocriet. Mentaal kun je een 'flat' gevoel krijgen — dromen worden levendig of nachtmerries. Langere kuren (>16 weken) en hogere doses (>600 mg) maken HPTA-herstel een hel. Sommige gasten zitten 6-9 maanden post-cycle in lage test, en in extreme gevallen heb je een restart-protocol nodig.",
      },
      {
        heading: "Onderzoek en bronnen",
        body: "Voor het klassieke profiel van nandrolon-suppressie en hersteltijden, zie Bonetti et al., 2008 over post-cycle HPTA-suppressie en de hersteltijden bij nandrolone-decanoate. Voor de progestagene werking en prolactine-link: Hartgens & Kuipers, Sports Med 2004 — review van bijwerkingen anabolen. Klinisch gebruik bij osteoporose en cachexie is onderzocht in Frisoli et al.. Test je gear via <a href=\"/lab\">JanoshikAnalytical</a> — vraag bij elke source naar batchcode + COA, deca wordt regelmatig underdosed of vermengd met goedkopere test.",
      },
      {
        heading: "Wanneer wel/niet kiezen",
        body: "Wel kiezen als: je wil bulken met focus op kwalitatieve mass, je gewrichten zeuren bij zware compounds, je geen <a href=\"/trenbolone\">tren</a>-paranoia wil. Niet kiezen als: het je eerste kuur is (te complex met progestagene management), je een doping-getest atleet bent (18 maanden detectie), je een korte 8-weekse cut wil draaien (te lange ester, te traag), of je gevoelig bent voor depressie en stemmingsklachten.",
      },
    ],
    faqs: [
      {
        question: "Hoe lang werkt deca-durabolin in je lichaam?",
        answer:
          "Deca decanoate heeft een halfwaardetijd van 15 dagen — de langste van alle gangbare esters. Praktisch betekent dit: het duurt 4-6 weken voor je een stabiele bloedspiegel hebt na de eerste prik, en na je laatste prik duurt het nog 3-4 weken voor je serieus dalt. Voor PCT-timing moet je minimaal 18-21 dagen wachten na de laatste shot, en sommige gasten doen 28 dagen om er zeker van te zijn dat alle actieve nandrolone weg is. WADA detecteert metabolieten tot 18 maanden later in urine — als je in een gecontroleerde sport zit is deca een no-go. NPP heeft een halfwaardetijd van 3-4 dagen en is binnen 10 dagen klinisch weg.",
      },
      {
        question: "Kan ik nandrolon stacken met trenbolone?",
        answer:
          "Technisch wel, maar het is een progestagene nachtmerrie. Beide binden aan de progesteron-receptor, beide kunnen prolactine pushen. Doe je het toch, dan: cabergoline 0.5 mg E3D verplicht, prolactine-bloedwerk elke 4 weken, en houd dosis laag — bijvoorbeeld Test 400 + Tren 200 + Deca 200. Verstandiger is om te kiezen: tren voor cuts en hardness, deca voor bulks en joint relief. Wat veel gasten wel doen is een 'recomp' stack: Test 400, Tren E 200, Mast E 400 — droog en strak zonder de prolactine-stack. Eerste deca/tren combo? Skip het.",
      },
      {
        question: "Welke bloedwaardes monitoren bij een deca-kuur?",
        answer:
          "Bovenop de standaard test-bloedwaardes (totaal test, E2 sensitive, hematocriet, lipiden, ALAT/ASAT): prolactine vóór de kuur als baseline en op week 6 en week 12. Onder 20 ng/mL houden. IGF-1 stijgt vaak duidelijk — informatief, geen actiepunt. Hematocriet check je extra scherp want deca pusht erytropoëse hard — boven 54 doneren. Bloeddruk thuis 2x per week meten, deca geeft soms forse vochtretentie. Na PCT op week 6-8: totaal test, LH, FSH, prolactine. Bij prolactine hoog: cabergoline 0.5 mg 2x/week tot het zakt.",
      },
      {
        question: "Is nandrolon geschikt voor een eerste kuur?",
        answer:
          "Nee. Eerste kuur = test only. Deca voegt een tweede compound, prolactine-management, cabergoline, langere ester (= latere PCT), en het risico op deca-dick toe — terwijl je nog niet weet hoe je op standaard test reageert. Kuur 2 of 3 is een prima moment om Deca toe te voegen, en dan in conservatieve dosering (250-300 mg). Een veelvoorkomende beginnersfout: deca 500 + test 300, omdat ze denken 'meer deca = meer gains'. Resultaat: libido op nul binnen 4 weken. Regel: test-dosis ≥ deca-dosis, altijd.",
      },
      {
        question: "Wat is het verschil tussen Deca en NPP?",
        answer:
          "Zelfde werkzame stof (nandrolone), andere ester. Deca = decanoate, langzaam, 1x per week prikken volstaat (al doen veel mensen 2x voor stabiliteit). NPP = nandrolone phenylpropionate, snel, E2D prikken. Deca kies je voor lange bulks (14-20 weken) waar je de kinetiek stabiel wilt houden en je niet wakker ligt van prik-frequentie. NPP kies je als je sneller wilt bijsturen, korter wilt kuren (10-12 weken), of bijwerkingen sneller wilt kunnen opvangen — gaat het mis, dan ben je in 10 dagen klinisch weg in plaats van 4 weken. NPP geeft minder vochtretentie maar de gains zijn vergelijkbaar mg-per-mg.",
      },
      {
        question: "Helpt deca echt voor mijn gewrichten?",
        answer:
          "Ja, maar niet op de manier die je denkt. Het 'fixt' geen blessure of onderliggende ontsteking — het verhoogt synoviaal vocht en collageensynthese, waardoor gewrichten beter lubed aanvoelen tijdens zware liften. Ben je 35+ en zeurende ellebogen/knieen bij zware bench of squat, dan kan een lage dosis (200-250 mg/wk) je serieus verlossen. Maar zodra je PCT'd, zakt dat effect binnen 4-6 weken weg. Het is geen vervanger voor TRT-dose nandrolon (sommige artsen schrijven het off-label voor), fysio, of stoppen met die ene oefening die je gewrichten sloopt. Een echte gewrichtsblessure moet je niet maskeren met deca — dan stapel je structurele schade.",
      },
    ],
    related: ["testosteron", "boldenone", "primobolan", "trenbolone"],
    knowledge: ["deca-en-prolactine", "lange-vs-korte-esters"],
  },
  {
    slug: "trenbolone",
    group: "anabolen",
    name: "Trenbolone",
    aka: ["Tren A", "Tren E", "Parabolan"],
    tagline: "De heaviest hitter — niet voor je eerste rodeo",
    heroImage: "https://rexqfwibxawqnvrzbdoo.supabase.co/storage/v1/object/public/blog-images/stof/trenbolone-hero.jpg",
    heroImageAlt: "Donkere dramatische foto van een vial voor de stof-pagina trenbolone",
    resultImage: "https://rexqfwibxawqnvrzbdoo.supabase.co/storage/v1/object/public/blog-images/stof/trenbolone-resultaat.webp",
    resultImageAlt: "Trenbolone kuur resultaat — extreem shredded hardcore bodybuilder toont tren dry ripped fysiek met striations en vascular arms",
    intro:
      "Tren is de meest beruchte stof in de game: brutaal effectief voor recomp, droog en hard, maar met een bijwerkings-profiel waar geen enkele beginner doorheen wil komen.",
    longIntro:
      "Op 200 mg/week trenbolone zie je vaak meer recomp dan op 600 mg test. Het droogt je uit, knalt strepen op je delts en je kracht stijgt week na week. Maar je betaalt met slaap (nul), zweet ('s nachts douche), bloeddruk, mentale randjes en cardiovasculaire stress. Tren A (acetate) is de standaardkeuze voor wie eerst wil testen hoe hij reageert — gaat het mis, ben je in 4 dagen klinisch klaar.",
    keyFacts: [
      { label: "Type", value: "19-nor anabool, niet-aromatiseerbaar — injectable" },
      { label: "Halfwaardetijd", value: "Acetate 1-2 dgn · Enanthate 7 dgn · Hex (Parabolan) 14 dgn" },
      { label: "Typische dosering", value: "Beginner tren: 200-300 mg/wk · Intermediate: 300-500 mg/wk" },
      { label: "Aromatisatie", value: "Nee — wel sterk progestageen (cabergoline verplicht)" },
      { label: "Lever-belasting", value: "Geen direct (injectable), wel renale stress" },
      { label: "Detectietijd", value: "Tot 5 maanden" },
    ],
    sections: [
      {
        heading: "Wat is trenbolone en hoe werkt het",
        body: "Trenbolone is een 19-nor verbinding (afgeleid van <a href=\"/nandrolon\">nandrolon</a>) maar dan met dubbele binding op de 9 en 11 positie — dat maakt hem niet-aromatiseerbaar én geeft hem een androgene/anabole ratio van 500:500 vs test 100:100. Hij bindt 3x sterker aan de androgeen-receptor dan test, blokkeert glucocorticoïden (vandaar zijn anti-katabole reputatie), en pusht IGF-1 in spierweefsel. Vetverbranding gaat omhoog via beta-adrenerge stimulatie. Maar: bindt aan progesteron-receptor (gyno-risico via die route, niet via aromatisatie), pusht prolactine, en stresst nieren/cardiovasculair flink. Geen tren zonder <a href=\"/testosteron\">test</a>-basis — pure tren only is een snelle weg naar mentale ellende.",
      },
      {
        heading: "Doseringen en cycle-protocol",
        body: "Eerste tren-kuur (na minstens 3 test-only kuren): <a href=\"/testosteron\">Test E</a> 300-400 mg/wk + Tren A 50 mg E2D (175 mg/wk), 8-10 weken. Caber 0.25 mg 2x/wk vanaf week 1. Houd test-dosis lager dan tren-dosis voor maximaal droog effect, of gelijk voor meer comfort. Intermediate: Test 300 + Tren E 300-400 mg/wk, 12 weken. Geavanceerd: Test 200 + Tren 500 + <a href=\"/masteron\">Mast</a> 400 (klassieke recomp). PCT pas 10 dagen na laatste Tren A-prik, 21 dagen na Tren E. Nachtkussen wegleggen want je gaat zweten.",
      },
      {
        heading: "Risico's en bijwerkingen",
        body: "Wat je gaat voelen: nachtelijk zweten (klamzweet, lakens verschonen), slapeloosheid (val moeilijk in, kort REM), cardio gaat door het dak (5 min op de loopband voelt als 20), bloeddruk +15/10, donkere urine (metaboliet-kleur, normaal maar check nierfunctie), 'tren rage' (kortere lont — wees alert op je gedrag), depressie/somberheid bij gevoelige gasten. Cardiovasculair: LDL kan verdubbelen, HDL kan halveren. Gyno via progesteron — caber niet skippen. Coughs vlak na injectie (tren cough) komen voor: 30-90 seconden brandend hoesten, normaal als je niet aspireert.",
      },
      {
        heading: "Onderzoek en bronnen",
        body: "Trenbolone is paradoxaal weinig onderzocht in mensen (veterinair veel: Heitzman, 1976). Voor cardiovasculair risico in androgeen-gebruikers in het algemeen zie Baggish et al., Circulation 2017 over langetermijn-cardiotoxiciteit bij AAS-gebruikers. Voor mentale bijwerkingen: Pope et al., 2000 over stemmings- en agressie-veranderingen. Voor renale stress en tren: case reports zoals Almukhtar et al., 2015. <a href=\"/lab\">Lab-testen</a> verplicht — tren wordt vaak underdosed of geleverd als test-suspension met tren-kleurtje. JanoshikAnalytical voor HPLC.",
      },
      {
        heading: "Wanneer wel/niet kiezen",
        body: "Wel kiezen als: je minstens 3 succesvolle kuren achter de rug hebt, je vetpercentage onder 15% zit (anders zie je het effect amper), je een recomp of cut wil pushen, en je mentaal stabiel bent (geen historie van depressie/angst). Niet kiezen als: je eerste of tweede kuur is, je hartproblemen of hoge bloeddruk hebt, je nieren niet 100% zijn, je relatie of werk-druk al hoog is (tren rage is een ding), of je een fysiek-zware baan hebt waar slaap cruciaal is (je gaat niet slapen).",
      },
    ],
    faqs: [
      {
        question: "Hoe lang werkt trenbolone acetate in je lichaam?",
        answer:
          "Tren A heeft een halfwaardetijd van 1-2 dagen — de kortste van de tren-esters. Je prikt E2D of zelfs ED voor stabiele bloedwaarden. Praktisch gevolg: ga je naar PCT, dan ben je in 10 dagen na laatste prik klinisch klaar. Krijg je heftige bijwerkingen (mentale crash, bloeddruk-piek, nierwaardes oplopen), kun je staken en binnen een week voelt het serieus minder. Tren E (enanthate) zit op 7 dagen — daar wacht je 21 dagen voor PCT en stoppen is veel trager. Parabolan/Tren Hex zit op 14 dagen, te lang voor de meeste mensen. Vrijwel iedereen die voor het eerst tren draait, kiest Tren A juist om die snelle on/off-knop.",
      },
      {
        question: "Kan ik tren stacken met deca?",
        answer:
          "Kan wel, slimme zet meestal niet. Beide pushen progesteron en prolactine — je verdubbelt het risico op gyno via niet-aromatiseerbare route en deca-tren-dick is een dubbele klap. Doe je het toch: caber 0.5 mg E3D minimum, prolactine elke 4 weken meten, en houd doses laag (Test 400 + Tren 200 + Deca 200). De meeste gevorderden kiezen één van de twee: deca voor bulks en gewrichten, tren voor recomp/cuts en hardness. Een populaire alternatieve stack: Test + Tren + Mast (geen progestageen probleem, droog en strak). Eerste tren-cycle? Houd het simpel: alleen test + tren.",
      },
      {
        question: "Welke bloedwaardes moet ik checken op een tren-kuur?",
        answer:
          "Naast standaard test-bloedwerk: prolactine vóór en op week 4 (onder 20 ng/mL), creatinine en eGFR (nierfunctie — tren stresst nieren, donkere urine kan misleiden), lipiden-panel scherper want LDL kan verdubbelen, bloeddruk zelf thuis 3x/week, hematocriet (snel naar 54+). RBC, hemoglobine. ECG of cardio-check overwegen als je harder traint dan voorheen. Mentaal: houd een dagboek bij — slaap-uren, stemming, agressie. Bij rode vlaggen (slaap <5 uur structureel, mentale instabiliteit, BP >150/95): dosis halveren of staken. Tren is geen 'doorduwen' stof.",
      },
      {
        question: "Is tren geschikt voor een eerste kuur?",
        answer:
          "Absoluut niet. Tren als eerste kuur is een van de stomste fouten in deze game — je weet niet hoe je op test reageert, laat staan op een stof die 3x potenter is en mentale + cardiovasculaire stress geeft die zelfs ervaren gasten respecteren. Minimum-criterium voor je eerste tren-cycle: 3 succesvolle test-only kuren, gevorderd in bloedwerk-interpretatie, stabiele mentale gezondheid, bekend met cabergoline en AI-management, en bij voorkeur onder 15% bf. Eerste tren-cycle ook altijd Tren A (niet E), lage dosis (50 mg E2D), korte duur (8 weken), en stoppen bij rode vlaggen zonder ego.",
      },
      {
        question: "Wat doe ik tegen tren cough?",
        answer:
          "Tren cough is het 30-90 seconden hoesten direct na injectie, vaak met metaalsmaak in de mond en het gevoel dat je geprikkeld door je luchtwegen ademt. Oorzaak: stukje olie of metaboliet die de longvaten raakt na onbedoelde vasculaire passage. Het is onaangenaam maar niet gevaarlijk. Voorkomen: aspireer altijd vóór je injecteert (trek 2-3 seconden terug, geen bloed = veilig), prik langzaam (30+ seconden per ml), en gebruik dunnere naalden (25G voor delts/quads). Krijg je toch een cough: ga zitten, ademhaling rustig, na een minuut over. Sommige batches geven het vaker — ligt aan benzyl-benzoate-percentage in de olie.",
      },
      {
        question: "Heb ik een aromatase-remmer nodig op tren?",
        answer:
          "Tren zelf aromatiseert niet, dus geen E2 vanuit tren. Maar je test-basis aromatiseert wel — en hier ligt een valkuil: veel gasten droppen hun AI helemaal op tren omdat 'tren is droog'. Probleem: tren kan vetverlies en water-uittrekking maskeren, terwijl E2 stilletjes oploopt en je gyno krijgt via een progesteron + verhoogd E2 combo. Bloedwerk altijd, AI op indicatie: bij E2 boven 45 pg/mL of fysieke symptomen (gevoelige tepels, vasthouden van vocht in gezicht) Arimidex 0.25 mg E3D starten. Onderschat ook prolactine niet: caber 0.25 mg 2x/wk is op tren standaard, niet optioneel.",
      },
    ],
    related: ["testosteron", "masteron", "anavar", "winstrol"],
    knowledge: ["trenbolone-veilig-onderzoeken", "bloedwerk-voor-tijdens-na"],
  },
  {
    slug: "boldenone",
    group: "anabolen",
    name: "Boldenone",
    aka: ["Equipoise", "EQ"],
    tagline: "De endurance-monster met traag opbouwende pump",
    heroImage: "https://rexqfwibxawqnvrzbdoo.supabase.co/storage/v1/object/public/blog-images/stof/boldenone-hero.jpg",
    heroImageAlt: "Donkere moody foto van vials voor de stof-pagina boldenone (equipoise)",
    resultImage: "https://rexqfwibxawqnvrzbdoo.supabase.co/storage/v1/object/public/blog-images/stof/boldenone-resultaat.webp",
    resultImageAlt: "Boldenone equipoise kuur resultaat — lean vascular bodybuilder toont boldenone gains met brede rug en zichtbare aderen",
    intro:
      "EQ is de langzame-brander van de bulkstoffen: trage opbouw, ongekende pumps en een eetlust waar je vrouw 's avonds bang van wordt.",
    longIntro:
      "Boldenone is de keuze voor wie 16-20 weken wil draaien zonder de cardiovasculaire klap van tren of de progestagene gedoetjes van deca. Het pusht erytropoëse hard, dus je cardio voelt episch en pumps in de gym zijn obsceen. De catch: hematocriet gaat door het dak — frequent bloeddonatie staat in je agenda. En het werkt traag: de eerste echte gains zien je pas in week 5 of 6.",
    keyFacts: [
      { label: "Type", value: "Testosteron-derivaat (1-test) — injectable" },
      { label: "Halfwaardetijd", value: "Undecylenate ~14 dgn" },
      { label: "Typische dosering", value: "Effectief vanaf 400 mg/wk · Sweet spot 500-700 mg/wk" },
      { label: "Aromatisatie", value: "Laag (~50% van testosteron)" },
      { label: "Lever-belasting", value: "Geen (injectable)" },
      { label: "Detectietijd", value: "Tot 5 maanden" },
    ],
    sections: [
      {
        heading: "Wat is boldenone en hoe werkt het",
        body: "Boldenone is <a href=\"/testosteron\">testosteron</a> met een extra dubbele binding op carbon 1 — chemisch bijna identiek aan <a href=\"/dianabol\">dianabol</a> minus de c17-methylatie (vandaar injectable in plaats van oral). Het bindt redelijk aan de androgeen-receptor maar het echte unieke effect zit in extreme erytropoëse: rode bloedcellen schieten omhoog, hematocriet stijgt snel, en je cardio-output wordt absurd. Pumps tijdens training kunnen pijnlijk zijn (denk: rugpump tijdens deadlifts waardoor je moet stoppen). Het aromatiseert mild, ongeveer de helft van test. Verhoogt eetlust significant via ghrelin-modulatie — handig voor bulk, lastig als je een cut probeert.",
      },
      {
        heading: "Doseringen en cycle-protocol",
        body: "Beginner EQ-cycle (na ten minste 2 test-only kuren): <a href=\"/testosteron\">Test E</a> 400 mg/wk + EQ 500 mg/wk, 16 weken minimum want EQ kickt traag in. Sommigen voegen <a href=\"/dianabol\">Dbol</a> 30 mg/dag toe voor weken 1-4 als kickstart, dan zit je niet zes weken op je gevoel te wachten. Intermediate: Test 500 + EQ 600-700 mg/wk, 18-20 weken. <a href=\"/arimidex\">Adex</a> op basis van bloedwerk (lage aromatisatie maar dosering is hoog). Hematocriet vóór de kuur meten — boven 50 al, dan plan een donatie in voor week 8. Voor 18-weekse kuren is bloedwerk op weken 6, 12 en 18 het minimum.",
      },
      {
        heading: "Risico's en bijwerkingen",
        body: "Hematocriet — dit is de big one. EQ kan binnen 10 weken je hematocriet 5-8 punten omhoog tikken. Boven 54 ben je in trombose-risico territorium en moet je bloed doneren of dosis halveren. Klachten van hoge hematocriet: hoofdpijn, duizeligheid bij staan, rode/paarse gelaatskleur, hoge bloeddruk. Andere bijwerkingen: extreem verhoogde eetlust (kan handig zijn, kan saboteren), milde acne, langzame angst-stijging bij sommige gevoelige gasten ('EQ-angst', deels door hematocriet-druk). PCT-timing: 21 dagen na laatste prik door die lange undecylenate-ester.",
      },
      {
        heading: "Onderzoek en bronnen",
        body: "Veterinaire literatuur over boldenone is uitgebreider dan humane — zie Soma et al., 1985 voor paardenmodel onderzoek naar erytropoëse-effect. Voor erytropoëse-mechanisme bij anabole steroïden in het algemeen: Vivian-Smith, 2011. Voor de relatie tussen hematocriet en cardiovasculair event-risico (relevant want EQ pusht juist hematocriet hard): Coviello et al., 2008. EQ wordt vaak underdosed door bulk-bereiding — vraag altijd HPLC per batch via Janoshik of Simec.",
      },
      {
        heading: "Wanneer wel/niet kiezen",
        body: "Wel kiezen als: je een lange bulk wil draaien (16+ weken), je cardio wil verbeteren naast krachttraining, je een mild profiel zoekt (geen tren-stress, geen deca-progestageen), en je bereid bent om bloed te doneren. Niet kiezen als: je een korte 8-10 weekse kuur wil (EQ kickt te traag), je hematocriet baseline al >50 is, je angst-gevoelig bent, je geen training-volume hebt om de eetlust-stijging te benutten (anders wordt het vet, geen spier).",
      },
    ],
    faqs: [
      {
        question: "Hoe lang werkt boldenone (EQ) in je lichaam?",
        answer:
          "Boldenone undecylenate heeft een halfwaardetijd van 14 dagen — vergelijkbaar met deca-decanoate. Dit betekent dat het 5-6 weken duurt voor je een stabiele bloedspiegel hebt na de eerste prik, en bij PCT moet je minimaal 21 dagen wachten na de laatste shot om je SERMs te starten. Voor doping-controle: WADA-labs vinden metabolieten tot 5 maanden later in urine. Praktisch betekent de lange halfwaardetijd dat EQ alleen interessant is voor lange kuren (16+ weken) — korter en je krijgt nauwelijks de voordelen voordat de cycle al voorbij is. 1x per week prikken volstaat, al doen veel mensen 2x voor wat stabielere kinetiek.",
      },
      {
        question: "Kan ik EQ stacken met testosteron en deca?",
        answer:
          "Ja, dit is een klassieke 'Old School Bulk' stack: Test 500 + Deca 400 + EQ 500, 16-18 weken. Het werkt goed maar je stapelt risico's: hematocriet van zowel deca als EQ samen, suppressie compleet, en bloedwerk is verplicht elke 6 weken. Bloeddonatie elke 8-10 weken niet vergeten. Cabergoline 0.5 mg E3D voor het deca-prolactine-component. PCT pas 3 weken na laatste prik (zowel deca als EQ hebben lange esters). Deze stack is voor gevorderden — kuur 4 of later, niet je tweede. Een wat slimmere variant: Test + EQ + lage dosis Tren A voor recomp (vermijdt de prolactine-stack).",
      },
      {
        question: "Hoe vaak moet ik hematocriet meten op EQ?",
        answer:
          "Baseline vóór de kuur — als je al boven 48 zit, overweeg een andere stof of plan donatie vooraf. Op week 6: eerste check, vaak al +3-5 punten. Op week 10: tweede check, hier passeren veel mensen de 52-54 grens. Boven 54 hematocriet: doneer bloed (450 ml halve liter brengt je 3-4 punten omlaag) of halveer EQ-dosis. Boven 56: stop EQ tot waarden zakken. Symptomen van te hoge hematocriet: hoofdpijn die niet weggaat, duizelig bij opstaan, oren ruisen, gezicht/handen flush rood. Lange-termijn risico: trombose, vooral bij dehydratie of langdurig stilzitten (vliegreis). Drink 3+ liter water per dag op EQ.",
      },
      {
        question: "Is boldenone geschikt voor een eerste kuur?",
        answer:
          "Mwah — kan, maar Test E is een betere keuze. EQ heeft als nadeel dat het traag werkt (je voelt week 1-4 niets) en dat 1e-kuur gasten dan vaak in paniek de dosis verhogen of dingen toevoegen. Bovendien is de hematocriet-stijging serieuzer dan bij test alleen, en als beginner heb je geen routine in bloedwerk-interpretatie. Het advies: kuur 1 = Test E alleen, kuur 2 = Test + Deca of Test + EQ als je een langere bulk wil. Doe je het toch als eerste: 500 mg Test + 400 mg EQ, 16 weken, donor-pas regelen. Verwachting bijstellen — eerste gains pas week 5-6.",
      },
      {
        question: "Welke bloedwaardes monitoren bij een EQ-kuur?",
        answer:
          "Hematocriet en hemoglobine zijn de big ones — frequenter meten dan op test alleen, dus week 6, 10, 14. Verder standaard: totaal test, E2 sensitive, lipiden (HDL daalt op EQ ook), ALAT/ASAT, creatinine, bloeddruk thuis 2x/week. Hartslag in rust ook bijhouden — boven 80 in rust kan teken zijn van te hoge hematocriet of cardiovasculaire stress. Tijdens cardio-sessies: hoe hoger je hematocriet, hoe meer je rust-hartslag dalt en je VO2 piekwaarde stijgt. Dit voelt geweldig maar is fysiologisch een gevarenzone. Niet trainen onder een paddo van pre-workout — EQ + stim + hoge hematocriet = bloeddruk-piek.",
      },
      {
        question: "Werkt EQ alleen of moet ik test erbij?",
        answer:
          "Test erbij, altijd. Net als elk anabolicum onderdrukt EQ je natuurlijke productie binnen 2-3 weken — een EQ-only kuur betekent dat je libido en mentale energie crashen terwijl je toch suppressed bent. Test-dosis minimaal gelijk aan EQ, vaak hoger. Klassieker: Test 500 + EQ 600, 16 weken. EQ aromatiseert mild (50% van test), dus AI op indicatie. Voor wie minder druk wil zetten op de cardiovasculaire kant: Test 300 + EQ 600 werkt ook, met dosering EQ als hoofd-driver. Solo EQ heeft geen zinnige use case behalve in bridge-protocollen voor zeer ervaren gasten — beginners en intermediates: gewoon test erbij.",
      },
    ],
    related: ["testosteron", "nandrolon", "masteron", "primobolan"],
    knowledge: ["hematocriet-en-bloeddonatie"],
  },
  {
    slug: "masteron",
    group: "anabolen",
    name: "Masteron",
    aka: ["Drostanolone", "Mast P", "Mast E"],
    tagline: "Droog, hard en strak — de cosmetische kers op je cut",
    heroImage: "https://rexqfwibxawqnvrzbdoo.supabase.co/storage/v1/object/public/blog-images/stof/masteron-hero.jpg",
    heroImageAlt: "Macro close-up foto van een vial voor de stof-pagina masteron",
    resultImage: "https://rexqfwibxawqnvrzbdoo.supabase.co/storage/v1/object/public/blog-images/stof/masteron-resultaat.webp",
    resultImageAlt: "Masteron kuur resultaat — droog hard gedefinieerde bodybuilder toont masteron cut look zonder waterretentie, competition ready",
    intro:
      "Masteron is de stof die je toevoegt als je al lean bent en die laatste graad van hardheid en visuele 3D-look wil. Op een vetpercentage van 20% zie je er niks van — onder de 12% steelt het de show.",
    longIntro:
      "Drostanolone wordt door bodybuilders en physique-atleten ingezet de laatste 8-12 weken vóór een show of een vakantie. Het bindt aan SHBG (verhoogt vrij test), aromatiseert niet, en geeft een esthetisch effect dat fotografisch goed te zien is. Daarnaast heeft het milde anti-oestrogene werking. Zinloos in een bulkfase, maar in een cut of recomp pakketje een serieuze toevoeging.",
    keyFacts: [
      { label: "Type", value: "DHT-derivaat — injectable" },
      { label: "Halfwaardetijd", value: "Propionate 2-3 dgn · Enanthate 10 dgn" },
      { label: "Typische dosering", value: "400-600 mg/wk · Pre-contest tot 800 mg" },
      { label: "Aromatisatie", value: "Geen — mild anti-oestrogeen via SHBG" },
      { label: "Lever-belasting", value: "Geen (injectable)" },
      { label: "Detectietijd", value: "3 weken (Mast P) tot 3 maanden (Mast E)" },
    ],
    sections: [
      {
        heading: "Wat is masteron en hoe werkt het",
        body: "Masteron (drostanolone) is een afgeleide van DHT — toegevoegd is een 2-methyl-groep die het beschermt tegen 3-alpha-HSD-afbraak in spierweefsel. Het bindt aan SHBG, waardoor minder van je test gebonden wordt en meer vrij <a href=\"/testosteron\">testosteron</a> circuleert. Daarnaast werkt het als zwakke aromatase-binder zonder receptor-activatie — vandaar mild anti-oestrogeen effect. Geen aromatisatie betekent geen vochtretentie, geen E2-bloat. Het geeft een 'gripperig' droog gevoel in spieren en visuele hardheid die op foto's pops. Geen massa-builder — een esthetische polish-stof.",
      },
      {
        heading: "Doseringen en cycle-protocol",
        body: "Klassiek cut-stack: <a href=\"/testosteron\">Test E</a> 300 mg + Mast E 400-500 mg, 12 weken. Voor recomp: Test 300 + <a href=\"/trenbolone\">Tren E</a> 200 + Mast E 400, 10-12 weken (de zogenaamde 'TRT-Tren-Mast'). Pre-contest gasten gaan tot 600-800 mg Mast E in de laatste 6 weken. Mast P (propionate) wordt vaak in de laatste 4 weken vóór een show toegevoegd voor extra polish, 100 mg E2D — sneller in/uit. Beginnerstip: voor je eerste cut probeer Test + Mast eerst voordat je Tren toevoegt. Veel gasten ontdekken dat Mast alleen al voor flink wat hardness zorgt zonder de tren-bijwerkingen.",
      },
      {
        heading: "Risico's en bijwerkingen",
        body: "Mild profiel maar wel echt androgeen — bij genetische gevoeligheid kan het haaruitval versnellen (zichtbaar binnen 6-8 weken bij wie aanleg heeft). Acne kan ook opspelen, vooral op rug en schouders. Cardiovasculair: LDL stijgt 15-25%, HDL daalt 30-40% bij hogere doses — vergelijkbaar met andere DHT-derivaten. Prostaat-volume kan licht stijgen (PSA-check als je 40+ bent). Stemming meestal stabiel, libido vaak verhoogd door SHBG-binding. Geen lever-issues (injectable), geen oestrogene rommel. PCT-timing: 3 weken na Mast E, 10 dagen na Mast P.",
      },
      {
        heading: "Onderzoek en bronnen",
        body: "Drostanolone werd oorspronkelijk onderzocht als adjuvante behandeling bij gemetastaseerd borstcarcinoom (DeRivas, 1972) — vandaar de anti-oestrogene reputatie. Voor SHBG-binding en vrij testosteron-effect, zie Saartok et al., 1984 over receptor-binding profielen van DHT-derivaten. Voor cardiovasculair profiel van DHT-derivaten in het algemeen: Hartgens et al., 2004 (lipiden-impact). Masteron is een stof die regelmatig wordt vervalst — meestal als simpel test prop in dezelfde kleur olie. HPLC-test via JanoshikAnalytical of Simec.",
      },
      {
        heading: "Wanneer wel/niet kiezen",
        body: "Wel kiezen als: je vetpercentage onder 15% zit (en idealiter onder 12%), je een esthetisch doel hebt (foto's, podium, vakantie), je bestaande cut-stack wil aanvullen, je geen tren wil draaien maar wel die strakke look zoekt. Niet kiezen als: je in bulkmodus zit (geld weggegooid, je ziet er niets van), je dik bent (verzacht hardness onder vetlaag), je vroege haaruitval-aanleg hebt, of het je eerste kuur is (overkill, je hebt eerst test-basis nodig).",
      },
    ],
    faqs: [
      {
        question: "Hoe lang werkt masteron in je lichaam?",
        answer:
          "Mast Propionate halfwaardetijd 2-3 dagen, Mast Enanthate halfwaardetijd ~10 dagen. Mast P prik je E2D of dagelijks, vooral handig in de laatste weken vóór een show wanneer je snel wilt kunnen bijsturen. Mast E twee keer per week (maandag/donderdag). Voor PCT-timing: na laatste Mast P 10 dagen wachten, na Mast E 21 dagen. Detectietijd in dopingtesten: Mast P 3 weken, Mast E tot 3 maanden. Praktisch betekent dit dat Mast P de keuze is voor sporters in semi-getest milieu (recreational meets met onregelmatige controles) en Mast E voor wie geen controle-risico heeft en minder vaak wil prikken.",
      },
      {
        question: "Kan ik masteron stacken met trenbolone?",
        answer:
          "Ja, dit is een van de meest populaire cut/recomp stacks: Test 250-300 + Tren E 200-300 + Mast E 400-500, 10-12 weken. Mast helpt om de tren-sides wat te verzachten qua oestrogenen (mild AI-effect) en versterkt het droge, strakke gevoel. Caber 0.5 mg E3D voor tren-prolactine. Adex op basis van bloedwerk — vaak heb je minder of geen nodig omdat Mast al wat E2 dempt. Voor pre-contest gasten: gooi er ook nog 50 mg Winstrol bij in de laatste 4 weken voor extreme hardness. Dit is geavanceerd materiaal — minimum 3 succesvolle kuren ervaring, scherp bloedwerk, en discipline op voeding.",
      },
      {
        question: "Welke bloedwaardes monitoren op masteron?",
        answer:
          "Standaard: totaal test, vrij test (interessant want Mast pusht vrij test omhoog via SHBG-binding — vrij kan verdubbelen), E2 sensitive, hematocriet, LDL/HDL/triglyceriden, ALAT/ASAT, creatinine. Bij langere kuren of hogere doses (>500 mg/wk) ook prostaat: PSA-waarde, vooral als je 35+ bent. Lipiden zijn de belangrijkste — DHT-derivaten zoals Mast (en zeker in combinatie met Winstrol of Tren) kunnen HDL halveren. Bij ernstig verstoord lipiden-profiel: dosis verlagen of supplementen toevoegen (omega-3 EPA/DHA 4g/dag, niacine, cardio). Bloeddruk thuis 2x/week. Stop bij rode vlaggen in plaats van door te duwen voor een show.",
      },
      {
        question: "Is masteron geschikt voor een eerste kuur?",
        answer:
          "Nee, en het is sowieso geen logische eerste-kuur keuze. Mast is een cosmetische stof — voegt visuele hardness toe als je al lean bent. Eerste kuur ben je bezig om base-mass op te bouwen en je response op test te leren. Mast erbij maakt geen verschil als je nog 18% bf hebt, en het verspilt je geld. Standaard eerste-kuur advies: Test E only, 500 mg, 14 weken. Wil je in je tweede of derde kuur een cut of recomp doen: Test + Mast E is een uitstekende intermediate stack, mild qua bijwerkingen en geeft die strakke look waar veel gasten voor terugkomen.",
      },
      {
        question: "Werkt masteron echt als aromatase-remmer?",
        answer:
          "Gedeeltelijk. Drostanolone bindt aan de aromatase-enzyme zonder het te activeren, vergelijkbaar met hoe Aromasin (exemestane) werkt maar veel zwakker. Bij doses van 400-600 mg/wk Mast E zien sommige gasten dat ze hun standaard adex-dose kunnen halveren of zelfs droppen — afhankelijk van hun test-dose. Maar reken er niet op als enige E2-management: bij Test boven 500 mg/wk heb je vrijwel altijd nog een echte AI nodig (Arimidex 0.25 mg E3D). Bloedwerk is de enige manier om dit objectief te bepalen — bij E2 sensitive boven 45 pg/mL of fysieke symptomen wel AI bijschakelen ondanks de Mast.",
      },
      {
        question: "Mast P of Mast E — wat moet ik kiezen?",
        answer:
          "Mast E voor 90% van de gevallen: 2x per week prikken, stabielere bloedwaarden, makkelijker te plannen. Mast P alleen als je snel wilt kunnen bijsturen (laatste 4 weken vóór show) of als je acuut bijwerkingen wilt kunnen stoppen — Mast P is na 10 dagen klinisch weg, Mast E pas na 3-4 weken. Veel pre-contest atleten gebruiken Mast E weken 1-8 en switchen naar Mast P weken 9-12 voor de fine-tune. Mast P geeft soms meer pip (post-injection pain) door de korte ester — verdun met test prop of warm de olie. Mast E is voor de gemiddelde gast die op vakantie strak wil staan: simpel, 2 prikken per week, klaar.",
      },
    ],
    related: ["testosteron", "trenbolone", "anavar", "winstrol", "primobolan"],
    knowledge: ["dht-derivaten-vergelijking"],
  },
  {
    slug: "anavar",
    group: "anabolen",
    name: "Anavar",
    aka: ["Oxandrolone"],
    tagline: "De milde oral met de meeste fakes in de scene",
    heroImage: "https://rexqfwibxawqnvrzbdoo.supabase.co/storage/v1/object/public/blog-images/stof/anavar-hero.jpg",
    heroImageAlt: "Donkere productfoto van een blister voor de stof-pagina anavar",
    resultImage: "https://rexqfwibxawqnvrzbdoo.supabase.co/storage/v1/object/public/blog-images/stof/anavar-resultaat.webp",
    resultImageAlt: "Anavar kuur resultaat vrouw en man — gespierde fit man en getrainde vrouw tonen anavar cutting result met lean definition",
    intro:
      "Anavar is de poster boy van 'milde' anabolen — strakke gains, kracht-boost, weinig bijwerkingen. Probleem: 80% van wat er als var verkocht wordt, is gewoon dianabol of winstrol met var-stickertje.",
    longIntro:
      "Oxandrolone is een orale DHT met een uniek profiel: weinig vochtretentie, geen aromatisatie, lage androgene impact en in klinisch onderzoek zelfs gebruikt bij brandwondenpatiënten en HIV-wasting. Bodybuilders zetten het in voor cuts, kracht-fases en als 'finisher' in de laatste weken. Maar: ruwe oxandrolone-grondstof is een van de duurste op de wereldmarkt — gevolg is dat onbetrouwbare sources je dbol of winny verkopen onder var-label. Lab-getest of niet kopen.",
    keyFacts: [
      { label: "Type", value: "Oraal DHT-derivaat (c17-α)" },
      { label: "Halfwaardetijd", value: "~8 uur" },
      { label: "Typische dosering", value: "Mannen 40-80 mg/dag · Vrouwen 5-10 mg/dag" },
      { label: "Aromatisatie", value: "Geen" },
      { label: "Lever-belasting", value: "Mild (c17-α, maar minst belastend van orals)" },
      { label: "Detectietijd", value: "3 weken" },
    ],
    sections: [
      {
        heading: "Wat is anavar en hoe werkt het",
        body: "Anavar (oxandrolone) is een c17-alpha gealkyleerd DHT-derivaat — alpha-methylatie maakt het oraal biobeschikbaar zonder eerste-pass lever-afbraak. Het bindt aan de androgeen-receptor met matige affiniteit, maar drijft eiwitsynthese en stikstofretentie sterk op zonder vochtretentie. Lipolyse (vetverbranding) wordt licht geboost via verhoogde T3-uptake in vet- en spierweefsel. Klinisch onderzocht bij brandwondenpatiënten waar het bewezen spier-rebehoud gaf bij 80 mg/dag. Het is een van de weinige anabolen veilig genoeg om vrouwen op te zetten (lage virilisatie-risico) in microdoses van 5-10 mg/dag.",
      },
      {
        heading: "Doseringen en cycle-protocol",
        body: "Beginner: 40-50 mg/dag, 6-8 weken, gesplitst in 2 giften (ochtend + avond want halfwaardetijd is 8 uur). Altijd op test-basis — 300-400 mg <a href=\"/testosteron\">Test E</a> erbij is standaard. Intermediate: 60-80 mg/dag, 8 weken max. Pre-contest gasten gebruiken 80-100 mg in de laatste 4-6 weken. Vrouwen: 5-10 mg/dag, 4-6 weken — bij hogere doses begint virilisatie (stem, libido, clit). Lever-supps niet skippen: TUDCA 500 mg/dag, NAC 1200 mg/dag, en idealiter geen alcohol tijdens de cycle. Bloedwerk voor lever-enzymen op week 4 en 8.",
      },
      {
        heading: "Risico's en bijwerkingen",
        body: "Hepatotoxiciteit: mild in vergelijking met <a href=\"/dianabol\">dbol</a> of <a href=\"/winstrol\">winstrol</a>, maar nog steeds aanwezig. ALAT/ASAT stijgt licht (vaak 1.5-2x bovengrens). HDL-cholesterol is de hardste hit — kan met 30-50% dalen, soms onder 20 mg/dL bij hogere doses. LDL stijgt 15-25%. Bloeddruk meestal stabiel. Acne mild, haaruitval mild (let op bij aanleg). Suppressie van eigen test: minder dramatisch dan andere stoffen maar wel echt — 4 weken anavar onderdrukt LH/FSH significant. PCT verplicht na elke cycle. Een minder bekend effect: spierkrampen, vooral kuiten en lower back — verhoog dan magnesium 400 mg + zout intake.",
      },
      {
        heading: "Onderzoek en bronnen",
        body: "Een van de best gedocumenteerde anabolen in klinische context. Voor brandwondenherstel-onderzoek met 80 mg/dag: Demling, 2005 over oxandrolone in catabolic conditions. Voor het iconische 1995 onderzoek over oxandrolone en weight regain bij HIV-patiënten: Berger et al., 1996. Voor lever-effecten in detail: Petrovic et al., 2010. Anavar wordt extreem vaak vervalst — ruwe oxandrolone-poeder kost ~$30/gram, dianabol ~$0.50/gram. Vraag altijd <a href=\"/lab\">HPLC-test</a> van de batch (JanoshikAnalytical, Simec). Echte var: subtiele krachttoename, geen extreme bloat. Krijg je in week 1 al 4 kg + bloat? Het is geen var.",
      },
      {
        heading: "Wanneer wel/niet kiezen",
        body: "Wel kiezen als: je een cut wil ondersteunen met behoud van kracht, je een 'subtiele' kuur wil zonder zichtbare bloat, je vrouw bent en spier op natural-plus niveau wil (microdoses), je bridge tussen blasts wil overbruggen. Niet kiezen als: je hardcore wil bulken (te subtiel, geld weggegooid), je een goedkope source hebt zonder COA (fake garantie), je lever-issues hebt, je HDL al laag is van nature, of je een PCT zoekt (var is geen PCT-stof, dat verwarring komt vaak voorbij).",
      },
    ],
    faqs: [
      {
        question: "Hoe lang werkt anavar in je lichaam?",
        answer:
          "Halfwaardetijd is ~8 uur — kortst van alle gangbare orals. Praktisch betekent dit: split je dose in 2 (ochtend en 10 uur later) voor stabiele bloedwaarden. Na 24-48 uur is het uit je systeem qua actieve werking, en in dopingcontrole tot 3 weken detecteerbaar. Stop je var op vrijdag, dan ben je dinsdag klinisch klaar. Voor PCT-timing: bij een var-only-toevoeging op een test-cycle (zoals laatste 4 weken van een 14-weeks cycle) telt de test-ester voor PCT-timing, niet de var. Bij een var-only cycle (zeldzaam): start PCT 3 dagen na laatste dosis.",
      },
      {
        question: "Kan ik anavar stacken met winstrol of testosteron?",
        answer:
          "Test + Var is een klassieke en uitstekende combo: 400 mg Test E + 50-60 mg Anavar/dag voor 8 weken, vooral handig bij cut of recomp. Test + Var + Mast is een populaire cut-stack voor lean gasten. Test + Winstrol + Anavar tegelijk: technisch kan, maar je stapelt twee orals dus dubbele lever-stress en dubbele HDL-crash — niet aan te raden, kies één van de twee. Tren + Var werkt ook goed voor pre-contest. Var stack je nooit met dbol — twee orals tegelijk is leverdood. Belangrijkste regel: 1 oral per cycle, lever-supps erbij.",
      },
      {
        question: "Welke bloedwaardes monitoren op anavar?",
        answer:
          "Lever-enzymen zijn de prioriteit: ALAT (ALT) en ASAT (AST) baseline en op week 4 en 8 van de cycle. Stijging tot 1.5-2x bovengrens is normaal op var. Boven 3x: stop of dosis halveren. Verder: GGT, alkalisch fosfatase, totaal bilirubine. Lipiden zijn de andere big one — HDL crasht het hardst, soms onder 20 mg/dL. LDL stijgt. Hematocriet meestal stabiel maar wel checken. Bij langere stacks ook: nierfunctie (creatinine, eGFR), elektrolyten (vanwege spierkrampen). Bloedwerk vóór de kuur (baseline), op week 4 (mid), en 6 weken na PCT (recovery).",
      },
      {
        question: "Is anavar geschikt voor een eerste kuur?",
        answer:
          "Niet als solo-cycle. Anavar onderdrukt je natuurlijke test net zoals andere anabolen, dus 'var only' is een mythe — je crasht 6 weken later met depressie en libido op nul, terwijl je toch een PCT nodig hebt. Wat wel zinvol is voor een eerste-kuur intermediate: Test E 400 mg/wk + Anavar 40 mg/dag voor de laatste 6 weken als finisher. Maar pure eerste kuur = test only blijft de gouden standaard. Veel gasten kiezen var voor hun eerste kuur omdat ze 'oraal makkelijker' vinden — maar je hebt nog steeds een PCT nodig, je hebt risico op fake product, en je gemist gemak van een echte test-cycle. Pak test als beginner.",
      },
      {
        question: "Hoe herken ik echte anavar?",
        answer:
          "Echte oxandrolone-grondstof kost ~$30/gram en moet HPLC-getest worden om er zeker van te zijn. Praktische rode vlaggen: tabletten heel goedkoop (echte var-tabs kosten minimum €1/stuk voor 10 mg), enorme krachttoename in week 1 (waarschijnlijk dianabol), bloat en vochtretentie (var doet dat niet), bittere smaak (var is bijna smakeloos, dbol bitter, winstrol erg bitter). Stuur een sample naar Janoshik (~$60-80) voor HPLC-confirmatie. Of zoek sources die per batch standaard al een COA leveren — die zijn er, en als source dat niet wil leveren, kies een andere. Anavar is dé stof om paranoïde over te zijn qua echtheid.",
      },
      {
        question: "Hoe lang mag een anavar-cycle duren?",
        answer:
          "Standaard 6-8 weken vanwege lever-belasting. Sommigen rekken naar 10 weken bij conservatieve doses (30-40 mg) met scherp bloedwerk op week 6 en 8 — kan, maar het risico/voordeel-balans wordt slechter. Hogere doses (80-100 mg/dag) houden op 6 weken stoppen. Belangrijk: lever-enzymen herstellen meestal binnen 4-6 weken na stoppen, HDL kan 8-12 weken nodig hebben om weer te herstellen — laat dat tussen cycles ook bloedwerk-checken. Frequenter dan 2-3 var-cycles per jaar is geen verstandig idee. Liever 1x per jaar 8 weken goed bloedwerk dan continu lage-dosis bridging.",
      },
    ],
    related: ["testosteron", "winstrol", "masteron", "primobolan"],
    knowledge: ["leverbescherming-tijdens-orale-kuur", "vervalsing-herkennen-coa-lezen"],
  },
  {
    slug: "dianabol",
    group: "anabolen",
    name: "Dianabol",
    aka: ["Methandienone", "Methandrostenolone", "Dbol"],
    tagline: "Ouderwetse mass-monster, perfect als kickstart",
    heroImage: "https://rexqfwibxawqnvrzbdoo.supabase.co/storage/v1/object/public/blog-images/stof/dianabol-hero.jpg",
    heroImageAlt: "Donkere editorial foto van tabletten voor de stof-pagina dianabol",
    resultImage: "https://rexqfwibxawqnvrzbdoo.supabase.co/storage/v1/object/public/blog-images/stof/dianabol-resultaat.webp",
    resultImageAlt: "Dianabol kuur resultaat — massive full puffy bodybuilder toont typische dianabol bulk look met grote armen en volle borstspieren",
    intro:
      "Dbol is de oudste oral in de game en nog steeds populair: 4 weken op 30 mg en je zit 4-6 kg dikker met pumps die in je broek niet meer passen.",
    longIntro:
      "Methandienone werd in de jaren '50 ontwikkeld om het Russische Olympische team bij te kunnen benen — en sindsdien is het de go-to oral voor snelle massa. Het wordt vaak gebruikt als 'kickstart' van een langere injectable cycle: terwijl je test ester 4-5 weken opbouwt, geeft Dbol je vanaf dag 3 al sterk merkbare gains. Maar Dbol is vochtig, leverbelastend en aromatiseert agressief — niet voor wie strak wil staan of bloedwerk negeert.",
    keyFacts: [
      { label: "Type", value: "Oraal testosteron-derivaat (c17-α)" },
      { label: "Halfwaardetijd", value: "~5 uur" },
      { label: "Typische dosering", value: "20-40 mg/dag · Cycle 4-6 weken" },
      { label: "Aromatisatie", value: "Ja, sterk — AI vrijwel altijd nodig" },
      { label: "Lever-belasting", value: "Hoog (c17-α)" },
      { label: "Detectietijd", value: "5-6 weken" },
    ],
    sections: [
      {
        heading: "Wat is dianabol en hoe werkt het",
        body: "Dianabol is <a href=\"/testosteron\">testosteron</a> met een extra 1-2 dubbele binding en een 17-alpha methyl-groep. Dat laatste maakt het oraal opneembaar maar belast wel je lever. Het bindt sterk aan de androgeen-receptor, pusht eiwitsynthese, en geeft enorme glycogeenopslag in spier (vandaar de pump en het volle uiterlijk). Het aromatiseert agressief naar oestradiol — wat zorgt voor vochtretentie, libido en de typische 'dbol bloat'. Werkingsduur is kort (5 uur), dus splitsen over 2-3 giften per dag voor stabiele plasmaspiegel. Effect in week 1: gewicht +2-3 kg (vooral water/glycogeen), kracht serieus omhoog, pumps die ridicuul worden.",
      },
      {
        heading: "Doseringen en cycle-protocol",
        body: "Klassieke kickstart: <a href=\"/testosteron\">Test E</a> 500 mg/wk x 14 weken + Dbol 30 mg/dag in weken 1-4. Beginner kickstart-dose 20-25 mg/dag, intermediate 30-40 mg, geavanceerd tot 50 mg. Cycle-duur Dbol max 6 weken vanwege lever — daarna stoppen, injectable doorlopen. Verdeel over 3 giften ('t ochtends, lunch, vroege avond) of preworkout (1 hour vóór training) als single dose voor pump-focus. <a href=\"/arimidex\">Adex</a> 0.25 mg E3D vanaf week 1 vrijwel altijd nodig (Dbol + Test = veel E2). Lever-supps: TUDCA 500-1000 mg/dag, NAC 1200 mg, geen alcohol.",
      },
      {
        heading: "Risico's en bijwerkingen",
        body: "Lever-enzymen stijgen 2-4x bovengrens — normaal op dbol, herstelt 4-6 weken na stop. Bloeddruk gaat hard omhoog door vochtretentie en E2-spike — verwacht +10-20 systolisch. Hoofdpijn vooral in week 1-2 (E2-piek). HDL crasht 30-50%. Gyno-risico hoog door agressieve aromatisatie — adex erbij is geen optioneel ding, het is verplicht. Acne, vooral op rug. Lethargie/sufheid kan voorkomen door methyl-groep belasting. Suppressie van eigen test compleet binnen 7-10 dagen. Pure Dbol-only cycles (geen test) zijn een drama — libido op nul tegen week 3.",
      },
      {
        heading: "Onderzoek en bronnen",
        body: "Methandienone is een van de oudste anabolen — eerste klinische beschrijvingen vanaf 1958. Voor lever-impact: Kafrouni et al., 2007 over hepatotoxiciteit van c17-α anabolen. Voor cardiovasculair profiel en HDL-impact: Hartgens et al., 2004. Voor klassieke oral kickstart-strategie en bloed-piek-data: Catlin et al., 1991 over orale anabolen-kinetiek. Dbol-tabletten worden zelden vervalst (grondstof is goedkoop) maar onderdosering komt voor — vraag bij twijfel HPLC-test.",
      },
      {
        heading: "Wanneer wel/niet kiezen",
        body: "Wel kiezen als: je een bulk-cycle kickstart wil (eerste 4 weken bridge), je natural-klein bent en snel volume wil, je in off-season zit en niet kraakdroog hoeft te zijn. Niet kiezen als: je naar een show toewerkt (te vochtig), je hoge bloeddruk hebt, je lever-problemen of cholesterol-issues hebt, je een mooie droge look wil, of het je eerste cycle is (begin met test alleen). Niet stacken met andere c17-α orals zoals <a href=\"/winstrol\">winstrol</a>, anadrol — leverdood-combo.",
      },
    ],
    faqs: [
      {
        question: "Hoe lang werkt dianabol in je lichaam?",
        answer:
          "Halfwaardetijd is ongeveer 5 uur — de kortste van alle gangbare anabolen. Daarom dose je het 2-3x per dag op (bv 10 mg ochtend, lunch, vroege avond) voor stabiele bloedwaarden, of als single 30 mg shot 1 uur preworkout puur voor de training-pump. Na 24 uur is het uit je systeem qua actieve werking, in urine-tests detecteerbaar tot ongeveer 5-6 weken. Voor PCT-timing: als Dbol als kickstart op een test-cycle is gebruikt (weken 1-4), telt de Test-ester voor PCT-timing. Bij Dbol-only of als finisher: 3-4 dagen na laatste dose start PCT.",
      },
      {
        question: "Kan ik dianabol stacken met deca?",
        answer:
          "Ja, klassieke 'old school bulk': Test E 500 + Deca 400 + Dbol 30 mg in weken 1-4, totale cycle 14-16 weken. Werkt fantastisch voor mass: dbol kickstart, test als basis, deca voor langzame kwalitatieve gains. Vereisten: caber 0.25 mg 2x/wk vanaf week 1 (deca-prolactine + dbol-E2-piek), adex 0.5 mg E3D, lever-supps voor de dbol-weken, scherp bloedwerk op week 4, 8, 12. Bloeddonatie waarschijnlijk nodig rond week 10 (hematocriet stijgt op deca). Niet voor eerste of tweede cycle — dit is intermediate/advanced territorium met serieus management.",
      },
      {
        question: "Welke bloedwaardes monitoren op dianabol?",
        answer:
          "Lever is prioriteit nummer 1: ALAT, ASAT, GGT, bilirubine baseline en op week 3 en 5. Stijging tot 2-3x bovengrens is normaal, boven 4x stoppen. Lipiden: HDL crasht hard, soms onder 25 mg/dL — meet baseline en week 5. LDL stijgt ook. Bloeddruk thuis elke 2-3 dagen meten — Dbol kan systolisch met 20 punten omhoog tikken. E2 sensitive op week 3 (vóór adex bijstellen). Hematocriet op week 5 (Dbol pusht erytropoëse). Algemeen bloedbeeld, glucose, prolactine bij langere stack. Na PCT op week 6 nogmaals lever en lipiden om herstel te bevestigen.",
      },
      {
        question: "Is dianabol geschikt voor een eerste kuur?",
        answer:
          "Sterk afgeraden als solo eerste-cycle (dbol only), prima als 4-week kickstart op een test-cycle. Pure dbol-only kuur is een mythe die nog rondzweeft uit '70s bodybuilding-folklore — je krijgt volledige HPTA-suppressie, geen libido, water gains die binnen 2 weken na stop weg zijn, en je hebt alsnog een PCT nodig. Wat wel zinvol is voor een eerste-kuur intermediate: Test E 500 mg/wk x 14 wkn + Dbol 25-30 mg/dag in weken 1-4. Geeft snelle resultaten en bouwt mooie basis. Eerste-kuur puristen: gewoon test alleen, dbol kan in cycle 2 of 3.",
      },
      {
        question: "Dianabol of anadrol — welke kiezen?",
        answer:
          "Anadrol (oxymetholone) is potenter mg per mg — 50 mg anadrol komt overeen met ongeveer 75-100 mg dbol qua massa-effect. Maar anadrol is ook brutaler: meer hoofdpijn, lethargie, sterkere bloeddruk-impact, en sommige gasten worden er ronduit ziek van. Dianabol voelt 'lekkerder' — meer energie, betere pump, mentaal scherper voor de meesten. Voor eerste keer oral: kies dbol, voorspelbaarder profiel. Voor extreme bulk waar je weet wat je doet: anadrol kan, maar 50 mg/dag max en korte cycles (4-5 weken). Beide zijn lever-intensief, beide aromatiseren agressief (anadrol via een ander mechanisme dan dbol — adex helpt minder bij anadrol, vandaar SERM-prophylaxe).",
      },
      {
        question: "Hoe lang mag een dianabol-cyclus duren?",
        answer:
          "Max 6 weken, en de meeste protocollen kiezen 4 weken om lever-belasting voor te zijn. Sommige conservatieve gasten gaan 5-6 weken op lage dose (20-25 mg/dag) met scherp bloedwerk op week 4. Hoge doses (40-50 mg/dag) houden op 4 weken stoppen. Belangrijk: lever-enzymen normaliseren meestal binnen 4-6 weken na stoppen, mits je daarna alcohol vermijdt en lever-supps neemt. HDL kan 8-12 weken nodig hebben voor herstel. Frequenter dan 2x per jaar een Dbol-kuur draaien is lever-roekeloos — wissel af met andere orals (anavar, winstrol) als je elke cycle een oral wil hebben.",
      },
    ],
    related: ["testosteron", "anavar", "nandrolon", "boldenone"],
    knowledge: ["leverbescherming-tijdens-orale-kuur", "oestrogeen-controle"],
  },
  {
    slug: "winstrol",
    group: "anabolen",
    name: "Winstrol",
    aka: ["Stanozolol", "Winny"],
    tagline: "Droge, harde finisher — sloopt je gewrichten",
    heroImage: "https://rexqfwibxawqnvrzbdoo.supabase.co/storage/v1/object/public/blog-images/stof/winstrol-hero.jpg",
    heroImageAlt: "Silhouet foto van een tablet bottle voor de stof-pagina winstrol",
    resultImage: "https://rexqfwibxawqnvrzbdoo.supabase.co/storage/v1/object/public/blog-images/stof/winstrol-resultaat.webp",
    resultImageAlt: "Winstrol kuur resultaat — extreem shredded droge vascular bodybuilder toont winstrol competition-stage look met striations",
    intro:
      "Winstrol is de klassieke pre-contest finisher: droogt je uit, knalt vascularity en spierhardheid op een niveau dat geen andere stof matcht. Maar je gewrichten gaan janken.",
    longIntro:
      "Stanozolol is een oral of injectable DHT-derivaat met een uniek profiel: extreme droogheid, harde uitstraling en sterke SHBG-binding (waardoor vrij test omhoog gaat). Vooral populair in de laatste 4-6 weken vóór een show of beach-trip. Maar twee dingen om over na te denken: lever-belasting is hoog (zowel oral als injectable — injectable winny gaat ook door je lever), en de gewrichtspijn-meldingen zijn niet overdreven. Squat-sessies kunnen vervelend worden.",
    keyFacts: [
      { label: "Type", value: "DHT-derivaat (c17-α) — oraal of injectable" },
      { label: "Halfwaardetijd", value: "Oraal ~9 uur · Injectable ~24 uur" },
      { label: "Typische dosering", value: "Mannen 30-50 mg/dag · Vrouwen 5-10 mg/dag" },
      { label: "Aromatisatie", value: "Geen" },
      { label: "Lever-belasting", value: "Hoog (beide vormen c17-α)" },
      { label: "Detectietijd", value: "Tot 2 maanden" },
    ],
    sections: [
      {
        heading: "Wat is winstrol en hoe werkt het",
        body: "Stanozolol is een DHT-derivaat met een pyrazol-ring gekoppeld aan het A-ring — dat maakt het oraal opneembaar én geeft de unieke 'droge' werking. Het bindt aan de androgeen-receptor, pusht eiwitsynthese, en cruciale eigenschap: het bindt agressief aan SHBG (Sex Hormone Binding Globulin), waardoor minder van je test gebonden wordt en meer vrij circulerend testosteron beschikbaar komt. Dit verklaart waarom Winstrol-stacks vaak supercharged voelen — je test-cycle krijgt een free-test boost. Geen aromatisatie, geen vochtretentie — vandaar het strakke 'sliced' uiterlijk. Injectable winny is een microcrystalline suspension in water — die kristallen geven extra pip (post-injection pain), maar dezelfde stanozolol-molecuul als de tabletten.",
      },
      {
        heading: "Doseringen en cycle-protocol",
        body: "Klassiek pre-contest: <a href=\"/testosteron\">Test</a> 300 + <a href=\"/masteron\">Mast E</a> 400 + Winstrol 50 mg/dag in laatste 6 weken. Beginner-dose 25-30 mg/dag oraal, intermediate 50 mg, geavanceerd 75 mg max. Injectable 50 mg E2D of dagelijks. Cycles 6-8 weken vanwege lever. Splits oraal in 2 giften (ochtend + 8-10 uur later). Stack regel: niet met andere c17-α orals (<a href=\"/dianabol\">dbol</a>, anadrol, anavar dubbel-stack = leverdood). Mast + Winstrol + Test is de gouden cut-stack. Voor recomp: Test + Tren + Mast + Winstrol als finisher (laatste 4 wkn). Lever-supps: TUDCA 1000 mg/dag, NAC 1200 mg, omega-3 4 g voor lipiden. Bloedwerk week 3 en 6.",
      },
      {
        heading: "Risico's en bijwerkingen",
        body: "Lipiden zijn de big one — Winstrol is de allerergste anabolic qua HDL-impact. HDL kan met 50-70% dalen, soms onder 15 mg/dL. LDL stijgt 30-50%. <a href=\"/risicos-en-bijwerkingen\">Cardiovasculair risico</a> schiet omhoog, vooral als je al een familiegeschiedenis hebt. Gewrichten: droogheid in synoviaal vocht maakt squat, deadlift, bench oncomfortabel — sommige gasten draaien daarom een lage <a href=\"/nandrolon\">deca</a>-dose (200 mg) als 'joint cushion' tijdens een winny-cycle. Lever-enzymen 2-4x bovengrens. Acne kan opspelen. Suppressie compleet. Pees-blessures: meldingen van ruptures op winny zijn niet zeldzaam — verminder de last bij zware sets, vooral cold. Bloeddruk omhoog. PIP bij injectable is berucht (vandaar dat veel gasten oral kiezen).",
      },
      {
        heading: "Onderzoek en bronnen",
        body: "Stanozolol is uitgebreid onderzocht in klinische context voor hereditair angio-oedeem en aplastische anemie. Voor lipiden-impact specifiek bij Winstrol: Thompson et al., 1989 over HDL-crash bij stanozolol 6 mg/dag (zelfs TRT-dose verlaagt HDL met 33%). Voor lever-effecten en hepatotoxiciteit van c17-α anabolen: Kafrouni et al., 2007. Voor de SHBG-binding studie: Pugeat et al., 1981. Vervalsing: winstrol-tabs worden soms vervalst met dbol of dianabol/stanozolol-mix. Echte winny voelt droog, dbol vochtig — dat is een eerste sanity-check, maar HPLC blijft de enige zekerheid.",
      },
      {
        heading: "Wanneer wel/niet kiezen",
        body: "Wel kiezen als: je een cut afsluit met hardness en vascularity, je vetpercentage onder 12% zit en je het verschil wil maken, je pre-contest of pre-foto/beach gaat. Niet kiezen als: je een bulk wil (no gains, alleen droog), je dik bent (zie er niks van), je gewrichten al pijn doen, je lipiden baseline al slecht zijn, je een familiegeschiedenis van hart/vaat hebt, of je een powerlifter bent met zware compounds (pees-risico). Combineer altijd met test, nooit solo.",
      },
    ],
    faqs: [
      {
        question: "Hoe lang werkt winstrol in je lichaam?",
        answer:
          "Oral winny halfwaardetijd ~9 uur, injectable ~24 uur. Oral split je in 2 giften per dag, injectable kun je E2D of dagelijks. In urine-tests is stanozolol-metaboliet (3'-hydroxystanozolol) detecteerbaar tot 2 maanden later — vandaar dat het beruchte verhaal van Ben Johnson '88 nog steeds opgaat. Voor PCT-timing bij oral: 3-4 dagen na laatste dose start PCT. Voor injectable: 7-10 dagen. Wanneer winstrol als finisher op het einde van een langere test-cycle wordt gebruikt, telt de test-ester voor PCT-timing. Hardheid en droge look zakken meestal binnen 7-14 dagen na laatste dose weer een beetje terug door water-rehydratie en pumps die zachter worden.",
      },
      {
        question: "Kan ik winstrol stacken met anavar of trenbolone?",
        answer:
          "Winstrol + Anavar tegelijk is geen slim idee — twee c17-α orals samen verdubbelt lever-stress en HDL-crash. Eén kiezen. Wel populair: Tren + Winstrol als finisher op een test-basis (Test 250 + Tren 200 + Winstrol 50 mg laatste 4 weken). Of de klassieke 'pre-contest stack': Test + Mast + Winstrol. Stacking 3 of meer DHT-derivaten (Mast + Winstrol + Anavar) kan technisch maar wordt pas zinvol bij contest prep met serieus management — bloedlipiden gaan dan over de cliff. Voor recreatieve cut: kies één finisher, niet 3.",
      },
      {
        question: "Welke bloedwaardes monitoren op winstrol?",
        answer:
          "Lipiden zijn ABSOLUTE prioriteit — HDL crasht harder dan op enige andere stof. Baseline meten, week 3 en 6. Bij HDL onder 20 mg/dL serieus overwegen te stoppen of dosis halveren. LDL ook checken. Lever: ALAT/ASAT/GGT/bilirubine baseline en week 3, 6. Bloeddruk thuis 2x/week. Hematocriet (DHT-derivaten pushen het). Nierfunctie (creatinine). Bij langere stacks ook prolactine als je deca/tren erbij hebt. En heel praktisch: bijhouden hoe je gewrichten en pezen voelen — als knieën, ellebogen, polsen vervelend worden, dosis verlagen of last verminderen bij compound lifts.",
      },
      {
        question: "Is winstrol geschikt voor een eerste kuur?",
        answer:
          "Nee, en sterk afgeraden. Winstrol als eerste oral cycle (winny only) is misschien wel een van de slechtste eerste-kuur keuzes: HDL-crash, gewrichts-shit, lever-belasting, en de gains zijn cosmetisch — geen mass-builder, dus na PCT houd je weinig over. Eerste kuur = test only, klaar. Wil je in cycle 2 of 3 een cut doen: Test + Mast is een veel betere en mildere intermediate keuze. Winstrol bewaren voor cycle 4-5 wanneer je een pre-contest stack runt en je weet wat je doet. Vrouwen die er per se mee willen ervaren: heel lage dose (5-10 mg/dag), max 4 weken, en accepteer dat virilisatie-risico (stem) reëel is.",
      },
      {
        question: "Waarom doen mijn gewrichten pijn op winstrol?",
        answer:
          "Winstrol onttrekt water uit synoviaal vocht en peri-articulaire weefsels — je gewrichten worden droog, minder gelubricated, en zware compounds (squat, bench, deadlift) gaan oncomfortabel voelen. Sommige gasten krijgen ook tendinitis-achtige klachten. Wat helpt: voeg een lage dose deca (200 mg/wk) of nandrolon toe als 'joint cushion' tijdens de winny-fase, neem TB-500 of BPC-157 peptides als je daar in gelooft, blijf goed gehydrateerd (3+ L water/dag), warming-up langer en steviger, en verminder load bij zware sets. Als pijn echt heftig wordt: dosis verlagen of stoppen. Geen sterven aan een pees-ruptuur omdat je 4 extra weken winny wilde duwen.",
      },
      {
        question: "Winstrol oraal of injectable — wat is beter?",
        answer:
          "Beide bevatten hetzelfde stanozolol-molecuul, beide zijn c17-α (lever-belasting is gelijk — injectable is GEEN bypass van de lever, ondanks wat sommigen denken). Verschillen: injectable is microcrystalline in water, geeft vaak veel pip (post-injection pain) — sommige gasten kunnen er amper op zitten of bewegen. Oraal is makkelijker maar moet 2x per dag, en sommigen vinden de tabletten-smaak nare. Bioavailability is licht hoger bij oraal door first-pass mechanisme. In de praktijk: 90% kiest oraal voor het gemak. Sommige bodybuilders zweren bij injectable voor 'sterker effect' (anekdotisch, niet objectief bewezen). Voor het pre-contest finishen: oraal 50 mg/dag is de standaard.",
      },
    ],
    related: ["anavar", "masteron", "primobolan", "trenbolone"],
    knowledge: ["dht-derivaten-vergelijking", "leverbescherming-tijdens-orale-kuur"],
  },
  {
    slug: "primobolan",
    group: "anabolen",
    name: "Primobolan",
    aka: ["Methenolone", "Primo"],
    tagline: "De Rolex onder de anabolen — duur, vaak fake, subtiel effect",
    heroImage: "https://rexqfwibxawqnvrzbdoo.supabase.co/storage/v1/object/public/blog-images/stof/primobolan-hero.jpg",
    heroImageAlt: "Editorial foto van een amber bottle voor de stof-pagina primobolan",
    resultImage: "https://rexqfwibxawqnvrzbdoo.supabase.co/storage/v1/object/public/blog-images/stof/primobolan-resultaat.webp",
    resultImageAlt: "Primobolan kuur resultaat — lean droge kwaliteitsspiermassa bodybuilder toont primobolan clean-cut fysiek",
    intro:
      "Primo is de chique optie: mild profiel, geen bloat, geen aromatisatie, en een prijskaartje waar je tweede kuur op past. Maar 9 van de 10 ampullen die je krijgt zijn fake.",
    longIntro:
      "Methenolone Enanthate heeft een bijna magische reputatie: 'cleaner gains', schone aankomst, geen oestrogeen-issues, weinig androgene rommel. Arnold zou het gebruikt hebben. Profis zweren erbij. En het werkt — als je echt product hebt. Probleem: ruwe methenolone-grondstof kost ongeveer $60-100 per gram, vergeleken met test enanthate op $0.50-1 per gram. Resultaat: bijna alle goedkope primo op de markt is vervalst met test of nandrolon. Zonder lab-test koop je geen primo, je koopt een verhaal.",
    keyFacts: [
      { label: "Type", value: "DHT-derivaat — injectable (Primo E) of oral (Primo Acetate)" },
      { label: "Halfwaardetijd", value: "Enanthate ~10 dagen · Acetate ~5 uur" },
      { label: "Typische dosering", value: "Effectief vanaf 400 mg/wk · Sweet spot 600-800 mg/wk" },
      { label: "Aromatisatie", value: "Geen" },
      { label: "Lever-belasting", value: "Geen (injectable) · Mild (acetate oral)" },
      { label: "Detectietijd", value: "Tot 5 maanden" },
    ],
    sections: [
      {
        heading: "Wat is primobolan en hoe werkt het",
        body: "Methenolone is een DHT-derivaat met een 1-methyl-groep — beschermd tegen 3α-HSD-afbraak in spierweefsel. Bindt matig aan de androgeen-receptor met lage androgene/hoge anabole ratio (88/44 vs test 100/100). Aromatiseert niet, geen oestrogene effecten, geen vochtretentie. Het effect is subtiel maar kwalitatief: lean mass, behoud van spier in caloriedeficit, lichte recomp. Tegen lipolyse heeft het ook bescheiden effect. Het is de stof die je kiest als je 'natural plus' wil zien, zonder de zichtbare bloat van <a href=\"/testosteron\">Test</a> of de droge hardness van <a href=\"/masteron\">Mast</a>. In cutfase indrukwekkend voor spierbehoud bij caloriedeficit.",
      },
      {
        heading: "Doseringen en cycle-protocol",
        body: "Beginner met primo (na minimaal 2 test-only kuren): <a href=\"/testosteron\">Test E</a> 250-300 + Primo E 500-600 mg/wk, 14-16 weken. Intermediate: Test 300 + Primo 700-800 mg/wk. Geavanceerd: Primo tot 1000 mg/wk in extended protocols — maar de prijs wordt absurd. Onder 400 mg/wk voel je amper iets. Primo werkt traag — eerste duidelijke effecten week 4-6. Primo Acetate (oral) wordt soms gebruikt: 75-100 mg/dag verdeeld over 3 giften — kortere halfwaardetijd betekent 4-5x daags doseren voor optimaal effect. <a href=\"/arimidex\">Adex</a> niet of nauwelijks nodig (test-basis aromatiseert wel, dus check E2). PCT 21 dagen na laatste Primo E-shot.",
      },
      {
        heading: "Risico's en bijwerkingen",
        body: "Het mildste profiel van alle injectables — vandaar de populariteit bij voorzichtige gebruikers. Geen aromatisatie = geen E2-issues. Lage androgene activiteit = weinig acne, weinig haaruitval impact (maar bij genetische aanleg nog steeds mogelijk). Lipiden-impact mild vergeleken met andere DHT's, HDL daalt 15-25%. Lever-enzymen blijven stabiel bij Primo E (injectable). Suppressie is reëel maar herstel meestal vlotter dan op bv <a href=\"/trenbolone\">tren</a> of <a href=\"/nandrolon\">deca</a>. Belangrijkste risico: dat je geen echt primo hebt. Verkeerde stof in plaats van methenolone (vaak test) geeft je een ander bijwerkingsprofiel dan verwacht — denk je dat je geen E2-management nodig hebt, dan groei je gyno omdat de ampul gewoon Test E was.",
      },
      {
        heading: "Onderzoek en bronnen",
        body: "Methenolone werd oorspronkelijk in oncologie gebruikt voor borstkanker en cachexie. Voor klassieke methenolone-pharmacokinetiek en bindings-profiel: Saartok et al., 1984 (vergelijking DHT-derivaten). Voor toepassing bij aplastische anemie: Allen et al., 1968. Voor lipiden-impact in androgeen-gebruikers algemeen: Hartgens et al., 2004. Vervalsing: Coopman & Cordonnier, 2012 over kwaliteits-issues van underground anabolen — primo is een case study. Test je product via <a href=\"/lab\">JanoshikAnalytical</a> of Simec.cz — laat ampul HPLC-tested zijn vóór gebruik, niet erna.",
      },
      {
        heading: "Wanneer wel/niet kiezen",
        body: "Wel kiezen als: je een 'clean' cycle wil zonder oestrogene rommel, je vrouwelijke partner ook microdoses gebruikt (primo is de meest vrouwvriendelijke), je in cutfase spier wil behouden bij caloriedeficit, je een lange off-season cruise wil. Niet kiezen als: je geld een issue is (super duur per gram lean mass), je geen lab-test van je source hebt (90% fake-risico), je dramatische gains wil (te subtiel), of het je eerste kuur is (overkill en duurzaam fake-risico).",
      },
    ],
    faqs: [
      {
        question: "Hoe lang werkt primobolan in je lichaam?",
        answer:
          "Primo Enanthate halfwaardetijd ongeveer 10 dagen — vergelijkbaar met Mast E. Prik 2x per week voor stabiele plasmaspiegel. Stabiele bloedwaarden na 4 weken. Voor PCT-timing: 21 dagen na laatste prik. Detectietijd in dopingcontrole: 4-5 maanden (vandaar dat het minder geliefd is bij getest atleten dan vroeger). Primo Acetate (oral) halfwaardetijd ~5 uur — moet 4-5x per dag doseren voor optimaal effect, anders pieken/dalen extreem. PCT na Primo Ace: 4-5 dagen na laatste dose. Bij langere primo-cycles (16+ weken) duurt HPTA-herstel relatief snel vergeleken met deca of tren — meestal 3-4 maanden tot natural levels.",
      },
      {
        question: "Kan ik primobolan stacken met anavar of testosteron?",
        answer:
          "Ja, dit is een klassieke 'lean gains' stack: Test E 250 + Primo E 600 + Anavar 50 mg laatste 6 weken, 14 wkn cycle. Veel gebruikt door physique-atleten en mannen die strakke recomp willen zonder bloat. Adex niet of nauwelijks nodig (lage aromatisatie). Lever-supps tijdens var-fase. Bloedwerk vrij rustig (mild profiel) maar wel checken op week 8. Andere optie: Test 200 + Primo 700 + Mast E 400 voor pre-vakantie/recreatief contest. Stacking met Tren is mogelijk maar negeert het hele 'mild' karakter dat primo aantrekkelijk maakt — kies één smaak gevorderde stof.",
      },
      {
        question: "Welke bloedwaardes monitoren op primobolan?",
        answer:
          "Mild profiel, dus minder paranoia maar nog steeds bloedwerk: totaal test, vrij test, E2 sensitive (vanwege test-basis), hematocriet, lipiden (HDL daalt mild op primo, harder als je het stacked met andere DHT's), ALAT/ASAT (rustig op injectable primo, alleen issue als je acetate of stacked oral gebruikt), creatinine, bloeddruk. Bij langere stacks of hogere doses ook prolactine. PSA bij 40+. Baseline meten, week 6 mid-cycle, week 6-8 post-PCT. Een unieke check: als je 'primo' draait en je E2 schiet omhoog of je krijgt vochtretentie, is je product waarschijnlijk gewoon test — laat dan ampul HPLC-testen.",
      },
      {
        question: "Is primobolan geschikt voor een eerste kuur?",
        answer:
          "Nee, om twee redenen. Eén: het is duur en de gains zijn subtiel — als eerste-kuur-gast verwacht je 'wow gains' en die krijg je niet, frustratie volgt. Twee: het fake-risico is enorm. Je weet niet hoe je op echte androgenen reageert, dus als je vervalste primo (= meestal test) krijgt, leer je verkeerde lessen. Eerste kuur = Test E only, 500 mg, 14 wkn — bewezen, voorspelbaar, betaalbaar. Primo komt pas in beeld in cycle 3+ wanneer je een mild aanvullend compound zoekt en je een betrouwbare lab-getest source hebt. Geld besparen op je eerste kuur is verstandig — bewaar de Rolex-stof voor later.",
      },
      {
        question: "Hoe herken ik echte primobolan?",
        answer:
          "Echte methenolone-grondstof kost $60-100/gram, dus realistisch zal echte primo €15-25 per 10 ml ampul (100 mg/ml) zijn — sommigen vragen meer. Krijg je 10 ml voor €5? Het is geen primo. Visuele check is onbetrouwbaar — echte en fake zien er beide uit als gele olie. HPLC-test is de enige waarheid: stuur een sample (1-2 ml) naar JanoshikAnalytical (~$80) of Simec.cz. Sommige reputable sources bieden 'tested batches' aan waar de test al gedaan is — vraag erom. Een tweede sanity-check: bij echte primo zie je geen bloat, geen E2-symptomen, en de gains bouwen langzaam op (week 4-6). Krijg je in week 1 al een test-pump en gevoelige tepels? Geen primo.",
      },
      {
        question: "Waarom is primobolan zo duur?",
        answer:
          "Methenolone-synthese vraagt extra stappen: de 1-methylatie en zorgvuldige zuivering. De grondstof ruwe methenolone is een van de duurste op de wereldmarkt — $60-100/gram bij betrouwbare leveranciers (vergelijk: testosteron enanthate $0.50-1.50/gram). Dat betekent dat een 10 ml ampul met 1000 mg primo alleen al $60-100 aan grondstoffen heeft, terwijl test enanthate ongeveer $1-3 kost. Bij retail-prijzen kom je dan minimum op €15-25 per ampul voor echte primo. Lager dan dat is fysiek onmogelijk om echte primo te leveren met winst. Dat is ook waarom underground labs vaak vervalsen: maakt veel meer margin om gewoon test in een primo-flesje te zetten. Dezelfde dynamiek geldt voor Anavar — duur ruw, vandaar veel fake op de markt.",
      },
    ],
    related: ["anavar", "masteron", "boldenone", "testosteron"],
    knowledge: ["vervalsing-herkennen-coa-lezen", "dht-derivaten-vergelijking"],
  },
  // ---------- PCT ----------
  {
    slug: "nolvadex",
    group: "pct",
    name: "Nolvadex",
    aka: ["Tamoxifen", "Tamox"],
    tagline: "De PCT-essential die je altijd op de plank hebt liggen",
    heroImage: "https://rexqfwibxawqnvrzbdoo.supabase.co/storage/v1/object/public/blog-images/stof/nolvadex-hero.jpg",
    heroImageAlt: "Editorial foto van een amber bottle voor de stof-pagina nolvadex",
    resultImage: "https://rexqfwibxawqnvrzbdoo.supabase.co/storage/v1/object/public/blog-images/stof/nolvadex-resultaat.webp",
    resultImageAlt: "Nolvadex tamoxifen PCT resultaat — fit gespierde man met lab-rapport toont nolvadex post-cycle herstel na anabolen kuur",
    intro:
      "Tamoxifen is de hoeksteen van elke serieuze PCT en je eerste line of defense als gyno-knobbeltjes opduiken. Geen kuur zonder Nolva in de kast.",
    longIntro:
      "Tamoxifen is een SERM (selective estrogen receptor modulator) die in borstweefsel oestrogeen blokkeert maar in de hypofyse juist anti-oestrogeen werkt en daardoor LH/FSH-productie stimuleert. Vandaar de dubbele functie: tijdens cycle als gyno-blocker, en post-cycle als HPTA-restart driver. Origineel een borstkanker-medicijn (al 40+ jaar in gebruik), off-label de meest gebruikte PCT-stof wereldwijd. Goedkoop, betrouwbaar, weinig bijwerkingen — geen reden om er niet 100 tabs van op voorraad te hebben.",
    keyFacts: [
      { label: "Type", value: "SERM (oraal)" },
      { label: "Halfwaardetijd", value: "5-7 dagen" },
      { label: "Typische dosering PCT", value: "40/40/20/20 mg over 4 weken" },
      { label: "Tijdens cycle tegen gyno", value: "10-20 mg/dag" },
      { label: "Lever-belasting", value: "Mild" },
      { label: "Geschikt voor", value: "PCT (essentieel) + on-cycle gyno-prevention" },
    ],
    sections: [
      {
        heading: "Wat is nolvadex en hoe werkt het",
        body: "Tamoxifen bindt aan oestrogeen-receptoren maar werkt weefsel-selectief: in borstweefsel als antagonist (blokkeert oestrogeen — vandaar anti-gyno), in lever en bot als agonist (vandaar mild positief effect op lipiden en botdichtheid). Belangrijk voor PCT: in de hypothalamus en hypofyse blokkeert het oestrogeen-negatieve feedback, waardoor je LH en FSH-productie weer aanslaat. LH stimuleert dan Leydig-cellen in de testes om testosteron te maken. Het effect bouwt op binnen 7-10 dagen. Werkt niet via oestrogeen-verlaging (zoals AI's) maar via receptor-blokkade — vandaar dat het tijdens PCT ideaal is (oestrogeen heb je nodig voor LH-feedback, alleen niet op gevoelige weefsels).",
      },
      {
        heading: "Doseringen en cycle-protocol",
        body: "Klassieke PCT: 40 mg/dag week 1-2, 20 mg/dag week 3-4. Vaak gecombineerd met <a href=\"/clomid\">Clomid</a> (50/50/25/25) voor sterkere HPTA-stimulatie. Start PCT-timing hangt af van je laatste ester: Test Prop = 3-5 dagen, Test E/C = 14 dagen, Sustanon = 21 dagen, Deca/EQ = 21-28 dagen. Tijdens cycle voor gyno: bij eerste tepel-gevoeligheid of knobbeltje start 10-20 mg/dag voor 2-4 weken. Veel sneller effectief bij borst-symptomen dan een <a href=\"/arimidex\">AI</a>. Voor ernstige gyno (zichtbare knobbel): 20-40 mg/dag 4-6 weken kan het terugdraaien — maar als het 6+ maanden oud is, helpt alleen chirurgie.",
      },
      {
        heading: "Risico's en bijwerkingen",
        body: "Mild profiel maar niet zonder. Visuele veranderingen mogelijk maar zeldzamer dan Clomid (flikkering, lichtgevoeligheid). Stemmingsdips komen voor — sommige gasten worden op tamox down/lusteloos. Verminderd libido in de eerste 1-2 weken (lichaam moet opstarten). Mild positief effect op cholesterol (HDL stijgt licht, LDL daalt) — geen reden om bezorgd te zijn. Trombose-risico verhoogd in klinische oncologie-doses (20 mg/dag jarenlang), maar bij PCT-doses (4 weken) klinisch verwaarloosbaar. Lever-enzymen meestal stabiel. Belangrijke note: tamox blokkeert oestrogeen-positieve effecten in IGF-1-cascade — sommigen ervaren een dip in 'pump' en gain-behoud in de PCT-weken.",
      },
      {
        heading: "Onderzoek en bronnen",
        body: "Tamoxifen is een van de meest onderzochte medicijnen wereldwijd. Voor de klassieke PCT-mechanisme studie: Coviello et al., 2005 over tamoxifen-effect op LH en testosteron-recovery na androgeen-suppressie. Voor gyno-behandeling is tamoxifen in meerdere randomized trials vergeleken met aromatase-inhibitors bij idiopathische gynaecomastie — review-data wijst tamoxifen aan als first-line behandeling. Voor lever- en cardiovasculaire veiligheid bij langere therapie: Fisher et al., 1998. Tamoxifen is een echt geregistreerd geneesmiddel — verkrijgbaar als Nolvadex (brand) of generic tamoxifen. Pharma-grade is gemakkelijk te krijgen via researchchem-sources, kwaliteit-issues zijn minder dan bij UGL anabolen.",
      },
      {
        heading: "Wanneer wel/niet kiezen",
        body: "Wel kiezen voor: elke PCT na een androgene cycle, gyno-prevention/management tijdens cycle, mannen op TRT die mild HDL-boost willen (off-label). Niet kiezen als: je een <a href=\"/arimidex\">AI</a> nodig hebt voor E2-controle (Nolva blokkeert geen aromatase), je voor PCT zoekt zonder LH-stimulatie (zeldzaam — vraag een arts), of je een geschiedenis hebt van diepe veneuze trombose. Stack altijd met <a href=\"/clomid\">Clomid</a> voor optimale PCT — solo werkt het, maar combo is superieur.",
      },
    ],
    faqs: [
      {
        question: "Hoe lang werkt nolvadex in je lichaam?",
        answer:
          "Tamoxifen halfwaardetijd is 5-7 dagen, en de actieve metaboliet endoxifen heeft een halfwaardetijd van ~14 dagen. Praktisch betekent dit: na een 4-weekse PCT-cyclus is je systeem pas na ongeveer 4 weken volledig schoon van actieve tamoxifen-werking. Vandaar dat veel gasten zich pas 6-8 weken post-PCT pas weer volledig 'natural' voelen — je lichaam moet de tamox uitwerken én je LH-as moet zelf weer overnemen. Dose 1x per dag is voldoende vanwege de lange halfwaardetijd, vaak 's avonds genomen om visuele bijwerkingen tijdens werken te beperken. Bij gyno-behandeling op-cycle: zelfde 1x daags.",
      },
      {
        question: "Kan ik nolvadex stacken met clomid voor PCT?",
        answer:
          "Ja, de combo Nolva + Clomid is de gouden standaard voor PCT: Nolva 40/40/20/20 + Clomid 50/50/25/25 voor 4 weken. Beide zijn SERMs maar werken via licht andere mechanismen — Clomid stimuleert LH/FSH sterker, Nolva blokkeert gyno-risico en geeft milder cardiovasculair profiel. Samen krijg je sneller en sterker HPTA-herstel dan met één alleen. Sommige gasten ervaren stemmingsdips op Clomid en switchen naar Nolva-only met iets hogere dose (40/40/40/20) — werkt ook prima. Voor langere cycles (16+ weken) of harde stacks (tren/deca) zeker de combo gebruiken, want je as is dieper onderdrukt.",
      },
      {
        question: "Welke bloedwaardes monitoren bij PCT met nolvadex?",
        answer:
          "Pre-PCT (na cycle-einde, vóór PCT-start): totaal test, LH, FSH, oestradiol, prolactine, lever-enzymen — om baseline post-cycle te zien. Op week 4 van PCT: stop met SERMs, wacht 2 weken, dan meten totaal test, LH, FSH. Doel: totaal test boven 400 ng/dL, LH/FSH boven 3 (lab-range afhankelijk). Als testosteron onder 300 ng/dL en LH/FSH laag op week 6 post-PCT: HPTA herstelt niet adequaat — consult een arts of gespecialiseerde TRT-kliniek, want een restart-protocol of TRT kan nodig zijn. Tamoxifen-specifiek: geen unieke bloedwerk-toevoeging, het is vooral testosteron-recovery die je tracked.",
      },
      {
        question: "Kan ik nolvadex on-cycle gebruiken tegen gyno in plaats van een AI?",
        answer:
          "Ja, en bij sommige gevallen werkt het beter. Tamoxifen blokkeert oestrogeen-receptoren in borstweefsel direct — geeft snelle relief bij gevoelige tepels of beginnende knobbel (binnen 3-7 dagen). Een AI (Arimidex) verlaagt oestrogeen serum-breed maar werkt tragere op bestaande gyno-symptomen. Strategie: bij eerste tepelgevoeligheid Nolva 20 mg/dag voor 2-3 weken, daarnaast bloedwerk om E2 te checken en eventueel ook AI bijschakelen voor lange-termijn controle. Nadeel van puur Nolva on-cycle: het verlaagt geen serum-oestrogeen, dus andere oestrogeen-effecten (vochtretentie, libido) blijven. Voor pure E2-control kies AI, voor gyno-rescue kies Nolva of stack ze.",
      },
      {
        question: "Wanneer beginnen met PCT na een cyclus?",
        answer:
          "Hangt 100% af van de ester van je laatste compound, niet van de cycle-totaal-tijd. Vuistregels: Test Propionate 3-5 dagen na laatste prik. Test Enanthate/Cypionate 14 dagen na laatste prik. Sustanon 21 dagen (vanwege decanoate-ester die lang doorwerkt). Deca-Durabolin 21-28 dagen. NPP 10 dagen. Tren A 10 dagen. Tren E 21 dagen. Boldenone 21 dagen. Anavar/Winstrol als oral solo: 3-5 dagen. Te vroeg PCT-starten betekent dat je SERMs vechten tegen nog actieve exogene androgenen — verspilde tijd en pillen. Te laat is minder erg maar je natural test-productie blijft langer flat. Pas vóór je PCT start ook bloed: als test al begint te recoveren spontaan, weet je waar je staat.",
      },
      {
        question: "Is een PCT met alleen nolvadex genoeg?",
        answer:
          "Voor milde cycles (test only, 12 weken, 500 mg) kan Nolva solo werken: 40/40/20/20 voor 4 weken. Voor alles harder (langere cycles, hogere doses, stacks met tren/deca/EQ) is solo Nolva onderbevolkt — voeg Clomid toe of overweeg HCG bridge ervoor. Een lakmoesproef: hoe lang en zwaar was je suppressie? Bij 8 weken test only is recovery vlot, Nolva solo prima. Bij 16 weken Test + Deca + EQ is je as diep onderdrukt — Clomid erbij of HCG 1000 IE EOD voor 10 dagen vóór PCT-start. Een tweede argument voor de combo: Nolva geeft soms libido-dip, Clomid een mentale dip — door beide laag te doseren samen krijg je beter resultaat met minder bijwerkingen.",
      },
    ],
    related: ["clomid", "arimidex", "hcg", "testosteron"],
    knowledge: ["pct-protocol-uitleg"],
  },
  {
    slug: "clomid",
    group: "pct",
    name: "Clomid",
    aka: ["Clomifeen", "Clomifene Citrate"],
    tagline: "De zware jongen onder de SERMs voor HPTA-restart",
    heroImage: "https://rexqfwibxawqnvrzbdoo.supabase.co/storage/v1/object/public/blog-images/stof/clomid-hero.jpg",
    heroImageAlt: "Editorial foto van een farmacie-bottle voor de stof-pagina clomid",
    resultImage: "https://rexqfwibxawqnvrzbdoo.supabase.co/storage/v1/object/public/blog-images/stof/clomid-resultaat.webp",
    resultImageAlt: "Clomid PCT resultaat — gespierde man met bloedwerk in de hand toont clomid post-cycle recovery na testosteron kuur",
    intro:
      "Clomid is je heaviest hitter voor het stimuleren van LH/FSH na een cycle — maar bereid je voor op stemmingsdips en het gevoel dat je hele weken in een mistbank loopt.",
    longIntro:
      "Clomifene citrate is een SERM die in de hypofyse oestrogeen-receptoren blokkeert, waardoor LH en FSH-productie krachtig wordt aangewakkerd — sterker dan Nolva. Oorspronkelijk een vrouwen-vruchtbaarheidsmedicijn (ovulatie-inductie) en off-label dé standaard voor PCT na een anabolenkuur. Probleem: Clomid is ouwer dan testosteron uitvinder zelf en heeft een berucht bijwerkings-profiel — stemmingsdips, visuele klachten (flikkering, gloeiend licht), en je voelt je vaak gewoon kut tijdens PCT. Combineer met Nolva voor beste resultaat met minste klachten.",
    keyFacts: [
      { label: "Type", value: "SERM (oraal)" },
      { label: "Halfwaardetijd", value: "~5-7 dagen" },
      { label: "Typische dosering PCT", value: "50/50/25/25 mg over 4 weken" },
      { label: "Lever-belasting", value: "Mild" },
      { label: "Bijwerkings-profiel", value: "Stemming, visuele veranderingen, libido-dip" },
      { label: "Geschikt voor", value: "PCT en HPTA-restart" },
    ],
    sections: [
      {
        heading: "Wat is clomid en hoe werkt het",
        body: "Clomifene citrate is een mengsel van twee isomeren: zuclomifeen (oestrogene werking, langer in lichaam) en enclomifeen (anti-oestrogene werking, korter). Het bindt aan oestrogeen-receptoren in de hypothalamus en blokkeert daar de negatieve feedback van oestrogeen op GnRH-productie. Resultaat: GnRH gaat omhoog, hypofyse pompt LH en FSH uit, en de Leydig-cellen in je testes worden gestimuleerd om testosteron te produceren. Effect op LH-spike is meetbaar binnen 3-5 dagen. Sterker dan Nolva qua pure LH-stimulatie, maar de zuclomifeen-isomeer blijft weken in je systeem rondhangen en is verantwoordelijk voor veel van de mentale ellende. Enclomifeen-only (Androxal) bestaat als alternatief — zonder de stemmingsproblemen — maar is veel duurder en moeilijker te krijgen.",
      },
      {
        heading: "Doseringen en cycle-protocol",
        body: "Klassiek Clomid PCT: 50 mg/dag week 1-2, 25 mg/dag week 3-4. Vrijwel altijd gecombineerd met <a href=\"/nolvadex\">Nolvadex</a> (40/40/20/20). Voor zwaardere cycles (16+ weken, hoge doses, stacks met <a href=\"/trenbolone\">tren</a>/<a href=\"/nandrolon\">deca</a>): front-load met 100 mg dag 1, dan 50 mg/dag voor weken 1-2. Start-timing zelfde als Nolva — hangt van ester af (Test E 14 dgn na laatste prik, deca 21-28 dgn, etc). Sommige gasten gebruiken Clomid solo op 50/50/25/25 of 100/50/50/25 voor extra LH-push — werkt maar bijwerkingen vermenigvuldigen. Voor lichte cycles (kortere oral-only cycles van 6 wkn): 25 mg/dag voor 3 weken vaak voldoende.",
      },
      {
        heading: "Risico's en bijwerkingen",
        body: "De big one: visuele veranderingen. Flikkering, glow-haloen rond lichten, lichtgevoeligheid, soms wazig zien. Bij meeste mensen mild en omkeerbaar — bij sommigen blijvend (zeldzaam). Bij visuele klachten: stop en switch naar puur Nolva. Stemmingsdips zijn berucht — laag energie, mentale mist, kort lontje, soms depressieve gevoelens. Vandaar dat veel gasten zeggen 'Clomid voelt erger dan de cycle zelf'. Libido-dip in eerste 1-2 weken (lichaam moet opstarten). Migraine kan voorkomen. Cardiovasculair: mild positief op lipiden (HDL stijgt). Trombose-risico in oncologie-doses, bij PCT-doses verwaarloosbaar. Hoofdpijn, opvliegers en misselijkheid bij hogere doses.",
      },
      {
        heading: "Onderzoek en bronnen",
        body: "Clomifene citrate is al sinds 1967 in klinisch gebruik. Voor het gebruik bij hypogonadisme en HPTA-restart: Katz et al., 2012 over clomifene-citrate effect op testosteron en LH bij hypogonadale mannen. Voor PCT specifiek: Tsourdi et al., 2009 over SERM-protocollen voor androgeen-deficient mannen. Voor visuele bijwerkingen en oogheelkundige effecten: Purvin, 1995. Voor enclomifeen-only alternatief: Wiehle et al., 2014. Clomid is een pharma-grade geregistreerd geneesmiddel, kwaliteit-issues bij researchchem-sources beperkt.",
      },
      {
        heading: "Wanneer wel/niet kiezen",
        body: "Wel kiezen voor: zwaarder gesuppresseerde cycles (lange duur, hoge dose, harde stacks), PCT na <a href=\"/hcg\">HCG</a>-bridge, restart-protocollen voor mannen met blijvende post-cycle hypogonadisme. Niet kiezen als: je gevoelig bent voor depressie/stemming, je een baan hebt waar visuele helderheid kritiek is (piloot, chirurg, etc), je een mild cycle hebt waar <a href=\"/nolvadex\">Nolva</a> solo voldoet, of je een hoge mentale eisen-periode hebt (deadlines, examens — Clomid mist je hoofd). Switch naar enclomifeen of pure Nolva als bijwerkingen ondraaglijk zijn.",
      },
    ],
    faqs: [
      {
        question: "Hoe lang werkt clomid in je lichaam?",
        answer:
          "Clomifene citrate halfwaardetijd 5-7 dagen voor enclomifeen, maar de zuclomifeen-isomeer kan tot 6 weken doorhangen in je systeem. Dat betekent dat de actieve LH-stimulatie binnen 7-10 dagen na laatste dose stopt, maar de stemmings- en oestrogene effecten van zuclomifeen pas weken later volledig weg zijn. Voor PCT dose je 1x per dag (lange halfwaardetijd maakt splitsen onnodig), meestal 's avonds om visuele bijwerkingen tijdens werk te beperken. Na een 4-weekse PCT-cyclus voel je je vaak pas 6-8 weken later weer volledig normaal qua stemming en libido — dat is normaal en geen reden om opnieuw te kuren. Geduld.",
      },
      {
        question: "Kan ik clomid solo gebruiken voor PCT?",
        answer:
          "Ja, kan, maar suboptimaal voor de meeste gevallen. Clomid solo dose: 50/50/25/25 over 4 weken, of voor zwaardere cycles 100/50/50/25. Het werkt — LH/FSH komt sterk terug — maar je krijgt het volle stemmings- en visuele bijwerkings-pakket. Met Nolva erbij (40/40/20/20 + Clomid 50/50/25/25) krijg je betere bescherming tegen gyno-rebound, mildere stemming, en sneller HPTA-herstel. Solo Clomid alleen aan te raden als: Nolva niet beschikbaar is, je bewust kiest voor pure LH-push, of je een korte/milde cycle had waar overkill ongewenst is. Voor zwaardere stacks altijd de combo.",
      },
      {
        question: "Welke bloedwaardes monitoren tijdens PCT met clomid?",
        answer:
          "Pre-PCT (na cycle, vóór PCT-start): totaal test, vrij test, LH, FSH, E2 sensitive, prolactine, lever-enzymen. Dit is je baseline. Eindigt cycle met test op 1500 ng/dL (suppressed natural prod) en LH op 0.1 IU/L (compleet onderdrukt), dan weet je waar je vandaan komt. Op week 4 van PCT: stop SERMs, wacht 2 weken, dan meten totaal test, LH, FSH. Doel: test boven 400-500 ng/dL, LH en FSH boven 3 IU/L (range-afhankelijk). Op week 8 post-PCT: nogmaals checken — als test nog onder 300 en LH/FSH laag, dan herstelt je as niet adequaat. Restart-protocol of TRT-consult dan overwegen. Stemming bijhouden in dagboek tijdens Clomid — als depressie te zwaar wordt, switch naar Nolva-only.",
      },
      {
        question: "Is clomid geschikt om mijn libido te boosten zonder kuur?",
        answer:
          "Nee, en geen goed idee. Clomid (off-label) wordt soms voorgeschreven aan mannen met secundair hypogonadisme (lage LH/test door hypofyse-issue) om endogeen test op te krikken — maar dat gaat onder medische begeleiding, lage dose (12.5-25 mg E2D), met bloedwerk-monitoring. Voor recreatief gebruik (gewoon libido-boost als gezonde man) is het overdreven: je tikt LH op, krijgt soms een test-spike, maar de stemming- en visuele bijwerkingen overschaduwen het effect snel. Plus de E2 stijgt mee, wat juist libido kan tegenwerken. Voor recreatieve test-boost zijn supplementen (Tongkat Ali, fadogia agrestis, zink) of bij echt hypogonadisme TRT betere opties.",
      },
      {
        question: "Wat zijn de visuele bijwerkingen van clomid en zijn ze blijvend?",
        answer:
          "De klassieke clomid-visuals: flikkering rond lichtbronnen ('s avonds erger), glow/halo rond lampen, lichtgevoeligheid, soms wazig zien, soms persistente nabeelden (zie je een lamp, blijft het beeld 30 seconden in je netvlies). Komt door zuclomifeen-isomeer die de oestrogeen-receptoren in oog (retina-pigment-epitheel) verstoort. Bij meeste gasten mild en binnen 1-4 weken na stop weg. In zeldzame gevallen blijvend — case reports van persisterende visuele klachten bestaan, vooral na hogere doses en langer gebruik. Strategie: bij eerste visuele klachten dose halveren of stoppen en switchen naar pure Nolva. Niet doorduwen 'omdat de PCT toch nodig is' — visuele schade is het niet waard.",
      },
      {
        question: "Clomid of nolvadex — wat moet ik kiezen voor PCT?",
        answer:
          "Beide, niet één. De combo Nolva 40/40/20/20 + Clomid 50/50/25/25 is de standaard voor 90% van de cycles. Clomid biedt sterkere LH/FSH-push, Nolva biedt gyno-bescherming en mildere bijwerkingen. Solo Nolva kan voor lichte cycles (test only, 12 wkn), solo Clomid is meestal niet aan te raden door bijwerkingen. Voor wie absoluut één moet kiezen: Nolva-only met iets verhoogde dose (40/40/40/20) is de minder pijnlijke optie. Modern alternatief is enclomifeen (Androxal) — pure anti-oestrogene isomeer van Clomid zonder stemmingsbijwerkingen — maar duurder en lastiger te krijgen. Spaar Clomid voor wanneer je het echt nodig hebt: zware cycles, lange stacks.",
      },
    ],
    related: ["nolvadex", "hcg", "arimidex", "testosteron"],
    knowledge: ["pct-protocol-uitleg"],
  },
  {
    slug: "arimidex",
    group: "pct",
    name: "Arimidex",
    aka: ["Anastrozol", "Adex", "AI"],
    tagline: "Aromatase-remmer voor oestrogeen-controle op je cycle",
    heroImage: "https://rexqfwibxawqnvrzbdoo.supabase.co/storage/v1/object/public/blog-images/stof/arimidex-hero.jpg",
    heroImageAlt: "Macro foto van een klein bottle voor de stof-pagina arimidex",
    resultImage: "https://rexqfwibxawqnvrzbdoo.supabase.co/storage/v1/object/public/blog-images/stof/arimidex-resultaat.webp",
    resultImageAlt: "Arimidex anastrozole resultaat — droog gedefinieerd gespierde bodybuilder toont arimidex effect zonder oestrogeen waterretentie",
    intro:
      "Arimidex is je veiligheidsklep voor oestrogeen op een aromatiseerbare kuur — micro-doseren op basis van bloedwerk, niet 'preventief' inslikken want te laag E2 sloopt je libido en gewrichten net zo hard.",
    longIntro:
      "Anastrozol is een aromatase-remmer (AI) die de aromatase-enzyme tegenhoudt — daardoor zet je test minder om in oestradiol. Standaard tool tijdens cycles met test, dbol, of andere aromatiseerbare stoffen. Het grootste misverstand: 'meer AI = beter'. Klopt niet. E2 onder 20 pg/mL voelt vaak slechter dan E2 op 60: libido op nul, droge knarsende gewrichten, mentale dip, lipiden tank. Dose op basis van bloedwerk, niet op gevoel.",
    keyFacts: [
      { label: "Type", value: "Aromatase-remmer (reversibel, niet-steroidaal)" },
      { label: "Halfwaardetijd", value: "~48 uur" },
      { label: "Typische dosering", value: "0.25-0.5 mg E3D, titreren op E2-bloedwerk" },
      { label: "Lever-belasting", value: "Mild" },
      { label: "Doel", value: "Oestrogeen-controle on-cycle (NIET voor PCT)" },
      { label: "Doel-E2", value: "20-35 pg/mL (sensitive assay)" },
    ],
    sections: [
      {
        heading: "Wat is arimidex en hoe werkt het",
        body: "Anastrozol bindt reversibel aan de aromatase-enzyme — competitief, dus het kan loslaten wanneer concentratie zakt. Daardoor wordt minder testosteron omgezet in oestradiol (E2). Effect is snel: binnen 24-48 uur zie je E2 zakken. Reversibel betekent ook dat als je een dosis overslaat, aromatase weer aanslaat en E2 binnen 1-2 dagen oploopt. Vandaar dat veel gasten E3D doseren in plaats van dagelijks. Effect op E2 is dose-dependent: 0.25 mg E3D zakt E2 met 30-40%, 0.5 mg dagelijks tot 70%. Dose te hoog = E2 crash, alle ellende van te lage E2. Te laag = gyno-risico en vochtretentie. Sweet spot zoeken via bloedwerk.",
      },
      {
        heading: "Doseringen en cycle-protocol",
        body: "Start lage dose op basis van cycle: 500 mg <a href=\"/testosteron\">Test</a> alleen meestal 0.25 mg E3D voldoende, 750 mg Test of stack met <a href=\"/dianabol\">Dbol</a> kan 0.5 mg E3D nodig zijn. Eerste bloedwerk op week 4-6 — E2 sensitive assay (NIET de standaard, vraag specifiek 'oestradiol sensitief LC-MS/MS'). Doel: E2 tussen 20-35 pg/mL. Boven 45: dose verhogen of frequenter. Onder 20: dose verlagen of overslaan. Een week na aanpassing weer bloedwerk. Voor anti-gyno on-cycle: arimidex is preventief, voor actieve gyno-knobbel start je beter met <a href=\"/nolvadex\">Nolva</a> 20 mg/dag (snellere receptor-blockade). PCT-fase: GEEN Arimidex meer, want PCT heeft E2 nodig voor LH-feedback.",
      },
      {
        heading: "Risico's en bijwerkingen",
        body: "Te hoge dose is het grootste risico — E2 crash geeft: libido-verlies, erectile dysfunction, droge knarsende gewrichten (vooral bij compounds), depressie/mentale flat, vermoeidheid, slechtere pumps, HDL-cholesterol daalt. Lipiden-impact: LDL kan licht stijgen. Bot-mineraal-densiteit daalt bij langdurig hoge dose (relevant bij maanden TRT-gebruik). Lever-enzymen meestal stabiel. Bij vrouwen (zeldzaam gebruik): brandende opvliegers, stemmingsdips. Belangrijk: bij gevoeligheid voor stemming kies Aromasin in plaats van Arimidex — Aromasin geeft milder mentaal profiel volgens veel ervaringen. Stop NOOIT abrupt op hoge dose — rebound oestrogeen kan acute gyno triggeren. Bouw af in stappen.",
      },
      {
        heading: "Onderzoek en bronnen",
        body: "Arimidex (anastrozol) is sinds 1995 op de markt voor borstkanker bij postmenopauzale vrouwen — veel klinische data. Voor effect op test/E2-ratio bij mannen: Mauras et al., 2009 over anastrozol-effect bij hypogonadale mannen. Voor de E2-sweet-spot studie bij mannen: Finkelstein et al., NEJM 2013 — landmark studie die laat zien dat zowel te laag als te hoog E2 schadelijk is. Voor lange-termijn AI-gebruik en botdensiteit: Eastell et al., 2008. Arimidex is een geregistreerd geneesmiddel, kwaliteit van pharma-versie hoog. UGL/research-chem versies kunnen wisselen — vraag HPLC bij twijfel.",
      },
      {
        heading: "Wanneer wel/niet kiezen",
        body: "Wel kiezen voor: cycles met aromatiseerbare compounds (<a href=\"/testosteron\">test</a>, <a href=\"/dianabol\">dbol</a>, Sustanon, EQ in hogere doses), gyno-prevention bij wie aanleg heeft, mannen op TRT met chronisch verhoogd E2. Niet kiezen als: je een non-aromatiseerbare cycle hebt (tren only, primobolan only, anavar/winstrol), je in PCT-fase zit (E2-suppressie tegenwerkt LH-restart), je libido al laag is door andere oorzaken (eerst dat oplossen voordat je AI toevoegt), of je geen toegang tot E2-bloedwerk hebt (blind doseren is een gok). Voor wie milder mentaal profiel wil: kies Aromasin (exemestane) als alternatief.",
      },
    ],
    faqs: [
      {
        question: "Hoe lang werkt arimidex in je lichaam?",
        answer:
          "Anastrozol halfwaardetijd is ~48 uur. Praktisch betekent dit: bij E3D-dosering houd je stabielere E2-spiegels dan bij eenmaal-per-week-doseren. Stop je met Arimidex, dan aromatase-activiteit binnen 2-3 dagen weer normaal en E2 kan binnen een week terug naar baseline. Niet abrupt stoppen op hogere doses (>0.5 mg/dag) — risico op estrogen rebound die acute gyno kan triggeren. Bouw af: bv 1 wk halve dose, dan stop. Voor PCT-overgang: laatste week van cycle Arimidex langzaam afbouwen, dan stop wanneer SERMs starten. Detectietijd in dopingcontrole: WADA verbiedt aromatase-remmers, detecteerbaar tot 4 weken na laatste dose.",
      },
      {
        question: "Hoeveel arimidex moet ik nemen op 500 mg test per week?",
        answer:
          "Standaard startpunt: 0.25 mg E3D (om de 3 dagen). Eerste bloedwerk op week 4-6 met E2 sensitive assay (NIET standaard E2 — vraag specifiek LC-MS/MS sensitive). Doel: E2 tussen 20-35 pg/mL. Krijg je E2 op 50 pg/mL met die dosering? Verhoog naar 0.5 mg E3D of 0.25 mg EOD. Krijg je E2 op 15 pg/mL? Verlaag naar 0.25 mg 2x/wk. Bij 750 mg test of stack met dbol start op 0.5 mg E3D. Belangrijk: blind doseren ('1 mg per week is standaard') is hoe mensen E2 crashen of juist gyno krijgen. Iedereen aromatiseert anders — bloedwerk vertelt je waar je zit. Adex verlaagt E2 binnen 24-48 uur, dus 1 wk na dose-aanpassing nogmaals checken.",
      },
      {
        question: "Kan ik arimidex tijdens PCT gebruiken?",
        answer:
          "Nee, doe dat niet. PCT-mechanisme vereist juist dat oestrogeen aanwezig is, want SERMs werken via blokkade van oestrogeen-negatieve-feedback op hypothalamus — je hebt E2 nodig om LH-respons te triggeren. AI tijdens PCT zet de E2 onder waar het hoort, suppresseert daarmee de LH-respons die je probeert te induceren, en verlengt je HPTA-herstel. Klassieke fout: gast denkt 'oestrogeen is slecht dus AI altijd doorlopen'. Resultaat: PCT mislukt, test komt niet terug, libido dood. Tijdens PCT alleen SERMs (Nolva + Clomid). Krijg je gyno-rebound tijdens PCT (zeldzaam): Nolva-dose tijdelijk verhogen, geen AI gebruiken.",
      },
      {
        question: "Welke E2-bloedwaardes moet ik aanhouden?",
        answer:
          "Gebruik altijd 'E2 sensitive assay' (LC-MS/MS) — de standaard E2-test in Nederland (immunoassay) is onnauwkeurig voor mannen, vooral bij waarden onder 50 pg/mL. Vraag bij lab specifiek 'oestradiol sensitief'. Sweet spot voor mannen op cycle: 20-35 pg/mL (op TRT-dose iets lager, op blast iets hoger acceptabel). Boven 45-50 pg/mL: AI verhogen, kans op gyno en vochtretentie. Onder 15-20: AI verlagen, kans op libido-crash en gewrichtspijn. Symptomen overeenkomen met bloedwerk: gevoelige tepels en bloat = hoog. Droge gewrichten, geen ochtend-erectie, depressief = laag. Beslis op bloedwerk + symptomen samen.",
      },
      {
        question: "Arimidex of aromasin — wat is beter?",
        answer:
          "Beide werken voor E2-controle, met verschillen. Arimidex (anastrozol) is reversibel en niet-steroidaal — dose-flexibel, snel aanpasbaar. Aromasin (exemestane) is irreversibel en steroidaal — bindt permanent aan aromatase-enzymes (nieuwe enzymes moeten worden aangemaakt voor herstel). Voordelen Aromasin: milder stemming-profiel voor velen, geen E2-rebound bij staken, mild anabool effect zelf (kleine ADD via DHT-route). Nadeel: bij overdosering moeilijker te corrigeren (moet wachten tot nieuwe aromatase opbouwt, 1-2 weken). Voor wie stemmingsklachten ervaart op Adex: switch naar Aromasin 12.5 mg E3D. Voor wie microdose-control wil: Adex 0.125-0.25 mg is flexibeler.",
      },
      {
        question: "Heb ik arimidex nodig op een tren-only cycle?",
        answer:
          "Nee, want trenbolone aromatiseert niet — er wordt geen E2 uit gemaakt. Probleem: vrijwel niemand draait tren-only (en het is een slecht idee — libido stort in zonder test-basis). Op een Test + Tren stack heb je nog steeds Adex nodig voor de test-component. Veel gasten denken 'tren is droog dus ik schrap Adex' — en krijgen dan E2-bloat van hun test alsnog. Wel speelt op tren een ander oestrogeen-achtig probleem: progesteron-route gyno (door tren's binding aan PR), waar Adex NIET tegen helpt. Daarvoor heb je Nolva of caber nodig. Bloedwerk om E2 te scheiden van progesteron-gyno-signalen — symptomen overlappen.",
      },
    ],
    related: ["nolvadex", "clomid", "hcg", "testosteron", "dianabol"],
    knowledge: ["oestrogeen-controle", "bloedwerk-voor-tijdens-na"],
  },
  {
    slug: "hcg",
    group: "pct",
    name: "HCG",
    aka: ["Pregnyl", "Humaan Choriongonadotrofine", "Ovitrelle"],
    tagline: "Houdt je ballen wakker tijdens je cycle",
    heroImage: "https://rexqfwibxawqnvrzbdoo.supabase.co/storage/v1/object/public/blog-images/stof/hcg-hero.jpg",
    heroImageAlt: "Forensische clinical foto van een vial voor de stof-pagina hcg",
    resultImage: "https://rexqfwibxawqnvrzbdoo.supabase.co/storage/v1/object/public/blog-images/stof/hcg-resultaat.webp",
    resultImageAlt: "HCG kuur resultaat — gezonde gespierde man met HCG vial toont typische Leydig-cell restauratie tijdens of na anabolen",
    intro:
      "HCG is geen anabool en geen SERM — het mimic LH en houdt je testes actief tijdens je cycle. Resultaat: geen kleine raisin-ballen na je kuur en sneller HPTA-herstel.",
    longIntro:
      "Humaan Choriongonadotrofine is een placenta-hormoon dat in lichaam vrijwel identiek werkt aan LH (luteinizing hormone). Tijdens een anabolenkuur is je natuurlijke LH onderdrukt, je testes 'slapen' en krimpen. HCG vervangt die LH-signal en houdt Leydig-cellen actief — voorkomt testes-atrofie en houdt natuurlijke test-productie op een laag pitje door. Cruciaal voor wie kinderen wil (behoud van vruchtbaarheid) of voor lange cycles waar HPTA-herstel anders een drama wordt.",
    keyFacts: [
      { label: "Type", value: "Gonadotrofine (subcutaan/intramusculair)" },
      { label: "Halfwaardetijd", value: "~36 uur" },
      { label: "Typische dosering on-cycle", value: "250-500 IE 2x per week" },
      { label: "Vóór-PCT bridge", value: "1000-2500 IE EOD, 10-14 dagen" },
      { label: "Lever-belasting", value: "Geen" },
      { label: "Doel", value: "Testikulair behoud + HPTA-herstel" },
    ],
    sections: [
      {
        heading: "Wat is HCG en hoe werkt het",
        body: "HCG is een glycoproteine dat door de placenta wordt geproduceerd tijdens zwangerschap — het houdt het corpus luteum actief in vrouwen. Bij mannen werkt HCG op de LH-receptor op Leydig-cellen in de testes — identieke binding als LH, dus de cellen denken dat hypofyse-LH binnenkomt en blijven <a href=\"/testosteron\">testosteron</a> produceren. Tijdens een anabolenkuur is exogeen testosteron hoog, hypothalamus stopt GnRH, hypofyse stopt LH, Leydig-cellen krijgen geen signaal en stoppen met werken — testes krimpen binnen 4-6 weken. HCG vervangt de LH-signal en houdt de machinerie draaiend. Belangrijk: HCG werkt op de testes, NIET op hypothalamus/hypofyse — herstart je hypofyse niet, dat blijft het werk van SERMs in PCT.",
      },
      {
        heading: "Doseringen en cycle-protocol",
        body: "Twee benaderingen. Klassiek 'on-cycle': vanaf week 3-4 250 IE 2x per week (maandag/donderdag) tot 2 weken voor PCT. Houdt testes op formaat, voorkomt atrofie, vlot HPTA-herstel. Modern: 'blast-cruise gasten' nemen 500 IE 2x per week continu op TRT-base. Voor vóór-PCT 'bridge': 1000-2500 IE EOD voor 10-14 dagen, daarna SERMs starten. Doel: testes wakker maken voor de SERM-trigger. Niet overdoseren — boven 1500 IE per shot wordt aromatase in de testes geactiveerd en E2 schiet omhoog. Eindigt 5-7 dagen vóór SERM-PCT start. Mengen: HCG komt als poeder + waterampul, mengen, kort houdbaar in koelkast (2-4 weken).",
      },
      {
        heading: "Risico's en bijwerkingen",
        body: "Bij correcte dose: minimaal. Het belangrijkste risico is overdoseren — boven 1000 IE per shot stijgt E2 vaak fors (HCG triggert aromatase in testes), wat gyno of vochtretentie kan geven. Vandaar dat on-cycle 250 IE 2x per week ideaal is. Lange-termijn hoge dose (>3000 IE per week voor maanden): Leydig-cellen kunnen 'desensitiseren' voor LH/HCG (downregulation) — minder respons op later HCG of natural LH. Daarom HCG nooit jaren onafgebroken op hoge dose. Locale reactie bij injectie mogelijk (rood plekje, niet ernstig). Hoofdpijn bij hogere doses. Kan vermoeidheid geven bij sommige gasten. Geen lever-belasting, geen significante lipiden-impact bij standaard dose.",
      },
      {
        heading: "Onderzoek en bronnen",
        body: "HCG-gebruik bij mannen is uitgebreid onderzocht in vruchtbaarheids-context. Voor on-cycle HCG om testikulair volume te behouden: Coviello et al., 2005 over LH-mimetiek bij androgeen-suppressie. Voor HCG bij hypogonadale mannen en spermatogenese-behoud: Liu et al., 2005. Voor de relatie tussen HCG-dose en E2-stijging: Hsieh et al., 2013 over HCG-effect op intratesticulaire E2. HCG-producten als Pregnyl (Organon) en Ovitrelle (recombinant) zijn pharma-grade — UGL-HCG is er ook, kwaliteit wisselt. Pharma-grade altijd voorkeur voor dit specifieke peptide.",
      },
      {
        heading: "Wanneer wel/niet kiezen",
        body: "Wel gebruiken voor: lange cycles (12+ weken), zware stacks waar HPTA-suppressie diep gaat, mannen die vruchtbaar willen blijven (spermatogenese-behoud), blast-cruise gasten die op TRT-cruise testikulair volume willen behouden. Niet gebruiken als: het je eerste of tweede korte cycle is (10 weken test only herstelt vaak ook zonder HCG), je een korte oral-only cycle hebt, of je een geschiedenis hebt van hCG-allergie. Niet vervangen voor SERM-PCT — HCG is alleen testikulair, SERMs (<a href=\"/nolvadex\">Nolva</a>, <a href=\"/clomid\">Clomid</a>) zijn voor hypofyse-as.",
      },
    ],
    faqs: [
      {
        question: "Hoe lang werkt HCG in je lichaam?",
        answer:
          "HCG halfwaardetijd is ~36 uur na subcutane injectie, sneller na intramusculaire (~24 uur). Praktisch betekent dit: 2x per week (Mon/Thu) prikken houdt stabiele Leydig-cell-stimulatie. Bij hogere bridge-doses E2D (om de dag). Bij correct prikken: testes blijven op normaal volume binnen 2-3 weken na start. Stop je met HCG: Leydig-cellen krijgen weer geen LH-signal (want hypofyse-LH is suppressed door cycle) en zakken in 1-2 weken weer terug naar slaap. Vandaar dat sommige gasten HCG continu doorlopen tot 2 weken voor PCT, niet eerder stoppen. Detectietijd in dopingcontrole: WADA-verboden, detecteerbaar tot 3-4 dagen na laatste prik.",
      },
      {
        question: "Kan ik HCG gebruiken in plaats van PCT met SERMs?",
        answer:
          "Nee, HCG alleen is geen vervanging voor PCT. HCG werkt op de testes (Leydig-cellen), maar je hypothalamus en hypofyse blijven onderdrukt — die zijn de bron van LH-productie. Stop je HCG zonder SERMs erna, dan stopt de Leydig-stimulatie en je natural test crasht alsnog. Correcte volgorde: HCG bridge 10-14 dagen aan einde van cycle (1000-2500 IE EOD) om testes weer responsive te maken, dan stop HCG, wacht 5-7 dagen, dan start SERMs (Nolva + Clomid) voor 4 weken om hypothalamus/hypofyse te restarten. HCG alleen = symptoom-management, SERMs = oorzaak-management. Beide hoort erbij voor zware cycles.",
      },
      {
        question: "Welke bloedwaardes monitoren bij HCG-gebruik?",
        answer:
          "Bij on-cycle HCG (250 IE 2x/wk): geen extra unieke bloedwaardes nodig naast standaard test-cycle-monitoring. E2 wel scherper omdat HCG aromatase in testes activeert — als je E2 'random' omhoog schiet midden in cycle, check of je HCG-dose niet te hoog is. Bij hogere bridge-doses (1000+ IE EOD): meet vóór PCT-start totaal test, LH, FSH, E2 — om te zien hoe responsive je testes nog zijn. Hoge test + lage LH = HCG werkt, hypofyse nog onderdrukt — normaal vlak voor PCT. PSA bij 40+. Bij langdurig HCG-gebruik (maanden, blast-cruise): meet ook prolactine — kan stijgen.",
      },
      {
        question: "Is HCG geschikt voor een eerste kuur?",
        answer:
          "Niet noodzakelijk maar handig. Voor een 12-weekse test-only first cycle herstelt HPTA meestal binnen 3-4 maanden ook zonder HCG. Maar veel beginners voegen het toe om testikulair krimp te voorkomen (cosmetisch) en als 'insurance' voor herstel. Als je het doet: 250 IE 2x per week vanaf week 4-5 tot week voor PCT, daarna 1000 IE EOD voor 10 dagen vóór SERMs. Te ingewikkeld voor eerste-kuur? Skip het, focus op solide test-cycle en goede PCT met Nolva + Clomid. Voor cycle 2 en verder, vooral als je lange of zware stacks gaat draaien, wordt HCG een vast onderdeel van je protocol.",
      },
      {
        question: "Hoe meng en bewaar ik HCG correct?",
        answer:
          "Pregnyl komt als poeder + bacteriostatic water of saline ampul. Meng door water langzaam in poeder-ampul te spuiten (niet schudden, draaien). Standaard mix: 5000 IE poeder + 5 ml water = 1000 IE per ml. Bewaar in koelkast (2-8°C), niet vriezen. Houdbaar 4 weken na mengen — daarna afnemend in potency. Voor langere houdbaarheid: meng met bacteriostatic water (NIET sterile water — verschil zit in benzyl-alcohol als preservative). Ovitrelle (recombinant) komt als kant-en-klare prefilled pen, 250 mcg = 6500 IE, makkelijker maar duurder. Prik subcutaan (buikvet) met insuline-naald 30G 8mm, niet pijnlijk. Intramusculair kan ook maar SC is geprefereerd voor HCG.",
      },
      {
        question: "Moet ik HCG door de hele cycle of alleen op het eind gebruiken?",
        answer:
          "Twee scholen. School 1 ('throughout'): 250-500 IE 2x per week vanaf week 3-4 tot 2 weken voor PCT. Voordelen: testes blijven on volume, geen krimp, Leydig-cellen blijven responsive, vlotter PCT-herstel. Nadeel: continu prikken, extra cost. School 2 ('bridge only'): geen HCG on-cycle, alleen 1000-2500 IE EOD voor 10-14 dagen aan einde cycle voor PCT-start. Voordelen: minder injecties, goedkoper. Nadeel: testes krimpen tijdens cycle, herstel kan trager. Modern advies: voor cycles < 12 weken school 2 voldoet, voor cycles > 12 weken of zware stacks school 1 (throughout) is superieur. Blast-cruise gasten gebruiken throughout op TRT-cruise voor jaren-stabiel testikulair volume + vruchtbaarheid-behoud.",
      },
    ],
    related: ["nolvadex", "clomid", "arimidex", "testosteron", "trenbolone"],
    knowledge: ["pct-protocol-uitleg"],
  },
];

export function findCategoryContent(slug: string) {
  return categoryContent.find((c) => c.slug === slug);
}

export function categoriesByGroup(group: GroupSlug) {
  return categoryContent.filter((c) => c.group === group);
}

// ---------------------------------------------------------------------------
// Top-level groups voor navigatie
// ---------------------------------------------------------------------------

export const groups = [
  {
    slug: "anabolen" as const,
    name: "Anabolen",
    description: "Injecteerbare en orale anabole stoffen, per stof uitgesplitst.",
    image: img("photo-1576086213369-97a306d36557"),
  },
  {
    slug: "pct" as const,
    name: "PCT",
    description: "Post-cycle therapy: SERMs, AI's en HCG voor hormoonherstel.",
    image: img("photo-1587854692152-cbe660dbde88"),
  },
];

// ---------------------------------------------------------------------------
// Knowledge base
// ---------------------------------------------------------------------------

export interface KnowledgeArticle {
  slug: string;
  kindTag: string;
  title: string;
  excerpt: string;
  image: string;
  publishedAt: string;
  updatedAt?: string;
  author: { name: string; credentials: string };
  body: { heading: string; paragraphs: string[] }[];
  related: string[];
  relatedCategories?: string[];
}

export const knowledgeArticles: KnowledgeArticle[] = [
  {
    slug: "testosteron-kuur-opbouwen",
    kindTag: "Gids",
    title: "Een eerste testosteron-kuur opbouwen: stap voor stap",
    excerpt: "Wat hoort er allemaal in een eerste testosteron-onderzoekscyclus, en wat juist niet.",
    image: img("photo-1576086213369-97a306d36557"),
    publishedAt: "04-06-2026",
    updatedAt: "12-06-2026",
    author: { name: "Dr. Iris Verhoef", credentials: "biochemicus" },
    body: [
      { heading: "Waarom altijd testosteron als basis", paragraphs: [
        "Vrijwel alle anabole stoffen onderdrukken de eigen testosteronproductie via negatieve feedback op de hypothalamus en hypofyse. Een externe basis testosteron voorkomt dat onderzoekers in een hypogonadale toestand belanden tijdens de cyclus.",
        "Voor een eerste onderzoek wordt 300–500 mg testosteron enanthate of cypionate per week beschreven in literatuur — verdeeld over twee injecties.",
      ]},
      { heading: "Hoe lang", paragraphs: [
        "10 tot 16 weken is het meest beschreven bereik. Korter dan 10 weken laat langwerkende esters niet stabiel oplopen; langer dan 16 weken stapelt bijwerkingsrisico zonder evenredige winst.",
      ]},
      { heading: "Bloedwerk", paragraphs: [
        "Voor start, halverwege en 6 weken na PCT: totaal testosteron, vrij testosteron, oestradiol (gevoelig), hematocriet, lever (ALT/AST), nuchter lipidenprofiel, prolactine.",
      ]},
      { heading: "PCT plannen vóór je begint", paragraphs: [
        "Een cyclus zonder PCT-plan is in literatuur onverdedigbaar. Bestel tamoxifen en clomid vóór start, niet erna.",
      ]},
    ],
    related: ["pct-protocol-uitleg", "bloedwerk-voor-tijdens-na"],
    relatedCategories: ["testosteron", "nolvadex"],
  },
  {
    slug: "pct-protocol-uitleg",
    kindTag: "Protocol",
    title: "PCT-protocol: Nolvadex, Clomid en HCG in onderlinge samenhang",
    excerpt: "Hoe SERMs en HCG samen werken om hormoonherstel na een cyclus te onderzoeken.",
    image: img("photo-1587854692152-cbe660dbde88"),
    publishedAt: "29-05-2026",
    author: { name: "Mark de Wit", credentials: "onderzoeksjournalist" },
    body: [
      { heading: "Waarom PCT", paragraphs: [
        "Na een androgene cyclus is de eigen LH- en FSH-productie onderdrukt. Zonder ingreep kan herstel maanden tot jaren duren. PCT-protocollen versnellen dit door SERMs (tamoxifen, clomid) die oestrogeen-feedback blokkeren en zo LH-afgifte stimuleren.",
      ]},
      { heading: "Standaard schema", paragraphs: [
        "Week 1–2: Clomid 50 mg/dag + Nolvadex 40 mg/dag. Week 3–4: Clomid 25 mg/dag + Nolvadex 20 mg/dag.",
        "Bij langer durende cycli wordt vaak HCG 1000 IE om de dag toegevoegd in de 10 dagen vóór SERM-start.",
      ]},
      { heading: "Wanneer beginnen", paragraphs: [
        "Hangt af van halfwaardetijd van laatste ester. Test propionate 3 dagen na laatste injectie, enanthate/cypionate 2 weken, decanoate 3 weken.",
      ]},
    ],
    related: ["bloedwerk-voor-tijdens-na", "testosteron-kuur-opbouwen"],
    relatedCategories: ["nolvadex", "clomid", "hcg"],
  },
  {
    slug: "bloedwerk-voor-tijdens-na",
    kindTag: "Gids",
    title: "Bloedwerk vóór, tijdens en na een kuur",
    excerpt: "Welke waarden je laat prikken en hoe je ze interpreteert.",
    image: img("photo-1582719471384-894fbb16e074"),
    publishedAt: "22-05-2026",
    author: { name: "Dr. Iris Verhoef", credentials: "biochemicus" },
    body: [
      { heading: "Baseline", paragraphs: [
        "Voor start: totaal en vrij testosteron, SHBG, oestradiol gevoelig, LH, FSH, prolactine, volledig bloedbeeld (Hb, Ht), nuchter lipidenprofiel, lever (ALT/AST/GGT), nier (eGFR), nuchter glucose.",
      ]},
      { heading: "Midcycle", paragraphs: [
        "Week 6: totaal testosteron, oestradiol, hematocriet, lever, lipidenprofiel.",
      ]},
      { heading: "Post-PCT", paragraphs: [
        "6 weken na laatste SERM-dosis: totaal en vrij testosteron, LH, FSH, oestradiol. Vergelijk met baseline.",
      ]},
    ],
    related: ["pct-protocol-uitleg"],
    relatedCategories: ["testosteron", "nolvadex"],
  },
  {
    slug: "leverbescherming-tijdens-orale-kuur",
    kindTag: "Protocol",
    title: "Leverbescherming tijdens orale stoffen",
    excerpt: "TUDCA, NAC en wat de literatuur erover zegt.",
    image: img("photo-1559757175-5700dde675bc"),
    publishedAt: "11-05-2026",
    author: { name: "Dr. Iris Verhoef", credentials: "biochemicus" },
    body: [
      { heading: "Waarom c17-α belastend is", paragraphs: ["Alkyleren op c17-positie maakt orale absorptie mogelijk maar belast levermetabolisme."]},
      { heading: "TUDCA", paragraphs: ["500–1000 mg/dag verdeeld over de dag. Onderzoek toont verbetering van galstroom en bescherming van hepatocyten."]},
    ],
    related: ["bloedwerk-voor-tijdens-na"],
    relatedCategories: ["anavar", "dianabol", "winstrol"],
  },
  {
    slug: "vervalsing-herkennen-coa-lezen",
    kindTag: "Gids",
    title: "Vervalsing herkennen — hoe je een COA leest",
    excerpt: "Wat de cijfers op een Janoshik- of Anabolic Lab-rapport écht betekenen.",
    image: img("photo-1582719471384-894fbb16e074"),
    publishedAt: "01-05-2026",
    author: { name: "Mark de Wit", credentials: "onderzoeksjournalist" },
    body: [
      { heading: "Wat een COA is", paragraphs: ["Een Certificate of Analysis vermeldt zuiverheid, concentratie en aanwezigheid van bekende verontreinigingen, getest met HPLC en/of GC-MS."]},
      { heading: "Rode vlaggen", paragraphs: ["Ontbrekende batchcode, ontbrekende testdatum, ontbrekende laborganisatie, of zuiverheid >99,9% zonder methodevermelding — allemaal signalen om door te vragen."]},
    ],
    related: ["bloedwerk-voor-tijdens-na"],
    relatedCategories: ["primobolan", "trenbolone"],
  },
  {
    slug: "oestrogeen-controle",
    kindTag: "Gids",
    title: "Oestrogeen-controle: AI of SERM — en wanneer geen van beide",
    excerpt: "De drie scenario's waarin je oestrogeen-management overweegt.",
    image: img("photo-1576086213369-97a306d36557"),
    publishedAt: "20-04-2026",
    author: { name: "Dr. Iris Verhoef", credentials: "biochemicus" },
    body: [
      { heading: "AI = remmen", paragraphs: ["AI verlaagt aromatase-conversie. Geschikt tijdens cyclus bij aantoonbare oestradiol-overschrijding."]},
      { heading: "SERM = blokkeren", paragraphs: ["SERM blokkeert oestrogeen-receptoren in borstweefsel zonder oestrogeen zelf te verlagen. Geschikt bij eerste gyno-signalen."]},
    ],
    related: ["pct-protocol-uitleg"],
    relatedCategories: ["arimidex", "nolvadex"],
  },
  {
    slug: "deca-en-prolactine",
    kindTag: "Studie",
    title: "Deca en prolactine: literatuuroverzicht",
    excerpt: "Wat we weten over prolactine-stijging bij nandrolon en wat cabergoline doet.",
    image: img("photo-1559757175-5700dde675bc"),
    publishedAt: "14-04-2026",
    author: { name: "Mark de Wit", credentials: "onderzoeksjournalist" },
    body: [
      { heading: "Mechanisme", paragraphs: ["Nandrolon bindt aan progesteron-receptoren. Activatie stimuleert prolactine-afgifte uit de hypofyse."]},
      { heading: "Cabergoline", paragraphs: ["0,25 mg 2× per week verlaagt prolactine in studies effectief. Bijwerkingen: misselijkheid, duizeligheid eerste week."]},
    ],
    related: [],
    relatedCategories: ["nandrolon"],
  },
  {
    slug: "lange-vs-korte-esters",
    kindTag: "Gids",
    title: "Lange versus korte esters: wat kies je wanneer",
    excerpt: "Hoe de ester-keuze je hele kuurschema bepaalt.",
    image: img("photo-1631549916768-4119b2e5f926"),
    publishedAt: "06-04-2026",
    author: { name: "Dr. Iris Verhoef", credentials: "biochemicus" },
    body: [
      { heading: "Korte esters", paragraphs: ["Propionate, acetate, fenylpropionate — snelle in/uit, dagelijks tot om-de-dag injecteren. Voor protocollen die snel bijsturing vragen."]},
      { heading: "Lange esters", paragraphs: ["Enanthate, cypionate, decanoate, undecylenate — stabiele plasmaspiegels, 1–2× per week injecteren. Voor lange onderzoekscycli."]},
    ],
    related: [],
    relatedCategories: ["testosteron", "nandrolon", "trenbolone"],
  },
  {
    slug: "dht-derivaten-vergelijking",
    kindTag: "Gids",
    title: "DHT-derivaten vergeleken: Masteron, Winstrol, Anavar, Primobolan",
    excerpt: "Wat hebben deze vier stoffen gemeen — en waarin verschillen ze fundamenteel.",
    image: img("photo-1582719508461-905c673771fd"),
    publishedAt: "28-03-2026",
    author: { name: "Mark de Wit", credentials: "onderzoeksjournalist" },
    body: [
      { heading: "Gemeenschappelijk", paragraphs: ["Geen aromatisatie, sterke androgene component, drogend karakter, gunstig in cut-fases."]},
      { heading: "Per stof", paragraphs: ["Masteron is mild antioestrogeen, Winstrol verlaagt SHBG sterk, Anavar is mild voor lever, Primobolan is duurst maar schoonst."]},
    ],
    related: [],
    relatedCategories: ["masteron", "winstrol", "anavar", "primobolan"],
  },
  {
    slug: "hematocriet-en-bloeddonatie",
    kindTag: "Protocol",
    title: "Hematocriet bewaken en wanneer bloed te doneren",
    excerpt: "Hoe androgene therapie rode bloedcellen verhoogt en wat te doen.",
    image: img("photo-1620916566398-39f1143ab7be"),
    publishedAt: "21-03-2026",
    author: { name: "Dr. Iris Verhoef", credentials: "biochemicus" },
    body: [
      { heading: "Het probleem", paragraphs: ["Testosteron stimuleert erytropoëse. Hematocriet >54% verhoogt risico op trombo-embolie."]},
      { heading: "Wat te doen", paragraphs: ["Donatie bij Sanquin (mits toegestaan) of phlebotomie via huisarts verlaagt hematocriet effectief."]},
    ],
    related: [],
    relatedCategories: ["boldenone", "testosteron"],
  },
  {
    slug: "trenbolone-veilig-onderzoeken",
    kindTag: "Gids",
    title: "Trenbolone: wat je móét weten voor je eraan begint",
    excerpt: "Tien punten die in elke trenbolone-onderzoekvoorbereiding terugkomen.",
    image: img("photo-1614859324967-bdf413c3a334"),
    publishedAt: "13-03-2026",
    author: { name: "Dr. Iris Verhoef", credentials: "biochemicus" },
    body: [
      { heading: "Niet als eerste", paragraphs: ["Trenbolone hoort niet in een eerste cyclus. Bouw ervaring op met testosteron-only en bekijk hoe je lichaam reageert."]},
      { heading: "Cardio meten", paragraphs: ["Bloeddruk dagelijks, hartfrequentie in rust wekelijks. Bij aanhoudende verhoging staken."]},
    ],
    related: ["bloedwerk-voor-tijdens-na"],
    relatedCategories: ["trenbolone"],
  },
];

export function findArticle(slug: string) {
  return knowledgeArticles.find((a) => a.slug === slug);
}

// ---------------------------------------------------------------------------
// Cart
// ---------------------------------------------------------------------------

export interface CartLine {
  slug: string;
  variant: string;
  qty: number;
}

export const sampleCart: CartLine[] = [
  { slug: "testosteron-enanthate-250", variant: "10ml", qty: 1 },
  { slug: "nolvadex-20", variant: "50", qty: 1 },
];

// Backwards-compatible "categories" export (still gebruikt door winkel/index)
export const categories = groups.map((g) => ({
  slug: g.slug,
  name: g.name,
  count: products.filter((p) => p.group === g.slug).length,
  image: g.image,
}));

// ---------------------------------------------------------------------------
// Hoofdcategorieën (top-level tiles op homepage)
// ---------------------------------------------------------------------------

export interface MainCategory {
  slug: string;
  name: string;
  tagline: string;
  image: string;
  to: string;
}


export const mainCategories: MainCategory[] = [
  {
    slug: "injectie",
    name: "Injectie",
    tagline: "Testosteron-esters, trenbolone, deca, masteron — alle injecteerbare anabolen.",
    image: "https://rexqfwibxawqnvrzbdoo.supabase.co/storage/v1/object/public/blog-images/category/injectie-hero.webp",
    to: "/winkel/injectie",
  },
  {
    slug: "pillen-tabletten",
    name: "Pillen / Tabletten",
    tagline: "Anavar, Dianabol, Winstrol, Turinabol — orale anabolen.",
    image: "https://rexqfwibxawqnvrzbdoo.supabase.co/storage/v1/object/public/blog-images/category/pillen-tabletten-hero.webp",
    to: "/winkel/pillen-tabletten",
  },
  {
    slug: "kuurpakketten",
    name: "Kuurpakketten",
    tagline: "Complete kuren inclusief PCT, samengesteld voor jouw doel.",
    image: "https://rexqfwibxawqnvrzbdoo.supabase.co/storage/v1/object/public/blog-images/category/kuurpakketten-hero.webp",
    to: "/winkel/kuurpakketten",
  },
  {
    slug: "nakuur",
    name: "Nakuur (PCT)",
    tagline: "Clomid, Nolvadex, HCG — herstel je eigen hormoonas na een kuur.",
    image: "https://rexqfwibxawqnvrzbdoo.supabase.co/storage/v1/object/public/blog-images/category/nakuur-hero.jpg",
    to: "/winkel/nakuur",
  },
  {
    slug: "afvallen",
    name: "Afvallen",
    tagline: "Clenbuterol, T3 en stack-opties voor effectief vetverlies.",
    image: "https://rexqfwibxawqnvrzbdoo.supabase.co/storage/v1/object/public/blog-images/category/afvallen-hero.webp",
    to: "/winkel/afvallen",
  },
  {
    slug: "erectiemiddelen",
    name: "Erectiemiddelen",
    tagline: "Kamagra, Vidalista, Cenforce — betrouwbare oplossingen.",
    image: "https://rexqfwibxawqnvrzbdoo.supabase.co/storage/v1/object/public/blog-images/category/erectiemiddelen-hero.webp",
    to: "/winkel/erectiemiddelen",
  },
  {
    slug: "hgh",
    name: "HGH",
    tagline: "Groeihormoon voor herstel, vetverbranding en lean mass.",
    image: "https://rexqfwibxawqnvrzbdoo.supabase.co/storage/v1/object/public/blog-images/category/hgh-hero.jpg",
    to: "/winkel/hgh",
  },
  {
    slug: "peptides",
    name: "Peptides",
    tagline: "Melanotan, BPC-157, IGF-1 — onderzoeks-peptiden.",
    image: "https://rexqfwibxawqnvrzbdoo.supabase.co/storage/v1/object/public/blog-images/category/peptides-hero.jpg",
    to: "/winkel/peptides",
  },
];

// Productielocaties — toegewezen na declaratie zodat de filter zichtbaar wordt.
const locationMap: Record<string, string> = {
  "testosteron-enanthate-250": "Nederland",
  "testosteron-cypionate-250": "Nederland",
  "sustanon-250": "EU lab",
  "deca-durabolin-250": "Nederland",
  "npp-100": "EU lab",
  "trenbolone-acetate-100": "EU lab",
  "trenbolone-enanthate-200": "Nederland",
  "boldenone-undecylenate-300": "Nederland",
  "masteron-propionate-100": "EU lab",
};
const brands = ["Pharmacom", "Magnus", "Driada Medical", "ZPHC", "Euro Pharmacies"];
products.forEach((p, i) => {
  p.productionLocation = locationMap[p.slug] ?? "Nederland";
  p.brand = brands[i % brands.length];
});
