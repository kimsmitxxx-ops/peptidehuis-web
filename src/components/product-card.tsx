import Link from "next/link";
import { formatEUR } from "@/lib/queries";
import { AddToCartButton } from "./add-to-cart-button";
import type { Product } from "@/lib/supabase";

export function ProductCard({ p }: { p: Product }) {
  const catSlug = p.categories?.slug || "winkel";
  const href = `/product/${catSlug}/${p.slug || p.sku}`;
  return (
    <article className="group overflow-hidden rounded-2xl border border-paper-border bg-paper-soft transition hover:shadow-md">
      <Link href={href} className="block">
        <div className="aspect-square overflow-hidden bg-paper">
          {p.image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={p.image_url} alt={p.name} className="h-full w-full object-cover transition-transform group-hover:scale-105" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-text-subtle">Geen foto</div>
          )}
        </div>
        <div className="p-4">
          <div className="flex items-center gap-2 text-[11px] text-text-muted">
            {p.categories?.name && <span className="rounded-full bg-paper px-2 py-0.5">{p.categories.name}</span>}
            {p.tags?.[0] && <span className="text-text-subtle">{p.tags[0]}</span>}
          </div>
          <h3 className="mt-2 line-clamp-2 font-medium leading-tight">{p.name}</h3>
          {p.subtitle && <p className="mt-1 line-clamp-2 text-xs text-text-muted">{p.subtitle}</p>}
        </div>
      </Link>
      <div className="flex items-center justify-between border-t border-paper-border bg-paper-soft p-4">
        <div>
          <p className="font-display text-lg">{formatEUR(p.price_cents)}</p>
          {p.compare_at_cents && p.compare_at_cents > p.price_cents && (
            <p className="text-xs text-text-subtle line-through">{formatEUR(p.compare_at_cents)}</p>
          )}
        </div>
        <AddToCartButton product={p} size="sm" />
      </div>
    </article>
  );
}
