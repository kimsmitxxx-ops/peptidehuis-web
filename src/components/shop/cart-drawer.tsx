"use client";
import Link from "next/link";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/button";
import { Badge } from "@/components/badge";
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import { useCart } from "./cart-store";
import { formatEUR } from "@/lib/queries";

export function CartDrawer() {
  const { isOpen, setOpen, items, setQty, remove, total } = useCart();

  const shippingThresholdCents = 7500;
  const progress = Math.min(100, Math.round((total / shippingThresholdCents) * 100));
  const remainingCents = Math.max(0, shippingThresholdCents - total);

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md p-0 flex flex-col bg-background"
      >
        <header className="px-5 py-4 border-b border-border flex items-center gap-2">
          <ShoppingBag size={18} className="text-accent" />
          <SheetTitle className="font-display text-lg">Winkelmand</SheetTitle>
          <Badge variant="muted" className="ml-2">{items.length} items</Badge>
        </header>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center gap-4">
            <ShoppingBag size={40} className="text-text-subtle" />
            <p className="text-text-muted">Je winkelmand is leeg.</p>
            <Link href="/winkel" onClick={() => setOpen(false)}>
              <Button variant="secondary" trailingIcon={ArrowRight}>
                Bekijk de catalogus
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {items.map((it) => (
                <article
                  key={it.id}
                  className="rounded-lg border border-border bg-surface p-3 flex gap-3"
                >
                  {it.image && (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={it.image}
                      alt=""
                      className="h-16 w-16 rounded object-cover shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-medium text-sm text-text leading-snug line-clamp-2">
                        {it.name}
                      </p>
                      <button
                        onClick={() => remove(it.id)}
                        className="text-text-muted hover:text-danger shrink-0"
                        aria-label="Verwijderen"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <div className="inline-flex items-center rounded border border-border bg-background">
                        <button
                          onClick={() => setQty(it.id, it.qty - 1)}
                          className="h-7 w-7 inline-flex items-center justify-center"
                          aria-label="Minder"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="h-7 w-8 inline-flex items-center justify-center text-sm tabular">
                          {it.qty}
                        </span>
                        <button
                          onClick={() => setQty(it.id, it.qty + 1)}
                          className="h-7 w-7 inline-flex items-center justify-center"
                          aria-label="Meer"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-text-muted tabular">{formatEUR(it.price_cents)}/st</p>
                        <p className="text-sm font-semibold text-primary tabular">{formatEUR(it.price_cents * it.qty)}</p>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <footer
              className="border-t border-border bg-surface px-5 py-4 space-y-3"
              style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 1rem)" }}
            >
              {remainingCents > 0 ? (
                <div>
                  <p className="text-xs text-text-muted mb-1.5">
                    Nog <span className="font-medium text-text tabular">{formatEUR(remainingCents)}</span> tot gratis verzending
                  </p>
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-accent transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              ) : (
                <Badge variant="success" className="w-full justify-center">
                  Gratis verzending unlocked
                </Badge>
              )}
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-text-muted">Subtotaal</span>
                <span className="font-display text-xl text-primary tabular">{formatEUR(total)}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Link href="/winkelmand" onClick={() => setOpen(false)}>
                  <Button variant="secondary" className="w-full">Winkelmand</Button>
                </Link>
                <Link href="/checkout" onClick={() => setOpen(false)}>
                  <Button trailingIcon={ArrowRight} className="w-full">Afrekenen</Button>
                </Link>
              </div>
            </footer>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

export default CartDrawer;
