import Link from "next/link";
import { notFound } from "next/navigation";
import { permanentRedirect } from "next/navigation";
import { productVoorStof } from "@/lib/stoffen/actief-product";
import type { Metadata } from "next";
import { STOFFEN, getStof } from "@/lib/stoffen";
import { getProduct, formatEUR } from "@/lib/queries";
import { MedicalDisclaimer } from "@/components/medical-disclaimer";
import { FaqAccordion } from "@/components/faq-accordion";
import { ArrowRight, FlaskConical, BookOpen, ExternalLink } from "lucide-react";

export const revalidate = 3600;

// Geen generateStaticParams: of deze pagina bestaat hangt af van de voorraad,
// en die kan in de dash wijzigen zonder dat er opnieuw gebouwd wordt.
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { stof: string } }): Promise<Metadata> {
  const stof = getStof(params.stof);
  if (!stof) return { title: "Niet gevonden" };
  return {
    title: stof.metaTitle,
    description: stof.metaDescription,
    alternates: { canonical: `/peptiden/${stof.slug}` },
    openGraph: { title: stof.metaTitle, description: stof.oneLiner, type: "article" },
  };
}

const SECTIONS: { key: "watIs" | "werking" | "onderzoek" | "protocol" | "reconstitutie"; title: (n: string) => string }[] = [
  { key: "watIs", title: (n) => `Wat is ${n}?` },
  { key: "werking", title: () => "Hoe werkt het?" },
  { key: "onderzoek", title: () => "Wat zegt het onderzoek?" },
  { key: "protocol", title: () => "Hoe wordt het in onderzoek toegepast?" },
  { key: "reconstitutie", title: () => "Reconstitutie en opslag" },
];

const PROSE =
  "prose max-w-none text-text [&>p]:my-3 [&>p]:leading-relaxed [&_a]:text-accent [&_a]:underline [&_a:hover]:text-accent-muted";

export default async function StofPage({ params }: { params: { stof: string } }) {
  const stof = getStof(params.stof);
  if (!stof) notFound();
  // Is de stof weer leverbaar, dan is de productpagina de pagina voor deze stof.
  const product = await productVoorStof(params.stof);
  if (product) permanentRedirect(`/product/${product}`);

  const products = (await Promise.all(stof.productSlugs.map((s) => getProduct(s)))).filter(Boolean) as any[];
  const related = STOFFEN.filter((s) => s.categorySlug === stof.categorySlug && s.slug !== stof.slug);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: stof.metaTitle,
    description: stof.metaDescription,
    author: { "@type": "Organization", name: "Peptidehuis" },
    publisher: { "@type": "Organization", name: "Peptidehuis" },
    mainEntityOfPage: `https://peptidehuis.nl/peptiden/${stof.slug}`,
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: stof.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://peptidehuis.nl/" },
      { "@type": "ListItem", position: 2, name: "Peptiden", item: "https://peptidehuis.nl/peptiden" },
      { "@type": "ListItem", position: 3, name: stof.name, item: `https://peptidehuis.nl/peptiden/${stof.slug}` },
    ],
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <nav className="mb-6 text-xs text-text-muted">
        <Link href="/" className="hover:underline">Home</Link> /{" "}
        <Link href="/peptiden" className="hover:underline">Peptiden</Link> / <span>{stof.name}</span>
      </nav>

      {/* Hero */}
      <header className="max-w-3xl">
        <p className="inline-flex items-center gap-2 rounded-full border border-border bg-paper-soft px-3 py-1 text-xs text-text-muted">
          <FlaskConical size={12} className="text-accent" /> {stof.categoryName}
        </p>
        <h1 className="mt-4 font-display text-4xl md:text-5xl">{stof.name}</h1>
        {stof.aka.length > 0 && (
          <p className="mt-2 text-sm text-text-subtle">Ook bekend als: {stof.aka.join(" · ")}</p>
        )}
        <p className="mt-4 text-lg text-text-muted leading-relaxed">{stof.oneLiner}</p>
      </header>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_320px]">
        {/* Content */}
        <article className="min-w-0 max-w-3xl space-y-10">
          {SECTIONS.map(({ key, title }) => (
            <section key={key}>
              <h2 className="font-display text-2xl text-text">{title(stof.name)}</h2>
              <div className={`mt-3 ${PROSE}`} dangerouslySetInnerHTML={{ __html: stof[key] }} />
            </section>
          ))}

          {/* FAQ */}
          <section>
            <h2 className="font-display text-2xl text-text">Veelgestelde vragen over {stof.name}</h2>
            <div className="mt-4">
              <FaqAccordion items={stof.faqs.map((f) => ({ question: f.q, answer: f.a }))} />
            </div>
          </section>

          {/* Bronnen */}
          {stof.bronnen.length > 0 && (
            <section className="rounded-lg border border-border bg-paper-soft p-5">
              <h2 className="font-display text-lg text-text inline-flex items-center gap-2">
                <BookOpen size={16} className="text-accent" /> Bronnen
              </h2>
              <ul className="mt-3 space-y-2 text-sm">
                {stof.bronnen.map((b) => (
                  <li key={b.url}>
                    <a href={b.url} target="_blank" rel="noopener" className="inline-flex items-start gap-1.5 text-accent hover:underline">
                      <ExternalLink size={13} className="mt-0.5 shrink-0" /> {b.title}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <MedicalDisclaimer />
        </article>

        {/* Sidebar: producten + gerelateerde stoffen */}
        <aside className="space-y-6 lg:sticky lg:top-32 lg:self-start">
          {products.length > 0 && (
            <div className="rounded-lg border border-accent/30 bg-accent-soft/10 p-4">
              <p className="text-xs uppercase tracking-wider text-accent font-semibold">
                {stof.name} kopen voor onderzoek
              </p>
              <div className="mt-3 space-y-3">
                {products.map((p) => (
                  <Link
                    key={p.id}
                    href={`/product/${p.slug}`}
                    className="flex items-center gap-3 rounded-md border border-border bg-background p-3 hover:border-accent transition-colors"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img loading="lazy" decoding="async" src={p.image_url || "/assets/vial-placeholder.jpg"} alt={p.name} className="h-14 w-14 rounded object-cover" />
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium text-text truncate">{p.name}</span>
                      <span className="block text-sm text-accent font-semibold tabular">{formatEUR(p.price_cents)}</span>
                    </span>
                    <ArrowRight size={14} className="text-accent shrink-0" />
                  </Link>
                ))}
              </div>
              <p className="mt-3 text-[11px] text-text-subtle leading-snug">
                Janoshik lab-getest, COA per batchcode. Uitsluitend voor onderzoeksdoeleinden.
              </p>
            </div>
          )}

          <div className="rounded-lg border border-border bg-surface p-4">
            <p className="text-xs uppercase tracking-wider text-accent-muted font-semibold">Handige links</p>
            <ul className="mt-2 space-y-1.5 text-sm">
              <li><Link href="/reconstitutie-calculator" className="text-text hover:text-accent">Reconstitutie-calculator</Link></li>
              <li><Link href="/lab" className="text-text hover:text-accent">COA opvragen per batchcode</Link></li>
              <li><Link href="/begrippenlijst" className="text-text hover:text-accent">Begrippenlijst</Link></li>
              <li><Link href={`/winkel/${stof.categorySlug}`} className="text-text hover:text-accent">Categorie: {stof.categoryName}</Link></li>
            </ul>
          </div>

          {related.length > 0 && (
            <div className="rounded-lg border border-border bg-surface p-4">
              <p className="text-xs uppercase tracking-wider text-accent-muted font-semibold">Gerelateerde peptiden</p>
              <ul className="mt-2 space-y-1.5 text-sm">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link href={`/peptiden/${r.slug}`} className="text-text hover:text-accent">{r.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
