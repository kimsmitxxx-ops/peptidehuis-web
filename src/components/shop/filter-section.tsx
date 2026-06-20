"use client";
import { useState, type ReactNode, type ComponentType } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FilterSectionProps {
  title: string;
  icon?: ComponentType<{ size?: number; className?: string }>;
  defaultOpen?: boolean;
  className?: string;
  children: ReactNode;
}

export function FilterSection({
  title,
  icon: Icon,
  defaultOpen = false,
  className,
  children,
}: FilterSectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div
      className={cn(
        "rounded-lg border border-primary-muted bg-primary text-primary-foreground overflow-hidden",
        className,
      )}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-2 px-4 py-3 text-left hover:bg-primary-soft/60 transition-colors"
      >
        <span className="inline-flex items-center gap-2 font-medium text-sm">
          {Icon ? <Icon size={15} className="text-accent-soft" /> : null}
          {title}
        </span>
        <ChevronDown
          size={16}
          className={cn("transition-transform text-primary-foreground/70", open && "rotate-180")}
        />
      </button>
      {open && <div className="px-4 pb-4 pt-1">{children}</div>}
    </div>
  );
}

export default FilterSection;
