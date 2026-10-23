import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/shop/page-hero";
import { listProducts } from "@/lib/queries";
import { FlaskConical, Package, Truck, Calculator, ArrowRight } from "lucide-react";

// Voorraad bepaalt wat we hier tonen, dus altijd live.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "GetVital Peptides bestellen",
  description:
    "GetVital Peptides bestel je bij Peptidehuis: dezelfde vials, verzonden vanuit Nederland, met bacteriostatisch water inbegrepen en spuiten en doekjes bij te kiezen.",
  alternates: { canonical: "/merken/getvital-peptides" },
};

const FAQS = [
  {
    q: "Zijn dit originele GetVital Peptides?",
    a: "Ja. Je ontvangt dezelfde vials met hetzelfde etiket als bij de fabrikant. Op de productfoto's zie je precies wat er in de doos zit.",
  },
  {
    q: "Waarom zou ik hier bestellen en niet ergens anders?",
    a: "Omdat we vanuit Nederland verzenden, bij elke vial 2 ml bacteriostatisch water meesturen en je spuiten en alcoholdoekjes bij het product kunt bijkiezen. Je hoeft dus niet op drie plekken te bestellen om te kunnen beginnen.",
  },
  {
    q: "Welke producten voeren jullie?",
    a: "De bekendste losse peptiden en de twee stacks, van BPC-157 en TB-500 tot de GLP-1-klasse met semaglutide, tirzepatide en retatrutide. Wat op dat moment leverbaar is, zie je in de winkel; uitverkochte artikelen staan er duidelijk bij.",
  },
  {
    q: "Hoe weet ik wat er in mijn vial zit?",
    a: "Elke batch wordt op HPLC geanalyseerd en het rapport staat onder de batchcode die op jouw vial geprint is. Je zoekt dus de analyse op van precies die flacon, niet van een willekeurige partij.",
  },
  {
    q: "Mag ik dit gebruiken?",
    a: "Nee. Alles wat we verkopen is uitsluitend bestemd voor in-vitro onderzoek en laboratoriumgebruik, niet voor consumptie door mens of dier.",
  },
];

const PUNTEN = [
  {
    icon: Package,
    kop: "Water zit er standaard bij",
    tekst: "Bij elke vial krijg je 2 ml bacteriostatisch water. Insulinespuiten, alcoholdoekjes en een flacon van 10 ml kies je er op de productpagina bij, in dezelfde bestelling.",
  },
  {
    icon: Truck,
    kop: "Verzonden vanuit Nederland",
    tekst: "Discreet verpakt en zonder douane-gedoe. Je bestelt vandaag en hoeft niet te wachten op een zending die ergens vast komt te staan.",
  },
  {
    icon: FlaskConical,
    kop: "Analyse per batchcode",
    tekst: "De HPLC-analyse staat gekoppeld aan de code op jouw vial. Blijft een batch onder onze grens, dan gaat hij retour en blijft dat zichtbaar in ons archief.",
  },
  {
    icon: Calculator,
    kop: "Uitrekenen hoeft niet uit je hoofd",
    tekst: "Kies je product in de reconstitutie-calculator en je ziet direct hoeveel water erbij moet en hoeveel units dat per dosis is.",
  },
];

export default async function GetVitalMerkPagina() {
  const alle = (await listProducts({ limit: 500 })) as any[];
  const leverbaar = alle.filter(
    (p) => p.availability !== "OutOfStock" && p.categories?.slug !== "benodigdheden" && p.categories?.slug !== "bundels",
  );

  return (
    <>
      <PageHero
        eyebrow="Merk"
        title="GetVital Peptides bestellen"
        intro="Je kunt het hier gewoon bestellen. Dezelfde vials, verzonden vanuit Nederland, met het water er standaard bij."
      />

      <section className="mx-auto max-w-4xl px-4 py-10 space-y-8">
        <div className="rounded-xl border border-accent/30 bg-accent-soft/15 p-6">
          <p className="text-sm leading-relaxed text-text">
            Wij voeren {leverbaar.length} producten uit dit assortiment, van BPC-157 en TB-500 tot de
            GLP-1-klasse. Je ontvangt dezelfde vial met hetzelfde etiket als bij de fabrikant, alleen
            dan vanuit Nederland verstuurd en met 2 ml bacteriostatisch water erbij. Spuiten en
            alcoholdoekjes vink je bij het product aan, zodat je in een keer klaar bent.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/winkel"
              className="inline-flex h-10 items-center gap-1.5 rounded-md bg-accent px-4 text-sm font-semibold text-accent-foreground hover:bg-accent-soft"
            >
              Naar het assortiment <ArrowRight size={14} />
            </Link>
            <Link
              href="/keuzehulp"
              className="inline-flex h-10 items-center rounded-md border border-border px-4 text-sm font-medium text-text hover:border-accent"
            >
              Weet je niet welke je nodig hebt?
            </Link>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {PUNTEN.map((p) => (
            <div key={p.kop} className="rounded-lg border border-border bg-surface p-5">
              <p className="inline-flex items-center gap-2 font-medium text-text">
                <p.icon className="h-4 w-4 text-accent" /> {p.kop}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">{p.tekst}</p>
            </div>
          ))}
        </div>

        <div>
          <h2 className="font-display text-lg text-text">Veelgestelde vragen</h2>
          <dl className="mt-3 space-y-3">
            {FAQS.map((f) => (
              <div key={f.q} className="rounded-md border border-border bg-surface p-4">
                <dt className="text-sm font-semibold text-text">{f.q}</dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-text-muted">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>

        <p className="text-xs leading-relaxed text-text-subtle">
          GetVital Peptides is een merknaam van de fabrikant. Peptidehuis verkoopt deze producten,
          maar is een zelfstandige winkel en geen onderdeel van dat bedrijf.
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
