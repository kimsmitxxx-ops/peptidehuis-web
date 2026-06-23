import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { unitDiscountPct } from "@/lib/bulk-discount";

const SHOP_ID = "18a96da9-9f9f-466f-ac2b-3ab0349b78a6"; // anabolenpro

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({} as any));
  const { email, name, street, postal, city, country = "NL", phone, items } = body;

  if (!email || !name || !street || !postal || !city || !Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: "Missende velden" }, { status: 400 });
  }

  // Validate items shape
  for (const it of items) {
    if (
      typeof it?.sku !== "string" ||
      typeof it?.name !== "string" ||
      typeof it?.price_cents !== "number" ||
      typeof it?.qty !== "number" ||
      it.price_cents < 0 ||
      it.qty <= 0
    ) {
      return NextResponse.json({ error: "Ongeldige cart-item" }, { status: 400 });
    }
  }

  let customerId: string | null = null;
  try {
    const { data } = await supabase.rpc("find_or_create_customer", {
      p_shop_id: SHOP_ID, p_email: email, p_name: name, p_phone: phone || null,
    });
    customerId = typeof data === "string" ? data : null;
  } catch {}

  // Bulk discount per item-qty applied (shared logic met checkout)
  let subtotal = 0;
  const adjustedItems = items.map((it: any) => {
    const pct = unitDiscountPct(it.qty);
    const unitAdj = Math.round(it.price_cents * (1 - pct / 100));
    subtotal += unitAdj * it.qty;
    return { ...it, applied_price_cents: unitAdj, discount_pct: pct };
  });

  const shipping = subtotal >= 7500 ? 0 : 595;
  const total = subtotal + shipping;

  const { data: order, error } = await supabase.from("orders").insert({
    shop_id: SHOP_ID,
    customer_id: customerId,
    email, customer_name: name,
    shipping_street: street, shipping_postal: postal, shipping_city: city, shipping_country: country,
    subtotal_cents: subtotal, shipping_cents: shipping, total_cents: total,
    status: "pending_payment",
  }).select().single();

  if (error || !order) {
    return NextResponse.json({ error: error?.message || "Order kon niet worden aangemaakt" }, { status: 500 });
  }

  // Resolve product_id by sku (cart items van ProductCard hebben slug-as-id)
  const skus = Array.from(new Set(adjustedItems.map((it: any) => it.sku).filter(Boolean)));
  const { data: skuRows } = await supabase.from("products").select("id, sku").eq("shop_id", SHOP_ID).in("sku", skus);
  const skuToId = new Map((skuRows || []).map((r: any) => [r.sku, r.id]));

  await supabase.from("order_items").insert(adjustedItems.map((it: any) => ({
    order_id: order.id,
    product_id: skuToId.get(it.sku) || null,
    sku: it.sku,
    name: it.name,
    qty: it.qty,
    price_cents: it.applied_price_cents,
  })));

  return NextResponse.json({ ok: true, order_id: order.id, total_cents: total, subtotal_cents: subtotal, shipping_cents: shipping });
}
