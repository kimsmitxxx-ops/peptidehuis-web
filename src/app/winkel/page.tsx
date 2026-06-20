import Link from "next/link";
import { listCategories, listProducts } from "@/lib/queries";
import { ProductCard } from "@/components/product-card";
import type { Metadata } from "next";
import { BookOpen, Truck, ShieldCheck, FlaskConical } from "lucide-react";

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

      <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside className="space-y-4 lg:sticky lg:top-32 lg:self-start">
          <div className="rounded-lg border border-primary-muted bg-primary p-4 text-primary-foreground">
            <h4 className="text-xs uppercase tracking-wider text-accent-soft font-semibold mb-3 inline-flex items-center gap-1.5">
              <BookOpen size={12} /> Categorieën
            </h4>
            <div className="space-y-1 text-sm">
              <Link
                href="/winkel"
                className="block rounded px-2 py-1.5 bg-accent text-accent-foreground font-semibold"
              >
                Alle producten
              </Link>
              {categories.map((c) => (
                <Link
                  key={c.slug}
                  href={`/winkel/${c.slug}`}
                  className="block rounded px-2 py-1.5 text-primary-foreground/80 hover:bg-primary-soft hover:text-accent"
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
          <h2 className="font-display text-xl">{allProducts.length} producten</h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
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
      </div>
    </div>
  );
}
