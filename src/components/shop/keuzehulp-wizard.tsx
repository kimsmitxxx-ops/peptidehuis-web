"use client";
import { useState } from "react";
import Link from "next/link";
import { ChevronRight, RotateCw, ArrowRight } from "lucide-react";

type Goal = "eerste" | "lean-bulk" | "mass" | "cutting" | "recomp";
type Experience = "beginner" | "intermediate" | "advanced";
type Form = "oraal" | "injectie" | "mix";
type Budget = "laag" | "middel" | "hoog";

interface Answers {
  goal?: Goal;
  experience?: Experience;
  form?: Form;
  budget?: Budget;
}

interface Suggestion {
  title: string;
  why: string;
  href: string;
  category: string;
}

const GOAL_OPTIONS: { key: Goal; label: string; sub: string }[] = [
  { key: "eerste", label: "Eerste kuur", sub: "Nog nooit AAS gebruikt" },
  { key: "lean-bulk", label: "Lean bulk", sub: "Spier erbij, vet eronder" },
  { key: "mass", label: "Mass", sub: "Maximaal volume + kracht" },
  { key: "cutting", label: "Cutting", sub: "Vet weg, spier behouden" },
  { key: "recomp", label: "Recomp", sub: "Tegelijk leaner én sterker" },
];
const EXP_OPTIONS: { key: Experience; label: string; sub: string }[] = [
  { key: "beginner", label: "Beginner", sub: "0–1 cycles gedaan" },
  { key: "intermediate", label: "Intermediate", sub: "2–4 cycles" },
  { key: "advanced", label: "Advanced", sub: "5+ cycles" },
];
const FORM_OPTIONS: { key: Form; label: string; sub: string }[] = [
  { key: "injectie", label: "Injectie", sub: "Veiliger voor lever, langer effect" },
  { key: "oraal", label: "Oraal", sub: "Geen prikken, korter actief" },
  { key: "mix", label: "Mix", sub: "Stack van injectie + oraal kickstart" },
];
const BUDGET_OPTIONS: { key: Budget; label: string; sub: string }[] = [
  { key: "laag", label: "Laag", sub: "< €150 / cycle" },
  { key: "middel", label: "Middel", sub: "€150 – €350" },
  { key: "hoog", label: "Hoog", sub: "€350+" },
];

function suggest(a: Answers): Suggestion[] {
  // Eerste kuur → test-only altijd
  if (a.goal === "eerste") {
    return [
      { title: "Testosteron Enanthate 250", why: "Klassieke eerste kuur — 300–500mg/week, 12–16 weken. Voorspelbare bijwerkingen, stabiele bloedwaardes.", category: "injectie", href: "/winkel/injectie" },
      { title: "Kuurpakket Beginners Massa", why: "Alles erin: test, PCT (Clomid+Nolva), en bijbehorende dosering uitgelegd.", category: "kuurpakketten", href: "/winkel/kuurpakketten" },
      { title: "Nakuur (PCT) pakket", why: "Voor na de eerste cycle — zonder herstel je HPTA-as soms maanden niet.", category: "nakuur", href: "/winkel/nakuur" },
    ];
  }

  if (a.goal === "cutting") {
    if (a.form === "oraal") {
      return [
        { title: "Anavar 10mg", why: "Mild, droog effect, geen aromatisatie. Geliefd voor cutting bij intermediate.", category: "pillen-tabletten", href: "/winkel/pillen-tabletten" },
        { title: "Winstrol 50mg", why: "Hardere look, vet weg, geen water-retentie. Wel lever-belastend dus max 6 weken.", category: "pillen-tabletten", href: "/winkel/pillen-tabletten" },
        { title: "Clenbuterol", why: "Beta-2 agonist voor fat loss + behoud lean. Cyclisch gebruiken (2-on/2-off).", category: "afvallen", href: "/winkel/afvallen" },
      ];
    }
    return [
      { title: "Masteron Propionate", why: "Klassieker voor cutting bij intermediate+. Droog effect, geen aromatisatie.", category: "injectie", href: "/winkel/injectie" },
      { title: "Trenbolone Acetate 100", why: "Hardcore cutting compound voor advanced. Sterke nadruk op vetverlies + spierbehoud. Pas op met bijwerkingen.", category: "injectie", href: "/winkel/injectie" },
      { title: "Kuurpakket Beginners Cutting | Utinon", why: "UT-merk pakket met test + cutting compound + PCT, compleet uitgelegd.", category: "kuurpakketten", href: "/winkel/kuurpakketten" },
    ];
  }

  if (a.goal === "mass" || a.goal === "lean-bulk") {
    if (a.experience === "beginner") {
      return [
        { title: "Testosteron Enanthate 500mg/week", why: "Solide eerste bulk. 16 weken + PCT. Test doet 80% van het werk in een bulk.", category: "injectie", href: "/winkel/injectie" },
        { title: "Kuurpakket Beginners Massa | Utinon", why: "Test + Deca + PCT, doseringen op elkaar afgestemd. UT-merk, lab-getest.", category: "kuurpakketten", href: "/winkel/kuurpakketten" },
        { title: "Dianabol kickstart", why: "Optioneel: 30mg/dag eerste 4 weken voor snelle gains terwijl test op niveau komt.", category: "pillen-tabletten", href: "/winkel/pillen-tabletten" },
      ];
    }
    return [
      { title: "Kuurpakket Advanced | Utinon", why: "Test + Deca + Dianabol + PCT, voor intermediate-advanced. UT lab-getest.", category: "kuurpakketten", href: "/winkel/kuurpakketten" },
      { title: "Sustanon 250", why: "4-ester mix voor stabielere bloedwaardes dan single-ester test bij langere cycles.", category: "injectie", href: "/winkel/injectie" },
      { title: "Boldenone Undecylenate 300", why: "EQ — langzame opbouw, droge gains, hogere RBC. Goede partner naast test in een lean bulk.", category: "injectie", href: "/winkel/injectie" },
    ];
  }

  if (a.goal === "recomp") {
    return [
      { title: "Testosteron + Masteron stack", why: "TRT-dose test + 400mg/w Mast E. Droge, harde recomp zonder veel water.", category: "injectie", href: "/winkel/injectie" },
      { title: "Kuurpakket TABS ONLY | Utinon", why: "Oraal-only protocol voor mensen die niet willen prikken. Minder anabool maar geschikt voor recomp.", category: "kuurpakketten", href: "/winkel/kuurpakketten" },
      { title: "Anavar 10mg", why: "Solide losse keuze voor recomp — strakheid + force, weinig nadeel.", category: "pillen-tabletten", href: "/winkel/pillen-tabletten" },
    ];
  }

  return [
    { title: "Volledige catalogus", why: "Geen specifieke richting? Bekijk alle producten en filter op categorie of merk.", category: "winkel", href: "/winkel" },
  ];
}

export function KeuzehulpWizard() {
  const [step, setStep] = useState(0);
  const [a, setA] = useState<Answers>({});
  const steps = 4;

  function pick<K extends keyof Answers>(key: K, value: NonNullable<Answers[K]>) {
    setA((prev) => ({ ...prev, [key]: value }));
    setStep((s) => s + 1);
  }
  function reset() {
    setA({});
    setStep(0);
  }

  if (step >= steps) {
    const suggestions = suggest(a);
    return (
      <div className="rounded-lg border border-accent/30 bg-accent-soft/15 p-6">
        <p className="text-xs uppercase tracking-wider text-accent font-semibold">Onze suggesties voor jou</p>
        <h3 className="mt-1 font-display text-2xl text-text">
          Top {suggestions.length} op basis van: {a.goal} · {a.experience} · {a.form} · {a.budget} budget
        </h3>

        <div className="mt-6 space-y-3">
          {suggestions.map((s, i) => (
            <Link
              key={i}
              href={s.href}
              className="block rounded-lg border border-border bg-background p-4 hover:border-accent transition-colors"
            >
              <div className="flex items-baseline gap-2">
                <span className="font-display text-lg text-text tabular">{i + 1}.</span>
                <h4 className="font-display text-lg text-text">{s.title}</h4>
                <span className="ml-auto text-xs uppercase tracking-wider text-accent-muted">{s.category}</span>
              </div>
              <p className="mt-1.5 text-sm text-text-muted leading-relaxed">{s.why}</p>
              <span className="mt-2 inline-flex items-center gap-1 text-sm text-accent">
                Bekijk {s.category} <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>

        <button
          onClick={reset}
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-border-strong bg-background px-5 py-2 text-sm font-medium hover:border-accent hover:text-accent"
        >
          <RotateCw size={14} /> Opnieuw beginnen
        </button>
      </div>
    );
  }

  const stepLabels = ["Doel", "Ervaring", "Voorkeur", "Budget"];
  const stepData = [GOAL_OPTIONS, EXP_OPTIONS, FORM_OPTIONS, BUDGET_OPTIONS];
  const stepKeys: (keyof Answers)[] = ["goal", "experience", "form", "budget"];
  const cur = stepData[step];
  const curKey = stepKeys[step];

  return (
    <div className="rounded-lg border border-border bg-paper-soft p-6">
      <div className="flex items-center gap-2 text-xs text-text-muted">
        {stepLabels.map((l, i) => (
          <span key={l} className="inline-flex items-center gap-2">
            <span className={`inline-flex h-5 min-w-5 items-center justify-center rounded-full text-[10px] font-semibold tabular ${
              i < step ? "bg-accent text-accent-foreground" : i === step ? "bg-text text-paper-soft" : "bg-border text-text-subtle"
            }`}>
              {i + 1}
            </span>
            <span className={i === step ? "text-text font-medium" : ""}>{l}</span>
            {i < stepLabels.length - 1 && <ChevronRight size={11} className="text-text-subtle" />}
          </span>
        ))}
      </div>

      <h3 className="mt-6 font-display text-xl text-text">Stap {step + 1}: {stepLabels[step]}</h3>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {cur.map((opt) => (
          <button
            key={opt.key}
            type="button"
            onClick={() => pick(curKey, opt.key as any)}
            className="text-left rounded-md border border-border bg-background p-4 hover:border-accent hover:shadow-card transition-all"
          >
            <p className="font-display text-base text-text">{opt.label}</p>
            <p className="mt-0.5 text-xs text-text-muted">{opt.sub}</p>
          </button>
        ))}
      </div>

      {step > 0 && (
        <button
          onClick={() => setStep(step - 1)}
          className="mt-4 text-xs text-text-muted hover:text-text"
        >
          ← Stap terug
        </button>
      )}
    </div>
  );
}
