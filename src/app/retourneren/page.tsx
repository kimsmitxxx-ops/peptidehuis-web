import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/shop/page-hero";
import { FaqAccordion } from "@/components/faq-accordion";
import { RotateCcw, ShieldCheck, FlaskConical, Mail } from "lucide-react";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Retourneren & garantie — AnabolenPro",
  description: "Retourneren binnen 14 dagen, ongebroken zegel. Lab-garantie op iedere batch met openbare COA.",
  alternates: { canonical: "/retourneren" },
};

const cards = [
  { icon: RotateCcw, title: "14 dagen herroeping", sub: "Wettelijk recht. Zegel intact en originele verpakking blijft de voorwaarde." },
  { icon: FlaskConical, title: "Lab-garantie per batch", sub: "Afwijking groter dan 5% van het COA? Geld terug of nieuwe batch." },
  { icon: ShieldCheck, title: "Snelle afhandeling", sub: "RMA binnen 1 werkdag, terugbetaling binnen 5 werkdagen na ontvangst." },
];

const steps = [
  { n: "01", h: "Mail je ordernummer", d: "Naar retour@anabolenpro.com, met een korte reden en eventueel het batchnummer." },
  { n: "02", h: "Ontvang je RMA-label", d: "Binnen 1 werkdag krijg je een gefrankeerd PostNL-label per e-mail." },
  { n: "03", h: "Breng pakket weg", d: "Plak het label op de originele doos en lever in bij elk PostNL-punt." },
  { n: "04", h: "Wij betalen terug", d: "Binnen 5 werkdagen na ontvangst staat het bedrag op je rekening." },
];

const faq = [
  { question: "Welk product mag ik retourneren?", answer: "Alleen producten waarvan het zegel onbeschadigd is en die in originele verpakking zitten. Open verpakkingen kunnen wij om kwaliteitsredenen niet terugnemen." },
  { question: "Hoe meld ik een retour aan?", answer: "Mail je ordernummer naar retour@anabolenpro.com. Binnen 1 werkdag ontvang je een RMA-nummer en een retourlabel." },
  { question: "Wie betaalt de retourkosten?", answer: "Bij herroeping binnen 14 dagen betaal jij €4,95 retourkosten (wordt verrekend met je terugbetaling). Bij een lab-garantieclaim of foutieve levering vergoeden wij alles, inclusief verzending." },
  { question: "Wanneer krijg ik mijn geld terug?", answer: "Binnen 5 werkdagen na ontvangst en controle in ons magazijn. Het bedrag wordt teruggestort op de rekening waarmee je betaald hebt." },
  { question: "Wat gebeurt er bij een lab-garantieclaim?", answer: "Verschilt het werkelijke gehalte op je batch meer dan 5% van wat op het COA staat? Stuur ons je batchnummer en een onafhankelijke labanalyse. Wij vervangen het product kosteloos of betalen volledig terug." },
  { question: "Geldt het herroepingsrecht ook bij actie-aanbiedingen?", answer: "Ja. Het wettelijke herroepingsrecht van 14 dagen geldt voor elk product in onze winkel, ook tijdens kortingsacties of bundels — zolang het zegel intact is." },
];

export default function RetourPage() {
  return (
    <>
      <PageHero
        eyebrow="Retourneren & garantie"
        title="14 dagen bedenktijd én levenslange lab-garantie per batch"
        intro="Niet tevreden over je bestelling of klopt het gehalte niet met het COA? Wij regelen het, zonder discussie."
      />

      <section className="mx-auto max-w-7xl px-4 py-14 grid gap-5 md:grid-cols-3">
        {cards.map((c) => (
          <div key={c.title} className="rounded-md border border-border bg-surface p-5">
            <c.icon size={20} className="text-accent" />
            <h3 className="mt-3 font-display text-lg text-text">{c.title}</h3>
            <p className="mt-1.5 text-sm text-text-muted leading-relaxed">{c.sub}</p>
          </div>
        ))}
      </section>

      <section className="bg-surface border-y border-border">
        <div className="mx-auto max-w-7xl px-4 py-14 grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-accent font-semibold">Stappenplan</p>
            <h2 className="mt-2 font-display text-2xl text-text">Retour in 4 stappen</h2>
            <p className="mt-3 text-sm text-text-muted leading-relaxed">
              Wij sturen je een gefrankeerd PostNL-label. Geen geprint formulier, geen vragenlijst — alleen je ordernummer en de reden.
            </p>
          </div>
          <ol className="space-y-5">
            {steps.map((s) => (
              <li key={s.n} className="grid grid-cols-[56px_1fr] gap-4 items-start">
                <span className="font-display text-2xl text-accent tabular">{s.n}</span>
                <div>
                  <p className="font-medium text-text">{s.h}</p>
                  <p className="text-sm text-text-muted">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <h2 className="font-display text-2xl text-text">Veelgestelde vragen</h2>
            <p className="mt-2 text-sm text-text-muted">
              Twijfel je over jouw situatie?{" "}
              <Link href="/contact" className="text-accent hover:underline">Neem contact op</Link>.
            </p>
            <div className="mt-6 rounded-md border border-border bg-surface p-5">
              <Mail size={16} className="text-accent" />
              <p className="mt-2 font-medium text-text">Retourservice</p>
              <a href="mailto:retour@anabolenpro.com" className="text-sm text-accent hover:underline">retour@anabolenpro.com</a>
              <p className="mt-2 text-xs text-text-subtle">Antwoord binnen 1 werkdag, vaak sneller.</p>
            </div>
          </div>
          <FaqAccordion items={faq} />
        </div>
      </section>
    </>
  );
}
