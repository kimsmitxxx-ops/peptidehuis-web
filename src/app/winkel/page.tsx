import Link from "next/link";
import { listCategories, listProducts } from "@/lib/queries";
import { ProductCard } from "@/components/product-card";
import type { Metadata } from "next";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Winkel — alle anabolen, PCT en kuurpakketten",
  description: "Volledig overzicht van anabolenpro: Anavar, Dianabol, Testosteron-esters, Trenbolone, Masteron, Boldenone, PCT en kuurpakketten. Lab-getest per batch.",
  alternates: { canonical: "/winkel" },
};

export default async function WinkelIndexPage() {
  const [categories, allProducts] = await Promise.all([
    listCategories(),
    listProducts({ limit: 60 }),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-6 text-xs text-text-muted">
        <Link href="/" className="hover:underline">Home</Link> / <span>Winkel</span>
      </div>
      <h1 className="font-display text-3xl md:text-4xl">Volledige catalogus</h1>
      <p className="mt-3 max-w-2xl text-text-muted">
        Alles van anabolenpro op één plek. Klik op een categorie voor diepgaande info of scroll voor het hele aanbod.
      </p>

      {/* Categorie tegels */}
      <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {categories.map((c) => (
          <Link key={c.slug} href={`/winkel/${c.slug}`} className="rounded-xl border border-paper-border bg-paper-soft px-4 py-3 text-sm hover:border-accent">
            <p className="font-medium">{c.name}</p>
            {c.description && <p className="mt-1 line-clamp-1 text-[11px] text-text-muted">{c.description}</p>}
          </Link>
        ))}
      </div>

      {/* Alle producten */}
      <h2 className="mt-10 font-display text-xl">{allProducts.length} producten</h2>
      <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {allProducts.map((p) => (
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
  );
}
