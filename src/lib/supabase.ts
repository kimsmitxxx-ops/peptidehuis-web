/**
 * Supabase server-side client voor data fetching in Next.js server components.
 * Scoped anon JWT bevat shop_id claim — RLS isoleert deze site automatisch.
 */
import { createClient } from "@supabase/supabase-js";

const SB_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SB_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(SB_URL, SB_ANON, {
  auth: { persistSession: false, autoRefreshToken: false },
});

export type Product = {
  id: string;
  sku: string;
  name: string;
  slug: string;
  subtitle: string | null;
  description: string | null;
  long_description: string | null;
  price_cents: number;
  compare_at_cents: number | null;
  image_url: string | null;
  category_id: string | null;
  package_type: string | null;
  tags: string[] | null;
  availability: string | null;
  is_active: boolean;
  categories?: { slug: string; name: string } | null;
};

export type Category = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  meta_title: string | null;
  meta_description: string | null;
  hero_image: string | null;
  sort_order: number;
};

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  body: string;
  image_url: string | null;
  category: string | null;
  published_at: string;
  author: string | null;
  meta_title: string | null;
  meta_description: string | null;
};
