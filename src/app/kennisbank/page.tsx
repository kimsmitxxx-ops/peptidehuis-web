import Link from "next/link";
import { listBlogPosts } from "@/lib/queries";
import { KennisbankTabs } from "@/components/shop/kennisbank-tabs";
import type { Metadata } from "next";

export const revalidate = 600;

export const metadata: Metadata = {
  title: "Kennisbank onderzoekspeptiden — BPC-157, Retatrutide, CJC-1295 · Peptidehuis",
  description:
    "Onafhankelijke gidsen over onderzoeks-peptiden: werkingsmechanisme, HPLC-zuiverheid, reconstitutie, doseringsschema's en veiligheidsadviezen. Voor onderzoekers en biochemici.",
  alternates: { canonical: "/kennisbank" },
};

export const dynamic = "force-dynamic";

export default async function KennisbankPage({
  searchParams,
}: {
  searchParams: { cat?: string };
}) {
  const articles = await listBlogPosts(50);
  const initialTab = (["kennis", "onderzoek", "nieuws"] as const).find((t) => t === searchParams.cat) || "alle";

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-6 text-xs text-text-muted">
        <Link href="/" className="hover:underline">Home</Link> / <span>Kennisbank</span>
      </div>

      <h1 className="font-display text-4xl md:text-5xl leading-tight">
        Onderzoek zonder <span className="text-accent">marketing-taal</span>
      </h1>
      <p className="mt-4 max-w-2xl text-text-muted leading-relaxed">
        Onafhankelijke gidsen over de top 20 onderzoeks-peptiden. Werkingsmechanismen,
        reconstitutie-protocollen, HPLC-zuiverheid, doseringsschema's — geschreven voor
        onderzoekers en biochemici.
      </p>

      <KennisbankTabs articles={articles} initialTab={initialTab} />
    </div>
  );
}
