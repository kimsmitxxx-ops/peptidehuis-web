/**
 * Glossary hover-tooltip helper.
 *
 * Neemt een HTML-string en wrapt de eerste voorkomen van elke bekende term
 * in een <abbr title="korte definitie"> tag. De browser toont dan zijn
 * native tooltip on hover - geen JS-client-component nodig. globals.css
 * styled `abbr[title]` als een dotted-underlined klikbare hint.
 *
 * Wordt gebruikt in blog- en kennis-body's die via dangerouslySetInnerHTML
 * gerenderd worden. Alleen buiten <a>, <h*>, <code> en al bestaande <abbr>
 * tags wrappen zodat we geen dubbele decoratie of nested links krijgen.
 */

type GlossaryEntry = { term: string; short: string; slug: string };

// Volgorde matters - langste eerst zodat "GLP-1" niet als "GLP" gematcht wordt.
export const GLOSSARY: GlossaryEntry[] = [
  { slug: "peptide", term: "peptide", short: "Korte keten van aminozuren die als signaalstof werkt" },
  { slug: "aminozuur", term: "aminozuur", short: "Bouwsteen van peptiden en eiwitten" },
  { slug: "reconstitutie", term: "reconstitutie", short: "Gevriesdroogd peptide-poeder oplossen in BAC-water" },
  { slug: "reconstitutie", term: "reconstitueren", short: "Gevriesdroogd peptide-poeder oplossen in BAC-water" },
  { slug: "bac-water", term: "BAC-water", short: "Bacteriostatisch water (0,9% benzylalcohol) - standaard oplosvloeistof" },
  { slug: "bac-water", term: "bacteriostatisch water", short: "Steriel water met 0,9% benzylalcohol tegen bacteriegroei" },
  { slug: "lyofilisatie", term: "gelyofiliseerd", short: "Gevriesdroogd - stabiel poeder tot aan reconstitutie" },
  { slug: "lyofilisatie", term: "gevriesdroogd", short: "Gelyofiliseerd - stabiel poeder tot aan reconstitutie" },
  { slug: "hplc", term: "HPLC", short: "High-Performance Liquid Chromatography - zuiverheids-analyse" },
  { slug: "zuiverheid", term: "zuiverheid", short: "HPLC-percentage werkzame stof, norm >=98-99%" },
  { slug: "coa", term: "COA", short: "Certificate of Analysis - batch-labrapport" },
  { slug: "batchcode", term: "batchcode", short: "Unieke code per productie-batch, verwijst naar lab-rapport" },
  { slug: "janoshik", term: "Janoshik", short: "Tsjechisch lab voor HPLC-analyse van peptiden" },
  { slug: "half-life", term: "half-life", short: "Tijd tot 50% van dosis is afgebroken" },
  { slug: "half-life", term: "halfwaardetijd", short: "Tijd tot 50% van dosis is afgebroken" },
  { slug: "subcutaan", term: "subcutaan", short: "Toediening in de onderhuidse vetlaag - standaard bij peptide-onderzoek" },
  { slug: "u100", term: "U100", short: "Insulinespuit-schaal: 100 units per ml, 1 unit = 0,01 ml" },
  { slug: "u100", term: "insulinespuit", short: "U100-spuit: 100 units per ml, voor kleine volumes" },
  { slug: "mgmcg", term: "mcg", short: "Microgram - 1 mg = 1000 mcg" },
  { slug: "receptor-agonist", term: "agonist", short: "Stof die een receptor bindt en activeert" },
  { slug: "glp1", term: "GLP-1-receptoragonist", short: "Incretine-nabootser: verzadiging + glucoseregulatie" },
  { slug: "glp1", term: "GLP-1", short: "Incretine-hormoon: verzadiging + glucoseregulatie" },
  { slug: "gip", term: "GIP", short: "Tweede incretine-hormoon, gecombineerd met GLP-1 in Tirzepatide" },
  { slug: "incretine", term: "incretine", short: "Darmhormoon dat insuline-afgifte en verzadiging stuurt" },
  { slug: "ghrh", term: "GHRH", short: "Growth Hormone Releasing Hormone - zet hypofyse aan tot GH-afgifte" },
  { slug: "ghs", term: "GH-secretagoog", short: "Stimuleert GH-afgifte via de ghreline-receptor (bv. Ipamorelin)" },
  { slug: "ghs", term: "GHRP", short: "GH-releasing peptide - werkt via de ghreline-receptor" },
  { slug: "ghs", term: "ghreline-receptor", short: "Receptor waarlangs GH-secretagogen een GH-puls losmaken" },
  { slug: "igf1", term: "IGF-1", short: "Groeifactor, biomarker voor stimulatie van de GH-as" },
  { slug: "nootropic", term: "nootropisch", short: "Onderzocht voor cognitie/stemming (Selank, Semax, DSIP)" },
  { slug: "mitopeptide", term: "mitochondriaal peptide", short: "In mitochondriaal DNA gecodeerd peptide (MOTS-c, Humanin)" },
  { slug: "tfa", term: "TFA", short: "Trifluorazijnzuur-restant uit de synthese - hoort in het COA te staan" },
  { slug: "protocol", term: "protocol", short: "Vast schema van dosering, frequentie en duur in onderzoek" },
  { slug: "stack", term: "stack", short: "Combinatie van peptiden in een protocol (bv. CJC-1295 + Ipamorelin)" },
  { slug: "onderzoekspeptide", term: "onderzoekspeptide", short: "Research-only: niet voor menselijke consumptie" },
];

// Zorg dat langste term eerst gematcht wordt.
const SORTED = [...GLOSSARY].sort((a, b) => b.term.length - a.term.length);

const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const escapeAttr = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

/**
 * Wrapt de eerste voorkomen van elke bekende term in <abbr title="...">.
 * Skipt content binnen <a>, <h1-6>, <code>, <abbr>, en attribuut-waardes.
 * Werkt op HTML-string voordat je 'm door dangerouslySetInnerHTML rendert.
 */
export function highlightGlossary(html: string): string {
  if (!html) return html;

  // Splits op tags - alleen tekst-nodes bewerken zodat we geen attrs breken.
  const parts = html.split(/(<[^>]+>)/g);

  const wrapped = new Set<string>();
  // Skip-stack: welke omhullende tags mogen niet gematcht worden
  const skipTags = new Set(["a", "abbr", "h1", "h2", "h3", "h4", "h5", "h6", "code", "pre"]);
  const openStack: string[] = [];

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (!part) continue;

    if (part.startsWith("<")) {
      // Tag - update stack
      const closing = part.startsWith("</");
      const tagMatch = part.match(/^<\/?([a-zA-Z][a-zA-Z0-9]*)/);
      if (tagMatch) {
        const tag = tagMatch[1].toLowerCase();
        if (skipTags.has(tag)) {
          if (closing) {
            const idx = openStack.lastIndexOf(tag);
            if (idx !== -1) openStack.splice(idx, 1);
          } else if (!part.endsWith("/>")) {
            openStack.push(tag);
          }
        }
      }
      continue;
    }

    // Tekst-node - skip als we in een skip-tag zitten
    if (openStack.length > 0) continue;

    let text = part;
    for (const entry of SORTED) {
      if (wrapped.has(entry.slug)) continue;
      const rx = new RegExp(`(^|[^a-zA-Z0-9À-ÿ])(${escapeRegex(entry.term)})(?=[^a-zA-Z0-9À-ÿ]|$)`, "i");
      const m = rx.exec(text);
      if (!m) continue;
      const before = m[1];
      const matched = m[2];
      const start = m.index + before.length;
      const end = start + matched.length;
      text =
        text.slice(0, start) +
        `<abbr title="${escapeAttr(entry.short)}">${matched}</abbr>` +
        text.slice(end);
      wrapped.add(entry.slug);
    }
    parts[i] = text;
  }

  return parts.join("");
}
