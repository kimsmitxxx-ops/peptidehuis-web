import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { listCategories, listProducts, getCategory } from "@/lib/queries";

export const dynamic = "force-dynamic";

/**
 * Deze route is openbaar bereikbaar. Hij noemde de volledige URL van het
 * Supabase-project, de eerste 25 tekens van de anon-sleutel en de letterlijke
 * namen van de omgevingsvariabelen: wie dit pad raadt, wist precies waar onze
 * data staat. Nu meldt hij alleen of de verbinding werkt, zonder waar.
 */
export async function GET() {
  const env = {
    data_url_gezet: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    data_sleutel_gezet: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    revalidate_token_gezet: !!process.env.REVALIDATE_TOKEN,
  };

  let raw: any = null;
  try {
    const r = await supabase.from("categories").select("slug, name").limit(20);
    // Geen r.error.message: een PostgREST-melding noemt tabel, constraint en
    // foutcode, en die horen niet in een openbaar antwoord.
    if (r.error) console.error("debug: categories lezen mislukt", r.error);
    raw = { count: r.data?.length, ok: !r.error, sample: r.data?.slice(0, 3) };
  } catch (e: any) {
    console.error("debug: categories lezen wierp", e);
    raw = { ok: false };
  }

  const cats = await listCategories();
  const genezing = await getCategory("genezing");
  const products = await listProducts({ limit: 3 });

  return NextResponse.json({
    env,
    raw_categories: raw,
    listCategories_count: cats.length,
    listCategories_first: cats.slice(0, 3).map((c) => c.slug),
    getCategory_genezing_found: !!genezing,
    getCategory_genezing_id: genezing?.id || null,
    listProducts_count: products.length,
    listProducts_first: products.slice(0, 3).map((p) => ({ name: p.name, cat: p.categories?.slug })),
  });
}
