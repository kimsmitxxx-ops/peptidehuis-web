import Link from "next/link";
import { useState, useMemo } from "react";
import { Breadcrumb } from "@/components/breadcrumb";
import { SectionHeading } from "@/components/section-heading";
import { ProductCard } from "@/components/product-card";
import { FaqAccordion } from "@/components/faq-accordion";

import { Badge } from "@/components/badge";
import { TrustCard } from "@/components/trust-card";
import { ArticleCard } from "@/components/article-card";
import { UspChecks } from "@/components/shop/usp-checks";
import {
  productsByCategory,
  knowledgeArticles,
  categoryContent,
  type CategoryContent,
} from "@/components/shop/data";
import { ArrowRight, FlaskConical, ShieldCheck, BookOpen, Beaker, MapPin } from "lucide-react";

export interface CategoryViewProps {
  content: CategoryContent;
}

export function CategoryView({ content: c }: CategoryViewProps) {
  const productsInCat = productsByCategory(c.slug);
  const related = c.related
    .map((slug) => categoryContent.find((cat) => cat.slug === slug))
    .filter(Boolean) as CategoryContent[];
  const articles = knowledgeArticles.filter((a) => c.knowledge.includes(a.slug));

  const locations = useMemo(() => {
    const s = new Set<string>();
    productsInCat.forEach((p) => s.add(p.productionLocation ?? "Nederland"));
    return Array.from(s);
  }, [productsInCat]);
  const [activeLoc, setActiveLoc] = useState<string | "all">("all");
  const filtered = activeLoc === "all"
    ? productsInCat
    : productsInCat.filter((p) => (p.productionLocation ?? "Nederland") === activeLoc);

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-6">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: c.group === "pct" ? "PCT" : "Anabolen", href: `/winkel?categorie=${c.group}` },
            { label: c.name },
          ]}
        />
      </div>

      {/* Hero — compact donker */}
      <section className="relative overflow-hidden border-b border-border bg-primary text-primary-foreground">
        <div className="absolute inset-0">
          <img src={c.heroImage} alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/70" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-6 md:py-8">
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <Badge variant="accent">{c.group === "pct" ? "PCT" : "Anabolen"}</Badge>
            <h1 className="font-display text-xl md:text-2xl leading-tight tracking-tight">
              {c.name}
            </h1>
            {c.aka && c.aka.length > 0 && (
              <span className="text-xs text-primary-foreground/65 tabular">
                {c.aka.join(" · ")}
              </span>
            )}
          </div>
          <p className="mt-2 text-sm text-primary-foreground/80 max-w-3xl leading-relaxed">
            {c.intro}
          </p>
        </div>
      </section>

      {/* Products met sidebar */}
      {productsInCat.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-10 grid gap-8 lg:grid-cols-[240px_1fr]">
          <aside className="space-y-4">
            <div className="rounded-lg border border-primary-muted bg-primary p-4 text-primary-foreground">
              <h4 className="text-xs uppercase tracking-wider text-accent-soft font-semibold mb-3 inline-flex items-center gap-1.5">
                <BookOpen size={12} /> Categorie
              </h4>
              <div className="space-y-1 text-sm">
                <Link
                  href={`/winkel/${c.group === "pct" ? "nakuur" : "anabolen"}`}
                  className="block rounded px-2 py-1.5 text-primary-foreground/80 hover:bg-primary-soft hover:text-accent"
                >
                  Alle {c.group === "pct" ? "PCT" : "anabolen"}
                </Link>
                {categoryContent
                  .filter((cat) => cat.group === c.group)
                  .map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/${cat.slug}`}
                      className={`block rounded px-2 py-1.5 ${
                        cat.slug === c.slug
                          ? "bg-accent text-accent-foreground font-semibold"
                          : "text-primary-foreground/80 hover:bg-primary-soft hover:text-accent"
                      }`}
                    >
                      {cat.name}
                    </Link>
                  ))}
              </div>
            </div>
            <div className="rounded-lg border border-primary-muted bg-primary p-4 text-primary-foreground">
              <h4 className="text-xs uppercase tracking-wider text-accent-soft font-semibold mb-3 inline-flex items-center gap-1.5">
                <MapPin size={12} /> Productielocatie
              </h4>
              <div className="space-y-1.5 text-sm">
                <button
                  onClick={() => setActiveLoc("all")}
                  className={`w-full text-left rounded px-2 py-1.5 ${activeLoc === "all" ? "bg-accent text-accent-foreground font-semibold" : "text-primary-foreground/80 hover:bg-primary-soft"}`}
                >
                  Alle locaties
                </button>
                {locations.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => setActiveLoc(loc)}
                    className={`w-full text-left rounded px-2 py-1.5 ${activeLoc === loc ? "bg-accent text-accent-foreground font-semibold" : "text-primary-foreground/80 hover:bg-primary-soft"}`}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            </div>
            <UspChecks defaultOpen />
          </aside>

          <div>
            <SectionHeading variant="eyebrow-plus-display" eyebrow={`In voorraad — ${c.name}`}>
              Beschikbare batches
            </SectionHeading>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((p) => (
                <Link key={p.slug} href={`/product/${p.categorySlug}/${p.slug}`} className="block h-full">
                  <ProductCard
                    image={p.image}
                    name={p.name}
                    slug={p.slug}
                    priceFrom={p.priceFrom}
                    ratingValue={p.rating}
                    ratingCount={p.ratingCount}
                    inStock={p.inStock}
                    tag={p.tag}
                    shortDescription={p.shortDescription}
                    category={p.category}
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Long-form content — donker blok */}
      <section className="bg-primary text-primary-foreground border-y border-primary-soft">
        <div className="mx-auto max-w-7xl px-4 py-16 grid lg:grid-cols-[260px_1fr] gap-10">
          <aside className="hidden lg:block">
            <div className="sticky top-32">
              <p className="text-xs uppercase tracking-[0.15em] text-accent-soft mb-3">Op deze pagina</p>
              <ul className="space-y-2 text-sm">
                {c.sections.map((s, i) => (
                  <li key={i}>
                    <a href={`#sec-${i}`} className="text-primary-foreground/70 hover:text-accent transition-colors">
                      {s.heading}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="#faq" className="text-primary-foreground/70 hover:text-accent transition-colors">
                    Veelgestelde vragen
                  </a>
                </li>
              </ul>
            </div>
          </aside>

          <article className="max-w-3xl space-y-10">
            {c.sections.map((s, i) => (
              <div key={i} id={`sec-${i}`}>
                <h2 className="font-display text-2xl md:text-3xl mb-3 leading-tight">{s.heading}</h2>
                <p className="text-primary-foreground/80 leading-relaxed text-[15px]">{s.body}</p>
              </div>
            ))}

            <div id="faq">
              <h2 className="font-display text-2xl md:text-3xl mb-4 leading-tight">
                Veelgestelde vragen over {c.name}
              </h2>
              <FaqAccordion items={c.faqs} tone="on-dark" />
            </div>
          </article>
        </div>
      </section>

      {/* Trust */}
      <section className="mx-auto max-w-7xl px-4 py-12 grid gap-5 md:grid-cols-3">
        <TrustCard icon={FlaskConical} heading="HPLC-getest per batch" sub="Janoshik en Anabolic Lab verificatie." />
        <TrustCard icon={ShieldCheck} heading="Discreet verpakt" sub="Neutrale verpakking, geen vermelding." />
        <TrustCard icon={Beaker} heading="Volledige terugbetaling" sub="Bij batch die niet matcht met COA." />
      </section>

      {/* Knowledge base */}
      {articles.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-12">
          <SectionHeading
            variant="eyebrow-plus-display"
            eyebrow="Verdieping"
            ctaLabel="Hele kennisbank"
            ctaHref="/kennisbank"
          >
            Lees verder over {c.name}
          </SectionHeading>
          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            {articles.map((a) => (
              <ArticleCard
                key={a.slug}
                image={a.image}
                kindTag={a.kindTag}
                title={a.title}
                excerpt={a.excerpt}
                publishedAt={a.publishedAt}
                updatedAt={a.updatedAt}
                author={a.author}
                href={`/kennisbank/${a.slug}`}
              />
            ))}
          </div>
        </section>
      )}

      {/* Related categories */}
      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-12 pb-20">
          <SectionHeading variant="eyebrow-plus-display" eyebrow="Vaak samen onderzocht">
            Gerelateerde stoffen
          </SectionHeading>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/${r.slug}`}
                className="group block rounded-lg border border-border bg-surface p-5 hover:border-accent transition-colors"
              >
                <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-text-subtle">
                  <BookOpen size={12} /> Categorie
                </div>
                <h3 className="mt-2 font-display text-lg text-text group-hover:text-accent">{r.name}</h3>
                <p className="mt-1 text-sm text-text-muted line-clamp-2">{r.tagline}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm text-accent">
                  Naar {r.name} <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

export default CategoryView;
