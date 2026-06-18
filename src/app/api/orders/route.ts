import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { email, name, street, postal, city, country = "NL", phone, items } = body;
  if (!email || !name || !street || !postal || !city || !items?.length) {
    return NextResponse.json({ error: "Missende velden" }, { status: 400 });
  }

  // Vind of maak customer aan
  const { data: shop } = await supabase.from("shops").select("id").maybeSingle();
  if (!shop) return NextResponse.json({ error: "Shop niet gevonden" }, { status: 500 });

  const { data: customerId } = await supabase.rpc("find_or_create_customer", {
    p_shop_id: shop.id, p_email: email, p_name: name, p_phone: phone || null,
  }).catch(() => ({ data: null }));

  const subtotal = items.reduce((s: number, it: any) => s + it.price_cents * it.qty, 0);
  const shipping = subtotal >= 7500 ? 0 : 595;
  const total = subtotal + shipping;

  const { data: order, error } = await supabase.from("orders").insert({
    shop_id: shop.id,
    customer_id: customerId || null,
    email, customer_name: name,
    shipping_street: street, shipping_postal: postal, shipping_city: city, shipping_country: country,
    subtotal_cents: subtotal, shipping_cents: shipping, total_cents: total,
    status: "pending_payment",
  }).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Order items
  await supabase.from("order_items").insert(items.map((it: any) => ({
    order_id: order.id, product_id: it.id, sku: it.sku, name: it.name,
    qty: it.qty, price_cents: it.price_cents,
  })));

  return NextResponse.json({ ok: true, order_id: order.id });
}
