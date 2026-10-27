const productRedirects = require("./product-redirects");

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
    ];
  },
  async redirects() {
    return [
      // Blogs die van shop-dash 'buildInternalLinks' onderzoek/-slug krijgen: op deze
      // site heten ze /kennisbank/*. Redirect zodat oude bodies niet 404 geven.
      { source: "/onderzoek/:slug", destination: "/kennisbank/:slug", permanent: true },
      // Product-URLs zijn plat getrokken; de stof-gids is in de productpagina opgegaan.
      ...productRedirects.map((r) => ({ source: r.van, destination: r.naar, permanent: true })),
      { source: "/vergelijken/getvital-peptides", destination: "/merken/getvital-peptides", permanent: true },
      // Vialgrootte gelijkgetrokken met het inkoopadres; oude product-URLs blijven werken.
      { source: "/product/:cat/ipamorelin-5mg", destination: "/product/:cat/ipamorelin-10mg", permanent: true },
      { source: "/product/:cat/mots-c-10mg", destination: "/product/:cat/mots-c-20mg", permanent: true },
      { source: "/product/:cat/retatrutide-10mg", destination: "/product/:cat/retatrutide-15mg", permanent: true },
      { source: "/product/:cat/tirzepatide-15mg", destination: "/product/:cat/tirzepatide-10mg", permanent: true },
    ];
  },
  async headers() {
    const longCache = "public, max-age=31536000, immutable";
    return [
      { source: "/sitemap.xml", headers: [{ key: "Cache-Control", value: "public, max-age=3600, s-maxage=86400" }] },
      { source: "/robots.txt", headers: [{ key: "Cache-Control", value: "public, max-age=86400" }] },
      { source: "/llms.txt", headers: [{ key: "Cache-Control", value: "public, max-age=3600" }] },
      // Static assets — 1 jaar cache
      { source: "/assets/:path*", headers: [{ key: "Cache-Control", value: longCache }] },
      // /media en /img zetten hun eigen Cache-Control in hun route handler.
      { source: "/_next/static/:path*", headers: [{ key: "Cache-Control", value: longCache }] },
    ];
  },
  compress: true,
};
