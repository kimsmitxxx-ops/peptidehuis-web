"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { formatEUR } from "./lib/format";

export interface VariantOption {
  value: string;
  label: string;
  priceDelta?: number;
  disabled?: boolean;
}

export type VariantSelectorVariant = "buttons" | "dropdown";

export interface VariantSelectorProps {
  options: VariantOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  variant?: VariantSelectorVariant;
  label?: string;
  className?: string;
}

function deltaText(delta?: number) {
  if (delta == null || delta === 0) return null;
  const sign = delta > 0 ? "+" : "−";
  return `${sign}${formatEUR(Math.abs(delta))}`;
}

export function VariantSelector({
  options,
  value,
  defaultValue,
  onChange,
  variant = "buttons",
  label,
  className,
}: VariantSelectorProps) {
  const [internal, setInternal] = useState(defaultValue ?? options[0]?.value);
  const current = value ?? internal;
  const set = (v: string) => {
    if (value == null) setInternal(v);
    onChange?.(v);
  };

  if (variant === "dropdown") {
    return (
      <label className={cn("block", className)}>
        {label && <span className="block text-sm font-medium text-text mb-1.5">{label}</span>}
        <div className="relative">
          <select
            value={current}
            onChange={(e) => set(e.target.value)}
            className="appearance-none w-full h-11 pl-3 pr-9 rounded border border-border bg-surface text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            {options.map((o) => (
              <option key={o.value} value={o.value} disabled={o.disabled}>
                {o.label}
                {o.priceDelta ? `  (${deltaText(o.priceDelta)})` : ""}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-muted"
          />
        </div>
      </label>
    );
  }

  return (
    <div className={className}>
      {label && <span className="block text-sm font-medium text-text mb-2">{label}</span>}
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const active = o.value === current;
          return (
            <button
              key={o.value}
              type="button"
              onClick={() => set(o.value)}
              disabled={o.disabled}
              className={cn(
                "inline-flex items-center gap-2 rounded border px-3.5 h-10 text-sm transition-colors",
                "disabled:opacity-40 disabled:cursor-not-allowed",
                active
                  ? "border-accent bg-primary-soft text-primary-foreground"
                  : "border-border bg-surface text-text hover:border-border-strong",
              )}
            >
              <span>{o.label}</span>
              {o.priceDelta != null && o.priceDelta !== 0 && (
                <span className={cn("tabular text-xs", active ? "text-accent-soft" : "text-text-muted")}>
                  {deltaText(o.priceDelta)}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default VariantSelector;
