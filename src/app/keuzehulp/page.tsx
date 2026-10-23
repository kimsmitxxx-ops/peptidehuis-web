import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/shop/page-hero";
import { KeuzehulpWizard, type KeuzehulpProduct } from "@/components/keuzehulp-wizard";
import { listProducts } from "@/lib/queries";

// Advies mag nooit een uitverkocht product aanraden, dus altijd live voorraad.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Keuzehulp: welk peptide past bij jouw onderzoek?",
  description:
    "Beantwoord drie vragen over je onderzoeksdoel, je ervaring en wat je al in huis hebt. De keuzehulp wijst je op basis daarvan de best passende, leverbare peptiden aan.",
  alternates: { canonical: "/keuzehulp" },
};

const FAQS = [
  {
    q: "Hoe werkt de keuzehulp?",
    a: "Je kiest je onderzoeksgebied, geeft aan hoeveel ervaring je hebt en of je nog benodigdheden nodig hebt. Op basis daarvan tonen we maximaal drie producten uit die categorie die op dat moment leverbaar zijn.",
  },
  {
    q: "Waarom zie ik bij weinig ervaring geen blends?",
    a: "Een blend bevat meerdere stoffen in een vial. Dat werkt prima, maar je kunt dan niet onderscheiden welke stof voor welk effect zorgt. Wie net begint heeft meer aan een enkele, goed gedocumenteerde stof.",
  },
  {
    q: "Is dit een medisch advies?",
    a: "Nee. De keuzehulp vergelijkt ons eigen assortiment op onderzoeksgebied en samenstelling. Alle producten zijn uitsluitend bestemd voor in-vitro onderzoek en laboratoriumgebruik, niet voor consumptie door mens of dier.",
  },
  {
    q: "Wat als mijn categorie niets toont?",
    a: "Dan is er binnen dat gebied op dit moment niets leverbaar. De keuzehulp verzint geen alternatieven: je ziet alleen wat we daadwerkelijk kunnen versturen.",
  },
];

export default async function KeuzehulpPage() {
  const alle = (await listProducts({ limit: 500 })) as any[];
  const leverbaar = alle.filter((p) => p.availability !== "OutOfStock");

  const toProduct = (p: any): KeuzehulpProduct => ({
    slug: p.slug,
    name: p.name,
    categorySlug: p.categories?.slug ?? "winkel",
    categoryName: p.categories?.name ?? "",
    priceCents: p.price_cents,
    image: p.image_url || "/assets/vial-placeholder.jpg",
    subtitle: p.subtitle ?? null,
    description: p.description ?? null,
  });

  const producten = leverbaar
    .filter((p) => p.categories?.slug !== "benodigdheden")
    .map(toProduct);
  const benodigdheden = leverbaar
    .filter((p) => p.categories?.slug === "benodigdheden")
    .map(toProduct);

  return (
    <>
      <PageHero
        eyebrow="Keuzehulp"
        title="Welk peptide past bij jouw onderzoek?"
        intro="Drie korte vragen over je onderzoeksdoel, je ervaring en wat je al in huis hebt. Daarna zie je alleen producten die op dit moment leverbaar zijn."
      />

      <section className="mx-auto max-w-6xl px-4 py-10">
        <KeuzehulpWizard products={producten} benodigdheden={benodigdheden} />
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-14">
        <h2 className="font-display text-lg text-text">Veelgestelde vragen</h2>
        <dl className="mt-3 space-y-3">
          {FAQS.map((f) => (
            <div key={f.q} className="rounded-md border border-border bg-surface p-4">
              <dt className="text-sm font-semibold text-text">{f.q}</dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-text-muted">{f.a}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 text-sm text-text-muted">
          Weet je al wat je zoekt? Ga direct naar het{" "}
          <Link href="/winkel" className="font-medium text-accent hover:underline">volledige assortiment</Link> of
          bekijk de <Link href="/peptiden" className="font-medium text-accent hover:underline">gidsen per stof</Link>.
        </p>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQS.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
    </>
  );
}
