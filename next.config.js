const productRedirects = require("./product-redirects");

/** @type {import('next').NextConfig} */
module.exports = {
  // Zodat een controle-build naast een draaiende dev-server kan: NEXT_DIST_DIR=.next-check
  distDir: process.env.NEXT_DIST_DIR || ".next",
  // Defensive: don't break build on lint/type errors during deploy
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: {
    formats: ["image/avif", "image/webp"],
    // De hostname van de databasedienst staat hier bewust NIET meer bij. Zolang
    // hij hier stond, werkte een <Image> met een rauwe URL uit de database
    // gewoon, en zette Next die URL als ?url=-parameter in de broncode van de
    // pagina. Nu faalt zo'n beeld zichtbaar in plaats van stil te lekken; de
    // echte bron loopt via /media, /img en /bestand (zie src/lib/media.ts).
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
  // Geen rewrites meer naar Supabase. /media, /img en /bestand zijn eigen route
  // handlers (src/app/media, /img, /bestand), omdat een rewrite de
  // response-headers van Supabase overneemt - inclusief zijn eigen sb-headers
  // en een Cache-Control die niet te overschrijven is.
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
      // Static assets - 1 jaar cache
      { source: "/assets/:path*", headers: [{ key: "Cache-Control", value: longCache }] },
      // /media en /img zetten hun eigen Cache-Control in hun route handler.
      { source: "/_next/static/:path*", headers: [{ key: "Cache-Control", value: longCache }] },
    ];
  },
  compress: true,
};
