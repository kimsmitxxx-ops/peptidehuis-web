"use client";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TocItem {
  id: string;
  label: string;
}

export interface StickyTocProps {
  items: TocItem[];
  title?: string;
  className?: string;
}

export function StickyToc({ items, title = "Op deze pagina", className }: StickyTocProps) {
  const [active, setActive] = useState(items[0]?.id);
  const [openMobile, setOpenMobile] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    items.forEach((i) => {
      const el = document.getElementById(i.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [items]);

  return (
    <>
      {/* Desktop */}
      <nav className={cn("hidden lg:block sticky top-6 self-start text-sm", className)} aria-label={title}>
        <p className="text-xs font-semibold uppercase tracking-wider text-text-subtle mb-3">{title}</p>
        <ul className="space-y-1.5 border-l border-border">
          {items.map((i) => (
            <li key={i.id}>
              <a
                href={`#${i.id}`}
                className={cn(
                  "block pl-3 -ml-px border-l border-transparent transition-colors",
                  active === i.id
                    ? "text-primary font-medium border-accent"
                    : "text-text-muted hover:text-text",
                )}
              >
                {i.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile */}
      <div className={cn("lg:hidden", className)}>
        <button
          type="button"
          onClick={() => setOpenMobile((v) => !v)}
          className="flex w-full items-center justify-between rounded border border-border bg-surface px-4 h-11 text-sm"
        >
          <span className="font-medium text-text">{title}</span>
          <ChevronDown size={16} className={cn("transition-transform", openMobile && "rotate-180")} />
        </button>
        {openMobile && (
          <ul className="mt-2 space-y-1 rounded border border-border bg-surface p-2">
            {items.map((i) => (
              <li key={i.id}>
                <a
                  href={`#${i.id}`}
                  onClick={() => setOpenMobile(false)}
                  className={cn(
                    "block rounded px-3 py-2 text-sm",
                    active === i.id ? "bg-muted text-primary font-medium" : "text-text-muted",
                  )}
                >
                  {i.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default StickyToc;
