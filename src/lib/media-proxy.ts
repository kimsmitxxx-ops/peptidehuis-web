/**
 * Beeldproxy naar Supabase Storage.
 *
 * Reden dat dit een route handler is en geen rewrite: Supabase stuurt voor dit
 * project `Cache-Control: private, no-cache` mee. Via een rewrite nemen we die
 * header over en haalt elke bezoeker elk beeld opnieuw op, elke paginaweergave
 * opnieuw. Hier zetten we onze eigen cache-header, zodat de browser het beeld
 * bewaart en de CDN het aan de rand kan serveren.
 */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://rexqfwibxawqnvrzbdoo.supabase.co";

// Beelden worden nooit onder dezelfde naam inhoudelijk gewijzigd; bij een
// nieuwe foto komt er een nieuwe bestandsnaam. Dus mag dit lang blijven staan.
const CACHE = "public, max-age=86400, s-maxage=31536000, stale-while-revalidate=604800";

export async function proxyStorage(bucketPad: string, segmenten: string[]): Promise<Response> {
  const pad = segmenten.map(encodeURIComponent).join("/");
  if (!pad || pad.includes("..")) {
    return new Response("Niet gevonden", { status: 404 });
  }

  const upstream = await fetch(`${SUPABASE_URL}/storage/v1/object/public/${bucketPad}/${pad}`, {
    // Onze eigen cache-laag doet het werk; hier geen Next-datacache overheen.
    cache: "no-store",
  });

  if (!upstream.ok || !upstream.body) {
    return new Response("Niet gevonden", { status: upstream.status === 404 ? 404 : 502 });
  }

  const headers = new Headers();
  headers.set("Content-Type", upstream.headers.get("content-type") || "application/octet-stream");
  const lengte = upstream.headers.get("content-length");
  if (lengte) headers.set("Content-Length", lengte);
  headers.set("Cache-Control", CACHE);

  return new Response(upstream.body, { status: 200, headers });
}
