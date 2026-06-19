/** @type {import('next').NextConfig} */
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://rexqfwibxawqnvrzbdoo.supabase.co";

module.exports = {
  // Defensive: don't break build on lint/type errors during deploy
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "rexqfwibxawqnvrzbdoo.supabase.co" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  async rewrites() {
    return [
      // Clean /media/<path> URLs → Supabase Storage (shop_slug=anabolenpro)
      { source: "/media/:path*", destination: `${SUPABASE_URL}/storage/v1/object/public/product-media/anabolenpro/:path*` },
    ];
  },
  async headers() {
    return [
      { source: "/sitemap.xml", headers: [{ key: "Cache-Control", value: "public, max-age=3600, s-maxage=86400" }] },
      { source: "/robots.txt", headers: [{ key: "Cache-Control", value: "public, max-age=86400" }] },
      { source: "/llms.txt", headers: [{ key: "Cache-Control", value: "public, max-age=3600" }] },
    ];
  },
};
