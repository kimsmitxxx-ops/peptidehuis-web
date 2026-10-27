import { CalendarCheck } from "lucide-react";

/**
 * Toont wanneer een pagina voor het laatst is nagelopen.
 *
 * Bewust gevoed door een echte datum uit de data of een handmatig gezette
 * datum per pagina, niet door de build- of deploytijd. Een datum die bij elke
 * deploy op vandaag springt is geen vers-signaal maar een leugen, en zoekmachines
 * rekenen daar ook op af.
 */
export function LaatstBijgewerkt({
  datum,
  label = "Bijgewerkt op",
  className = "",
}: {
  datum: string | Date | null | undefined;
  label?: string;
  className?: string;
}) {
  if (!datum) return null;
  // Een datum zonder tijd ("2026-10-22") leest JS als middernacht UTC. Op een
  // server die achterloopt op UTC toon je dan een dag te vroeg, dus formatteren
  // we altijd expliciet in de tijdzone van de lezer, niet die van de server.
  const d = typeof datum === "string" ? new Date(datum.length === 10 ? `${datum}T12:00:00Z` : datum) : datum;
  if (Number.isNaN(d.getTime())) return null;

  return (
    <p className={`inline-flex items-center gap-1.5 text-xs text-text-subtle ${className}`}>
      <CalendarCheck size={13} className="text-accent" />
      {label}{" "}
      <time dateTime={d.toISOString().slice(0, 10)}>
        {d.toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Amsterdam" })}
      </time>
    </p>
  );
}
