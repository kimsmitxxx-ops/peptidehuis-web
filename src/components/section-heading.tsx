import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type SectionHeadingVariant = "display" | "default" | "eyebrow-plus-display";

export interface SectionHeadingProps {
  variant?: SectionHeadingVariant;
  eyebrow?: string;
  children: ReactNode;
  ctaLabel?: string;
  ctaHref?: string;
  className?: string;
}

export function SectionHeading({
  variant = "default",
  eyebrow,
  children,
  ctaLabel,
  ctaHref,
  className,
}: SectionHeadingProps) {
  const Heading =
    variant === "default" ? (
      <h2 className="font-sans text-2xl md:text-3xl font-semibold text-text tracking-tight">
        {children}
      </h2>
    ) : (
      <h2 className="font-display text-3xl md:text-4xl font-medium text-text leading-tight">
        {children}
      </h2>
    );

  return (
    <div className={cn("flex items-end justify-between gap-6", className)}>
      <div>
        {variant === "eyebrow-plus-display" && eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent mb-2">
            {eyebrow}
          </p>
        )}
        {Heading}
      </div>
      {ctaLabel && ctaHref && (
        <a
          href={ctaHref}
          className="shrink-0 text-sm font-medium text-accent hover:text-accent-muted whitespace-nowrap"
        >
          {ctaLabel} →
        </a>
      )}
    </div>
  );
}

export default SectionHeading;
