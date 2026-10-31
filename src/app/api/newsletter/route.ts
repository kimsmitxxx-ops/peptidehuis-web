import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";

export const dynamic = "force-dynamic";

const SHOP_ID = "42ddf952-d3c1-4c81-8029-7b4c54a84913";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const email = String(body?.email || "").trim().toLowerCase();
  const honeypot = String(body?.website || "").trim();

  if (honeypot.length > 0) return NextResponse.json({ ok: true });
  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Geldig e-mailadres vereist" }, { status: 400 });
  }

  // Service-role client - RLS blokkeert anon inserts op leads.
  let sb;
  try {
    sb = createServiceClient();
  } catch (e: any) {
    // Alleen een eigen tekst naar buiten: de melding noemt de naam van de
    // ontbrekende omgevingsvariabele, en die verraadt waar we zitten.
    console.error("server-config onvolledig", e);
    return NextResponse.json({ error: "Dit lukt nu niet. Probeer het later opnieuw." }, { status: 500 });
  }

  // `leads` table exists per migration 003; UPSERT op unique (shop_id, email)
  const { error } = await sb.from("leads").upsert(
    { shop_id: SHOP_ID, email, source: "newsletter", subscribed: true },
    { onConflict: "shop_id,email" },
  );
  // Alleen een eigen tekst naar buiten: de melding van de database noemt
  // tabelnamen, constraints en PostgREST-codes, en dat verraadt waar we zitten.
  if (error) {
    console.error("nieuwsbrief-aanmelding mislukt", error);
    return NextResponse.json({ error: "Aanmelden lukte niet. Probeer het later opnieuw." }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
