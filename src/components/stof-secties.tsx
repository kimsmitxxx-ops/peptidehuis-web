import Link from "next/link";
import { BookOpen, ExternalLink } from "lucide-react";
import { LaatstBijgewerkt } from "./laatst-bijgewerkt";
import type { Stof } from "@/lib/stoffen/types";

/**
 * De inhoud die eerst op /peptiden/<stof> stond, nu onder het product zelf.
 *
 * Reden voor de samenvoeging: we hadden per stof twee pagina's die om dezelfde
 * zoekterm vochten, de productpagina en de gids. Een bezoeker die "bpc-157"
 * zoekt wil allebei: wat het is en of hij het kan krijgen. Dat hoort op een
 * adres te staan, niet verdeeld over twee.
 */
export function StofSecties({ stof }: { stof: Stof }) {
  const blokken: { kop: string; html: string | undefined }[] = [
    { kop: `Wat is ${stof.name}?`, html: stof.watIs },
    { kop: "Hoe het werkt", html: stof.werking },
    { kop: "Wat het onderzoek laat zien", html: stof.onderzoek },
    { kop: "Hoe het in onderzoek wordt gebruikt", html: stof.protocol },
  ].filter((b) => !!b.html);

  if (!blokken.length) return null;

  return (
    <section className="mt-14 max-w-3xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="inline-flex items-center gap-2 font-display text-2xl text-text">
          <BookOpen size={18} className="text-accent" /> Achtergrond bij {stof.name}
        </h2>
        <LaatstBijgewerkt datum={stof.bijgewerkt} />
      </div>

      {stof.aka && stof.aka.length > 0 && (
        <p className="mt-2 text-sm text-text-muted">
          Ook bekend als: {stof.aka.join(", ")}.
        </p>
      )}

      <div className="mt-6 space-y-7">
        {blokken.map((b) => (
          <div key={b.kop}>
            <h3 className="font-display text-lg text-text">{b.kop}</h3>
            <div
              className="prose-peptide mt-2 text-sm leading-relaxed text-text-muted [&_a]:text-accent [&_a]:underline"
              dangerouslySetInnerHTML={{ __html: b.html as string }}
            />
          </div>
        ))}
      </div>

      {stof.bronnen && stof.bronnen.length > 0 && (
        <div className="mt-8 rounded-lg border border-border bg-surface p-4">
          <h3 className="text-sm font-semibold text-text">Bronnen</h3>
          <ul className="mt-2 space-y-1.5">
            {stof.bronnen.map((b) => (
              <li key={b.url}>
                <a
                  href={b.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-start gap-1.5 text-sm text-accent hover:underline"
                >
                  <ExternalLink size={13} className="mt-0.5 shrink-0" />
                  {b.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="mt-6 text-sm text-text-muted">
        Vergelijken met een andere stof? Bekijk de{" "}
        <Link href="/peptiden" className="font-medium text-accent hover:underline">
          peptiden van A tot Z
        </Link>
        .
      </p>
    </section>
  );
}
