import Link from "next/link";
import { notFound } from "next/navigation";
import { listProducts, getBlogPost } from "@/lib/queries";
import { ProductCard } from "@/components/product-card";
import { categoryContent, findCategoryContent } from "@/components/shop/data";
import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/badge";
import { FaqAccordion } from "@/components/faq-accordion";
import type { Metadata } from "next";
import { BookOpen, Beaker, MapPin, ArrowRight, FlaskConical, ShieldCheck } from "lucide-react";

export const revalidate = 600;

export async function generateStaticParams() {
  return categoryContent.map((c) => ({ stof: c.slug }));
}

export async function generateMetadata({ params }: { params: { stof: string } }): Promise<Metadata> {
  const c = findCategoryContent(params.stof);
  if (!c) return { title: "Niet gevonden" };
  const title = `${c.name} — werking, doseringen en COA · AnabolenPro`;
  return {
    title,
    description: c.intro,
    alternates: { canonical: `/${params.stof}` },
    openGraph: {
      title,
      description: c.intro,
      url: `/${params.stof}`,
      type: "article",
      images: c.heroImage ? [{ url: c.heroImage }] : undefined,
    },
  };
}

export default async function StofPage({ params }: { params: { stof: string } }) {
  const c = findCategoryContent(params.stof);
  if (!c) notFound();

  const allProducts = await listProducts({ limit: 200 });
  const products = allProducts
    .filter(
      (p) =>
        p.name.toLowerCase().includes(c.slug) ||
        (c.aka || []).some((a) => p.name.toLowerCase().includes(a.toLowerCase())) ||
        p.tags?.some((t) => t.toLowerCase().includes(c.slug)),
    )
    .slice(0, 12);

  const related = c.related
    .map((slug) => categoryContent.find((cat) => cat.slug === slug))
    .filter(Boolean) as typeof categoryContent;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${c.name} — werking, doseringen en COA`,
    description: c.intro,
    image: c.heroImage,
    author: { "@type": "Organization", name: "AnabolenPro" },
    mainEntityOfPage: `/${c.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      <div className="mx-auto max-w-7xl px-4 py-4">
        <div className="text-xs text-text-muted">
          <Link href="/" className="hover:underline">Home</Link> /{" "}
          <Link href="/kennisbank" className="hover:underline">Kennisbank</Link> /{" "}
          <span>{c.name}</span>
        </div>
      </div>

      {/* Hero — compact donker */}
      <section className="relative overflow-hidden border-b border-border bg-primary text-primary-foreground">
        {c.heroImage && (
          <div className="absolute inset-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={c.heroImage} alt="" className="w-full h-full object-cover opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/70" />
          </div>
        )}
        <div className="relative mx-auto max-w-7xl px-4 py-8 md:py-12">
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <Badge variant="accent">{c.group === "pct" ? "PCT" : "Anabolen"}</Badge>
            <h1 className="font-display text-3xl md:text-5xl leading-tight tracking-tight">{c.name}</h1>
            {c.aka && c.aka.length > 0 && (
              <span className="text-xs text-primary-foreground/65 tabular">
                {c.aka.join(" · ")}
              </span>
            )}
          </div>
          <p className="mt-3 text-base md:text-lg text-primary-foreground/80 max-w-3xl leading-relaxed">{c.intro}</p>
          {c.longIntro && c.longIntro !== c.intro && (
            <p className="mt-3 text-sm text-primary-foreground/70 max-w-3xl leading-relaxed">{c.longIntro}</p>
          )}
        </div>
      </section>

      {/* Key facts */}
      {c.keyFacts && c.keyFacts.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-10">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {c.keyFacts.map((f) => (
              <div key={f.label} className="rounded-lg border border-border bg-surface p-4">
                <p className="text-[10px] uppercase tracking-wider text-text-subtle">{f.label}</p>
                <p className="mt-1 font-display text-lg text-text">{f.value}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Producten + sidebar related */}
      {products.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-10 grid gap-8 lg:grid-cols-[1fr_280px]">
          <div>
            <SectionHeading variant="eyebrow-plus-display" eyebrow={`In voorraad — ${c.name}`}>
              {products.length} product{products.length === 1 ? "" : "en"}
            </SectionHeading>
            <div className="mt-6 grid gap-5 grid-cols-2 lg:grid-cols-3">
              {products.map((p) => (
                <Link key={p.id} href={`/product/${p.categories?.slug || "winkel"}/${p.slug}`} className="block">
                  <ProductCard
                    image={p.image_url || "/assets/cat-anabolen.png"}
                    name={p.name}
                    slug={p.slug}
                    priceFrom={p.price_cents / 100}
                    ratingValue={4.8}
                    inStock={p.availability !== "OutOfStock"}
                    tag={p.tags?.[0]}
                    category={p.categories?.name}
                    shortDescription={p.subtitle || undefined}
                  />
                </Link>
              ))}
            </div>
          </div>
          <aside className="space-y-4 lg:sticky lg:top-32 lg:self-start">
            <div className="rounded-lg border border-primary-muted bg-primary p-4 text-primary-foreground">
              <h4 className="text-xs uppercase tracking-wider text-accent-soft font-semibold mb-3 inline-flex items-center gap-1.5">
                <BookOpen size={12} /> Verwante stoffen
              </h4>
              <div className="space-y-1 text-sm">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/${r.slug}`}
                    className="block rounded px-2 py-1.5 text-primary-foreground/80 hover:bg-primary-soft hover:text-accent"
                  >
                    {r.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="rounded-lg border border-border bg-surface p-4 text-text space-y-3 text-sm">
              <h4 className="text-xs uppercase tracking-wider text-accent-muted font-semibold inline-flex items-center gap-1.5">
                <ShieldCheck size={12} /> Garanties
              </h4>
              <p className="inline-flex items-start gap-2"><FlaskConical size={14} className="text-accent mt-0.5" /> Iedere batch lab-getest</p>
              <p className="inline-flex items-start gap-2"><ShieldCheck size={14} className="text-accent mt-0.5" /> 100% anoniem &amp; discreet</p>
            </div>
          </aside>
        </section>
      )}

      {/* Lange content sections */}
      {c.sections && c.sections.length > 0 && (
        <section className="mx-auto max-w-3xl px-4 py-14 space-y-10">
          {c.sections.map((s, i) => (
            <div key={i} className="prose-doktor">
              <h2 className="font-display text-2xl md:text-3xl mt-2">{s.heading}</h2>
              <p className="mt-3 text-text leading-relaxed">{s.body}</p>
            </div>
          ))}
        </section>
      )}

      {/* FAQ */}
      {c.faqs && c.faqs.length > 0 && (
        <section className="bg-paper">
          <div className="mx-auto max-w-4xl px-4 py-14">
            <SectionHeading
              variant="eyebrow-plus-display"
              eyebrow="Veelgestelde vragen"
              className="text-primary [&_*]:text-primary"
            >
              Over {c.name}
            </SectionHeading>
            <div className="mt-8">
              <FaqAccordion items={c.faqs} tone="light" />
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-primary text-primary-foreground border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-start gap-4">
            <Beaker size={32} className="text-accent shrink-0" />
            <div>
              <h3 className="font-display text-2xl text-primary-foreground">
                Klaar om {c.name} te bestellen?
              </h3>
              <p className="mt-1 text-primary-foreground/70 max-w-xl">
                Onze {c.name.toLowerCase()}-batches zijn lab-getest, anoniem verpakt en morgen in huis.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/winkel"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground hover:bg-accent-soft"
            >
              Naar de winkel <ArrowRight size={16} />
            </Link>
            <Link
              href="/kennisbank"
              className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 px-5 py-3 text-sm font-medium hover:bg-primary-soft"
            >
              <MapPin size={14} /> Lees meer in de kennisbank
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
