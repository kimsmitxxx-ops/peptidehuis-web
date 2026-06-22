import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/shop/page-hero";

export const metadata: Metadata = {
  title: "Algemene voorwaarden — Anabolen Pro",
  description:
    "De algemene voorwaarden van Anabolen Pro B.V.: bestelproces, betaling, levering, garantie, aansprakelijkheid en herroepingsrecht.",
};

export const revalidate = 86400;

const sections: { id: string; title: string; body: string[] }[] = [
  {
    id: "definities",
    title: "1. Definities",
    body: [
      "Anabolen Pro: Anabolen Pro B.V., gevestigd te Westhavenkade 12, 3134 NA Vlaardingen, ingeschreven bij de KvK onder nummer 87654321.",
      "Klant: de natuurlijke of rechtspersoon die een overeenkomst aangaat met Anabolen Pro.",
      "Producten: alle door Anabolen Pro aangeboden artikelen, uitsluitend bestemd voor onderzoeksdoeleinden in een laboratoriumomgeving en niet voor menselijke consumptie.",
    ],
  },
  {
    id: "toepasselijkheid",
    title: "2. Toepasselijkheid",
    body: [
      "Deze voorwaarden zijn van toepassing op elk aanbod van Anabolen Pro en op elke tot stand gekomen overeenkomst tussen Anabolen Pro en klant.",
      "Voordat een overeenkomst wordt gesloten, wordt de tekst van deze voorwaarden langs elektronische weg ter beschikking gesteld.",
    ],
  },
  {
    id: "aanbod",
    title: "3. Het aanbod",
    body: [
      "Alle aanbiedingen op de website zijn vrijblijvend en zolang de voorraad strekt.",
      "Het aanbod bevat een volledige en nauwkeurige omschrijving, inclusief batchnummer, gehalte volgens COA en oorsprong.",
      "Kennelijke vergissingen of fouten in het aanbod binden Anabolen Pro niet.",
    ],
  },
  {
    id: "overeenkomst",
    title: "4. Totstandkoming overeenkomst",
    body: [
      "De overeenkomst komt tot stand op het moment dat de klant het aanbod heeft aanvaard via een bestelling en de betaling door Anabolen Pro is bevestigd.",
      "Anabolen Pro kan zich binnen wettelijke kaders op de hoogte stellen of de klant aan zijn betalingsverplichtingen kan voldoen.",
    ],
  },
  {
    id: "herroeping",
    title: "5. Herroepingsrecht",
    body: [
      "De klant heeft het recht de overeenkomst binnen 14 dagen na ontvangst, zonder opgaaf van reden, te ontbinden.",
      "Producten dienen ongeopend, in originele en ongeschonden verpakking met intact zegel te worden geretourneerd.",
      "De directe kosten van retourzending bedragen €4,95 en komen voor rekening van de klant, tenzij sprake is van een lab-garantieclaim of foutieve levering.",
      "Anabolen Pro betaalt het volledige aankoopbedrag inclusief verzendkosten binnen 5 werkdagen na ontvangst en controle terug.",
    ],
  },
  {
    id: "prijzen",
    title: "6. Prijzen en betaling",
    body: [
      "De op de website vermelde prijzen zijn in euro's en inclusief 21% BTW.",
      "Betaling vindt plaats via iDEAL, Bancontact, bank-overboeking of crypto. De bestelling wordt pas verwerkt na ontvangst van de betaling.",
      "Anabolen Pro behoudt zich het recht voor prijzen te wijzigen; eenmaal geplaatste orders blijven ongewijzigd.",
    ],
  },
  {
    id: "levering",
    title: "7. Levering",
    body: [
      "Anabolen Pro neemt de grootst mogelijke zorgvuldigheid in acht bij ontvangst en uitvoering van bestellingen.",
      "Het adres dat door de klant is opgegeven, geldt als plaats van levering.",
      "Genoemde levertijden zijn indicatief. De maximale leveringstermijn bedraagt 30 dagen, tenzij anders overeengekomen.",
      "Het risico van beschadiging en vermissing van producten gaat over op de klant op het moment van bezorging.",
    ],
  },
  {
    id: "garantie",
    title: "8. Lab-garantie en conformiteit",
    body: [
      "Anabolen Pro staat ervoor in dat elk product voldoet aan de specificaties zoals weergegeven op het Certificate of Analysis (COA) van de bijbehorende batch.",
      "Wijkt het werkelijke gehalte, vastgesteld door een onafhankelijk laboratorium, meer dan 5% af van het opgegeven COA, dan vervangt Anabolen Pro het product kosteloos of betaalt het volledige aankoopbedrag terug.",
    ],
  },
  {
    id: "aansprakelijkheid",
    title: "9. Aansprakelijkheid en doeleinde",
    body: [
      "Producten van Anabolen Pro zijn uitsluitend bestemd voor onderzoeksdoeleinden in een laboratoriumomgeving en niet voor menselijke of dierlijke consumptie.",
      "De klant is volledig zelf verantwoordelijk voor het gebruik en de toepassing van de geleverde producten.",
      "Anabolen Pro aanvaardt geen aansprakelijkheid voor schade, direct of indirect, voortvloeiend uit een ander gebruik dan het hierboven omschreven doel.",
    ],
  },
  {
    id: "klachten",
    title: "10. Klachtenregeling",
    body: [
      "Klachten over de uitvoering van de overeenkomst dienen binnen redelijke termijn, volledig en duidelijk omschreven, te worden ingediend bij Anabolen Pro via support@anabolenpro.com.",
      "Anabolen Pro reageert binnen 14 dagen na ontvangst van de klacht met een inhoudelijke reactie of een indicatie van de termijn waarop dat gebeurt.",
      "Komen klant en Anabolen Pro er onderling niet uit, dan kan het geschil worden voorgelegd aan de bevoegde rechter te Rotterdam.",
    ],
  },
  {
    id: "toepasselijk-recht",
    title: "11. Toepasselijk recht",
    body: [
      "Op overeenkomsten tussen Anabolen Pro en klant is uitsluitend Nederlands recht van toepassing.",
    ],
  },
];

export default function VoorwaardenPage() {
  return (
    <>
      <PageHero
        eyebrow="Juridisch"
        title="Algemene voorwaarden Anabolen Pro B.V."
        intro="Versie 3.2 — laatst bijgewerkt op 12 juni 2026. Deze voorwaarden gelden voor elke bestelling die je via onze webshop plaatst."
      />

      <section className="mx-auto max-w-7xl px-4 py-14 grid gap-10 lg:grid-cols-[260px_1fr]">
        <nav className="lg:sticky lg:top-28 self-start">
          <p className="text-xs uppercase tracking-[0.15em] text-text-subtle mb-3">Inhoud</p>
          <ul className="space-y-2 text-sm">
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="text-text-muted hover:text-accent">
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <article className="prose-clean max-w-3xl space-y-10">
          {sections.map((s) => (
            <section key={s.id} id={s.id} className="scroll-mt-28">
              <h2 className="font-display text-2xl text-text">{s.title}</h2>
              <div className="mt-3 space-y-3 text-sm text-text-muted leading-relaxed">
                {s.body.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </section>
          ))}

          <div className="rounded-md border border-border bg-surface p-5 text-sm text-text-muted">
            Vragen over deze voorwaarden? Mail naar{" "}
            <a href="mailto:support@anabolenpro.com" className="text-accent hover:underline">
              support@anabolenpro.com
            </a>{" "}
            of ga naar{" "}
            <Link href="/contact" className="text-accent hover:underline">
              contact
            </Link>
            .
          </div>
        </article>
      </section>
    </>
  );
}
