import { MetadataRoute } from "next";
import { getShop } from "@/lib/queries";

export const revalidate = 600;

export default async function robots(): Promise<MetadataRoute.Robots> {
  const shop = await getShop().catch(() => null);
  const noindex = shop?.noindex ?? true;

  if (noindex) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
    };
  }
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/account", "/api/", "/checkout"] },
    ],
    sitemap: "https://peptidehuis.nl/sitemap.xml",
    host: "https://peptidehuis.nl",
  };
}
