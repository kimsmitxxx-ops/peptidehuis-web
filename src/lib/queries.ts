import { supabase, type Product, type Category, type BlogPost } from "./supabase";

export async function listProducts(opts: { categorySlug?: string; tag?: string; limit?: number } = {}): Promise<Product[]> {
  let q = supabase.from("products")
    .select("*, categories(slug, name)")
    .eq("is_active", true)
    .order("sort_order");
  if (opts.categorySlug) {
    const cat = await supabase.from("categories").select("id").eq("slug", opts.categorySlug).maybeSingle();
    if (cat.data) q = q.eq("category_id", cat.data.id);
  }
  if (opts.tag) q = q.contains("tags", [opts.tag]);
  if (opts.limit) q = q.limit(opts.limit);
  const { data } = await q;
  return (data ?? []) as Product[];
}

export async function getProduct(slug: string) {
  const { data } = await supabase.from("products")
    .select("*, categories(slug, name), product_media(url, alt, sort_order, is_primary)")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();
  return data;
}

export async function listCategories(): Promise<Category[]> {
  const { data } = await supabase.from("categories")
    .select("*")
    .eq("is_published", true)
    .order("sort_order");
  return (data ?? []) as Category[];
}

export async function getCategory(slug: string): Promise<Category | null> {
  const { data } = await supabase.from("categories")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();
  return data as Category | null;
}

export async function listBlogPosts(limit = 50): Promise<BlogPost[]> {
  const { data } = await supabase.from("blog_posts")
    .select("id, slug, title, excerpt, image_url, category, published_at, author, meta_title, meta_description, body")
    .eq("is_published", true)
    .order("published_at", { ascending: false })
    .limit(limit);
  return (data ?? []) as BlogPost[];
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const { data } = await supabase.from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();
  return data as BlogPost | null;
}

export async function getShop() {
  const { data } = await supabase.from("shops").select("*").maybeSingle();
  return data;
}

export const formatEUR = (cents: number) =>
  new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(cents / 100);
