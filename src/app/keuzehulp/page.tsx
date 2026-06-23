import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/shop/page-hero";
import { KeuzehulpWizard } from "@/components/shop/keuzehulp-wizard";
import { AlertTriangle, Compass, Target, ShieldCheck } from "lucide-react";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Keuzehulp — vind de juiste kuur of stof",
  description: "Beantwoord 4 vragen en zie welke anabolen en kuurpakketten bij jouw doel passen: cutting, lean bulk, mass, eerste kuur of een herhaal-cycle.",
  alternates: { canonical: "/keuzehulp" },
};

export default function KeuzehulpPage() {
  return (
    <>
      <PageHero
        eyebrow="Keuzehulp"
        title="Welke kuur past bij jouw doel?"
        intro="Beantwoord 4 korte vragen en zie welke anabolen of kuurpakketten in jouw situatie het meest worden gekozen. Geen sales-praat — gewoon wat de community en literatuur als logische start aanwijzen."
      />

      <section className="mx-auto max-w-3xl px-4 py-10">
        <div className="rounded-lg border border-warning/30 bg-warning-soft/30 p-5 flex items-start gap-3">
          <AlertTriangle size={20} className="text-warning shrink-0 mt-0.5" />
          <div className="text-sm text-text">
            <p className="font-semibold">Belangrijke disclaimer</p>
            <p className="mt-1 text-text-muted leading-relaxed">
              Deze keuzehulp geeft <strong>uitsluitend een indicatie</strong> op basis van veelvoorkomende
              protocollen, geen medisch advies. Wij zijn geen arts en kennen jouw bloedwaardes, medische
              historie of huidige medicatie niet. Voor een persoonlijk plan: laat bloedwerk doen en raadpleeg
              een arts of endocrinoloog. Wie de keuzehulp gebruikt is zelf verantwoordelijk voor zijn keuze.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-border bg-surface p-4">
            <Compass size={18} className="text-accent" />
            <p className="mt-2 text-sm font-semibold text-text">4 vragen</p>
            <p className="text-xs text-text-muted">Doel, ervaring, voorkeur orale of injectie, budget</p>
          </div>
          <div className="rounded-lg border border-border bg-surface p-4">
            <Target size={18} className="text-accent" />
            <p className="mt-2 text-sm font-semibold text-text">3 suggesties</p>
            <p className="text-xs text-text-muted">Top-3 producten of kuurpakketten die in jouw scenario passen</p>
          </div>
          <div className="rounded-lg border border-border bg-surface p-4">
            <ShieldCheck size={18} className="text-accent" />
            <p className="mt-2 text-sm font-semibold text-text">Geen account</p>
            <p className="text-xs text-text-muted">Niks opgeslagen, niks gemaild — alleen suggestie op scherm</p>
          </div>
        </div>

        <div className="mt-10">
          <KeuzehulpWizard />
        </div>

        <div className="mt-12 rounded-lg border border-border bg-paper-soft p-5 text-sm text-text-muted leading-relaxed">
          <p className="font-semibold text-text mb-2">Waarom deze keuzehulp?</p>
          <p>
            De meest gestelde vraag in onze chat is "wat is een goeie eerste kuur" of "wat past bij cutting".
            We krijgen die elke dag tien keer. Deze tool geeft je in 30 seconden een richting die past bij
            jouw doel + ervaring — gebaseerd op wat in onderzoeksliteratuur en op betrouwbare fora
            (Meso-Rx, Reddit r/steroids) als logische start wordt beschreven.
          </p>
          <p className="mt-2">
            Wil je het écht goed doen: doe bloedwerk vooraf (totaal+vrij testosteron, LH, FSH, oestradiol,
            SHBG, lipiden, hematocriet, ALT/AST), kies dan een kuur, en check tussentijds in week 6.
            Bij twijfel <Link href="/contact" className="text-accent hover:underline">contact</Link> ons of post je
            vraag in een fatsoenlijk forum.
          </p>
        </div>
      </section>
    </>
  );
}
