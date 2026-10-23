import { proxyStorage } from "@/lib/media-proxy";

export const dynamic = "force-dynamic";

export async function GET(_req: Request, { params }: { params: { path: string[] } }) {
  return proxyStorage("product-media/peptidehuis", params.path);
}
