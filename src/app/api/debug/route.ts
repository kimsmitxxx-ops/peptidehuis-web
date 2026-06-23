import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { listCategories, listProducts, getCategory } from "@/lib/queries";

export const dynamic = "force-dynamic";

export async function GET() {
  const env = {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || null,
    NEXT_PUBLIC_SUPABASE_ANON_KEY_present: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_SUPABASE_ANON_KEY_prefix: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.slice(0, 25) || null,
    REVALIDATE_TOKEN_present: !!process.env.REVALIDATE_TOKEN,
  };

  let raw: any = null;
  try {
    const r = await supabase.from("categories").select("slug, name").limit(20);
    raw = { count: r.data?.length, error: r.error?.message, sample: r.data?.slice(0, 3) };
  } catch (e: any) {
    raw = { exception: e.message };
  }

  const cats = await listCategories();
  const kuurpakketten = await getCategory("kuurpakketten");
  const products = await listProducts({ limit: 3 });

  return NextResponse.json({
    env,
    raw_supabase_categories: raw,
    listCategories_count: cats.length,
    listCategories_first: cats.slice(0, 3).map((c) => c.slug),
    getCategory_kuurpakketten_found: !!kuurpakketten,
    getCategory_kuurpakketten_id: kuurpakketten?.id || null,
    listProducts_count: products.length,
    listProducts_first: products.slice(0, 3).map((p) => ({ name: p.name, cat: p.categories?.slug })),
  });
}
