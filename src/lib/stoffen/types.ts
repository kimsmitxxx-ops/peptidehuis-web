/**
 * Stof-pagina's: per peptide een eigen informatiepagina op /peptiden/<slug>.
 * Doel: ranken op de stofnaam ("retatrutide", "bpc-157 kopen") met eerlijke,
 * bronnen-onderbouwde content plus LLM-vriendelijke FAQ's.
 */

export type StofFaq = { q: string; a: string };
export type StofBron = { title: string; url: string };

export type Stof = {
  slug: string;
  name: string;
  aka: string[];
  categorySlug: string;
  categoryName: string;
  /** Product-slugs die op deze pagina als koop-CTA getoond worden. */
  productSlugs: string[];
  oneLiner: string;
  /** Datum waarop deze gids voor het laatst is nagelopen (JJJJ-MM-DD). */
  bijgewerkt: string;
  metaTitle: string;
  metaDescription: string;
  /** HTML-secties. Interne links toegestaan; externe bronnen phrase-linked. */
  watIs: string;
  werking: string;
  onderzoek: string;
  protocol: string;
  reconstitutie: string;
  faqs: StofFaq[];
  bronnen: StofBron[];
};
