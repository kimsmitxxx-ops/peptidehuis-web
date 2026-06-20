import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Kruimelpad" className={cn("text-sm", className)}>
      <ol
        itemScope
        itemType="https://schema.org/BreadcrumbList"
        className="flex flex-wrap items-center gap-1.5 text-text-muted"
      >
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li
              key={`${item.label}-${i}`}
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
              className="inline-flex items-center gap-1.5"
            >
              {item.href && !last ? (
                <a
                  href={item.href}
                  itemProp="item"
                  className="hover:text-primary transition-colors"
                >
                  <span itemProp="name">{item.label}</span>
                </a>
              ) : (
                <span itemProp="name" className={last ? "text-text font-medium" : ""}>
                  {item.label}
                </span>
              )}
              <meta itemProp="position" content={String(i + 1)} />
              {!last && <ChevronRight size={14} className="text-text-subtle" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumb;
