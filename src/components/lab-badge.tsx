import { cn } from "@/lib/utils";
import { FileText, FlaskConical } from "lucide-react";

export type LabBadgeVariant = "compact" | "full";

export interface LabBadgeProps {
  labName: string;
  batchCode: string;
  testDate: string; // formatted nl-NL e.g. "14-03-2025"
  purityPct: number;
  coaUrl?: string;
  variant?: LabBadgeVariant;
  className?: string;
}

export function LabBadge({
  labName,
  batchCode,
  testDate,
  purityPct,
  coaUrl,
  variant = "compact",
  className,
}: LabBadgeProps) {
  if (variant === "compact") {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-2 rounded-sm border border-border bg-surface px-2.5 py-1 text-xs text-text-muted",
          className,
        )}
      >
        <FlaskConical size={14} className="text-accent" />
        <span className="font-medium text-text">{labName}</span>
        <span className="text-text-subtle">·</span>
        <span className="tabular">{batchCode}</span>
      </span>
    );
  }
  return (
    <div
      className={cn(
        "rounded-lg border border-primary-muted bg-primary p-5 shadow-card text-primary-foreground",
        className,
      )}
    >
      <div className="flex items-start gap-3">
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded bg-accent/15 text-accent ring-1 ring-accent/30">
          <FlaskConical size={20} />
        </span>
        <div className="flex-1">
          <h4 className="font-display text-lg text-primary-foreground leading-tight">{labName}</h4>
          <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
            <div>
              <dt className="text-primary-foreground/55 text-xs uppercase tracking-wider">Batch</dt>
              <dd className="tabular text-primary-foreground font-medium mt-0.5">{batchCode}</dd>
            </div>
            <div>
              <dt className="text-primary-foreground/55 text-xs uppercase tracking-wider">Testdatum</dt>
              <dd className="tabular text-primary-foreground font-medium mt-0.5">{testDate}</dd>
            </div>
          </dl>
          {coaUrl && (
            <a
              href={coaUrl}
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-soft"
            >
              <FileText size={14} />
              Bekijk COA (PDF)
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default LabBadge;
