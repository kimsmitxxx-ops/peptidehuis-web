"use client";
import { useState } from "react";
import Link from "next/link";
import { FlaskConical, Droplets, Syringe, PackageSearch } from "lucide-react";
import type { ProductAmount, AmountUnit } from "@/lib/product-amount";

const nf = new Intl.NumberFormat("nl-NL", { maximumFractionDigits: 2 });

const HANDMATIG = "";

export function ReconstitutieCalculator({ products = [] }: { products?: ProductAmount[] }) {
  const [slug, setSlug] = useState<string>(HANDMATIG);
  const [amount, setAmount] = useState(5);
  const [unit, setUnit] = useState<AmountUnit>("mg");
  const [ml, setMl] = useState(2);
  const [dose, setDose] = useState(250);

  const gekozen = products.find((p) => p.slug === slug) ?? null;

  function kiesProduct(nieuweSlug: string) {
    setSlug(nieuweSlug);
    const p = products.find((x) => x.slug === nieuweSlug);
    if (!p) return;
    setAmount(p.amount);
    setUnit(p.unit);
    // Een standaarddosis die bij de nieuwe eenheid past, zodat het resultaat
    // meteen een bruikbaar getal is in plaats van een waarschuwing.
    setDose(p.unit === "IU" ? Math.max(1, Math.round(p.amount / 10)) : 250);
  }

  // Alles omrekenen naar de eenheid waarin ook de dosis wordt ingevuld:
  // mcg bij een mg-vial, IU bij een IU-vial.
  const doseUnitLabel = unit === "mg" ? "mcg" : "IU";
  const totaalInDoseUnits = unit === "mg" ? amount * 1000 : amount;
  const valid = amount > 0 && ml > 0 && dose > 0;
  const concPerMl = valid ? totaalInDoseUnits / ml : 0;
  const perSpuitUnit = concPerMl / 100; // 1 unit op een U100-spuit = 0,01 ml
  const unitsPerDose = valid && perSpuitUnit > 0 ? dose / perSpuitUnit : 0;
  const dosesPerVial = valid ? totaalInDoseUnits / dose : 0;
  const tooSmall = valid && unitsPerDose < 2;
  const tooLarge = valid && unitsPerDose > 100;

  const inputCls =
    "w-full rounded-lg border border-paper-border bg-paper-soft px-3 py-2.5 text-base tabular outline-none focus:border-accent";

  return (
    <div className="rounded-xl border border-border bg-surface p-6">
      {products.length > 0 && (
        <label className="mb-5 block">
          <span className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-text">
            <PackageSearch size={14} className="text-accent" /> Kies je product
          </span>
          <select value={slug} onChange={(e) => kiesProduct(e.target.value)} className={inputCls}>
            <option value={HANDMATIG}>Zelf invullen</option>
            {products.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.name}
              </option>
            ))}
          </select>
          <span className="mt-1.5 block text-xs text-text-subtle">
            {gekozen
              ? `We vullen ${nf.format(gekozen.amount)} ${gekozen.unit} voor je in. Pas het water en de dosis aan naar je eigen opzet.`
              : "Selecteer een product uit ons assortiment, dan vullen we de hoeveelheid in de vial automatisch in."}
          </span>
        </label>
      )}

      <div className="grid gap-5 sm:grid-cols-3">
        <label className="block">
          <span className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-text">
            <FlaskConical size={14} className="text-accent" /> Peptide in vial ({unit})
          </span>
          <input
            type="number"
            min={0.5}
            step={unit === "IU" ? 50 : 0.5}
            value={amount}
            onChange={(e) => { setAmount(Number(e.target.value)); setSlug(HANDMATIG); }}
            className={inputCls}
          />
        </label>
        <label className="block">
          <span className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-text">
            <Droplets size={14} className="text-accent" /> Bacteriostatisch water (ml)
          </span>
          <input type="number" min={0.5} step={0.5} value={ml} onChange={(e) => setMl(Number(e.target.value))} className={inputCls} />
        </label>
        <label className="block">
          <span className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-text">
            <Syringe size={14} className="text-accent" /> Gewenste dosis ({doseUnitLabel})
          </span>
          <input
            type="number"
            min={1}
            step={unit === "IU" ? 1 : 10}
            value={dose}
            onChange={(e) => setDose(Number(e.target.value))}
            className={inputCls}
          />
        </label>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-border bg-background p-4">
          <p className="text-xs uppercase tracking-wider text-accent font-semibold">Concentratie</p>
          <p className="mt-1 font-display text-2xl text-text tabular">
            {nf.format(amount / (ml || 1))} {unit}/ml
          </p>
        </div>
        <div className="rounded-lg border border-border bg-background p-4">
          <p className="text-xs uppercase tracking-wider text-accent font-semibold">Optrekken per dosis</p>
          <p className="mt-1 font-display text-2xl text-text tabular">{nf.format(unitsPerDose)} units</p>
          <p className="text-xs text-text-muted tabular">= {nf.format(unitsPerDose / 100)} ml op een U100-spuit</p>
        </div>
        <div className="rounded-lg border border-border bg-background p-4">
          <p className="text-xs uppercase tracking-wider text-accent font-semibold">Doses per vial</p>
          <p className="mt-1 font-display text-2xl text-text tabular">{nf.format(dosesPerVial)}</p>
        </div>
      </div>

      {tooSmall && (
        <p className="mt-4 rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
          Minder dan 2 units is lastig nauwkeurig af te meten. Gebruik meer BAC-water voor een
          lagere concentratie en een groter volume per dosis.
        </p>
      )}
      {tooLarge && (
        <p className="mt-4 rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
          Meer dan 100 units past niet in een standaard U100-spuit van 1 ml. Gebruik minder
          BAC-water voor een hogere concentratie.
        </p>
      )}

      {gekozen && (
        <p className="mt-4 text-sm text-text-muted">
          Berekening voor{" "}
          <Link
            href={`/product/${gekozen.slug}`}
            className="font-medium text-accent hover:underline"
          >
            {gekozen.name}
          </Link>
          . Bacteriostatisch water, insulinespuiten en alcoholdoekjes kies je op de productpagina bij je vial.
        </p>
      )}
    </div>
  );
}
