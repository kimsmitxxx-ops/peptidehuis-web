"use client";
import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FaqItem {
  question: string;
  answer: string | ReactNode;
}

export interface FaqAccordionProps {
  items: FaqItem[];
  allowMultipleOpen?: boolean;
  tone?: "dark" | "light" | "on-dark";
  className?: string;
}

export function FaqAccordion({
  items,
  allowMultipleOpen = false,
  tone = "dark",
  className,
}: FaqAccordionProps) {
  const [open, setOpen] = useState<Set<number>>(new Set());

  const toggle = (i: number) => {
    setOpen((prev) => {
      const next = new Set(allowMultipleOpen ? prev : []);
      if (prev.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  const isLight = tone === "light";
  const isOnDark = tone === "on-dark";
  const dividerCls = isLight
    ? "divide-paper-border border-paper-border"
    : isOnDark
      ? "divide-primary-muted border-primary-muted"
      : "divide-border border-border";
  const qCls = isLight ? "text-paper-ink" : isOnDark ? "text-primary-foreground" : "text-text";
  const chevCls = isLight ? "text-paper-ink-muted" : isOnDark ? "text-primary-foreground/70" : "text-text-muted";
  const aCls = isLight ? "text-paper-ink-muted" : isOnDark ? "text-primary-foreground/85" : "text-text-muted";

  return (
    <div className={cn("divide-y border-t border-b", dividerCls, className)}>
      {items.map((item, i) => {
        const isOpen = open.has(i);
        return (
          <div key={i}>
            <button
              type="button"
              onClick={() => toggle(i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 py-4 text-left"
            >
              <span className={cn("font-medium", qCls)}>{item.question}</span>
              <ChevronDown
                size={18}
                className={cn(
                  "shrink-0 transition-transform duration-300",
                  chevCls,
                  isOpen && "rotate-180",
                )}
              />
            </button>
            <div
              className={cn(
                "grid transition-all duration-300 ease-out",
                isOpen ? "grid-rows-[1fr] opacity-100 pb-4" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className={cn("overflow-hidden text-sm leading-relaxed", aCls)}>
                {item.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default FaqAccordion;
