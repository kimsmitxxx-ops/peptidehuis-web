import { supabase, type Product, type Category, type BlogPost } from "./supabase";

// Hardcoded shop_id voor anabolenpro — fallback voor scoped JWT die niet werkt.
// RLS-policies in shop-dash migration 021 staan anon SELECT toe op deze shop.
const SHOP_ID = "18a96da9-9f9f-466f-ac2b-3ab0349b78a6";

// Populariteits-volgorde van stoffen (eerst = bovenaan). UT-merk overrules dit.
const STOF_POPULARITY = [
  "test", "sustanon", "winstrol", "winn", "boldenone", "bold", "tren", "trenbolone",
  "anavar", "dianabol", "deca", "nandrolone", "masteron", "primobolan", "parabolan",
  "anadrol", "oxymetholone", "turinabol",
  "clomid", "nolvadex", "arimidex", "aromasin", "proviron", "hcg",
  "clenbuterol", "t3", "t4",
  "hgh", "melanotan", "bpc",
];

function popularityScore(name: string): number {
  const n = name.toLowerCase();
  for (let i = 0; i < STOF_POPULARITY.length; i++) {
    if (n.includes(STOF_POPULARITY[i])) return i;
  }
  return 999;
}

// Sorteer producten: UT-merk eerst, dan op stof-populariteit (test > win > bold > tren), dan sort_order
export function sortProducts<T extends { name: string; tags: string[] | null; sort_order?: number | null }>(products: T[]): T[] {
  return [...products].sort((a, b) => {
    const aUT = a.tags?.includes("UT") ? 0 : 1;
    const bUT = b.tags?.includes("UT") ? 0 : 1;
    if (aUT !== bUT) return aUT - bUT;
    const pa = popularityScore(a.name);
    const pb = popularityScore(b.name);
    if (pa !== pb) return pa - pb;
    return (a.sort_order ?? 999) - (b.sort_order ?? 999);
  });
}

// Alle queries try/catch-safe: returnen lege array/null bij DB-error
// zodat Next.js build niet faalt en pagina's gracefully renderen.

export async function listFeaturedProducts(limit = 8): Promise<Product[]> {
  try {
    const { data } = await supabase.from("products")
      .select("*, categories(slug, name)")
      .eq("shop_id", SHOP_ID)
      .eq("is_active", true)
      .eq("is_featured", true)
      .order("sort_order")
      .limit(limit);
    return (data ?? []) as Product[];
  } catch { return []; }
}

export async function listProducts(opts: { categorySlug?: string; tag?: string; limit?: number } = {}): Promise<Product[]> {
  try {
    let q = supabase.from("products")
      .select("*, categories(slug, name)")
      .eq("shop_id", SHOP_ID)
      .eq("is_active", true)
      .order("sort_order");
    if (opts.categorySlug) {
      const cat = await supabase.from("categories").select("id").eq("shop_id", SHOP_ID).eq("slug", opts.categorySlug).maybeSingle();
      if (cat.data) q = q.eq("category_id", cat.data.id);
    }
    if (opts.tag) q = q.contains("tags", [opts.tag]);
    if (opts.limit) q = q.limit(opts.limit);
    const { data } = await q;
    return (data ?? []) as Product[];
  } catch { return []; }
}

export async function getProduct(slug: string) {
  try {
    const { data } = await supabase.from("products")
      .select("*, categories(slug, name), product_media(url, alt, sort_order, is_primary)")
      .eq("shop_id", SHOP_ID)
      .eq("slug", slug)
      .eq("is_active", true)
      .maybeSingle();
    return data;
  } catch { return null; }
}

export async function listCategories(): Promise<Category[]> {
  try {
    const { data } = await supabase.from("categories")
      .select("*")
      .eq("shop_id", SHOP_ID)
      .eq("is_published", true)
      .order("sort_order");
    return (data ?? []) as Category[];
  } catch { return []; }
}

export async function getCategory(slug: string): Promise<Category | null> {
  try {
    const { data } = await supabase.from("categories")
      .select("*")
      .eq("shop_id", SHOP_ID)
      .eq("slug", slug)
      .eq("is_published", true)
      .maybeSingle();
    return data as Category | null;
  } catch { return null; }
}

export async function listBlogPosts(limit = 50): Promise<BlogPost[]> {
  try {
    const { data } = await supabase.from("blog_posts")
      .select("id, slug, title, excerpt, image_url, category, published_at, author, meta_title, meta_description, body")
      .eq("shop_id", SHOP_ID)
      .eq("is_published", true)
      .order("published_at", { ascending: false })
      .limit(limit);
    return (data ?? []) as BlogPost[];
  } catch { return []; }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const { data } = await supabase.from("blog_posts")
      .select("*")
      .eq("shop_id", SHOP_ID)
      .eq("slug", slug)
      .eq("is_published", true)
      .maybeSingle();
    return data as BlogPost | null;
  } catch { return null; }
}

export type ProductReview = {
  id: string;
  rating: number;
  author_name: string;
  title: string | null;
  body: string | null;
  created_at: string;
  published_at: string | null;
};

export async function listProductReviews(productId: string, limit = 20): Promise<ProductReview[]> {
  try {
    const { data } = await supabase.from("product_reviews")
      .select("id, rating, author_name, title, body, created_at, published_at")
      .eq("product_id", productId)
      .eq("status", "approved")
      .eq("is_spam", false)
      .order("created_at", { ascending: false })
      .limit(limit);
    return (data ?? []) as ProductReview[];
  } catch { return []; }
}

export async function getShop() {
  try {
    const { data } = await supabase.from("shops").select("*").eq("id", SHOP_ID).maybeSingle();
    return data;
  } catch { return null; }
}

export const formatEUR = (cents: number) =>
  new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(cents / 100);
