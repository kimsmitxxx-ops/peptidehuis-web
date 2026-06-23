import Link from "next/link";
import { listBlogPosts } from "@/lib/queries";
import { KennisbankTabs } from "@/components/shop/kennisbank-tabs";
import { categoryContent } from "@/components/shop/data";
import { BookOpen } from "lucide-react";
import type { Metadata } from "next";

export const revalidate = 600;

export const metadata: Metadata = {
  title: "Kennisbank — protocollen, dosering, PCT en onderzoek · AnabolenPro",
  description: "Onafhankelijke gidsen over anabole stoffen, PCT-protocollen, bloedwerk en stack-suggesties. Geen forumretoriek, wel bronnen.",
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
        Onderbouwing zonder <span className="text-accent">mythes</span>
      </h1>
      <p className="mt-4 max-w-2xl text-text-muted leading-relaxed">
        Onafhankelijke gidsen, protocollen en studieoverzichten. Geschreven door biochemici en
        onderzoeksjournalisten — geen forumretoriek, wel bronnen.
      </p>

      <KennisbankTabs articles={articles} initialTab={initialTab} />

      <section className="mt-16">
        <h2 className="font-display text-2xl">Per stof verdiepen</h2>
        <p className="mt-2 text-sm text-text-muted">Direct naar de info-pagina van een specifieke stof.</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categoryContent.map((c) => (
            <Link
              key={c.slug}
              href={`/${c.slug}`}
              className="group flex items-start gap-3 rounded border border-border bg-surface p-4 hover:border-accent transition-colors"
            >
              <BookOpen size={18} className="text-accent mt-0.5" />
              <div>
                <p className="font-medium text-text group-hover:text-accent">{c.name}</p>
                <p className="text-sm text-text-muted line-clamp-1">{c.tagline}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
