import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPost, listBlogPosts } from "@/lib/queries";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const revalidate = 600;

export async function generateStaticParams() {
  const posts = await listBlogPosts(100);
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const p = await getBlogPost(params.slug);
  if (!p) return { title: "Niet gevonden" };
  return {
    title: p.meta_title || p.title,
    description: p.meta_description || p.excerpt || undefined,
    alternates: { canonical: `/kennisbank/${p.slug}` },
    openGraph: {
      title: p.title,
      description: p.excerpt || undefined,
      type: "article",
      publishedTime: p.published_at,
      images: p.image_url ? [{ url: p.image_url }] : undefined,
    },
  };
}

export default async function KennisbankDetail({ params }: { params: { slug: string } }) {
  const p = await getBlogPost(params.slug);
  if (!p) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: p.title,
    description: p.excerpt,
    image: p.image_url ? [p.image_url] : undefined,
    datePublished: p.published_at,
    author: p.author ? { "@type": "Person", name: p.author } : undefined,
    publisher: { "@type": "Organization", name: "AnabolenPro", url: "https://anabolenpro.com" },
  };

  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Link href="/kennisbank" className="inline-flex items-center gap-1 text-xs text-text-muted hover:text-text">
        <ArrowLeft className="h-3 w-3" /> Kennisbank
      </Link>

      {p.category && <p className="mt-6 text-[10px] uppercase tracking-wider text-accent">{p.category}</p>}
      <h1 className="mt-2 font-display text-3xl md:text-5xl leading-tight">{p.title}</h1>
      <div className="mt-4 flex items-center gap-3 text-xs text-text-muted">
        {p.author && <span>door <strong className="text-text">{p.author}</strong></span>}
        <span>•</span>
        {p.published_at && <time>{new Date(p.published_at).toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" })}</time>}
      </div>

      {p.image_url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img loading="lazy" decoding="async" src={p.image_url} alt={p.title} className="mt-8 aspect-[16/9] w-full rounded-2xl object-cover" />
      )}

      {p.excerpt && <p className="mt-8 text-lg text-text-muted leading-relaxed">{p.excerpt}</p>}

      <div
        className="prose prose-lg mt-10 max-w-none leading-relaxed
                   [&>h2]:font-display [&>h2]:text-2xl [&>h2]:mt-10 [&>h2]:mb-4
                   [&>h3]:font-display [&>h3]:text-xl [&>h3]:mt-8 [&>h3]:mb-3
                   [&>p]:my-4 [&>p]:text-text
                   [&>ul]:my-4 [&>ul]:pl-6 [&>ul]:list-disc
                   [&>ol]:my-4 [&>ol]:pl-6 [&>ol]:list-decimal
                   [&>a]:text-accent [&>a]:underline
                   [&_a]:text-accent [&_a]:underline
                   [&>blockquote]:border-l-4 [&>blockquote]:border-accent [&>blockquote]:pl-4 [&>blockquote]:italic"
        dangerouslySetInnerHTML={{ __html: p.body || "" }}
      />
    </article>
  );
}
