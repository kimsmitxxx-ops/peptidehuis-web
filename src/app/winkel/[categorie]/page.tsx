import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategory, listProducts, listCategories } from "@/lib/queries";
import { ProductCard } from "@/components/product-card";
import type { Metadata } from "next";

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
  const [cat, products] = await Promise.all([
    getCategory(params.categorie),
    listProducts({ categorySlug: params.categorie }),
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

      {products.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-paper-border bg-paper-soft p-10 text-center text-text-muted">
          Nog geen producten in deze categorie.
        </div>
      ) : (
        <>
          <p className="mt-8 text-sm text-text-muted">{products.length} producten</p>
          <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((p) => <ProductCard key={p.id} p={p} />)}
          </div>
        </>
      )}
    </div>
  );
}
