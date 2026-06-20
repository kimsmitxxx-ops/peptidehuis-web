import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export type TagVariant = "outline" | "filled";

export interface TagProps {
  variant?: TagVariant;
  children: ReactNode;
  className?: string;
}

export function Tag({ variant = "outline", children, className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em]",
        variant === "outline"
          ? "border border-accent/40 text-accent bg-accent/10"
          : "bg-accent text-accent-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}

export default Tag;
