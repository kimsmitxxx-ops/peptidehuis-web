import { supabase, type Product, type Category, type BlogPost } from "./supabase";

// Hardcoded shop_id voor peptidehuis. RLS-policies in shop-dash migration 049
// staan anon SELECT toe op deze shop.
const SHOP_ID = "42ddf952-d3c1-4c81-8029-7b4c54a84913";

// Populariteits-volgorde van peptiden (eerst = bovenaan).
const STOF_POPULARITY = [
  "retatrutide", "tirzepatide", "semaglutide",
  "bpc-157", "tb-500", "wolverine",
  "cjc-1295", "ipamorelin", "tesamorelin",
  "ghk-cu", "melanotan", "glow",
  "semax", "selank", "pt-141",
  "igf-1", "mots-c", "nad", "epithalon", "glutathion",
];

function popularityScore(name: string): number {
  const n = name.toLowerCase();
  for (let i = 0; i < STOF_POPULARITY.length; i++) {
    if (n.includes(STOF_POPULARITY[i])) return i;
  }
  return 999;
}

// Sorteer producten op stof-populariteit, daarna sort_order.
export function sortProducts<T extends { name: string; tags: string[] | null; sort_order?: number | null; availability?: string | null }>(products: T[]): T[] {
  return [...products].sort((a, b) => {
    // Wat niet leverbaar is zakt naar beneden: een bezoeker hoort eerst te zien
    // wat hij vandaag kan bestellen.
    const ua = a.availability === "OutOfStock" ? 1 : 0;
    const ub = b.availability === "OutOfStock" ? 1 : 0;
    if (ua !== ub) return ua - ub;
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

export async function getBlogPost(slug: string): Promise<(BlogPost & { author_info?: BlogAuthor | null }) | null> {
  try {
    const { data } = await supabase.from("blog_posts")
      .select("*, blog_authors(id, slug, name, role, bio_short, bio_long, avatar_url, expertise, credentials)")
      .eq("shop_id", SHOP_ID)
      .eq("slug", slug)
      .eq("is_published", true)
      .maybeSingle();
    if (!data) return null;
    const { blog_authors, ...post } = data as any;
    return { ...post, author_info: blog_authors || null } as any;
  } catch { return null; }
}

export type BlogAuthor = {
  id: string;
  slug: string;
  name: string;
  role: string | null;
  bio_short: string | null;
  bio_long: string | null;
  avatar_url: string | null;
  expertise: string[] | null;
  credentials: string[] | null;
};

export async function listBlogAuthors(): Promise<BlogAuthor[]> {
  try {
    const { data } = await supabase.from("blog_authors")
      .select("id, slug, name, role, bio_short, bio_long, avatar_url, expertise, credentials, sort_order")
      .eq("shop_id", SHOP_ID)
      .eq("is_active", true)
      .order("sort_order");
    return (data ?? []) as BlogAuthor[];
  } catch { return []; }
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

/**
 * Kolommen van `shops` die de anon key mag lezen. Expliciet in plaats van
 * `select("*")`, want sinds shop-dash migratie 054 heeft anon alleen nog
 * kolom-grants: `settings` (met smtp-wachtwoord en kortingscodes) en
 * `paytail_api_key` zijn afgeschermd, en `select("*")` zou dus afketsen op
 * "permission denied for column". Voeg je een publieke kolom toe aan shops,
 * dan moet die hier én in de GRANT van 054 erbij.
 */
const SHOP_PUBLIC_COLUMNS =
  "id, slug, name, domain, email, iban, bank_name, kvk, btw, created_at, updated_at, logo_url, description, phone, address_street, address_postal, address_city, address_country, bic, shipping_free_above_cents, shipping_nl_cents, shipping_be_cents, shipping_de_cents, shipping_eu_cents, payment_instructions, order_prefix, reminder_days, is_active, theme_color, meta_title, meta_description, paytail_enabled, paytail_base_url, paytail_return_path, paytail_btn_label, paytail_btn_color, paytail_btn_text_color, iban_enabled, maintenance_mode, maintenance_message, noindex, product_url_pattern, default_meta_title_template, default_meta_description_template, llms_txt" as const;

export async function getShop() {
  try {
    const { data } = await supabase
      .from("shops")
      .select(SHOP_PUBLIC_COLUMNS)
      .eq("id", SHOP_ID)
      .maybeSingle();
    return data;
  } catch { return null; }
}

export type PaymentInstructions = {
  bank_name?: string;
  iban?: string;
  bic?: string;
  account_holder?: string;
  crypto_addresses?: Array<{ label: string; ticker: string; address: string }>;
  instructions_html?: string;
};

export async function getShopPaymentInstructions(): Promise<PaymentInstructions | null> {
  try {
    const { data } = await supabase
      .from("shops")
      .select("payment_instructions")
      .eq("id", SHOP_ID)
      .maybeSingle();
    return (data?.payment_instructions as PaymentInstructions) || null;
  } catch {
    return null;
  }
}

export async function getOrderForConfirmation(orderId: string) {
  try {
    const { data } = await supabase
      .from("orders")
      .select("id, email, customer_name, total_cents, subtotal_cents, shipping_cents, created_at")
      .eq("id", orderId)
      .eq("shop_id", SHOP_ID)
      .maybeSingle();
    return data;
  } catch {
    return null;
  }
}

export const formatEUR = (cents: number) =>
  new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(cents / 100);
