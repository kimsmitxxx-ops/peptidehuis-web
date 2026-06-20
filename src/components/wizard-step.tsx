"use client";
import { useState, type ReactNode } from "react";
import { Check, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface WizardTile {
  value: string;
  label: string;
  sub?: string;
  icon?: LucideIcon;
}

export interface WizardStepProps {
  step: number;
  totalSteps: number;
  question: string;
  description?: ReactNode;
  tiles: WizardTile[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export function WizardStep({
  step,
  totalSteps,
  question,
  description,
  tiles,
  value,
  onChange,
  className,
}: WizardStepProps) {
  const [internal, setInternal] = useState<string | undefined>(value);
  const current = value ?? internal;
  const set = (v: string) => {
    if (value == null) setInternal(v);
    onChange?.(v);
  };
  const pct = Math.round((step / totalSteps) * 100);

  return (
    <div className={cn("mx-auto max-w-3xl rounded-lg border border-border bg-surface p-6 md:p-10 shadow-card", className)}>
      <div className="flex items-center justify-between text-xs text-text-muted">
        <span className="font-medium tabular">Stap {step} van {totalSteps}</span>
        <span className="tabular text-text-subtle">{pct}%</span>
      </div>
      <div className="mt-2 h-1 w-full rounded-full bg-muted overflow-hidden">
        <div className="h-full bg-accent transition-all duration-500" style={{ width: `${pct}%` }} />
      </div>

      <h2 className="mt-8 font-display text-2xl md:text-3xl text-text leading-tight">{question}</h2>
      {description && <p className="mt-2 text-sm text-text-muted">{description}</p>}

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {tiles.map((t) => {
          const active = t.value === current;
          const Icon = t.icon;
          return (
            <button
              key={t.value}
              type="button"
              onClick={() => set(t.value)}
              className={cn(
                "relative text-left rounded border p-4 transition-colors",
                active
                  ? "border-accent bg-primary-soft text-primary-foreground"
                  : "border-border bg-surface hover:border-border-strong",
              )}
            >
              {Icon && (
                <Icon
                  size={20}
                  className={cn("mb-2", active ? "text-accent-soft" : "text-accent")}
                />
              )}
              <div className={cn("font-medium", active ? "text-primary-foreground" : "text-text")}>
                {t.label}
              </div>
              {t.sub && (
                <div className={cn("mt-1 text-xs", active ? "text-primary-foreground/80" : "text-text-muted")}>
                  {t.sub}
                </div>
              )}
              {active && (
                <span className="absolute top-3 right-3 inline-flex h-5 w-5 items-center justify-center rounded-full bg-accent text-accent-foreground">
                  <Check size={12} strokeWidth={3} />
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default WizardStep;
