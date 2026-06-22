import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/shop/page-hero";
import { FlaskConical, ShieldCheck, Microscope, Users, ClipboardList, Leaf } from "lucide-react";

export const metadata: Metadata = {
  title: "Over Anabolen Pro — Lab, team en missie",
  description:
    "Anabolen Pro is een Nederlands lab-gedreven team dat anabolen en PCT levert met onafhankelijk geverifieerde COA's per batch. Lees ons verhaal.",
};

export const revalidate = 86400;

const pillars = [
  {
    icon: FlaskConical,
    h: "Eigen lab in Rotterdam",
    p: "HPLC en massaspectrometrie op iedere binnenkomende batch. Niets gaat de deur uit zonder dubbele meting.",
  },
  {
    icon: Microscope,
    h: "Onafhankelijke verificatie",
    p: "Per batch sturen we samples naar Janoshik en Anabolic Lab. Resultaten zijn publiek per batchnummer.",
  },
  {
    icon: ShieldCheck,
    h: "Lab-garantie",
    p: "Wijkt het werkelijke gehalte meer dan 5% af van het COA? Geld terug of nieuwe batch, zonder discussie.",
  },
  {
    icon: Leaf,
    h: "Schone grondstoffen",
    p: "Wij werken met twee vaste API-leveranciers in EU en China, getoetst op endotoxinen en zware metalen.",
  },
  {
    icon: ClipboardList,
    h: "Open productiedossier",
    p: "Van API tot eindproduct: ladingen, oplosmiddelen, filtratiestappen en sterilisatie zijn traceerbaar.",
  },
  {
    icon: Users,
    h: "Door en voor de community",
    p: "Opgericht in 2019 door coaches en chemici. We luisteren naar fora, niet naar marketingbureaus.",
  },
];

export default function OverOnsPage() {
  return (
    <>
      <PageHero
        eyebrow="Over Anabolen Pro"
        title="Bouwen aan de eerste écht transparante anabolen-shop van Europa"
        intro="Wij begonnen in 2019 omdat we het beu waren: underdosed labels, vage labjes en pakketten die kwijt raken. Anabolen Pro is opgericht om dat probleem fundamenteel op te lossen."
      />

      <section className="mx-auto max-w-7xl px-4 py-14 grid gap-10 lg:grid-cols-2 items-start">
        <div className="space-y-5 text-text-muted leading-relaxed">
          <p>
            We zijn een team van zes mensen: twee chemici, een productie-engineer, een
            klantenservice-duo en een logistiek planner. Allemaal in Nederland, allemaal met een
            achtergrond in fitness of farmacie.
          </p>
          <p>
            Ons doel is simpel: ieder product dat onze deur uit gaat, moet voorzien zijn van een
            recent, onafhankelijk geverifieerd certificate of analysis. Zo weet jij wat er in het
            potje zit, hoe sterk het is, en waar het vandaan komt.
          </p>
          <p>
            We verkopen alleen wat wij zelf zouden gebruiken. Daarom geen testkits, geen pre-mixes
            met onbekende verhoudingen en geen producten van leveranciers die hun productieproces
            niet open op tafel willen leggen.
          </p>
        </div>
        <div className="rounded-md border border-border bg-surface p-6 lg:p-8">
          <p className="text-xs uppercase tracking-[0.15em] text-accent font-semibold">In cijfers</p>
          <dl className="mt-4 grid grid-cols-2 gap-y-6 gap-x-4">
            {[
              ["6.300+", "Klanten in NL en BE"],
              ["1.847", "Batches getest sinds 2019"],
              ["98,4%", "Op tijd bezorgd in 2025"],
              ["4,8 / 5", "Gemiddelde reviewscore"],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="font-display text-3xl text-text tabular">{n}</div>
                <div className="text-xs uppercase tracking-[0.12em] text-text-subtle mt-1">{l}</div>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-surface border-y border-border">
        <div className="mx-auto max-w-7xl px-4 py-14">
          <h2 className="font-display text-3xl text-text max-w-2xl">Zes pijlers die ons werk sturen</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {pillars.map((p) => (
              <div key={p.h} className="rounded-md border border-border bg-background p-5">
                <p.icon size={20} className="text-accent" />
                <h3 className="mt-3 font-display text-lg text-text">{p.h}</h3>
                <p className="mt-1.5 text-sm text-text-muted leading-relaxed">{p.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="rounded-md border border-border bg-surface p-8 lg:p-10 grid gap-6 lg:grid-cols-[1fr_auto] items-center">
          <div>
            <h2 className="font-display text-2xl text-text">Vragen voor het team?</h2>
            <p className="mt-2 text-sm text-text-muted max-w-xl">
              We beantwoorden alles, van technisch lab-werk tot logistieke vragen. Schroom niet om
              te schrijven.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center h-11 px-5 rounded bg-accent text-accent-foreground text-sm font-semibold hover:bg-accent-soft transition-colors"
          >
            Naar contact
          </Link>
        </div>
      </section>
    </>
  );
}
