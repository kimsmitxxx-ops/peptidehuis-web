import Link from "next/link";
import { listProducts, listBlogPosts, listCategories } from "@/lib/queries";
import { ProductCard } from "@/components/product-card";
import { ShieldCheck, Truck, FlaskConical, ArrowRight, Lock } from "lucide-react";

export const revalidate = 300;

export default async function HomePage() {
  const [products, articles, categories] = await Promise.all([
    listProducts({ limit: 12 }),
    listBlogPosts(3),
    listCategories(),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 md:grid-cols-2">
          <div>
            <span className="inline-block rounded-full bg-primary-soft px-3 py-1 text-xs font-medium uppercase tracking-wider text-accent">
              Janoshik lab-getest
            </span>
            <h1 className="mt-4 font-display text-4xl md:text-6xl leading-tight">
              Anabolen kopen — <span className="text-accent">getest, eerlijk, snel</span>
            </h1>
            <p className="mt-5 max-w-lg text-primary-foreground/80 leading-relaxed">
              Anavar, Deca, Trenbolone, PCT en meer. Iedere batch onafhankelijk getest. Anoniem verpakt vanaf NL, vandaag besteld is morgen in huis.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/winkel" className="inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground hover:bg-accent-soft">
                Bekijk catalogus <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/kennisbank" className="inline-flex items-center gap-1.5 rounded-full border border-primary-muted px-5 py-3 text-sm font-medium hover:bg-primary-soft">
                Lees kennisbank
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { icon: Truck, label: "24u verzending" },
                { icon: ShieldCheck, label: "Anoniem" },
                { icon: FlaskConical, label: "Lab-getest" },
                { icon: Lock, label: "Discreet" },
              ].map((x, i) => (
                <div key={i} className="flex items-center gap-2 text-xs">
                  <x.icon className="h-4 w-4 text-accent" /> {x.label}
                </div>
              ))}
            </div>
          </div>
          <div className="hidden md:block">
            <div className="rounded-3xl border border-primary-muted bg-primary-soft p-8 shadow-2xl">
              <h3 className="font-display text-xl">Lab transparantie</h3>
              <p className="mt-2 text-sm text-primary-foreground/70">
                Per batch een onafhankelijk Certificate of Analysis. Zuiverheid, dosering, contaminatie — alles inzichtelijk vóór je koopt.
              </p>
              <Link href="/lab" className="mt-4 inline-flex text-sm text-accent hover:underline">
                Bekijk recente tests →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categorieën */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="font-display text-2xl md:text-3xl">Bekijk per categorie</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => (
            <Link key={c.slug} href={`/winkel/${c.slug}`} className="group rounded-2xl border border-paper-border bg-paper-soft p-5 transition hover:border-accent hover:shadow-md">
              <p className="font-display text-lg group-hover:text-accent">{c.name}</p>
              {c.description && <p className="mt-2 line-clamp-2 text-xs text-text-muted">{c.description}</p>}
              <p className="mt-3 text-xs text-accent">Bekijk →</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Bestsellers */}
      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-2xl md:text-3xl">Populaire producten</h2>
          <Link href="/winkel" className="text-sm text-accent-muted hover:underline">Alle producten →</Link>
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.slice(0, 8).map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>

      {/* Kennisbank teaser */}
      {articles.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-12">
          <div className="flex items-end justify-between">
            <h2 className="font-display text-2xl md:text-3xl">Uit de kennisbank</h2>
            <Link href="/kennisbank" className="text-sm text-accent-muted hover:underline">Alles →</Link>
          </div>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {articles.map((a) => (
              <Link key={a.id} href={`/kennisbank/${a.slug}`} className="group block overflow-hidden rounded-2xl border border-paper-border bg-paper-soft transition hover:shadow-md">
                {a.image_url && /* eslint-disable-next-line @next/next/no-img-element */ <img src={a.image_url} alt={a.title} className="aspect-[16/9] w-full object-cover" />}
                <div className="p-5">
                  <p className="text-[10px] uppercase tracking-wider text-accent">{a.category || "Gids"}</p>
                  <h3 className="mt-2 font-display text-lg leading-tight group-hover:text-accent">{a.title}</h3>
                  {a.excerpt && <p className="mt-2 line-clamp-2 text-sm text-text-muted">{a.excerpt}</p>}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
