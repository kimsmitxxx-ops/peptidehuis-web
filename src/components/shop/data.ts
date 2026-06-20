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
    heroImage: img("photo-1576086213369-97a306d36557", 1600),
    intro:
      "Testosteron is de basishormoon waar elke anabolenkuur op gebouwd is. Op deze pagina vind je de verschillende esters, hun halfwaardetijden en typische onderzoeksdoseringen.",
    longIntro:
      "Testosteron is het natuurlijke androgene hormoon dat in elk lichaam aanwezig is. In onderzoek naar androgene therapie wordt het toegediend in een ester-vorm — enanthate, cypionate of de Sustanon-mix — om de afgifte over dagen of weken te verspreiden. Iedere ester heeft een eigen kinetiek en daarmee een eigen plek in een kuurschema.",
    keyFacts: [
      { label: "Type", value: "Androgeen anabool" },
      { label: "Halfwaardetijd", value: "Propionate 2 dgn · Enanthate 8 dgn · Decanoate 15 dgn" },
      { label: "Aromatisatie", value: "Ja — AI vaak nodig" },
      { label: "Detectietijd", value: "Tot 3 maanden" },
    ],
    sections: [
      {
        heading: "Werking en mechanisme",
        body: "Testosteron bindt aan de androgeen-receptor in spier- en botweefsel en stimuleert eiwitsynthese, stikstofretentie en erytropoëse. Een deel wordt door aromatase omgezet in oestradiol, wat gewenste (bot- en libido-effecten) én ongewenste (vochtretentie, gynaecomastie) gevolgen heeft. Een ander deel wordt door 5α-reductase omgezet in DHT, met effect op huid, prostaat en haar.",
      },
      {
        heading: "Welke ester moet ik kiezen?",
        body: "Voor een eerste onderzoekscyclus kiezen de meeste onderzoekers Testosteron Enanthate of Cypionate, omdat beide weinig piek-en-dal-effect geven bij twee injecties per week. Sustanon 250 combineert vier esters en is daarmee handig wanneer een stabiele plasmaspiegel direct gewenst is. Korte propionate-esters worden meestal bewaard voor gevorderde protocollen waar snelle bijstelling nodig is.",
      },
      {
        heading: "Typische onderzoeksdoseringen",
        body: "In klinische TRT-studies wordt 100–200 mg per week aangehouden. Onderzoek naar supraphysiologische doseringen gebruikt 300–600 mg per week voor 10 tot 16 weken. Altijd combineren met regelmatige bloedwaardencontroles (totaal testosteron, oestradiol, hematocriet).",
      },
      {
        heading: "Bijwerkingen om in de gaten te houden",
        body: "De meest voorkomende: oestrogene effecten (vochtretentie, libido-veranderingen), androgene effecten (acne, hoofdhuiduitval bij genetische gevoeligheid), verhoogde hematocriet, suppressie van de eigen HPTA-as. Goede onderzoeksprotocollen plannen bloedwerk vóór, halverwege en na de cyclus.",
      },
      {
        heading: "PCT na een testosteron-cyclus",
        body: "Omdat testosteron de eigen LH- en FSH-productie onderdrukt, is een PCT-protocol noodzakelijk om herstel te onderzoeken. Combinaties van Nolvadex en Clomid worden het vaakst beschreven, soms aangevuld met HCG voor testikulair volume. Zie de gedetailleerde uitleg in de Kennisbank.",
      },
    ],
    faqs: [
      {
        question: "Wat is het verschil tussen Testosteron Enanthate en Cypionate?",
        answer:
          "Slechts één koolstofatoom in de ester. Beide hebben in de praktijk een halfwaardetijd van rond de 8 dagen en worden onderling uitwisselbaar gebruikt. De keuze hangt vaker af van beschikbaarheid dan van effect.",
      },
      {
        question: "Hoe vaak moet ik injecteren?",
        answer:
          "Bij enanthate, cypionate of sustanon worden in onderzoek twee injecties per week gebruikt om plasmaspiegels stabiel te houden. Bij Testosteron Propionate dagelijks of om de dag.",
      },
      {
        question: "Moet ik altijd een aromatase-remmer gebruiken?",
        answer:
          "Nee. Een AI wordt pas ingezet als bloedwaarden oestradiol verhoogd tonen óf symptomen verschijnen. Blind doseren leidt vaak tot te lage oestradiol, met effect op libido en gewrichtscomfort.",
      },
      {
        question: "Hoe lang duurt een typische testosteron-cyclus?",
        answer:
          "Onderzoeksprotocollen lopen meestal 10 tot 16 weken. Korter is te kort om met langwerkende esters serieuze data te verzamelen, langer verhoogt de bijwerkings-druk zonder evenredige winst.",
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
    heroImage: img("photo-1559757175-5700dde675bc", 1600),
    intro:
      "Nandrolon (Deca, NPP) is een 19-nortestosteron-derivaat met een hoge anabole en lage androgene index, bekend om langere kuren en goede tolerantie.",
    longIntro:
      "Nandrolon-esters worden al decennia onderzocht in osteoporose, HIV-wasting en anemie. In sportwetenschappelijke literatuur is het bekend om relatieve mildheid bij behoorlijke anabole werking. Door de lange detectietijd niet geschikt voor onderzoekers die binnen een jaar onder een dopingregime vallen.",
    keyFacts: [
      { label: "Type", value: "19-nor anabool" },
      { label: "Halfwaardetijd", value: "Decanoate 15 dgn · Fenylpropionate 3 dgn" },
      { label: "Aromatisatie", value: "Laag — wel progestageen" },
      { label: "Detectietijd", value: "Tot 18 maanden" },
    ],
    sections: [
      {
        heading: "Werking en gebruik",
        body: "Nandrolon bindt sterk aan de androgeen-receptor maar wordt door 5α-reductase omgezet in het zwakkere DHN, niet DHT. Daardoor is het milder voor huid en haar dan testosteron, maar bindt het wél aan de progesteron-receptor — wat eigen risico's geeft (libido, prolactine).",
      },
      {
        heading: "Deca vs NPP — wat kies je?",
        body: "Deca (decanoate) heeft een halfwaardetijd van rond de 15 dagen en wordt 1× per week geprikt. NPP (fenylpropionaat) is in 3 dagen weg en geeft snellere bijsturing. Onderzoek dat snel evalueert kiest NPP; langere protocollen kiezen Deca.",
      },
      {
        heading: "Typische doseringen",
        body: "300–500 mg Deca per week is het meest beschreven bereik in literatuur, altijd in combinatie met een testosteron-basis (minimaal even hoge dosis test). NPP vaak 75–150 mg om de dag.",
      },
      {
        heading: "Bijwerkingen en wat eraan te doen",
        body: "Prolactine kan stijgen door progestagene werking — Cabergoline wordt onderzocht ter beheersing. Libido-uitval ('Deca-dick') is een bekend fenomeen wanneer testosteron-dosis te laag is. Bloedwerk inclusief prolactine is standaard.",
      },
    ],
    faqs: [
      {
        question: "Waarom altijd Deca samen met Testosteron?",
        answer:
          "Nandrolon onderdrukt de eigen testosteronproductie maar vult zelf niet alle androgene functies in. Een testosteron-basis is nodig om libido- en stemmings-uitval te voorkomen.",
      },
      {
        question: "Hoe lang blijft Deca aantoonbaar?",
        answer:
          "Metabolieten zijn aangetoond tot 18 maanden na laatste injectie in urineanalyses van WADA-laboratoria. Dat maakt Deca ongeschikt voor sporters in een gecontroleerd dopingregime.",
      },
      {
        question: "Helpt Deca echt voor gewrichten?",
        answer:
          "Literatuur wijst op verhoogde collageensynthese en vochtretentie rondom gewrichten. Het effect verdwijnt na de cyclus, dus het is geen oplossing voor onderliggende gewrichtspathologie.",
      },
    ],
    related: ["testosteron", "boldenone", "primobolan"],
    knowledge: ["deca-en-prolactine", "lange-vs-korte-esters"],
  },
  {
    slug: "trenbolone",
    group: "anabolen",
    name: "Trenbolone",
    aka: ["Tren A", "Tren E", "Parabolan"],
    tagline: "Krachtigste klassieke 19-nor, alleen voor ervaren onderzoekers",
    heroImage: img("photo-1614859324967-bdf413c3a334", 1600),
    intro:
      "Trenbolone is een van de meest potente klassieke anabolen. Hoog effect, hoog bijwerkingsprofiel — niet de eerste keuze voor onderzoekers zonder uitgebreide voorgeschiedenis.",
    longIntro:
      "Trenbolone is afgeleid van nandrolon maar bindt met een veelvoud aan de androgeen-receptor. Het wordt niet door aromatase omgezet, dus oestrogeen blijft laag — maar progestagene activiteit en sterke endocriene onderdrukking maken het een stof die ervaring vraagt.",
    keyFacts: [
      { label: "Type", value: "19-nor anabool, niet-aromatiseerbaar" },
      { label: "Halfwaardetijd", value: "Acetate 3 dgn · Enanthate 7 dgn" },
      { label: "Aromatisatie", value: "Nee — wel progestageen" },
      { label: "Detectietijd", value: "Tot 5 maanden" },
    ],
    sections: [
      {
        heading: "Waarom zo krachtig?",
        body: "Trenbolone heeft een androgene activiteit van ~500 en anabole van ~500 ten opzichte van testosteron 100/100. Het bindt sterker aan de androgeen-receptor, blokkeert glucocorticoïden en verhoogt IGF-1 in spierweefsel.",
      },
      {
        heading: "Tren A vs Tren E",
        body: "Acetate (3 dagen) wordt elke dag of om de dag geprikt en geeft snel terugkoppeling. Enanthate (7 dagen) twee keer per week. Onderzoekers die voor het eerst trenbolone evalueren beginnen vrijwel altijd met de acetate-versie zodat bijwerkingen snel te beheersen zijn.",
      },
      {
        heading: "Typische doseringen",
        body: "200–400 mg per week is het meest beschreven bereik. Hogere doseringen verhogen het bijwerkingsprofiel disproportioneel: nachtelijk zweten, slapeloosheid, agressie, cardiovasculaire druk.",
      },
      {
        heading: "Bijwerkingen — wat verwachten",
        body: "Cardiovasculair: forse LDL-stijging, HDL-daling. Renaal: donkere urine door metaboliet-kleuring is normaal, maar bloeddrukcontrole is verplicht. Mentaal: stemmingsveranderingen en slaapproblemen zijn de meest gerapporteerde klachten.",
      },
    ],
    faqs: [
      {
        question: "Kan trenbolone als eerste anabool?",
        answer:
          "Nee. Trenbolone vraagt een goed gekalibreerde basis met testosteron, bloedwerk-routine en ervaring met bijwerkingsmanagement. Vrijwel alle literatuur en protocollen plaatsen het pas na meerdere testosteron-only cycli.",
      },
      {
        question: "Wat doe ik tegen tren-hoest?",
        answer:
          "De zogenaamde 'tren cough' direct na injectie is meestal het gevolg van olie-irritatie bij intravasculaire passage. Langzaam injecteren en aspireren beperkt de kans aanzienlijk.",
      },
      {
        question: "Aromatase-remmer nodig bij trenbolone?",
        answer:
          "Trenbolone zelf aromatiseert niet, maar de testosteron-basis wel. AI op basis van bloedwaarden, niet automatisch.",
      },
    ],
    related: ["testosteron", "masteron", "anavar"],
    knowledge: ["trenbolone-veilig-onderzoeken", "bloedwerk-voor-tijdens-na"],
  },
  {
    slug: "boldenone",
    group: "anabolen",
    name: "Boldenone",
    aka: ["Equipoise", "EQ"],
    tagline: "Langzame opbouw met veel uithoudingsvermogen-data",
    heroImage: img("photo-1576086213369-97a306d36557", 1600),
    intro:
      "Boldenone (EQ) is een testosteron-derivaat met ongebruikelijk lange undecylenate-ester. Mild en geliefd in lange protocollen.",
    longIntro:
      "Boldenone werd oorspronkelijk in veterinaire toepassing onderzocht en heeft een uniek profiel: matige anabole werking, lage androgene activiteit en een opvallend effect op rode bloedcelproductie.",
    keyFacts: [
      { label: "Type", value: "Testosteron-derivaat" },
      { label: "Halfwaardetijd", value: "~14 dagen" },
      { label: "Aromatisatie", value: "Laag (~50% van testosteron)" },
      { label: "Detectietijd", value: "Tot 5 maanden" },
    ],
    sections: [
      {
        heading: "Werking en plek in een protocol",
        body: "Boldenone bouwt langzaam op — de eerste effecten zijn meestal pas na vier tot zes weken duidelijk. Door verhoogde erytropoëse stijgt het uithoudingsvermogen in studies meetbaar, maar ook hematocriet — wat regelmatige donatie of controle noodzakelijk maakt.",
      },
      {
        heading: "Typische doseringen",
        body: "400–600 mg per week, doorgaans in cycli van 14 tot 20 weken. Onder de 400 mg per week is het effect in literatuur niet consistent meetbaar.",
      },
      {
        heading: "Bijwerkingen",
        body: "Bekendste signalen: verhoogde eetlust, hoge hematocriet, milde oestrogene effecten via aromatisatie. Geen significante hepatotoxiciteit.",
      },
    ],
    faqs: [
      {
        question: "Waarom heet boldenone Equipoise?",
        answer:
          "Equipoise is de oorspronkelijke handelsnaam voor de veterinaire toepassing bij paarden. De stof is daar verder onderzocht dan in humane geneeskunde.",
      },
      {
        question: "Hoe vaak hematocriet meten?",
        answer:
          "Bij langer durende EQ-protocollen wordt elke 4–6 weken een controle aanbevolen. Boven 54% is bloeddonatie of dosisaanpassing in literatuur standaard.",
      },
    ],
    related: ["testosteron", "nandrolon", "masteron"],
    knowledge: ["hematocriet-en-bloeddonatie"],
  },
  {
    slug: "masteron",
    group: "anabolen",
    name: "Masteron",
    aka: ["Drostanolone", "Mast P", "Mast E"],
    tagline: "DHT-derivaat voor droog en strak onderzoek",
    heroImage: img("photo-1582719508461-905c673771fd", 1600),
    intro:
      "Drostanolone (Masteron) is een DHT-derivaat met antioestrogene eigenschappen, vaak ingezet in voorbereidingsperiodes van onderzoek.",
    longIntro:
      "Masteron is van origine een borstkanker-medicijn. Het bindt aan oestrogeen-receptoren zonder ze te activeren en heeft daarmee een mild anti-oestrogeen effect. In sportwetenschappelijke literatuur wordt het ingezet om vochtretentie te beperken en aromatisatie te dempen.",
    keyFacts: [
      { label: "Type", value: "DHT-derivaat" },
      { label: "Halfwaardetijd", value: "Propionate 2,5 dgn · Enanthate 10 dgn" },
      { label: "Aromatisatie", value: "Geen" },
      { label: "Detectietijd", value: "3 weken (P) tot 3 maanden (E)" },
    ],
    sections: [
      {
        heading: "Wanneer Masteron zinvol is",
        body: "Het effect van Masteron is alleen zichtbaar bij relatief laag vetpercentage. In bulkprotocollen voegt het weinig toe; in cut- en voorbereidingsfases beïnvloedt het visueel en functioneel het meest.",
      },
      {
        heading: "Doseringen",
        body: "300–600 mg per week, vaak in combinatie met testosteron en eventueel trenbolone of anavar. Mast P (propionate) wordt elke 2 dagen geprikt, Mast E (enanthate) twee keer per week.",
      },
      {
        heading: "Bijwerkingen",
        body: "Lage aromatisatie maar wél androgeen — bij genetische gevoeligheid versnelt het hoofdhuiduitval. Cardiovasculair vergelijkbaar profiel met andere DHT's: LDL omhoog, HDL omlaag.",
      },
    ],
    faqs: [
      {
        question: "Werkt Masteron als aromatase-remmer?",
        answer:
          "Niet exact. Het bindt aan oestrogeen-receptoren maar remt niet de productie. Bij hoge testosteron-dosering kan een echte AI nog steeds nodig zijn.",
      },
      {
        question: "Mast P of Mast E?",
        answer:
          "Mast P is sneller in én uit, vaak gekozen voor de laatste weken vóór een doel. Mast E is praktischer in langere protocollen door minder frequente injecties.",
      },
    ],
    related: ["testosteron", "trenbolone", "anavar", "winstrol"],
    knowledge: ["dht-derivaten-vergelijking"],
  },
  {
    slug: "anavar",
    group: "anabolen",
    name: "Anavar",
    aka: ["Oxandrolone"],
    tagline: "Mild oraal anabool met goed bijwerkingenprofiel",
    heroImage: img("photo-1587854692152-cbe660dbde88", 1600),
    intro:
      "Oxandrolone (Anavar) is een oraal anabolicum met DHT-basis. Mild profiel maakt het tot een van de meest gebruikte oralen in onderzoek.",
    longIntro:
      "Anavar is c17-alfa gealkyleerd voor orale opname, maar verschilt van andere oralen door een ongebruikelijk lage hepatotoxiciteit in literatuur. Wordt onderzocht in brandwondenherstel, HIV-wasting en osteoporose.",
    keyFacts: [
      { label: "Type", value: "Oraal DHT-derivaat" },
      { label: "Halfwaardetijd", value: "~8 uur" },
      { label: "Aromatisatie", value: "Geen" },
      { label: "Lever-belasting", value: "Mild (c17-α)" },
    ],
    sections: [
      {
        heading: "Werking en gebruik",
        body: "Anavar verhoogt de eiwitsynthese zonder noemenswaardige vochtretentie. De effecten zijn relatief subtiel maar duurzaam — geen explosieve gewichtstoename, wel verbeterde kracht en spierhardheid.",
      },
      {
        heading: "Typische doseringen",
        body: "Onderzoekstudies gebruiken 20–80 mg per dag, verdeeld over twee giften vanwege de korte halfwaardetijd. Cycli van 6–8 weken zijn standaard om leverbelasting te beperken.",
      },
      {
        heading: "Lever en bloedlipiden",
        body: "Hepatotoxiciteit blijft mild bij correcte dosering, maar HDL-cholesterol daalt substantieel — het meest opvallende metabolische signaal. Begeleidende NAC en TUDCA worden vaak onderzocht.",
      },
    ],
    faqs: [
      {
        question: "Anavar solo — werkt dat?",
        answer:
          "Anavar onderdrukt de eigen testosteronproductie en wordt zelden solo onderzocht. Een testosteron-basis houdt het hormonale evenwicht stabiel.",
      },
      {
        question: "Hoe herken ik echte Anavar?",
        answer:
          "Anavar is een van de meest vervalste oralen. Onafhankelijke HPLC-tests per batch zijn de enige zekerheid — vraag altijd het COA.",
      },
    ],
    related: ["testosteron", "winstrol", "masteron"],
    knowledge: ["leverbescherming-tijdens-orale-kuur"],
  },
  {
    slug: "dianabol",
    group: "anabolen",
    name: "Dianabol",
    aka: ["Methandienone", "Dbol"],
    tagline: "De klassieke oral kickstarter met snelle massa-toename",
    heroImage: img("photo-1587854692152-cbe660dbde88", 1600),
    intro:
      "Methandienone (Dianabol) is een van de oudste synthetische anabolen. Snelle werking, hoge vochtretentie en korte halfwaardetijd.",
    longIntro:
      "Dianabol werd in de jaren '50 ontwikkeld voor het Amerikaanse Olympische team. Tot vandaag het meest beschreven orale anabool in literatuur, geliefd als 'kickstart' van langere injecteerbare cycli.",
    keyFacts: [
      { label: "Type", value: "Oraal testosteron-derivaat" },
      { label: "Halfwaardetijd", value: "~5 uur" },
      { label: "Aromatisatie", value: "Ja, sterk" },
      { label: "Lever-belasting", value: "Hoog (c17-α)" },
    ],
    sections: [
      {
        heading: "Waarom kickstart?",
        body: "Bij injecteerbare testosteron-esters duurt het 3–5 weken voor stabiele bloedwaarden. Dianabol overbrugt die periode met snel meetbaar effect.",
      },
      {
        heading: "Doseringen",
        body: "20–40 mg per dag, verdeeld over 2–4 giften. Cycli van 4–6 weken zijn standaard om hepatotoxiciteit te beperken.",
      },
      {
        heading: "Bijwerkingen",
        body: "Vochtretentie, bloeddrukstijging, hoofdpijn en HDL-daling zijn het meest gerapporteerd. Lever-enzymen normaliseren meestal binnen 4–6 weken na staken.",
      },
    ],
    faqs: [
      {
        question: "Dianabol of Anadrol?",
        answer:
          "Anadrol is potenter maar ook belastender. Dianabol blijft het meest beschreven in literatuur en heeft een voorspelbaarder profiel.",
      },
      {
        question: "Hoe lang mag een Dianabol-kuur duren?",
        answer:
          "Vrijwel alle protocollen beperken het tot maximaal 6 weken vanwege hepatotoxiciteit.",
      },
    ],
    related: ["testosteron", "anavar", "nandrolon"],
    knowledge: ["leverbescherming-tijdens-orale-kuur", "oestrogeen-controle"],
  },
  {
    slug: "winstrol",
    group: "anabolen",
    name: "Winstrol",
    aka: ["Stanozolol", "Winny"],
    tagline: "DHT-derivaat met sterk droog karakter",
    heroImage: img("photo-1587854692152-cbe660dbde88", 1600),
    intro:
      "Stanozolol (Winstrol) is een DHT-derivaat met sterke androgene activiteit per milligram en lage aromatisatie. Geliefd in voorbereidingsperiodes.",
    longIntro:
      "Winstrol bestaat in zowel oral als injectable vorm — beide zijn c17-alfa gealkyleerd en daarmee hepatotoxisch. De stof bindt sterk aan SHBG, wat de hoeveelheid vrij circulerend testosteron in een gecombineerde cyclus verhoogt.",
    keyFacts: [
      { label: "Type", value: "DHT-derivaat" },
      { label: "Halfwaardetijd", value: "Oraal 9 uur · Injectable 24 uur" },
      { label: "Aromatisatie", value: "Geen" },
      { label: "Lever-belasting", value: "Hoog (c17-α)" },
    ],
    sections: [
      {
        heading: "Werking",
        body: "Winstrol verhoogt vrij testosteron via SHBG-binding, droogt vocht uit het onderhuidse weefsel en versterkt spierhardheid. Effect op pure massa is gering — het effect is vooral cosmetisch en in kracht-output.",
      },
      {
        heading: "Doseringen",
        body: "25–75 mg per dag oraal of 50 mg om de dag injectable. Cycli van 6–8 weken.",
      },
      {
        heading: "Bijwerkingen",
        body: "Forse impact op bloedlipiden, droge gewrichten, lever-enzymen omhoog. Begeleidende EPA/DHA en bloedlipidencontrole zijn standaard in onderzoekprotocollen.",
      },
    ],
    faqs: [
      {
        question: "Winstrol oraal of injectable?",
        answer:
          "Beide hebben dezelfde werkzame stof en zijn beide hepatotoxisch. Verschil zit vooral in dosering-flexibiliteit en injectie-frequentie.",
      },
      {
        question: "Waarom doen mijn gewrichten pijn op Winstrol?",
        answer:
          "Winstrol onttrekt vocht aan onderhuids weefsel en gewrichten. Veel onderzoekers melden gewrichtsklachten — daarom vaak in combinatie met Nandrolon of een lage Deca-dosering.",
      },
    ],
    related: ["anavar", "masteron", "primobolan"],
    knowledge: ["dht-derivaten-vergelijking", "leverbescherming-tijdens-orale-kuur"],
  },
  {
    slug: "primobolan",
    group: "anabolen",
    name: "Primobolan",
    aka: ["Methenolone", "Primo"],
    tagline: "Mild DHT-derivaat zonder aromatisatie",
    heroImage: img("photo-1631549916768-4119b2e5f926", 1600),
    intro:
      "Methenolone Enanthate (Primobolan) is een mild DHT-derivaat zonder aromatisatie. Notoir veel-vervalst — onafhankelijke labtest is essentieel.",
    longIntro:
      "Primobolan staat bekend om een 'clean' profiel: weinig bijwerkingen, geen vochtretentie, geen oestrogene effecten. Maar het is ook een van de duurste anabolen en de meest vervalste — pure batches zijn schaars.",
    keyFacts: [
      { label: "Type", value: "DHT-derivaat" },
      { label: "Halfwaardetijd", value: "~10 dagen" },
      { label: "Aromatisatie", value: "Geen" },
      { label: "Detectietijd", value: "Tot 5 maanden" },
    ],
    sections: [
      {
        heading: "Werking en plek",
        body: "Primobolan heeft een matige anabole en lage androgene activiteit. Het effect bouwt langzaam op en is subtiel — geen massa-monster, wel een degelijke, schone toevoeging in lange protocollen.",
      },
      {
        heading: "Doseringen",
        body: "400–700 mg per week. Onder 400 mg is het effect in literatuur niet consistent meetbaar.",
      },
      {
        heading: "Vervalsing herkennen",
        body: "Door de hoge ruwe materiaalprijs wordt Primobolan vaker dan welke andere stof ook vervalst met testosteron-enanthate. HPLC-test per batch is de enige zekerheid.",
      },
    ],
    faqs: [
      {
        question: "Waarom is Primobolan zo duur?",
        answer:
          "De productie van methenolone vraagt meerdere extra synthesestappen en zuiverings-rondes. Reëel materiaal kost een veelvoud van bijvoorbeeld testosteron.",
      },
      {
        question: "Primobolan solo — werkt dat?",
        answer:
          "Net als alle anabolen onderdrukt het de eigen testosteron-productie. Een testosteron-basis blijft nodig om het hormonale evenwicht te bewaken.",
      },
    ],
    related: ["anavar", "masteron", "boldenone"],
    knowledge: ["vervalsing-herkennen-coa-lezen"],
  },
  // ---------- PCT ----------
  {
    slug: "nolvadex",
    group: "pct",
    name: "Nolvadex",
    aka: ["Tamoxifen"],
    tagline: "SERM-basis van vrijwel elk PCT-protocol",
    heroImage: img("photo-1587854692152-cbe660dbde88", 1600),
    intro:
      "Tamoxifen (Nolvadex) is een SERM die oestrogeen-receptoren in borstweefsel blokkeert en LH-afgifte stimuleert. Pijler van vrijwel elk PCT-protocol.",
    longIntro:
      "Tamoxifen is al sinds de jaren '70 onderzocht in oncologie en wordt sindsdien off-label ingezet in PCT-protocollen na een androgene cyclus. De werking is dubbel: bescherming tegen gynaecomastie en stimulatie van endogene testosteron-as.",
    keyFacts: [
      { label: "Type", value: "SERM" },
      { label: "Halfwaardetijd", value: "5–7 dagen" },
      { label: "Doel", value: "Anti-gyno + PCT" },
    ],
    sections: [
      {
        heading: "Standaard PCT-protocol",
        body: "40 mg/dag in week 1–2, daarna 20 mg/dag in week 3–4. Vaak gecombineerd met Clomid in de eerste weken.",
      },
      {
        heading: "Tijdens cyclus tegen gyno",
        body: "Bij eerste signalen van gynaecomastie wordt 10–20 mg/dag onderzocht. Werkt sneller dan een AI bij borstweefsel.",
      },
    ],
    faqs: [
      { question: "Tamoxifen of Clomid?", answer: "Beide hebben hun rol. Tamoxifen is milder qua bijwerkingen, Clomid stimuleert LH/FSH sterker. Combinatie is gangbaar." },
      { question: "Wanneer met PCT beginnen?", answer: "Hangt af van laatste ester. Bij Test E meestal 2 weken na laatste injectie; bij Deca pas 3 weken erna." },
    ],
    related: ["clomid", "arimidex", "hcg"],
    knowledge: ["pct-protocol-uitleg"],
  },
  {
    slug: "clomid",
    group: "pct",
    name: "Clomid",
    aka: ["Clomifeen"],
    tagline: "SERM voor herstel van endogene testosteronproductie",
    heroImage: img("photo-1587854692152-cbe660dbde88", 1600),
    intro:
      "Clomifeen (Clomid) is een SERM die LH- en FSH-afgifte krachtig stimuleert. Geliefd om HPTA-herstel na een cyclus te onderzoeken.",
    longIntro:
      "Clomid is sterker dan tamoxifen in LH-stimulatie maar geeft vaker stemmings- en visuele bijwerkingen. Doseringsschema's zijn daarom geleidelijk afbouwend.",
    keyFacts: [
      { label: "Type", value: "SERM" },
      { label: "Halfwaardetijd", value: "~5 dagen" },
      { label: "Doel", value: "HPTA-herstel" },
    ],
    sections: [
      { heading: "Standaard PCT", body: "50 mg/dag week 1–2, daarna 25 mg/dag week 3–4. Vaak met Nolvadex." },
      { heading: "Bijwerkingen", body: "Visuele veranderingen (flikkering, helderheid) en stemmingsdips komen voor. Bij ernstige klachten staken." },
    ],
    faqs: [{ question: "Kan ik alleen Clomid gebruiken?", answer: "Ja, maar combinatie met Nolvadex geeft in literatuur sneller herstel." }],
    related: ["nolvadex", "hcg"],
    knowledge: ["pct-protocol-uitleg"],
  },
  {
    slug: "arimidex",
    group: "pct",
    name: "Arimidex",
    aka: ["Anastrozol", "AI"],
    tagline: "Aromatase-remmer voor oestrogeen-controle tijdens cyclus",
    heroImage: img("photo-1587854692152-cbe660dbde88", 1600),
    intro:
      "Anastrozol (Arimidex) is een aromatase-remmer die testosteron-naar-oestradiol-conversie blokkeert. Inzet op basis van bloedwerk, niet automatisch.",
    longIntro:
      "Een AI verlaagt oestrogeen tijdens een aromatiseerbare cyclus. Te lage oestrogeenwaarden geven echter eigen klachten (libido, droge gewrichten, lipiden). Titratie op bloedwaarden is de regel.",
    keyFacts: [
      { label: "Type", value: "AI" },
      { label: "Halfwaardetijd", value: "~48 uur" },
      { label: "Doel", value: "Oestrogeen-controle" },
    ],
    sections: [
      { heading: "Doseringen", body: "0,25–0,5 mg om de dag is een gangbaar startpunt, daarna titreren op bloedwaarden van oestradiol." },
      { heading: "Niet voor PCT", body: "Een AI hoort niet in PCT — PCT vraagt juist oestrogeen-respons om LH op te starten. SERMs zijn dan de juiste keuze." },
    ],
    faqs: [{ question: "Arimidex of Aromasin?", answer: "Beide werken. Aromasin (exemestane) is irreversibel; Arimidex reversibel. Bij overdosering is Aromasin lastiger terug te draaien." }],
    related: ["nolvadex", "clomid"],
    knowledge: ["oestrogeen-controle"],
  },
  {
    slug: "hcg",
    group: "pct",
    name: "HCG",
    aka: ["Pregnyl"],
    tagline: "Mimet LH om testikulair volume te behouden",
    heroImage: img("photo-1620916566398-39f1143ab7be", 1600),
    intro:
      "Humaan choriongonadotrofine mimeert LH en houdt de testes actief tijdens een cyclus. Voorkomt atrofie en versnelt HPTA-herstel.",
    longIntro:
      "HCG wordt zowel tijdens als kort vóór PCT ingezet. Tijdens cyclus 250–500 IE 2× per week behoudt het volume; vóór PCT korte hogere doseringen om respons te wekken.",
    keyFacts: [
      { label: "Type", value: "Gonadotrofine" },
      { label: "Halfwaardetijd", value: "~36 uur" },
      { label: "Doel", value: "Testikulair behoud" },
    ],
    sections: [
      { heading: "Tijdens cyclus", body: "250 IE 2× per week vanaf week 3 voorkomt testikulaire atrofie." },
      { heading: "Vóór PCT", body: "1000 IE om de dag, 10 dagen vóór start SERM. Daarna SERM-protocol." },
    ],
    faqs: [{ question: "Is HCG verplicht in elke kuur?", answer: "Niet verplicht, maar wel sterk aanbevolen bij cycli langer dan 12 weken." }],
    related: ["nolvadex", "clomid"],
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
    slug: "anabolen",
    name: "Anabolen",
    tagline: "Voor spieropbouw, kracht en prestatieverbetering.",
    image: img("photo-1581009146145-b5ef050c2e1e", 900),
    to: "/winkel/pillen",
  },
  {
    slug: "kuur-pakketten",
    name: "Kuur pakketten",
    tagline: "Complete kuren inclusief PCT, samengesteld voor jouw doel.",
    image: catKuurImg,
    to: "/winkel/kuur-pakketten",
  },
  {
    slug: "pct",
    name: "PCT",
    tagline: "Post-cycle therapy — herstel je eigen hormoonas na een kuur.",
    image: catPctImg,
    to: "/winkel/pct",
  },
  {
    slug: "afvallen",
    name: "Afvallen",
    tagline: "Effectief vetverlies — van dik naar dun.",
    image: catAfvallenImg,
    to: "/winkel/afvallen",
  },
  {
    slug: "erectiemiddelen",
    name: "Erectiemiddelen",
    tagline: "Betrouwbare oplossingen voor zelfvertrouwen in bed.",
    image: img("photo-1494774157365-9e04c6720e47", 900),
    to: "/winkel/erectiemiddelen",
  },
  {
    slug: "hgh-peptides",
    name: "HGH / Peptides",
    tagline: "Droog, groot en in topvorm — herstel en groei.",
    image: img("photo-1532009324734-20a7a5813719", 900),
    to: "/winkel/hgh-peptides",
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
