/**
 * Shared static data voor peptidehuis-web.
 * Product-catalog + blogs komen uit Supabase; deze file bevat alleen
 * hero-illustraties en category-tegel fallbacks voor de homepage.
 */

const catHealing = "/assets/cat-peptide-healing.jpg";
const catFatloss = "/assets/cat-peptide-fatloss.jpg";
const catGrowth = "/assets/cat-peptide-growth.jpg";
const catCognitive = "/assets/cat-peptide-cognitive.jpg";
const catLongevity = "/assets/cat-peptide-longevity.jpg";

export interface MainCategory {
  slug: string;
  name: string;
  tagline: string;
  image: string;
  to: string;
}

export const mainCategories: MainCategory[] = [
  { slug: "genezing", name: "Genezing & herstel", tagline: "BPC-157, TB-500, KPV — voor pees-, spier- en weefselherstel.", image: catHealing, to: "/winkel/genezing" },
  { slug: "vetverlies", name: "Vetverlies", tagline: "Retatrutide, Semaglutide, Tirzepatide, HGH Fragment — GLP-1 en beta-oxidatie.", image: catFatloss, to: "/winkel/vetverlies" },
  { slug: "spiergroei", name: "Spiergroei & GH", tagline: "CJC-1295, Ipamorelin, MOTS-c — natuurlijke GH-release en spiergroei.", image: catGrowth, to: "/winkel/spiergroei" },
  { slug: "cognitie", name: "Cognitie & stemming", tagline: "Selank, Semax, DSIP — nootropics voor focus, slaap en stress.", image: catCognitive, to: "/winkel/cognitie" },
  { slug: "longevity", name: "Longevity", tagline: "Epithalon, Thymosin Alpha-1, NAD+, Humanin — anti-aging en cellulair herstel.", image: catLongevity, to: "/winkel/longevity" },
];

// Legacy exports voor backwards-compat met components die nog verwijzen
export interface CategoryContent {
  slug: string;
  group: "anabolen" | "pct";
  name: string;
  aka: string[];
  tagline: string;
  heroImage: string;
  heroImageAlt: string;
  intro: string;
  longIntro?: string;
  keyFacts: { label: string; value: string }[];
  sections: { heading: string; body: string }[];
  faqs?: { q: string; a: string }[];
  usps?: string[];
  related?: string[];
  knowledge?: string[];
  resultImage?: string;
  resultImageAlt?: string;
}

export const categoryContent: CategoryContent[] = [];

export function findCategoryContent(slug: string): CategoryContent | undefined {
  return categoryContent.find((c) => c.slug === slug);
}

export function findCategoryContentByGroup(group: "anabolen" | "pct") {
  return categoryContent.filter((c) => c.group === group);
}

export function categoriesByGroup(_group: "anabolen" | "pct"): CategoryContent[] {
  return [];
}
