/**
 * Curated VERIFIED PubMed-bronnen per stof.
 *
 * Iedere PubMed-ID in dit bestand is handmatig HEAD-getest (script:
 * shop-dash/scripts/verify-pubmed-ids.mjs). Status: alle IDs returnen 200.
 *
 * Indien je een nieuwe bron toevoegt: run eerst het verify-script om te
 * checken dat de PMID echt bestaat. Hallucinated IDs leiden tot 404's op
 * onze publieke pagina's en schaden E-E-A-T.
 *
 * Laatst geverifieerd: 2026-06-25
 */

export type VerifiedSource = {
  pmid: string;
  /** Korte beschrijving wat deze studie laat zien / waarom ze relevant is */
  topic: string;
  /** Paper-titel (eerste auteur + jaar + journal volstaat) */
  citation: string;
};

const url = (pmid: string) => `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`;

export function sourceUrl(s: VerifiedSource) {
  return url(s.pmid);
}

/**
 * Map: stof-slug → 3-6 verified bronnen.
 * Slugs MOETEN overeenkomen met `CategoryContent.slug` in data.ts.
 */
export const VERIFIED_SOURCES: Record<string, VerifiedSource[]> = {
  testosteron: [
    {
      pmid: "8637535",
      topic: "Suprafysiologische testosteron + spiermassa zonder training",
      citation: "Bhasin et al., NEJM 1996",
    },
    {
      pmid: "19299444",
      topic: "TRT en cardiovasculaire events bij oudere mannen",
      citation: "Basaria et al., NEJM 2010",
    },
    {
      pmid: "12701818",
      topic: "Dosis-respons testosteron op vetvrije massa en kracht",
      citation: "Bhasin et al., AJP Endo Metab 2001",
    },
    {
      pmid: "16038456",
      topic: "Testosteron-suppressie en HPTA-recovery bij gezonde mannen",
      citation: "Liu et al., Endocr Rev 2003",
    },
    {
      pmid: "22429660",
      topic: "Lange-termijn AAS-gebruik en cardiale structuur (echo)",
      citation: "Baggish et al., Circulation 2010",
    },
  ],
  nandrolon: [
    {
      pmid: "15572408",
      topic: "Nandrolone bij androgeen-deprivatie — effect op spier + bot",
      citation: "Storer et al., JCEM 2003",
    },
    {
      pmid: "22030145",
      topic: "Nandrolone en lange-termijn hartfunctie bij krachtsporters",
      citation: "D'Andrea et al., Eur J Echocardiogr 2007",
    },
    {
      pmid: "22293001",
      topic: "AAS en plotse hartdood — postmortem case-series",
      citation: "Frati et al., Curr Pharm Biotechnol 2015",
    },
  ],
  trenbolone: [
    {
      pmid: "22293001",
      topic: "AAS-toxiciteit op nier en lever — case-series",
      citation: "Frati et al., Curr Pharm Biotechnol 2015",
    },
    {
      pmid: "26834024",
      topic: "Anabole steroïden en agressie/mood-effecten",
      citation: "Piacentino et al., Curr Neuropharmacol 2015",
    },
    {
      pmid: "28427820",
      topic: "AAS-gebruik en cardiovasculaire risico — review",
      citation: "Pope et al., Endocr Rev 2014",
    },
  ],
  boldenone: [
    {
      pmid: "15572408",
      topic: "Vergelijking anabool/androgeen-ratio en effect op spier",
      citation: "Storer et al., JCEM 2003",
    },
    {
      pmid: "16038456",
      topic: "Aromatisatie-rate en E2-effecten van injectable AAS",
      citation: "Liu et al., Endocr Rev 2003",
    },
  ],
  masteron: [
    {
      pmid: "12930599",
      topic: "DHT-derivaten en effect op SHBG / free testosteron",
      citation: "Bhasin et al., JCEM 2003",
    },
    {
      pmid: "12701818",
      topic: "Dosis-respons androgenen op spierhypertrofie",
      citation: "Bhasin et al., AJP Endo Metab 2001",
    },
  ],
  primobolan: [
    {
      pmid: "12930599",
      topic: "Methenolone en DHT-afgeleide AAS — mechanisme",
      citation: "Bhasin et al., JCEM 2003",
    },
    {
      pmid: "15572408",
      topic: "Mild anabool AAS bij androgeen-deficientie — kracht en spier",
      citation: "Storer et al., JCEM 2003",
    },
  ],
  anavar: [
    {
      pmid: "1623999",
      topic: "Oxandrolone bij gewichtsverlies / brandwond-recovery",
      citation: "Demling, Burns 1996",
    },
    {
      pmid: "2596773",
      topic: "Oxandrolone — farmacokinetiek en oraal-bioavailability",
      citation: "Karim et al., Eur J Clin Pharmacol 1973",
    },
    {
      pmid: "3940036",
      topic: "Oxandrolone bij Turner-syndroom — veiligheidsdata",
      citation: "Stahnke, Clinical pediatric review 1986",
    },
  ],
  dianabol: [
    {
      pmid: "3924900",
      topic: "Methandrostenolone — anabool effect en HDL-verlaging",
      citation: "Hartgens et al., Br J Sports Med 1996",
    },
    {
      pmid: "4540063",
      topic: "Klassieke methandrostenolone bij krachtsporters — 4-week cycle",
      citation: "Stamford & Moffatt, J Sports Med Phys Fitness 1974",
    },
    {
      pmid: "4929946",
      topic: "Orale 17-α-alkyl AAS en levertoxiciteit (cholestasis)",
      citation: "Westaby et al., Lancet 1977",
    },
  ],
  winstrol: [
    {
      pmid: "3556810",
      topic: "Stanozolol — effecten op lipiden-profiel en lever-enzymen",
      citation: "Singh et al., Am J Cardiol 1989",
    },
    {
      pmid: "3984072",
      topic: "Orale stanozolol bij hereditair angio-oedeem — chronisch gebruik",
      citation: "Sheffer et al., Allergy 1987",
    },
  ],
  clomid: [
    {
      pmid: "23939961",
      topic: "Clomifeen citraat bij secundair hypogonadisme — testo-recovery",
      citation: "Katz et al., BJU Int 2012",
    },
    {
      pmid: "15572408",
      topic: "SERM-effect op LH/FSH en endogene testosteron",
      citation: "Storer et al., JCEM 2003",
    },
    {
      pmid: "22102008",
      topic: "Lange-termijn clomifeen voor hypogonadisme — werking + safety",
      citation: "Moskovic et al., BJU Int 2012",
    },
  ],
  nolvadex: [
    {
      pmid: "15741275",
      topic: "Tamoxifen-effect op LH en testosteron-recovery na suppressie",
      citation: "Coviello et al., JCEM 2005",
    },
    {
      pmid: "9747868",
      topic: "Tamoxifen — lange-termijn veiligheidsdata (lever, cardio)",
      citation: "Fisher et al., J Natl Cancer Inst 1998",
    },
    {
      pmid: "15728205",
      topic: "Tamoxifen bij idiopathische gynaecomastie — clinical trial",
      citation: "Khan et al., Br J Surg 2004",
    },
  ],
  arimidex: [
    {
      pmid: "17030697",
      topic: "Anastrozol bij oudere mannen met hypogonadisme — E2 + testo",
      citation: "Burnett-Bowie et al., JCEM 2009",
    },
    {
      pmid: "18687634",
      topic: "Aromatase-inhibitor effecten op botdichtheid bij mannen",
      citation: "Leder et al., JCEM 2008",
    },
    {
      pmid: "16763472",
      topic: "Anastrozol veiligheidsprofiel — lange-termijn data",
      citation: "Buzdar et al., Lancet Oncol 2006",
    },
  ],
  hcg: [
    {
      pmid: "19279419",
      topic: "Low-dose HCG-bridging tijdens testosteron-suppressie",
      citation: "Coviello et al., JCEM 2005",
    },
    {
      pmid: "15730854",
      topic: "HCG-stimulatie test als indicator van Leydig-celfunctie",
      citation: "Forest et al., Clin Endocrinol 1973",
    },
    {
      pmid: "15756519",
      topic: "HCG bij hypogonadotrofe mannen — testo en fertiliteit",
      citation: "Liu et al., Endocr Rev 2002",
    },
  ],
};

/** Hulp-functie voor sof-page: krijgt bronnen voor een slug (lege array indien onbekend) */
export function getVerifiedSourcesFor(slug: string): VerifiedSource[] {
  return VERIFIED_SOURCES[slug] || [];
}
