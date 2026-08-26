import { MetadataRoute } from "next";
import { listProducts, listCategories, listBlogPosts } from "@/lib/queries";
import { STOFFEN } from "@/lib/stoffen";

const BASE = "https://peptidehuis.nl";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, categories, blogs] = await Promise.all([
    listProducts({ limit: 500 }),
    listCategories(),
    listBlogPosts(200),
  ]);

  const staticRoutes = [
    { url: `${BASE}/`, changeFrequency: "daily" as const, priority: 1.0 },
    { url: `${BASE}/winkel`, changeFrequency: "daily" as const, priority: 0.9 },
    { url: `${BASE}/peptiden`, changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${BASE}/kennisbank`, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${BASE}/reconstitutie-calculator`, changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${BASE}/begrippenlijst`, changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${BASE}/lab`, changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${BASE}/over-ons`, changeFrequency: "monthly" as const, priority: 0.4 },
    { url: `${BASE}/bezorging`, changeFrequency: "monthly" as const, priority: 0.4 },
    { url: `${BASE}/contact`, changeFrequency: "monthly" as const, priority: 0.3 },
  ];

  const stofRoutes = STOFFEN.map((s) => ({
    url: `${BASE}/peptiden/${s.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const categoryRoutes = categories.map((c) => ({
    url: `${BASE}/winkel/${c.slug}`,
    changeFrequency: "daily" as const,
    priority: 0.85,
  }));

  // noindex=true wordt expliciet uitgesloten zodat Google ze niet via de
  // sitemap ontdekt.
  const productRoutes = products
    .filter((p: any) => p.noindex !== true)
    .map((p) => ({
      url: `${BASE}/product/${p.categories?.slug || "winkel"}/${p.slug || p.sku}`,
      changeFrequency: "weekly" as const,
      priority: 0.75,
    }));

  const blogRoutes = blogs.map((b) => ({
    url: `${BASE}/kennisbank/${b.slug}`,
    lastModified: new Date(b.published_at),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...stofRoutes, ...categoryRoutes, ...productRoutes, ...blogRoutes];
}
