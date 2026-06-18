"use client";
import { Plus, ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import type { Product } from "@/lib/supabase";

export function AddToCartButton({ product, size = "md" }: { product: Product; size?: "sm" | "md" }) {
  const cart = useCart();
  const cls = size === "sm"
    ? "rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary-soft"
    : "inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground hover:bg-accent-soft";
  return (
    <button
      onClick={() => cart.add({
        id: product.id,
        sku: product.sku,
        name: product.name,
        price_cents: product.price_cents,
        image: product.image_url,
      })}
      className={cls}
    >
      {size === "sm" ? <Plus className="h-3.5 w-3.5" /> : <><ShoppingCart className="h-4 w-4" /> Toevoegen aan mand</>}
    </button>
  );
}
