import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

/**
 * On-demand ISR cache busting. shop-dash POSTs hier wanneer een admin
 * iets opslaat (product/blog/categorie). Token = REVALIDATE_TOKEN env.
 *
 * Body: { paths?: string[], tags?: string[] }
 */
export async function POST(req: NextRequest) {
  const token = req.headers.get("x-revalidate-token") || req.nextUrl.searchParams.get("token");
  const expected = process.env.REVALIDATE_TOKEN;
  if (!expected) return NextResponse.json({ error: "REVALIDATE_TOKEN niet geconfigureerd" }, { status: 500 });
  if (token !== expected) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  let body: any;
  try { body = await req.json(); } catch { body = {}; }
  const paths: string[] = Array.isArray(body?.paths) ? body.paths : [];
  const tags: string[] = Array.isArray(body?.tags) ? body.tags : [];

  for (const p of paths) { try { revalidatePath(p, "page"); } catch {} }
  for (const t of tags) { try { revalidateTag(t); } catch {} }

  return NextResponse.json({ ok: true, revalidated: { paths, tags } });
}

export async function GET() {
  return NextResponse.json({ ok: true, hint: "POST with x-revalidate-token and body { paths: [...] }" });
}
