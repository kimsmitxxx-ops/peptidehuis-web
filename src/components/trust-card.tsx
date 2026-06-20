import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export type TrustCardVariant = "large" | "inline";

export interface TrustCardProps {
  icon: LucideIcon;
  heading: string;
  sub?: string;
  variant?: TrustCardVariant;
  className?: string;
}

export function TrustCard({
  icon: Icon,
  heading,
  sub,
  variant = "large",
  className,
}: TrustCardProps) {
  if (variant === "inline") {
    return (
      <div
        className={cn(
          "flex items-start gap-3 rounded border border-border bg-surface p-3",
          className,
        )}
      >
        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded bg-primary-soft text-accent">
          <Icon size={18} />
        </span>
        <div>
          <h4 className="text-sm font-medium text-text">{heading}</h4>
          {sub && <p className="text-xs text-text-muted mt-0.5">{sub}</p>}
        </div>
      </div>
    );
  }
  return (
    <div
      className={cn(
        "flex flex-col items-start gap-3 rounded-lg border border-primary-muted bg-primary p-6 shadow-card text-primary-foreground",
        className,
      )}
    >
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 text-accent ring-1 ring-accent/30">
        <Icon size={22} />
      </span>
      <div>
        <h4 className="font-display text-lg text-primary-foreground leading-tight">{heading}</h4>
        {sub && <p className="mt-1 text-sm text-primary-foreground/70 leading-relaxed">{sub}</p>}
      </div>
    </div>
  );
}

export default TrustCard;
