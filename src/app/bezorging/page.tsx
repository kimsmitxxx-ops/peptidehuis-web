import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/shop/page-hero";
import { FaqAccordion } from "@/components/faq-accordion";
import { Truck, PackageCheck, Clock, Globe2, ShieldCheck, MapPin } from "lucide-react";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Bezorging — AnabolenPro",
  description: "Vandaag voor 22:00 besteld, morgen in huis. Discrete verzending vanuit Nederland met track & trace, gratis vanaf €75.",
  alternates: { canonical: "/bezorging" },
};

const carriers = [
  { name: "PostNL Standaard", cost: "€4,95", note: "Vandaag voor 22:00 besteld, morgen in huis (ma t/m za)." },
  { name: "PostNL Avond", cost: "€7,50", note: "Bezorging tussen 18:00 en 22:00, ideaal als je overdag werkt." },
  { name: "PostNL Pakketpunt", cost: "€3,95", note: "Afhalen op een door jou gekozen punt, anoniem en op jouw tijd." },
  { name: "DHL Express EU", cost: "€14,95", note: "Binnen 1-3 werkdagen in BE, DE, FR, AT, ES, IT, PL en SE." },
];

const usps = [
  { icon: Clock, title: "Voor 22:00 = morgen in huis", sub: "Late cutoff, ook op vrijdag." },
  { icon: PackageCheck, title: "Neutrale verpakking", sub: "Geen logo, geen productnaam, geen vermelding op label." },
  { icon: ShieldCheck, title: "Verzekerd verzonden", sub: "Tot €500 standaard verzekerd, hoger op verzoek mogelijk." },
  { icon: Globe2, title: "EU-breed bezorgd", sub: "BE, DE, FR, AT, ES, IT, PL en SE binnen 1-3 werkdagen." },
];

const faq = [
  { question: "Hoe snel wordt mijn pakket verstuurd?", answer: "Alle orders die op werkdagen vóór 22:00 binnenkomen, worden dezelfde avond nog verwerkt en gaan om 22:30 mee met de laatste lichting. In het weekend gaan orders maandagochtend de deur uit." },
  { question: "Hoe ziet de verpakking eruit?", answer: "Een neutrale bruine of grijze doos zonder logo, productnaam of branding op de buitenkant. Op het verzendlabel staat alleen onze KvK-naam en jouw adres. Niets verraadt de inhoud." },
  { question: "Kan ik mijn order volgen?", answer: "Ja. Zodra het label is aangemaakt, ontvang je per e-mail een track & trace-code van PostNL of DHL." },
  { question: "Wat als ik niet thuis ben?", answer: "PostNL biedt je het pakket nog één keer aan, daarna gaat het naar het dichtstbijzijnde afhaalpunt. Je hebt 7 dagen om het op te halen met je legitimatie." },
  { question: "Bezorgen jullie ook naar afhaalpunten?", answer: "Ja, je kiest tijdens het afrekenen een PostNL- of DHL-afhaalpunt naar keuze. Vaak de discreetste optie." },
  { question: "Wordt er een handtekening gevraagd?", answer: "Bij orders boven €150 vragen we standaard om een handtekening bij ontvangst, om verlies of diefstal te voorkomen. Onder dat bedrag is een handtekening optioneel." },
];

const timeline = [
  { t: "0:00", h: "Bestelling geplaatst", d: "Directe bevestiging per e-mail met ordernummer." },
  { t: "+15 min", h: "Betaling verwerkt", d: "iDEAL, Bancontact en bank-overboeking gaan direct door." },
  { t: "Zelfde dag 21:00", h: "Order ingepakt", d: "Picker controleert batch en COA-nummer per item." },
  { t: "Zelfde dag 22:30", h: "Bij PostNL", d: "Track & trace per mail, label is dan al actief." },
  { t: "Volgende dag", h: "Bezorgd", d: "Tussen 09:00 en 21:30 bij jou aan de deur of op het afhaalpunt." },
];

export default function BezorgingPage() {
  return (
    <>
      <PageHero
        eyebrow="Bezorging"
        title="Discreet, snel en met track & trace door heel Europa"
        intro="Wij verzenden zelf vanuit Vlaardingen. Geen postbus in het buitenland, geen ompak-route. Vandaag besteld voor 22:00, morgen in huis."
      />

      <section className="mx-auto max-w-7xl px-4 py-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {usps.map((u) => (
          <div key={u.title} className="rounded-md border border-border bg-surface p-5">
            <u.icon size={20} className="text-accent" />
            <h3 className="mt-3 font-display text-lg text-text">{u.title}</h3>
            <p className="mt-1.5 text-sm text-text-muted leading-relaxed">{u.sub}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14">
        <h2 className="font-display text-2xl text-text">Bezorgopties &amp; tarieven</h2>
        <p className="mt-2 text-sm text-text-muted">
          Gratis verzending in Nederland vanaf €75. Daaronder rekenen we kostprijs door.
        </p>
        <div className="mt-6 overflow-hidden rounded-md border border-border">
          <table className="w-full text-sm">
            <thead className="bg-surface">
              <tr className="text-left text-text-muted">
                <th className="px-5 py-3 font-medium">Methode</th>
                <th className="px-5 py-3 font-medium w-28">Tarief</th>
                <th className="px-5 py-3 font-medium">Levertijd</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {carriers.map((c) => (
                <tr key={c.name} className="bg-background">
                  <td className="px-5 py-4 font-medium text-text">{c.name}</td>
                  <td className="px-5 py-4 tabular text-text">{c.cost}</td>
                  <td className="px-5 py-4 text-text-muted">{c.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs text-text-subtle">
          Gratis PostNL Standaard vanaf €75 in NL · vanaf €150 in BE/DE.
        </p>
      </section>

      <section className="bg-surface border-y border-border">
        <div className="mx-auto max-w-7xl px-4 py-14 grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-accent font-semibold">Tijdlijn</p>
            <h2 className="mt-2 font-display text-2xl text-text">Van bestelling tot deurmat</h2>
            <p className="mt-3 text-sm text-text-muted leading-relaxed">
              Transparant per stap. Je weet altijd waar je pakket zich bevindt.
            </p>
          </div>
          <ol className="space-y-5">
            {timeline.map((s) => (
              <li key={s.h} className="grid grid-cols-[110px_1fr] gap-4 items-start">
                <span className="text-xs uppercase tracking-[0.12em] text-text-subtle tabular pt-1">{s.t}</span>
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
            <Truck size={22} className="text-accent" />
            <h2 className="mt-3 font-display text-2xl text-text">Veelgestelde vragen</h2>
            <p className="mt-2 text-sm text-text-muted">
              Antwoord niet gevonden? Stuur een bericht via{" "}
              <Link href="/contact" className="text-accent hover:underline">contact</Link>.
            </p>
            <div className="mt-6 rounded-md border border-border bg-surface p-5 text-sm text-text-muted">
              <MapPin size={16} className="text-accent" />
              <p className="mt-2 font-medium text-text">Magazijn Vlaardingen</p>
              <p>Westhavenkade 12, 3134 NA Vlaardingen</p>
              <p className="mt-1 text-xs text-text-subtle">Geen afhaalpunt — alleen verzending.</p>
            </div>
          </div>
          <FaqAccordion items={faq} />
        </div>
      </section>
    </>
  );
}
