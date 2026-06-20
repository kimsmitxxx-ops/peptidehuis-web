import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, formatEUR, listProducts } from "@/lib/queries";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { ProductCard } from "@/components/product-card";
import { ShieldCheck, Truck, FlaskConical, ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const revalidate = 300;

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const p = await getProduct(params.slug);
  if (!p) return { title: "Niet gevonden" };
  return {
    title: p.meta_title || `${p.name} kopen voor ${formatEUR(p.price_cents)}`,
    description: p.meta_description || p.subtitle || p.description || `${p.name} bij anabolenpro — lab-getest, snelle verzending.`,
    alternates: { canonical: `/product/${params.categorie}/${params.slug}` },
    openGraph: {
      title: p.name,
      description: p.subtitle || undefined,
      images: p.image_url ? [{ url: p.image_url }] : undefined,
      type: "website",
    },
  };
}

export default async function ProductDetailPage({ params }: { params: { categorie: string; slug: string } }) {
  const p = await getProduct(params.slug) as any;
  if (!p) notFound();

  const related = await listProducts({ categorySlug: params.categorie, limit: 4 });
  const media = p.product_media?.sort((a: any, b: any) => a.sort_order - b.sort_order) || [];
  const gallery = media.length > 0 ? media : (p.image_url ? [{ url: p.image_url, alt: p.name }] : []);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    sku: p.sku,
    description: p.subtitle || p.description,
    image: gallery.map((m: any) => m.url),
    brand: p.tags?.[0] ? { "@type": "Brand", name: p.tags[0] } : undefined,
    offers: {
      "@type": "Offer",
      url: `/product/${params.categorie}/${p.slug}`,
      priceCurrency: "EUR",
      price: (p.price_cents / 100).toFixed(2),
      availability: p.availability === "OutOfStock" ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
    },
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Link href={`/winkel/${params.categorie}`} className="inline-flex items-center gap-1 text-xs text-text-muted hover:text-text">
        <ArrowLeft className="h-3 w-3" /> Terug naar {p.categories?.name || "winkel"}
      </Link>

      <div className="mt-6 grid gap-10 md:grid-cols-2">
        <div>
          {gallery[0] && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={gallery[0].url} alt={p.name} className="aspect-square w-full rounded-2xl border border-paper-border object-cover" />
          )}
          {gallery.length > 1 && (
            <div className="mt-3 grid grid-cols-4 gap-2">
              {gallery.slice(0, 4).map((m: any, i: number) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={i} src={m.url} alt={m.alt || p.name} className="aspect-square rounded-lg border border-paper-border object-cover" />
              ))}
            </div>
          )}
        </div>

        <div>
          {p.categories?.name && <p className="text-xs uppercase tracking-wider text-accent-muted">{p.categories.name}</p>}
          <h1 className="mt-2 font-display text-3xl md:text-4xl">{p.name}</h1>
          {p.subtitle && <p className="mt-3 text-text-muted">{p.subtitle}</p>}

          <div className="mt-6 flex items-end gap-4">
            <span className="font-display text-4xl">{formatEUR(p.price_cents)}</span>
            {p.compare_at_cents && p.compare_at_cents > p.price_cents && (
              <span className="text-lg text-text-subtle line-through">{formatEUR(p.compare_at_cents)}</span>
            )}
          </div>

          <div className="mt-6">
            <AddToCartButton product={p} />
          </div>

          <div className="mt-8 grid grid-cols-3 gap-3 rounded-2xl border border-paper-border bg-paper-soft p-4">
            <div className="text-center"><Truck className="mx-auto h-5 w-5 text-accent" /><p className="mt-1 text-[11px]">24u verzending</p></div>
            <div className="text-center"><ShieldCheck className="mx-auto h-5 w-5 text-accent" /><p className="mt-1 text-[11px]">Anoniem verpakt</p></div>
            <div className="text-center"><FlaskConical className="mx-auto h-5 w-5 text-accent" /><p className="mt-1 text-[11px]">Janoshik getest</p></div>
          </div>

          {p.package_type && <p className="mt-4 text-xs text-text-muted"><strong>Verpakking:</strong> {p.package_type}</p>}
          {p.tags && p.tags.length > 0 && (
            <p className="mt-2 text-xs text-text-muted"><strong>Tags:</strong> {p.tags.join(", ")}</p>
          )}
        </div>
      </div>

      {p.long_description && (
        <section className="mt-12 max-w-3xl">
          <h2 className="font-display text-2xl">Productinfo</h2>
          <div className="prose prose-sm mt-4 text-text-muted" dangerouslySetInnerHTML={{ __html: p.long_description }} />
        </section>
      )}

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-2xl">Gerelateerde producten</h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.filter((r) => r.id !== p.id).slice(0, 4).map((r) => (
              <Link key={r.id} href={`/product/${r.categories?.slug || params.categorie}/${r.slug}`} className="block">
                <ProductCard
                  image={r.image_url || "/assets/cat-anabolen.png"}
                  name={r.name}
                  slug={r.slug}
                  priceFrom={r.price_cents / 100}
                  ratingValue={4.8}
                  inStock={r.availability !== "OutOfStock"}
                  tag={r.tags?.[0]}
                  category={r.categories?.name}
                  shortDescription={r.subtitle || undefined}
                />
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
