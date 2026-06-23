"use client";
import { useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";
import { Check, Tag as TagIcon } from "lucide-react";

interface Props {
  brands: string[];
  stockOnly: boolean;
  activeBrand: string;
}

export const KNOWN_BRANDS = new Set([
  "LYY", "AP", "PR", "UT",
  "Pharmacom", "Magnus", "Driada Medical", "ZPHC", "Euro Pharmacies",
]);

export function CatalogFilters({ brands, stockOnly, activeBrand }: Props) {
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
              >
                {b}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
