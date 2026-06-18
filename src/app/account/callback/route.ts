import { NextResponse, type NextRequest } from "next/server";
import { createServerSupabase } from "@/lib/supabase-server";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  const next = req.nextUrl.searchParams.get("next") || "/account";

  if (code) {
    const sb = createServerSupabase();
    const { error } = await sb.auth.exchangeCodeForSession(code);
    if (error) return NextResponse.redirect(new URL("/account/login?error=" + encodeURIComponent(error.message), req.url));

    // Auto-create customer-row via RPC
    const { data: { user } } = await sb.auth.getUser();
    if (user?.email) {
      await sb.rpc("find_or_create_customer_for_auth", {
        p_email: user.email,
        p_full_name: user.user_metadata?.full_name || null,
      }).catch(() => null);
    }
  }
  return NextResponse.redirect(new URL(next, req.url));
}
