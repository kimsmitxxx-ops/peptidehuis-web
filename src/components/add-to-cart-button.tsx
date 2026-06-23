"use client";
import { Plus, Minus, ShoppingCart, Sparkles } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { formatEUR } from "@/lib/queries";
import type { Product } from "@/lib/supabase";

const BULK_TIERS = [
  { qty: 1, discountPct: 0 },
  { qty: 5, discountPct: 10 },
  { qty: 10, discountPct: 15 },
];

export function AddToCartButton({ product }: { product: Product }) {
  const cart = useCart();
  const [qty, setQty] = useState(1);

  const dec = () => setQty((q) => Math.max(1, q - 1));
  const inc = () => setQty((q) => q + 1);

  function addToCart() {
    cart.add(
      {
        id: product.id,
        sku: product.sku,
        name: product.name,
        price_cents: product.price_cents,
        image: product.image_url,
      },
      qty,
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-stretch gap-2">
        <div className="inline-flex items-center rounded-md border border-border bg-surface">
          <button
            type="button"
            onClick={dec}
            disabled={qty <= 1}
            aria-label="Verminder aantal"
            className="h-12 w-10 inline-flex items-center justify-center text-text disabled:opacity-40"
          >
            <Minus size={16} />
          </button>
          <span className="h-12 w-12 inline-flex items-center justify-center font-display text-lg tabular">{qty}</span>
          <button
            type="button"
            onClick={inc}
            aria-label="Verhoog aantal"
            className="h-12 w-10 inline-flex items-center justify-center text-text"
          >
            <Plus size={16} />
          </button>
        </div>
        <button
          type="button"
          onClick={addToCart}
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-md bg-accent px-5 h-12 text-sm font-semibold text-accent-foreground hover:bg-accent-soft active:scale-[0.99] transition-all"
        >
          <ShoppingCart size={16} /> Toevoegen aan mand · {formatEUR(product.price_cents * qty)}
        </button>
      </div>

      <div className="rounded-md border border-accent/30 bg-accent-soft/15 p-3">
        <p className="text-xs font-semibold text-text inline-flex items-center gap-1.5">
          <Sparkles size={14} className="text-accent" /> Bulk-korting — klik om aantal te kiezen
        </p>
        <div className="mt-2 space-y-2">
          {BULK_TIERS.map((t, i) => {
            const unit = product.price_cents * (1 - t.discountPct / 100);
            const next = BULK_TIERS[i + 1];
            const active = qty >= t.qty && (!next || qty < next.qty);
            return (
              <button
                type="button"
                key={t.qty}
                onClick={() => setQty(t.qty)}
                aria-pressed={active}
                className={`w-full text-left rounded-md border bg-background px-3 py-2.5 transition-all hover:border-accent hover:shadow-card flex items-center gap-3 ${
                  active ? "border-accent ring-2 ring-accent/30 shadow-card" : "border-border"
                }`}
              >
                <div className="flex items-baseline gap-1.5">
                  <span className="font-display text-lg text-text tabular">{t.qty}</span>
                  <span className="text-[11px] uppercase tracking-wider text-text-subtle">{t.qty === 1 ? "stuk" : "stuks"}</span>
                </div>
                <span className="text-sm text-text-muted tabular">{formatEUR(Math.round(unit))} / st</span>
                {t.discountPct > 0 && (
                  <span className="ml-auto rounded-full bg-accent/10 px-2 py-0.5 text-[11px] font-semibold text-accent tabular">
                    −{t.discountPct}%
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
