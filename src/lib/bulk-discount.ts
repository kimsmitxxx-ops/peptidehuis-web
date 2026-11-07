// Bulk-korting matrix. Per item-qty.
// 5+ items = 10%, 10+ items = 15%. Server (orders API) en client
// (winkelmand/checkout) gebruiken dezelfde logica.
export const BULK_TIERS = [
  { qty: 10, pct: 15 },
  { qty: 5, pct: 10 },
];

export function unitDiscountPct(qty: number): number {
  for (const t of BULK_TIERS) if (qty >= t.qty) return t.pct;
  return 0;
}

export function lineSubtotalCents(priceCents: number, qty: number): number {
  const pct = unitDiscountPct(qty);
  return Math.round(priceCents * (1 - pct / 100)) * qty;
}

export interface CartLikeItem {
  price_cents: number;
  qty: number;
  /** "ut" / "rest" - bepaalt of dit item via UT-shipping of standaard gaat */
  shipping_method?: "ut" | "rest";
}

import { verzendkostenVoorLand, STANDAARD_LAND } from "@/lib/shipping";

/**
 * `couponCents` is de korting van een ingevulde kortingscode. Die komt altijd
 * van de server (app.coupon_korting in de database, via /api/coupon) en wordt
 * hier alleen nog afgetrokken - de staffelkorting gaat er eerst af, de code
 * daarna. Nooit meer dan het subtotaal, zodat verzending altijd betaald blijft.
 */
export function calcTotals(items: CartLikeItem[], landcode: string = STANDAARD_LAND, couponCents = 0) {
  let subtotalRaw = 0;
  let subtotal = 0;
  let savings = 0;
  for (const it of items) {
    subtotalRaw += it.price_cents * it.qty;
    const sub = lineSubtotalCents(it.price_cents, it.qty);
    subtotal += sub;
  }
  savings = subtotalRaw - subtotal;
  // Verzending = aantal unieke shipping-methodes in mand x het landtarief
  const methods = new Set<string>();
  for (const it of items) methods.add(it.shipping_method || "rest");
  const shipping = methods.size * verzendkostenVoorLand(landcode);
  const coupon = Math.min(Math.max(couponCents, 0), subtotal);
  const total = subtotal - coupon + shipping;
  return { subtotalRaw, subtotal, savings, coupon, shipping, total, shippingMethodCount: methods.size };
}
