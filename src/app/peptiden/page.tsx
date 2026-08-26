import Link from "next/link";
import type { Metadata } from "next";
import { STOFFEN } from "@/lib/stoffen";
import { mainCategories } from "@/components/shop/data";
import { ArrowRight, FlaskConical } from "lucide-react";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Peptiden A-Z: werking, onderzoek en kopen per stof",
  description:
    "Alle onderzoekspeptiden uitgelegd per stof: Retatrutide, Semaglutide, Tirzepatide, BPC-157, TB-500, CJC-1295, Ipamorelin, GHK-Cu, Melanotan-2, Semax, Selank en PT-141. Met bronnen, FAQ en lab-geteste producten.",
  alternates: { canonical: "/peptiden" },
};

export default function PeptidenIndexPage() {
  const byCategory = new Map<string, typeof STOFFEN>();
  for (const s of STOFFEN) {
    const list = byCategory.get(s.categorySlug) || [];
    list.push(s);
    byCategory.set(s.categorySlug, list);
  }
  const orderedCats = mainCategories.filter((c) => byCategory.has(c.slug));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Peptiden A-Z",
    url: "https://peptidehuis.nl/peptiden",
    hasPart: STOFFEN.map((s) => ({
      "@type": "Article",
      headline: s.metaTitle,
      url: `https://peptidehuis.nl/peptiden/${s.slug}`,
    })),
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-3xl">
        <p className="inline-flex items-center gap-2 rounded-full border border-border bg-paper-soft px-3 py-1 text-xs text-text-muted">
          <FlaskConical size={12} className="text-accent" /> Peptide-gidsen
        </p>
        <h1 className="mt-4 font-display text-4xl md:text-5xl">Peptiden A-Z</h1>
        <p className="mt-4 text-lg text-text-muted leading-relaxed">
          Per peptide een eerlijke, bronnen-onderbouwde gids: wat het is, hoe het werkt, wat het
          onderzoek zegt, hoe het in protocollen wordt toegepast en de veelgestelde vragen. Elke
          gids linkt naar het bijbehorende lab-geteste product.
        </p>
      </div>

      <div className="mt-10 space-y-10">
        {orderedCats.map((cat) => {
          const stoffen = byCategory.get(cat.slug)!;
          const Icon = cat.icon;
          return (
            <section key={cat.slug}>
              <h2 className="inline-flex items-center gap-2.5 font-display text-2xl text-text">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent ring-1 ring-accent/20">
                  <Icon size={20} strokeWidth={1.6} />
                </span>
                {cat.name}
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {stoffen.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/peptiden/${s.slug}`}
                    className="group flex flex-col rounded-xl border border-border bg-surface p-5 hover:border-accent hover:shadow-lift transition-all"
                  >
                    <p className="font-display text-lg text-text group-hover:text-accent">{s.name}</p>
                    {s.aka.length > 0 && (
                      <p className="mt-0.5 text-[11px] text-text-subtle truncate">{s.aka.slice(0, 2).join(" · ")}</p>
                    )}
                    <p className="mt-2 flex-1 text-sm text-text-muted leading-relaxed line-clamp-3">{s.oneLiner}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs text-accent">
                      Lees de gids <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <div className="mt-14 rounded-lg border border-border bg-paper-soft p-6 md:p-8 max-w-3xl">
        <h2 className="font-display text-2xl text-text">Mis je een peptide?</h2>
        <p className="mt-2 text-sm text-text-muted">
          We breiden de gidsen doorlopend uit. Staat de stof die jij onderzoekt er nog niet bij,
          kijk dan in de <Link href="/winkel" className="text-accent underline">winkel</Link> voor de
          productpagina met specs en FAQ, of stel je vraag via het{" "}
          <Link href="/contact" className="text-accent underline">contactformulier</Link>.
        </p>
      </div>
    </div>
  );
}
