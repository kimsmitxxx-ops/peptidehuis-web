import Link from "next/link";
import { listBlogPosts } from "@/lib/queries";
import type { Metadata } from "next";

export const revalidate = 600;

export const metadata: Metadata = {
  title: "Kennisbank — protocollen, dosering, PCT en lab-uitleg",
  description: "Onafhankelijke gidsen over anabole stoffen, PCT-protocollen, bloedwerk en stack-suggesties. Geschreven door coaches en biochemici.",
  alternates: { canonical: "/kennisbank" },
};

export default async function KennisbankPage() {
  const articles = await listBlogPosts(50);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-6 text-xs text-text-muted">
        <Link href="/" className="hover:underline">Home</Link> / <span>Kennisbank</span>
      </div>

      <h1 className="font-display text-3xl md:text-5xl">Onderbouwing zonder <span className="text-accent">mythes</span></h1>
      <p className="mt-4 max-w-2xl text-text-muted leading-relaxed">
        Onafhankelijke gidsen, protocollen en studieoverzichten. Geen forumretoriek, wel concrete praktijkinfo en bronnen.
      </p>

      {articles.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-paper-border bg-paper-soft p-10 text-center text-text-muted">
          Nog geen artikelen.
        </div>
      ) : (
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <Link key={a.id} href={`/kennisbank/${a.slug}`} className="group block overflow-hidden rounded-2xl border border-paper-border bg-paper-soft transition hover:shadow-md">
              {a.image_url && /* eslint-disable-next-line @next/next/no-img-element */ <img src={a.image_url} alt={a.title} className="aspect-[16/9] w-full object-cover" />}
              <div className="p-5">
                <p className="text-[10px] uppercase tracking-wider text-accent">{a.category || "Gids"}</p>
                <h2 className="mt-2 font-display text-lg leading-tight group-hover:text-accent">{a.title}</h2>
                {a.excerpt && <p className="mt-2 line-clamp-3 text-sm text-text-muted">{a.excerpt}</p>}
                <p className="mt-3 text-[11px] text-text-subtle">{new Date(a.published_at).toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" })}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
