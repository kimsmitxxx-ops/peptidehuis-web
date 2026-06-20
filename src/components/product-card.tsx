import { cn } from "@/lib/utils";
import { PriceTag } from "./price-tag";
import { Stars } from "./stars";
import { Badge } from "./badge";
import { Tag } from "./tag";
import { ShoppingCart, Plus, Check } from "lucide-react";
import type { MouseEvent } from "react";

export type ProductCardSize = "sm" | "md" | "lg";

export interface ProductCardProps {
  image: string;
  name: string;
  slug: string;
  priceFrom: number;
  ratingValue?: number;
  ratingCount?: number;
  inStock?: boolean;
  tag?: string;
  category?: string;
  shortDescription?: string;
  size?: ProductCardSize;
  className?: string;
  onAddToCart?: (slug: string) => void;
}

function toFeatures(text?: string): string[] {
  if (!text) return [];
  return text
    .split(/(?:\.\s+|,\s+)/)
    .map((s) => s.trim().replace(/\.$/, ""))
    .filter((s) => s.length > 4)
    .slice(0, 3);
}

export function ProductCard({
  image,
  name,
  slug,
  priceFrom,
  ratingValue,
  ratingCount,
  inStock = true,
  tag,
  category,
  shortDescription,
  size = "md",
  className,
  onAddToCart,
}: ProductCardProps) {
  const isSm = size === "sm";
  const features = toFeatures(shortDescription);

  function handleAdd(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart?.(slug);
  }

  return (
    <article
      data-slug={slug}
      className={cn(
        "group h-full bg-surface rounded-lg border border-border overflow-hidden transition-shadow flex flex-col",
        size !== "sm" && "shadow-card hover:shadow-lift",
        className,
      )}
    >
      <div className="relative aspect-[4/3] bg-muted overflow-hidden shrink-0">
        <img src={image} alt={name} className="w-full h-full object-cover transition-transform group-hover:scale-[1.02]" />
        {category && (
          <span className="absolute top-3 left-3 inline-flex items-center rounded-sm bg-primary/90 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-primary-foreground backdrop-blur-sm">
            {category}
          </span>
        )}
        {tag && (
          <div className="absolute top-3 right-3">
            <Tag variant="filled">{tag}</Tag>
          </div>
        )}
        {!inStock && (
          <div className="absolute bottom-3 right-3">
            <Badge variant="danger">Uitverkocht</Badge>
          </div>
        )}
      </div>
      <div className={cn("p-4 flex-1 flex flex-col gap-2", isSm && "p-3 gap-1.5")}>
        <h3 className={cn(
          "font-display font-medium text-text leading-tight line-clamp-2 min-h-[2.6em]",
          isSm ? "text-base" : "text-base md:text-lg",
        )}>
          {name}
        </h3>
        {!isSm && (
          <div className="min-h-[1.25rem]">
            {ratingValue != null && <Stars value={ratingValue} size="sm" count={ratingCount} />}
          </div>
        )}
        {!isSm && (
          <ul className="mt-1 space-y-1 min-h-[4.5rem]">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-[13px] text-text leading-snug line-clamp-1">
                <Check size={14} strokeWidth={3} className="mt-0.5 shrink-0 text-accent-muted" />
                <span className="truncate">{f}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto pt-3 flex items-center justify-between gap-2">
          <PriceTag variant={isSm ? "single" : "from"} price={priceFrom} priceFrom={priceFrom} className="text-base md:text-lg" />
          {!isSm && (
            <button
              type="button"
              aria-label={inStock ? `Voeg ${name} toe aan winkelmand` : "Op de wachtlijst"}
              disabled={!inStock}
              onClick={handleAdd}
              className="inline-flex h-9 md:h-11 w-9 md:w-auto items-center justify-center md:gap-1.5 rounded-md bg-accent md:px-3 text-accent-foreground shadow-card transition-all hover:bg-accent-muted hover:shadow-lift active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
            >
              <Plus size={16} strokeWidth={3} className="hidden md:inline" />
              <ShoppingCart size={16} strokeWidth={2.25} />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
