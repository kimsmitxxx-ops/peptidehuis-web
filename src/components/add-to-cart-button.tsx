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
          <Sparkles size={14} className="text-accent" /> Bulk-korting per item
        </p>
        <ul className="mt-2 space-y-1 text-xs text-text-muted">
          {BULK_TIERS.map((t) => {
            const unit = product.price_cents * (1 - t.discountPct / 100);
            const active = qty >= t.qty;
            return (
              <li
                key={t.qty}
                className={`flex items-center justify-between rounded px-2 py-1.5 ${
                  active ? "bg-accent/10 text-text font-medium" : ""
                }`}
              >
                <span>
                  {t.qty === 1 ? "1 stuk" : `${t.qty}+ stuks`}{" "}
                  {t.discountPct > 0 && <span className="text-accent">({t.discountPct}% korting)</span>}
                </span>
                <span className="tabular font-display">{formatEUR(Math.round(unit))} / stuk</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
