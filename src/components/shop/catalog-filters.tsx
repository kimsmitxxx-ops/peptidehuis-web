"use client";
import { useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";
import { Check, Tag as TagIcon, Beaker } from "lucide-react";
import { brandLabel } from "@/lib/brands";

// Bekende peptiden voor de stof-filter chips. Slug = filter-value (matched
// case-insensitive tegen product.name in de winkel-pagina).
const STOF_FILTERS: { slug: string; label: string }[] = [
  { slug: "bpc-157", label: "BPC-157" },
  { slug: "tb-500", label: "TB-500" },
  { slug: "retatrutide", label: "Retatrutide" },
  { slug: "tirzepatide", label: "Tirzepatide" },
  { slug: "semaglutide", label: "Semaglutide" },
  { slug: "cjc-1295", label: "CJC-1295" },
  { slug: "ipamorelin", label: "Ipamorelin" },
  { slug: "tesamorelin", label: "Tesamorelin" },
  { slug: "ghk-cu", label: "GHK-Cu" },
  { slug: "melanotan", label: "Melanotan" },
  { slug: "selank", label: "Selank" },
  { slug: "semax", label: "Semax" },
  { slug: "nad", label: "NAD+" },
  { slug: "epithalon", label: "Epithalon" },
];

interface Props {
  brands: string[];
  stockOnly: boolean;
  activeBrand: string;
  activeStof?: string;
}

export function CatalogFilters({ brands, stockOnly, activeBrand, activeStof = "" }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const setParam = useCallback(
    (key: string, value: string | null) => {
      if (typeof window === "undefined") return;
      const p = new URLSearchParams(window.location.search);
      if (value === null || value === "") p.delete(key);
      else p.set(key, value);
      const qs = p.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [router, pathname],
  );

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-border bg-surface p-4">
        <h4 className="text-xs uppercase tracking-wider text-accent-muted font-semibold mb-3">
          Beschikbaarheid
        </h4>
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <button
            type="button"
            onClick={() => setParam("stock", stockOnly ? null : "1")}
            aria-pressed={stockOnly}
            className={`relative h-4 w-4 rounded border ${
              stockOnly ? "border-accent bg-accent" : "border-border-strong bg-background"
            }`}
          >
            {stockOnly && <Check size={12} strokeWidth={3} className="absolute inset-0 m-auto text-accent-foreground" />}
          </button>
          <span>Alleen op voorraad</span>
        </label>
      </div>

      {brands.length > 0 && (
        <div className="rounded-lg border border-border bg-surface p-4">
          <h4 className="text-xs uppercase tracking-wider text-accent-muted font-semibold mb-3 inline-flex items-center gap-1.5">
            <TagIcon size={12} /> Merk
          </h4>
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => setParam("merk", null)}
              className={`rounded-full px-3 py-1 text-xs font-medium border ${
                !activeBrand
                  ? "bg-accent text-accent-foreground border-accent"
                  : "bg-background text-text border-border hover:border-accent hover:text-accent"
              }`}
            >
              Alle
            </button>
            {brands.map((b) => (
              <button
                key={b}
                type="button"
                onClick={() => setParam("merk", b === activeBrand ? null : b)}
                className={`rounded-full px-3 py-1 text-xs font-medium border ${
                  activeBrand === b
                    ? "bg-accent text-accent-foreground border-accent"
                    : "bg-background text-text border-border hover:border-accent hover:text-accent"
                }`}
                title={b}
              >
                {brandLabel(b)}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Stof-filter - geen aparte pagina, alleen ?stof=... query-param */}
      <div className="rounded-lg border border-border bg-surface p-4">
        <h4 className="text-xs uppercase tracking-wider text-accent-muted font-semibold mb-3 inline-flex items-center gap-1.5">
          <Beaker size={12} /> Stof
        </h4>
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setParam("stof", null)}
            className={`rounded-full px-3 py-1 text-xs font-medium border ${
              !activeStof
                ? "bg-accent text-accent-foreground border-accent"
                : "bg-background text-text border-border hover:border-accent hover:text-accent"
            }`}
          >
            Alle
          </button>
          {STOF_FILTERS.map((s) => (
            <button
              key={s.slug}
              type="button"
              onClick={() => setParam("stof", s.slug === activeStof ? null : s.slug)}
              className={`rounded-full px-3 py-1 text-xs font-medium border ${
                activeStof === s.slug
                  ? "bg-accent text-accent-foreground border-accent"
                  : "bg-background text-text border-border hover:border-accent hover:text-accent"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
