"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Search, ArrowRight, X } from "lucide-react";

export interface MobileSearchSheetProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}

const POPULAR = ["BPC-157", "Retatrutide", "Semaglutide", "Ipamorelin", "GHK-Cu", "Melanotan"];

export function MobileSearchSheet({ open, onOpenChange }: MobileSearchSheetProps) {
  const [q, setQ] = useState("");
  const router = useRouter();

  const go = (term: string) => {
    const t = term.trim();
    if (!t) return;
    onOpenChange(false);
    router.push(`/winkel?q=${encodeURIComponent(t)}`);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="top"
        className="w-full sm:max-w-none h-[45vh] p-0 bg-background flex flex-col rounded-b-2xl"
      >
        <header className="px-4 pt-3 pb-3 pr-12 border-b border-border flex items-center gap-2">
          <SheetTitle className="sr-only">Zoek producten</SheetTitle>
          <form
            className="relative flex-1"
            onSubmit={(e) => {
              e.preventDefault();
              go(q);
            }}
          >
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-accent-muted" />
            <input
              autoFocus
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Zoek producten - bv. BPC-157, semaglutide"
              className="w-full h-11 pl-10 pr-9 rounded-md border border-accent/40 bg-success-soft text-sm font-medium text-primary placeholder:text-primary/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            />
            {q && (
              <button
                type="button"
                onClick={() => setQ("")}
                aria-label="Wis zoekopdracht"
                className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-6 w-6 items-center justify-center rounded-full text-primary/70 hover:bg-primary/10"
              >
                <X size={14} />
              </button>
            )}
          </form>
        </header>

        <div className="flex-1 overflow-y-auto px-4 py-3">
          <p className="text-xs uppercase tracking-wider text-text-muted mb-2">Populair</p>
          <div className="flex flex-wrap gap-2">
            {POPULAR.map((t) => (
              <button
                key={t}
                onClick={() => go(t)}
                className="px-3 h-8 rounded-full border border-border bg-surface text-sm text-text hover:border-accent"
              >
                {t}
              </button>
            ))}
          </div>
          {q.trim() && (
            <button
              onClick={() => go(q)}
              className="mt-5 inline-flex items-center gap-2 rounded-md bg-accent px-4 h-10 text-sm font-medium text-accent-foreground hover:bg-accent-muted"
            >
              Zoek naar "{q.trim()}" <ArrowRight size={14} />
            </button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default MobileSearchSheet;
