import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPost, listProducts } from "@/lib/queries";
import { ProductCard } from "@/components/product-card";
import type { Metadata } from "next";

export const revalidate = 600;

// Bekende info-pages — als slug niet matched, 404 ipv random route hijack
const KNOWN_STOFS = new Set([
  "anavar", "dianabol", "winstrol", "turinabol", "anadrol", "oxandrolone",
  "testosteron", "trenbolone", "nandrolone", "deca", "masteron", "boldenone", "primobolan", "sustanon", "parabolan",
  "clomid", "nolvadex", "aromasin", "arimidex", "proviron", "hcg",
  "kamagra", "vidalista", "cenforce",
  "melanotan", "mt2", "hgh", "groeihormoon",
  "clenbuterol", "t3", "t4",
]);

export async function generateMetadata({ params }: { params: { stof: string } }): Promise<Metadata> {
  if (!KNOWN_STOFS.has(params.stof)) return { title: "Niet gevonden" };
  const p = await getBlogPost(`stof-${params.stof}`).catch(() => null);
  const title = p?.meta_title || p?.title || `${params.stof.replace(/^\w/, c => c.toUpperCase())} — uitleg, dosering en kopen`;
  return {
    title,
    description: p?.meta_description || `Alles over ${params.stof}: werking, dosering, bijwerkingen en welke producten je bij ons kunt kopen.`,
    alternates: { canonical: `/${params.stof}` },
  };
}

export default async function StofPage({ params }: { params: { stof: string } }) {
  if (!KNOWN_STOFS.has(params.stof.toLowerCase())) notFound();
  const stof = params.stof.toLowerCase();
  const niceName = stof.charAt(0).toUpperCase() + stof.slice(1);

  const [infoPost, products] = await Promise.all([
    getBlogPost(`stof-${stof}`).catch(() => null),
    listProducts({ limit: 200 }),
  ]);

  const matching = products.filter((p) =>
    p.name.toLowerCase().includes(stof) ||
    p.tags?.some((t) => t.toLowerCase().includes(stof))
  ).slice(0, 8);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-6 text-xs text-text-muted">
        <Link href="/" className="hover:underline">Home</Link> / <span>{niceName}</span>
      </div>

      <h1 className="font-display text-4xl md:text-5xl">{niceName}</h1>
      {infoPost?.excerpt && <p className="mt-4 max-w-3xl text-lg text-text-muted">{infoPost.excerpt}</p>}

      {matching.length > 0 && (
        <section className="mt-10">
          <h2 className="font-display text-2xl">{niceName} kopen — {matching.length} producten</h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {matching.map((p) => <ProductCard key={p.id} p={p} />)}
          </div>
        </section>
      )}

      {infoPost?.body && (
        <section className="mt-16 max-w-3xl">
          <h2 className="font-display text-2xl">Over {niceName}</h2>
          <div
            className="prose mt-4 [&>h2]:font-display [&>h2]:text-xl [&>h2]:mt-8 [&>p]:my-3 [&>p]:text-text [&>a]:text-accent [&>a]:underline"
            dangerouslySetInnerHTML={{ __html: infoPost.body }}
          />
        </section>
      )}

      {!infoPost && (
        <section className="mt-16 max-w-3xl rounded-2xl border border-dashed border-paper-border bg-paper-soft p-8">
          <p className="text-text-muted">
            Diepte-content over {niceName} wordt binnenkort gepubliceerd. Voor nu kun je hierboven de producten zien die in onze catalogus staan.
          </p>
        </section>
      )}
    </div>
  );
}
