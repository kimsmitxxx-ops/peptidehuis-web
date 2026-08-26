import type { Metadata } from "next";
import Link from "next/link";
import { Calculator } from "lucide-react";
import { ReconstitutieCalculator } from "@/components/reconstitutie-calculator";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Reconstitutie-calculator: BAC-water en U100-units berekenen",
  description:
    "Bereken hoeveel BAC-water je gebruikt bij een peptide-vial en hoeveel units je op een U100-insulinespuit optrekt voor een gewenste dosis. Inclusief uitleg en veelgestelde vragen.",
  alternates: { canonical: "/reconstitutie-calculator" },
};

const FAQS = [
  {
    q: "Hoeveel BAC-water moet ik bij mijn peptide doen?",
    a: "Dat is een keuze, geen vast voorschrift: meer water geeft een lagere concentratie en dus grotere (nauwkeuriger af te meten) volumes per dosis. Gangbaar is 1 tot 3 ml per vial. De calculator laat direct zien wat jouw keuze betekent per dosis.",
  },
  {
    q: "Wat is een unit op een insulinespuit?",
    a: "Een U100-spuit verdeelt 1 ml in 100 units: 1 unit = 0,01 ml. Bij een concentratie van 2,5 mg/ml bevat 10 units (0,1 ml) dus 250 mcg.",
  },
  {
    q: "Maakt het uit of ik 1 of 3 ml water gebruik?",
    a: "Voor de peptide zelf niet: de totale hoeveelheid werkzame stof in de vial blijft gelijk. Meer water betekent alleen een groter volume per dosis, wat het afmeten nauwkeuriger maakt bij kleine doseringen.",
  },
  {
    q: "Hoe los ik het poeder correct op?",
    a: "Ontsmet beide septa met een alcoholdoekje, laat het BAC-water rustig langs de wand van de vial lopen en zwenk zachtjes tot de oplossing helder is. Nooit schudden: peptideketens zijn mechanisch kwetsbaar.",
  },
  {
    q: "Hoe lang blijft een gereconstitueerde vial goed?",
    a: "Met bacteriostatisch water enkele weken, gekoeld op 2 tot 8 graden en donker bewaard. Met gewoon steriel water is de oplossing alleen voor direct eenmalig gebruik.",
  },
  {
    q: "Geldt deze berekening voor elk peptide?",
    a: "Ja, de rekensom (mg, ml en units) is voor elk gevriesdroogd peptide hetzelfde. Welke dosis in onderzoek gangbaar is verschilt wel sterk per stof; zie daarvoor de gidsen op de peptiden-pagina.",
  },
];

export default function CalculatorPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="max-w-3xl">
        <p className="inline-flex items-center gap-2 rounded-full border border-border bg-paper-soft px-3 py-1 text-xs text-text-muted">
          <Calculator size={12} className="text-accent" /> Gratis tool
        </p>
        <h1 className="mt-4 font-display text-4xl md:text-5xl">Reconstitutie-calculator</h1>
        <p className="mt-4 text-lg text-text-muted leading-relaxed">
          Bereken in drie stappen hoeveel units je op een U100-insulinespuit optrekt: vul de
          vial-inhoud in, kies hoeveel BAC-water je toevoegt en geef je gewenste dosis op.
        </p>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
        <ReconstitutieCalculator />

        <aside className="space-y-4 lg:sticky lg:top-32 lg:self-start">
          <div className="rounded-lg border border-border bg-surface p-4 text-sm space-y-2">
            <p className="text-xs uppercase tracking-wider text-accent-muted font-semibold">Nodig voor reconstitutie</p>
            <p><Link href="/product/benodigdheden/bac-water-10ml" className="text-accent hover:underline">BAC-water (10 ml)</Link> - de standaard oplosvloeistof</p>
            <p><Link href="/product/benodigdheden/insulinespuiten-u100-10st" className="text-accent hover:underline">U100-insulinespuiten</Link> - nauwkeurig per 0,01 ml</p>
            <p><Link href="/product/bundels/starterspakket-reconstitutie" className="text-accent hover:underline">Starterspakket</Link> - alles in één met 10% voordeel</p>
          </div>
          <div className="rounded-lg border border-border bg-surface p-4 text-sm space-y-2">
            <p className="text-xs uppercase tracking-wider text-accent-muted font-semibold">Verder lezen</p>
            <p><Link href="/peptiden" className="text-accent hover:underline">Peptiden A-Z</Link> - per stof werking en onderzoek</p>
            <p><Link href="/begrippenlijst" className="text-accent hover:underline">Begrippenlijst</Link> - U100, BAC-water en meer</p>
          </div>
        </aside>
      </div>

      <section className="mt-14 max-w-3xl">
        <h2 className="font-display text-2xl text-text">Veelgestelde vragen</h2>
        <div className="mt-4 space-y-5">
          {FAQS.map((f) => (
            <div key={f.q} className="border-b border-border pb-4 last:border-0">
              <h3 className="font-medium text-text">{f.q}</h3>
              <p className="mt-1.5 text-sm text-text-muted leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-xs text-text-subtle">
          Deze tool is bedoeld voor laboratorium- en onderzoekstoepassingen. Onderzoekspeptiden
          zijn niet bestemd voor menselijke consumptie.
        </p>
      </section>
    </div>
  );
}
