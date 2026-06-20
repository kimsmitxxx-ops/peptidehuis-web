import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategory, listProducts, listCategories } from "@/lib/queries";
import { ProductCard } from "@/components/product-card";
import type { Metadata } from "next";
import { BookOpen, Truck, ShieldCheck, FlaskConical } from "lucide-react";

export const revalidate = 300;
export const dynamicParams = true;

export async function generateStaticParams() {
  const cats = await listCategories();
  return cats.map((c) => ({ categorie: c.slug }));
}

export async function generateMetadata({ params }: { params: { categorie: string } }): Promise<Metadata> {
  const cat = await getCategory(params.categorie);
  if (!cat) return { title: "Niet gevonden" };
  return {
    title: cat.meta_title || `${cat.name} kopen`,
    description: cat.meta_description || cat.description || `${cat.name} bij anabolenpro — lab-getest, snel uit Nederland.`,
    alternates: { canonical: `/winkel/${cat.slug}` },
    openGraph: { title: cat.name, description: cat.description || undefined, type: "website" },
  };
}

export default async function CategoryPage({ params }: { params: { categorie: string } }) {
  const [cat, products, allCategories] = await Promise.all([
    getCategory(params.categorie),
    listProducts({ categorySlug: params.categorie }),
    listCategories(),
  ]);
  if (!cat) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: cat.name,
    url: `/winkel/${cat.slug}`,
    description: cat.description,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: products.slice(0, 30).map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Product",
          name: p.name,
          sku: p.sku,
          image: p.image_url || undefined,
          offers: { "@type": "Offer", price: (p.price_cents / 100).toFixed(2), priceCurrency: "EUR", availability: p.availability === "OutOfStock" ? "https://schema.org/OutOfStock" : "https://schema.org/InStock" },
        },
      })),
    },
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mb-6 text-xs text-text-muted">
        <Link href="/" className="hover:underline">Home</Link> / <Link href="/winkel" className="hover:underline">Winkel</Link> / <span>{cat.name}</span>
      </div>

      <h1 className="font-display text-3xl md:text-4xl">{cat.name}</h1>
      {cat.description && <p className="mt-3 max-w-3xl text-text-muted leading-relaxed">{cat.description}</p>}

      <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside className="space-y-4 lg:sticky lg:top-32 lg:self-start">
          <div className="rounded-lg border border-primary-muted bg-primary p-4 text-primary-foreground">
            <h4 className="text-xs uppercase tracking-wider text-accent-soft font-semibold mb-3 inline-flex items-center gap-1.5">
              <BookOpen size={12} /> Categorieën
            </h4>
            <div className="space-y-1 text-sm">
              <Link
                href="/winkel"
                className="block rounded px-2 py-1.5 text-primary-foreground/80 hover:bg-primary-soft hover:text-accent"
              >
                Alle producten
              </Link>
              {allCategories.map((c) => (
                <Link
                  key={c.slug}
                  href={`/winkel/${c.slug}`}
                  className={`block rounded px-2 py-1.5 ${
                    c.slug === cat.slug
                      ? "bg-accent text-accent-foreground font-semibold"
                      : "text-primary-foreground/80 hover:bg-primary-soft hover:text-accent"
                  }`}
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-border bg-surface p-4 text-text space-y-3 text-sm">
            <h4 className="text-xs uppercase tracking-wider text-accent-muted font-semibold inline-flex items-center gap-1.5">
              <ShieldCheck size={12} /> Onze garanties
            </h4>
            <p className="inline-flex items-start gap-2"><Truck size={14} className="text-accent mt-0.5" /> Voor 23:00 besteld, morgen in huis</p>
            <p className="inline-flex items-start gap-2"><FlaskConical size={14} className="text-accent mt-0.5" /> Iedere batch lab-getest (COA in product)</p>
            <p className="inline-flex items-start gap-2"><ShieldCheck size={14} className="text-accent mt-0.5" /> 100% anoniem &amp; discreet verpakt</p>
          </div>
        </aside>

        <div className="min-w-0">
          {products.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-paper-border bg-paper-soft p-10 text-center text-text-muted">
              Nog geen producten in deze categorie.
            </div>
          ) : (
            <>
              <p className="text-sm text-text-muted">{products.length} producten</p>
              <div className="mt-4 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {products.map((p) => (
                  <Link key={p.id} href={`/product/${p.categories?.slug || cat.slug}/${p.slug}`} className="block">
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}
