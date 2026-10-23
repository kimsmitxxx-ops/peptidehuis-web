"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { WizardStep, type WizardTile } from "./wizard-step";
import { ProductCard } from "./product-card";
import { mainCategories, categoryIcon } from "./shop/data";
import { ArrowLeft, RotateCcw, Beaker, Calculator, ArrowRight, Sparkles, GraduationCap } from "lucide-react";

export type KeuzehulpProduct = {
  slug: string;
  name: string;
  categorySlug: string;
  categoryName: string;
  priceCents: number;
  image: string;
  subtitle: string | null;
  description: string | null;
};

type Ervaring = "nieuw" | "ervaren";
type Spullen = "niets" | "compleet";

/** Doelen = onze gewone categorieen, zonder bundels en benodigdheden. */
const DOELEN = mainCategories.filter((c) => c.slug !== "bundels" && c.slug !== "benodigdheden");

const ERVARING_TEGELS: WizardTile[] = [
  { value: "nieuw", label: "Dit is nieuw voor me", sub: "Ik wil met een enkele, goed onderzochte stof beginnen.", icon: GraduationCap },
  { value: "ervaren", label: "Ik heb al ervaring", sub: "Laat ook blends en combinaties zien.", icon: Sparkles },
];

const SPULLEN_TEGELS: WizardTile[] = [
  { value: "niets", label: "Nog niets", sub: "Ik heb ook water, spuiten en doekjes nodig.", icon: Beaker },
  { value: "compleet", label: "Alles in huis", sub: "Ik heb BAC-water en spuiten al liggen.", icon: Calculator },
];

function isBlend(p: KeuzehulpProduct) {
  return /blend|stack|bundel/i.test(p.name);
}

export function KeuzehulpWizard({
  products,
  benodigdheden,
}: {
  products: KeuzehulpProduct[];
  benodigdheden: KeuzehulpProduct[];
}) {
  const [doel, setDoel] = useState<string>();
  const [ervaring, setErvaring] = useState<Ervaring>();
  const [spullen, setSpullen] = useState<Spullen>();

  const stap = !doel ? 1 : !ervaring ? 2 : !spullen ? 3 : 4;

  const advies = useMemo(() => {
    if (!doel || !ervaring) return [];
    const pool = products.filter((p) => p.categorySlug === doel);
    // Wie nieuw is krijgt losse stoffen, geen blends: een blend maakt het
    // lastiger om te zien welke stof waarvoor zorgt.
    const basis = ervaring === "nieuw" ? pool.filter((p) => !isBlend(p)) : pool;
    const gesorteerd = [...(basis.length ? basis : pool)].sort((a, b) =>
      ervaring === "nieuw" ? a.priceCents - b.priceCents : Number(isBlend(b)) - Number(isBlend(a)),
    );
    return gesorteerd.slice(0, 3);
  }, [doel, ervaring, products]);

  const doelNaam = DOELEN.find((d) => d.slug === doel)?.name ?? "";

  function opnieuw() {
    setDoel(undefined);
    setErvaring(undefined);
    setSpullen(undefined);
  }

  function terug() {
    if (stap === 4) setSpullen(undefined);
    else if (stap === 3) setErvaring(undefined);
    else if (stap === 2) setDoel(undefined);
  }

  const doelTegels: WizardTile[] = DOELEN.map((c) => ({
    value: c.slug,
    label: c.name,
    sub: c.tagline,
    icon: categoryIcon(c.slug),
  }));

  return (
    <div className="space-y-5">
      {stap === 1 && (
        <WizardStep
          step={1}
          totalSteps={3}
          question="Waar doe je onderzoek naar?"
          description="Kies het gebied dat het dichtst bij je vraagstelling ligt."
          tiles={doelTegels}
          onChange={setDoel}
        />
      )}

      {stap === 2 && (
        <WizardStep
          step={2}
          totalSteps={3}
          question="Hoeveel ervaring heb je met peptiden?"
          description="Dit bepaalt of we ook blends laten zien."
          tiles={ERVARING_TEGELS}
          onChange={(v) => setErvaring(v as Ervaring)}
        />
      )}

      {stap === 3 && (
        <WizardStep
          step={3}
          totalSteps={3}
          question="Wat heb je al in huis?"
          description="Een vial poeder moet je oplossen voor je ermee kunt werken."
          tiles={SPULLEN_TEGELS}
          onChange={(v) => setSpullen(v as Spullen)}
        />
      )}

      {stap === 4 && (
        <div className="mx-auto max-w-5xl space-y-6">
          <div className="rounded-lg border border-border bg-surface p-6 md:p-8 shadow-card">
            <p className="text-xs uppercase tracking-wider text-accent font-semibold">Ons advies</p>
            <h2 className="mt-1 font-display text-2xl md:text-3xl text-text leading-tight">
              {advies.length > 0
                ? `Voor ${doelNaam.toLowerCase()} passen deze het best`
                : `Nog niets leverbaar binnen ${doelNaam.toLowerCase()}`}
            </h2>
            <p className="mt-2 text-sm text-text-muted">
              {advies.length > 0
                ? ervaring === "nieuw"
                  ? "Losse, goed onderzochte stoffen zodat je per stof ziet wat er gebeurt. Alles hieronder is op voorraad."
                  : "Inclusief blends, zodat je twee routes in een reconstitutie combineert. Alles hieronder is op voorraad."
                : "Deze categorie is op dit moment niet leverbaar. Bekijk het volledige assortiment of kies een ander doel."}
            </p>
          </div>

          {advies.length > 0 && (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {advies.map((p) => (
                <Link key={p.slug} href={`/product/${p.categorySlug}/${p.slug}`} className="block">
                  <ProductCard
                    image={p.image}
                    name={p.name}
                    slug={p.slug}
                    priceFrom={p.priceCents / 100}
                    inStock
                    category={p.categoryName}
                    shortDescription={p.subtitle || p.description || undefined}
                  />
                </Link>
              ))}
            </div>
          )}

          {spullen === "niets" && benodigdheden.length > 0 && (
            <div className="rounded-lg border border-accent/30 bg-accent-soft/15 p-6">
              <p className="inline-flex items-center gap-1.5 text-sm font-semibold text-text">
                <Beaker size={15} className="text-accent" /> Je hebt er nog spullen bij nodig
              </p>
              <p className="mt-1.5 text-sm text-text-muted">
                Bij elke vial zit 2 ml bacteriostatisch water inbegrepen. Insulinespuiten,
                alcoholdoekjes en een grotere flacon water kies je er op de productpagina bij.
                Liever alles los? Dan vind je het hier.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {benodigdheden.slice(0, 4).map((b) => (
                  <Link
                    key={b.slug}
                    href={`/product/${b.categorySlug}/${b.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-xs text-text hover:border-accent"
                  >
                    {b.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            <Link
              href={`/winkel/${doel}`}
              className="inline-flex h-10 items-center gap-1.5 rounded-md bg-accent px-4 text-sm font-semibold text-accent-foreground hover:bg-accent-soft"
            >
              Hele categorie bekijken <ArrowRight size={14} />
            </Link>
            <Link
              href="/reconstitutie-calculator"
              className="inline-flex h-10 items-center gap-1.5 rounded-md border border-border px-4 text-sm font-medium text-text hover:border-accent"
            >
              <Calculator size={14} /> Reconstitutie berekenen
            </Link>
          </div>
        </div>
      )}

      {stap > 1 && (
        <div className="mx-auto flex max-w-3xl items-center gap-4 px-1">
          <button type="button" onClick={terug} className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-accent">
            <ArrowLeft size={14} /> Vorige stap
          </button>
          <button type="button" onClick={opnieuw} className="inline-flex items-center gap-1.5 text-sm text-text-subtle hover:text-accent">
            <RotateCcw size={13} /> Opnieuw beginnen
          </button>
        </div>
      )}
    </div>
  );
}
