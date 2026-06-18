import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

// Refresht Supabase sessie-cookie bij elke request → users blijven ingelogd
// zolang refresh-token geldig is (Supabase default: rotating tokens, ~1 jaar).
export async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const sb = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) { return request.cookies.get(name)?.value; },
        set(name, value, options) { res.cookies.set({ name, value, ...options }); },
        remove(name, options) { res.cookies.set({ name, value: "", ...options, maxAge: 0 }); },
      },
    },
  );
  await sb.auth.getUser();
  return res;
}

export const config = {
  matcher: ["/((?!_next/|api/|favicon|robots.txt|sitemap.xml|llms.txt|media/|.*\\..*).*)"],
};
