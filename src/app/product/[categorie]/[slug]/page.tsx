import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, formatEUR, listProducts } from "@/lib/queries";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { ProductCard } from "@/components/product-card";
import { ProductTabs } from "@/components/shop/product-tabs";
import { ShieldCheck, Truck, FlaskConical, ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const revalidate = 300;

export async function generateMetadata({ params }: { params: { categorie: string; slug: string } }): Promise<Metadata> {
  const p = await getProduct(params.slug);
  if (!p) return { title: "Niet gevonden" };
  const noindex = p.noindex === true;
  return {
    title: p.meta_title || `${p.name} kopen voor ${formatEUR(p.price_cents)}`,
    description: p.meta_description || p.subtitle || p.description || `${p.name} bij anabolenpro — lab-getest, snelle verzending.`,
    alternates: { canonical: `/product/${params.categorie}/${params.slug}` },
    robots: noindex ? { index: false, follow: false } : undefined,
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

  const productJsonLd = {
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

  const faqJsonLd = p.faqs && Array.isArray(p.faqs) && p.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: p.faqs.map((f: any) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  } : null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      {faqJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />}

      <Link href={`/winkel/${params.categorie}`} className="inline-flex items-center gap-1 text-xs text-text-muted hover:text-text">
        <ArrowLeft className="h-3 w-3" /> Terug naar {p.categories?.name || "winkel"}
      </Link>

      <div className="mt-6 grid gap-10 md:grid-cols-[1.2fr_1fr] lg:grid-cols-[1fr_1fr]">
        <div className="flex gap-3">
          {gallery.length > 1 && (
            <div className="flex flex-col gap-2 w-16 shrink-0">
              {gallery.slice(0, 5).map((m: any, i: number) => (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  key={i}
                  src={m.url}
                  alt={m.alt || p.name}
                  loading="lazy"
                  decoding="async"
                  className="aspect-square w-full rounded-lg border border-paper-border object-cover hover:border-accent cursor-pointer"
                />
              ))}
            </div>
          )}
          <div className="flex-1 max-w-[75%]">
            {gallery[0] && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={gallery[0].url}
                alt={p.name}
                className="aspect-square w-full rounded-2xl border border-paper-border object-cover"
              />
            )}
          </div>
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

          {/* USPs prominent — onder add-to-cart */}
          <div className="mt-6 grid grid-cols-1 gap-2.5">
            <div className="flex items-start gap-3 rounded-lg border border-border bg-paper-soft p-3">
              <FlaskConical className="h-5 w-5 text-accent shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-semibold text-text">100% lab-getest</p>
                <p className="text-xs text-text-muted">Iedere batch HPLC + GC-MS bij Janoshik of Anabolic Lab</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-border bg-paper-soft p-3">
              <ShieldCheck className="h-5 w-5 text-accent shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-semibold text-text">Discreet verzonden</p>
                <p className="text-xs text-text-muted">Neutrale verpakking — geen logo of productnaam op het label</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-border bg-paper-soft p-3">
              <Truck className="h-5 w-5 text-accent shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-semibold text-text">Snel geleverd</p>
                <p className="text-xs text-text-muted">Voor 22:00 besteld én betaald, morgen in huis via PostNL</p>
              </div>
            </div>
          </div>

          {p.package_type && <p className="mt-4 text-xs text-text-muted"><strong>Verpakking:</strong> {p.package_type}</p>}
          {p.tags && p.tags.length > 0 && (
            <p className="mt-2 text-xs text-text-muted"><strong>Tags:</strong> {p.tags.join(", ")}</p>
          )}
        </div>
      </div>

      {/* Tabs onder hoofd-grid: Beschrijving / Specs / FAQ / Reviews */}
      <ProductTabs
        description={p.long_description || p.description || null}
        specifications={p.specifications}
        faqs={p.faqs}
      />

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
