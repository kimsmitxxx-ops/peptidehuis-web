"use client";
import { useState } from "react";
import { FlaskConical, Droplets, Syringe } from "lucide-react";

const nf = new Intl.NumberFormat("nl-NL", { maximumFractionDigits: 2 });

export function ReconstitutieCalculator() {
  const [mg, setMg] = useState(5);
  const [ml, setMl] = useState(2);
  const [doseMcg, setDoseMcg] = useState(250);

  const valid = mg > 0 && ml > 0 && doseMcg > 0;
  const concMgMl = valid ? mg / ml : 0;
  const concMcgUnit = concMgMl * 10; // 1 unit = 0,01 ml
  const unitsPerDose = valid ? doseMcg / concMcgUnit : 0;
  const dosesPerVial = valid ? (mg * 1000) / doseMcg : 0;
  const tooSmall = valid && unitsPerDose < 2;
  const tooLarge = valid && unitsPerDose > 100;

  const inputCls =
    "w-full rounded-lg border border-paper-border bg-paper-soft px-3 py-2.5 text-base tabular outline-none focus:border-accent";

  return (
    <div className="rounded-xl border border-border bg-surface p-6">
      <div className="grid gap-5 sm:grid-cols-3">
        <label className="block">
          <span className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-text">
            <FlaskConical size={14} className="text-accent" /> Peptide in vial (mg)
          </span>
          <input type="number" min={0.5} step={0.5} value={mg} onChange={(e) => setMg(Number(e.target.value))} className={inputCls} />
        </label>
        <label className="block">
          <span className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-text">
            <Droplets size={14} className="text-accent" /> BAC-water (ml)
          </span>
          <input type="number" min={0.5} step={0.5} value={ml} onChange={(e) => setMl(Number(e.target.value))} className={inputCls} />
        </label>
        <label className="block">
          <span className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-text">
            <Syringe size={14} className="text-accent" /> Gewenste dosis (mcg)
          </span>
          <input type="number" min={5} step={5} value={doseMcg} onChange={(e) => setDoseMcg(Number(e.target.value))} className={inputCls} />
        </label>
      </div>

      {valid ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-border bg-background p-4">
            <p className="text-xs uppercase tracking-wider text-text-subtle">Concentratie</p>
            <p className="mt-1 font-display text-2xl text-text tabular">{nf.format(concMgMl)} mg/ml</p>
            <p className="text-xs text-text-muted tabular">{nf.format(concMcgUnit)} mcg per unit</p>
          </div>
          <div className="rounded-lg border-2 border-accent bg-accent/5 p-4">
            <p className="text-xs uppercase tracking-wider text-accent font-semibold">Optrekken per dosis</p>
            <p className="mt-1 font-display text-2xl text-text tabular">{nf.format(unitsPerDose)} units</p>
            <p className="text-xs text-text-muted tabular">= {nf.format(unitsPerDose / 100)} ml op een U100-spuit</p>
          </div>
          <div className="rounded-lg border border-border bg-background p-4">
            <p className="text-xs uppercase tracking-wider text-text-subtle">Doses per vial</p>
            <p className="mt-1 font-display text-2xl text-text tabular">{Math.floor(dosesPerVial)}</p>
            <p className="text-xs text-text-muted tabular">van {nf.format(doseMcg)} mcg</p>
          </div>
        </div>
      ) : (
        <p className="mt-6 text-sm text-text-muted">Vul alle drie de velden in om te rekenen.</p>
      )}

      {tooSmall && (
        <p className="mt-4 rounded-md border border-warning/40 bg-warning-soft px-3 py-2 text-sm text-text">
          Minder dan 2 units is lastig nauwkeurig af te meten. Gebruik meer BAC-water voor een
          lagere concentratie en een groter volume per dosis.
        </p>
      )}
      {tooLarge && (
        <p className="mt-4 rounded-md border border-warning/40 bg-warning-soft px-3 py-2 text-sm text-text">
          Meer dan 100 units past niet in een standaard U100-spuit van 1 ml. Gebruik minder
          BAC-water voor een hogere concentratie.
        </p>
      )}
    </div>
  );
}
