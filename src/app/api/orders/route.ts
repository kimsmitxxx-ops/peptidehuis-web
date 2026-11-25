import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";
import { unitDiscountPct } from "@/lib/bulk-discount";
import { addonDeltaCents, addonSummary, normalizeAddons } from "@/lib/addons";
import { verzendkostenVoorLand } from "@/lib/shipping";

export const dynamic = "force-dynamic";
// Hoort bij force-dynamic: de gedeelde Supabase-client cachet sinds de
// TTFB-ronde standaard, en hier moet elke lees juist vers zijn.
export const fetchCache = "force-no-store";

const SHOP_ID = "42ddf952-d3c1-4c81-8029-7b4c54a84913"; // peptidehuis


export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({} as any));
  const {
    email, name,
    street, house_number,
    postal, city, country = "NL",
    phone, items, discount_code,
    create_account, password,
  } = body;

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

  // Service-role client - writes moeten RLS-policies overslaan.
  let supabase;
  try {
    supabase = createServiceClient();
  } catch (e: any) {
    // Alleen een eigen tekst naar buiten: de melding noemt de naam van de
    // ontbrekende omgevingsvariabele, en die verraadt waar we zitten.
    console.error("server-config onvolledig", e);
    return NextResponse.json({ error: "Dit lukt nu niet. Probeer het later opnieuw." }, { status: 500 });
  }

  // De prijs komt uit de database, niet uit het verzoek.
  //
  // Wat hier stond was een vergelijking: klopt het bedrag uit de body met dat
  // uit de database, dan door, anders 409. Dat is een controle en geen bron -
  // de route rekende daarna alsnog verder met `it.price_cents` uit de body, en
  // de controle keek alleen naar de sku. Een POST met een eigen bedrag en een
  // sku die niet in de kolom `sku` staat (product-card zet daar de slug in)
  // bepaalde zo zijn eigen totaal, en omdat er per overboeking betaald wordt
  // kwam dat bedrag ook zo op de betaalpagina en de factuur terecht.
  //
  // Nu wordt de databaseprijs zelf gebruikt. De toeslag voor de gekozen
  // accessoires komt er serverkant bij: die staat niet in products, maar wordt
  // uitgerekend uit de keuze, niet uit een bedrag dat de browser meestuurt.
  //
  // Opzoeken gebeurt op slug en sku, niet op products.id. Het veld `id` uit de
  // mand is namelijk de slug (zie add-to-cart-button en product-card), met bij
  // gekozen accessoires `#sleutel` erachter, en products.id is een uuid: een
  // `in("id", [...])` met een slug erin geeft 22P02 en dus geen prijs maar een
  // fout. Een echte uuid die toch meegestuurd wordt pakken we wel mee, vandaar
  // de uuid-filter. Beide sleutels gaan langs beide kolommen, want product-card
  // zet de slug in het veld `sku`; dat vangt ook een mand die nog van voor deze
  // wijziging in localStorage staat.
  //
  // Losse `in`-queries per kolom en geen `.or()` met een zelfgebouwde
  // filterstring: een sku met een komma of een aanhalingsteken erin zou die
  // string breken, en dan krijg je stil de verkeerde rijen terug.
  const tekst = (v: any) => (typeof v === "string" ? v.trim() : "");
  // De regel-id kan `slug#water-spuiten` zijn: dat maakt twee regels van
  // dezelfde stof met andere accessoires. Het product zit voor de `#`.
  const basisSlug = (v: any) => tekst(v).split("#")[0];
  const isUuid = (v: string) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(v);
  const ids = Array.from(new Set(items.map((it: any) => tekst(it.id)).filter(isUuid)));
  const sleutels = Array.from(
    new Set(items.flatMap((it: any) => [basisSlug(it.id), tekst(it.sku)]).filter(Boolean)),
  );
  const rijPerId = new Map<string, any>();
  const rijPerSlug = new Map<string, any>();
  const rijPerSku = new Map<string, any>();
  try {
    const kolommen = "id, sku, slug, name, price_cents";
    const [opId, opSlug, opSku] = await Promise.all([
      ids.length
        ? supabase.from("products").select(kolommen).eq("shop_id", SHOP_ID).in("id", ids)
        : Promise.resolve({ data: [], error: null }),
      sleutels.length
        ? supabase.from("products").select(kolommen).eq("shop_id", SHOP_ID).in("slug", sleutels)
        : Promise.resolve({ data: [], error: null }),
      sleutels.length
        ? supabase.from("products").select(kolommen).eq("shop_id", SHOP_ID).in("sku", sleutels)
        : Promise.resolve({ data: [], error: null }),
    ]);
    if (opId.error) throw opId.error;
    if (opSlug.error) throw opSlug.error;
    if (opSku.error) throw opSku.error;
    for (const r of [...(opId.data || []), ...(opSlug.data || []), ...(opSku.data || [])] as any[]) {
      if (typeof r.price_cents !== "number") continue;
      rijPerId.set(r.id, r);
      if (r.slug) rijPerSlug.set(tekst(r.slug), r);
      if (r.sku) rijPerSku.set(tekst(r.sku), r);
    }
  } catch (e) {
    // Niet doorgaan met de prijs uit de browser: dat is precies het gat dat
    // hier gedicht wordt. Liever een bestelling die niet lukt.
    console.error("bestelling: prijzen ophalen mislukte", e);
    return NextResponse.json({ error: "Bestellen lukte even niet. Probeer het opnieuw of mail ons." }, { status: 503 });
  }

  const zoekRij = (it: any): any | undefined => {
    const id = tekst(it.id);
    const slug = basisSlug(it.id);
    const sku = tekst(it.sku);
    return rijPerId.get(id) ?? rijPerSlug.get(slug) ?? rijPerSku.get(sku) ?? rijPerSlug.get(sku);
  };

  const onbekend: string[] = [];
  const serverItems = items.map((it: any) => {
    const rij = zoekRij(it);
    if (!rij) {
      onbekend.push(tekst(it.name) || tekst(it.sku) || tekst(it.id));
      return { ...it, price_cents: 0, db_name: null };
    }
    return {
      ...it,
      price_cents: rij.price_cents + addonDeltaCents(normalizeAddons(it.addons)),
      db_name: typeof rij.name === "string" ? rij.name : null,
    };
  });
  if (onbekend.length > 0) {
    return NextResponse.json(
      { error: `Dit product is niet meer beschikbaar: ${onbekend.join(", ")}. Verwijder het uit je mandje en probeer opnieuw.` },
      { status: 400 },
    );
  }

  let customerId: string | null = null;
  try {
    const { data } = await supabase.rpc("find_or_create_customer", {
      p_shop_id: SHOP_ID, p_email: email, p_name: name, p_phone: phone || null,
    });
    customerId = typeof data === "string" ? data : null;
  } catch {}

  // Bulk discount per item-qty applied (shared logic met checkout) - rekent
  // over de serverprijs, niet over het bedrag uit de body.
  let subtotal = 0;
  const adjustedItems = serverItems.map((it: any) => {
    const pct = unitDiscountPct(it.qty);
    const unitAdj = Math.round(it.price_cents * (1 - pct / 100));
    subtotal += unitAdj * it.qty;
    return { ...it, applied_price_cents: unitAdj, discount_pct: pct };
  });

  // Shipping = EUR 10 per uniek shipping_method (ut/rest). Mix -> 2x EUR 10.
  const methods = new Set<string>();
  for (const it of items) methods.add(it.shipping_method || "rest");
  // Tarief volgt het bezorgland, zodat de klant betaalt wat hij op de site las.
  // Kortingscode. Wat de browser meestuurt is een claim; de database bepaalt
  // of de code bestaat, nog geldig is, aan het minimumbedrag komt en wat hij
  // oplevert, en zet in dezelfde stap de gebruiksteller omhoog. Een code met
  // max_uses = 1 kan dus niet twee keer tegelijk verzilverd worden.
  //
  // De korting rekent over het subtotaal NA de staffelkorting, net als in de
  // mand: staffel eerst, code daarna.
  let discountCents = 0;
  let couponCode: string | null = null;
  if (typeof discount_code === "string" && discount_code.trim()) {
    const { data: couponRijen, error: couponError } = await supabase.rpc("coupon_verzilver", {
      p_shop_id: SHOP_ID,
      p_code: discount_code.trim().toUpperCase(),
      p_subtotal_cents: subtotal,
    });
    const c = Array.isArray(couponRijen) ? couponRijen[0] : couponRijen;
    if (couponError) {
      // Niet de bestelling laten klappen op een kortingscode: zonder korting
      // verder is beter dan een klant die niet kan afrekenen.
      console.error("bestelling: kortingscode verzilveren mislukte", couponError);
    } else if (c?.ok) {
      discountCents = Math.min(Number(c.discount_cents) || 0, subtotal);
      couponCode = c.code;
    } else {
      // Wel weigeren als de code echt niet (meer) kan: anders ziet de klant in
      // de mand een bedrag dat de bestelling niet rekent.
      return NextResponse.json(
        { error: c?.melding || "Deze kortingscode is niet geldig." },
        { status: 400 },
      );
    }
  }

  const shipping = methods.size * verzendkostenVoorLand(country);
  const total = subtotal - discountCents + shipping;

  const fullStreet = house_number ? `${street} ${house_number}` : street;

  const { data: order, error } = await supabase.from("orders").insert({
    shop_id: SHOP_ID,
    customer_id: customerId,
    customer_email: email,
    customer_name: name,
    customer_phone: phone || null,
    shipping_street: fullStreet, shipping_postal: postal, shipping_city: city, shipping_country: country,
    subtotal_cents: subtotal, shipping_cents: shipping, total_cents: total,
    coupon_code: couponCode, discount_cents: discountCents,
    status: "pending_payment",
    reference: `PH-${Date.now().toString(36).toUpperCase()}`,
  }).select().single();

  if (error || !order) {
    // Geen databasemelding naar de browser: die noemt tabel, constraint en
    // PostgREST-code.
    console.error("order aanmaken mislukt", error);
    return NextResponse.json({ error: "Order kon niet worden aangemaakt" }, { status: 500 });
  }

  // Resolve product_id by sku (cart items van ProductCard hebben slug-as-id)
  const skus = Array.from(new Set(adjustedItems.map((it: any) => it.sku).filter(Boolean)));
  const { data: skuRows } = await supabase.from("products").select("id, sku").eq("shop_id", SHOP_ID).in("sku", skus);
  const skuToId = new Map((skuRows || []).map((r: any) => [r.sku, r.id]));

  // Kolomnamen van de echte, gedeelde order_items-tabel (product_name/
  // quantity/unit_price_cents/total_cents) - sku/name/qty/price_cents bestaan
  // hier niet. Deze insert faalde daardoor altijd stil (geen .select(), geen
  // foutafhandeling): elke bestelling stond wel in `orders`, maar zonder een
  // enkele regel in `order_items`, dus zag de admin alleen een totaalbedrag.
  const { error: itemsError } = await supabase.from("order_items").insert(adjustedItems.map((it: any) => ({
    order_id: order.id,
    product_id: skuToId.get(it.sku) || null,
    // Naam uit de database, niet uit de browser; accessoires erachter. De naam
    // komt van dezelfde rij als de prijs, dus ook als de mand de slug in het
    // veld `sku` had staan.
    product_name: [it.db_name || it.name, addonSummary(normalizeAddons(it.addons))]
      .filter(Boolean)
      .join(" + "),
    quantity: it.qty,
    unit_price_cents: it.applied_price_cents,
    total_cents: it.applied_price_cents * it.qty,
  })));
  if (itemsError) {
    console.error("bestelling: order_items opslaan mislukte", itemsError);
  }

  // Account aanmaken, als de klant dat vinkje bij het afrekenen aanzette.
  //
  // Dit stond er niet, terwijl de checkout het vinkje en een verplicht
  // wachtwoordveld wel toonde: de klant koos een wachtwoord en er gebeurde
  // vervolgens niets mee. Niet fataal voor de bestelling, dus na de order en
  // met een eigen try: een account dat niet lukt mag geen bestelling kosten.
  //
  // shop-dash beheert de accounts (service-role); wij hebben die sleutel
  // bewust niet. Bestaat het adres al, dan maakt shop-dash niets nieuws aan en
  // blijft het bestaande wachtwoord gelden.
  if (create_account === true && typeof password === "string" && password.length >= 8) {
    try {
      const dash = process.env.SHOP_DASH_URL || "https://shop-dash-ruby.vercel.app";
      const res = await fetch(`${dash}/api/storefront/auth`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-shop-dash-key": process.env.SHOP_DASH_API_KEY || "" },
        body: JSON.stringify({ shopId: SHOP_ID, action: "create", email, password, name }),
        signal: AbortSignal.timeout(12_000),
      });
      if (!res.ok) {
        console.error("account aanmaken mislukte:", res.status, await res.text().catch(() => ""));
      }
    } catch (e) {
      console.error("account aanmaken mislukte (niet fataal):", e);
    }
  }

  return NextResponse.json({ ok: true, order_id: order.id, total_cents: total, subtotal_cents: subtotal, shipping_cents: shipping });
}
