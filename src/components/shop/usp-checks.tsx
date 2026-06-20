import { CheckCircle2 } from "lucide-react";
import { FilterSection } from "./filter-section";

const USPS = [
  "HPLC-getest per batch (COA)",
  "Volledige terugbetaling bij mismatch",
  "Discreet, neutraal verpakt",
  "Verzonden binnen 24 uur",
  "Versleutelde betaling",
];

export function UspChecks({ defaultOpen = false }: { defaultOpen?: boolean }) {
  return (
    <FilterSection title="Onze garantie" defaultOpen={defaultOpen}>
      <ul className="space-y-2 text-sm">
        {USPS.map((u) => (
          <li key={u} className="flex items-start gap-2">
            <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-accent-soft" />
            <span className="text-primary-foreground/85">{u}</span>
          </li>
        ))}
      </ul>
    </FilterSection>
  );
}

export default UspChecks;
