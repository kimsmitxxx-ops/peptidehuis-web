import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen } from "lucide-react";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Begrippenlijst peptiden - HPLC, COA, reconstitutie, GLP-1, halfwaardetijd",
  description:
    "Uitleg van de begrippen die je tegenkomt op peptidehuis.nl en in de kennisbank: reconstitutie, BAC-water, HPLC, COA, GLP-1, GHRH, halfwaardetijd, subcutaan en meer. Voor onderzoekers en biohackers.",
  alternates: { canonical: "/begrippenlijst" },
};

type Term = {
  id: string;
  term: string;
  short: string;
  body: string;
  related?: string[];
  link?: string;
};

const TERMS: Term[] = [
  {
    id: "peptide",
    term: "Peptide",
    short: "Korte keten van aminozuren",
    body: "Een molecuul opgebouwd uit een keten aminozuren, korter dan een eiwit (grofweg tot ~50 aminozuren). Peptiden werken als signaalstoffen: ze binden aan een specifieke receptor en zetten daar een proces in gang, zoals GH-afgifte (Ipamorelin), verzadiging (Semaglutide) of weefselherstel (BPC-157). Omdat ze uit aminozuren bestaan worden ze in het maag-darmkanaal afgebroken; daarom worden ze in onderzoek vrijwel altijd subcutaan toegediend.",
    related: ["aminozuur", "subcutaan", "receptor-agonist"],
  },
  {
    id: "aminozuur",
    term: "Aminozuur",
    short: "Bouwsteen van peptiden en eiwitten",
    body: "De chemische bouwsteen waaruit peptiden en eiwitten zijn opgebouwd. De volgorde (sequentie) van aminozuren bepaalt de identiteit en werking van een peptide. BPC-157 bestaat bijvoorbeeld uit 15 aminozuren, Semaglutide uit 31. Een HPLC-analyse controleert of de sequentie en zuiverheid kloppen met wat er op het etiket staat.",
    related: ["peptide", "hplc"],
  },
  {
    id: "reconstitutie",
    term: "Reconstitutie",
    short: "Gevriesdroogd poeder oplossen in BAC-water",
    body: "Het oplossen van gevriesdroogd (gelyofiliseerd) peptide-poeder in bacteriostatisch water vóór gebruik in onderzoek. Voorbeeld: 5 mg poeder + 2 ml BAC-water = 2,5 mg/ml. Rustig langs de wand van de vial laten lopen en zwenken, nooit schudden - de lange moleculketens zijn mechanisch kwetsbaar. Na reconstitutie gekoeld bewaren (2-8 °C) en binnen enkele weken gebruiken.",
    related: ["bac-water", "lyofilisatie", "u100"],
  },
  {
    id: "bac-water",
    term: "BAC-water",
    short: "Bacteriostatisch water met 0,9% benzylalcohol",
    body: "Steriel water met 0,9% benzylalcohol dat bacteriegroei remt. De standaard oplosvloeistof voor gereconstitueerde peptiden omdat een aangebroken vial dan meerdere weken houdbaar blijft in de koelkast. Gewoon steriel water zonder conserveermiddel is alleen geschikt voor eenmalig gebruik direct na reconstitutie.",
    related: ["reconstitutie", "lyofilisatie"],
  },
  {
    id: "lyofilisatie",
    term: "Lyofilisatie (gevriesdroogd)",
    short: "Vriesdrogen voor stabiliteit",
    body: "Proces waarbij een peptide-oplossing wordt ingevroren en het ijs onder vacuüm wordt verdampt. Het resultaat is een droog poeder (de witte 'puck' in de vial) dat bij kamertemperatuur maandenlang stabiel blijft. Vrijwel alle onderzoekspeptiden worden gevriesdroogd geleverd; pas na reconstitutie begint de houdbaarheid echt te tellen.",
    related: ["reconstitutie", "bac-water"],
  },
  {
    id: "hplc",
    term: "HPLC",
    short: "High-Performance Liquid Chromatography",
    body: "Analytische techniek om de zuiverheid en identiteit van een peptide te bepalen. De stof wordt onder druk door een kolom geperst; verschillende moleculen komen op verschillende momenten uit de kolom en worden afzonderlijk gedetecteerd. Een HPLC-rapport toont het percentage van de opgegeven werkzame stof plus eventuele verontreinigingen. De industrie-norm voor onderzoekspeptiden is ≥98-99% zuiverheid.",
    related: ["coa", "janoshik", "zuiverheid"],
  },
  {
    id: "zuiverheid",
    term: "Zuiverheid",
    short: "HPLC-percentage werkzame stof",
    body: "Het aandeel van de opgegeven werkzame stof in het poeder, gemeten met HPLC. 99% zuiverheid betekent dat 1% uit iets anders bestaat: restanten uit de synthese (zoals TFA), afgebroken sequenties of vocht. Bij onderzoek is lage zuiverheid dubbel problematisch: je doseert minder werkzame stof én introduceert onbekende variabelen.",
    related: ["hplc", "tfa", "coa"],
  },
  {
    id: "coa",
    term: "COA",
    short: "Certificate of Analysis",
    body: "Document dat de meetwaardes van een onafhankelijke labtest vermeldt: identiteit, HPLC-zuiverheid, batchnummer en analysedatum. Iedere batch bij Peptidehuis heeft een COA, opvraagbaar per batchcode via de lab-pagina. Zonder COA weet je niet wat er in de vial zit.",
    related: ["hplc", "janoshik", "batchcode"],
    link: "/lab",
  },
  {
    id: "batchcode",
    term: "Batchcode",
    short: "Unieke code per productie-batch",
    body: "Op iedere vial staat een code die verwijst naar de specifieke productie-batch en het bijbehorende lab-rapport. Zonder batchcode kun je een COA niet verifiëren. Kloppende batchcode + COA = je weet wat je hebt.",
    related: ["coa", "janoshik"],
    link: "/lab",
  },
  {
    id: "janoshik",
    term: "Janoshik Analytical",
    short: "Onafhankelijk analytisch lab",
    body: "Tsjechisch analytisch lab dat HPLC- en massaspectrometrie-analyses uitvoert op peptiden op verzoek van leveranciers en particulieren. Industrie-referentie voor batch-verificatie. Peptidehuis laat iedere batch bij Janoshik testen en maakt het rapport per batchcode beschikbaar via /lab.",
    related: ["hplc", "coa", "batchcode"],
    link: "/lab",
  },
  {
    id: "half-life",
    term: "Half-life (halfwaardetijd)",
    short: "Tijd tot 50% van de dosis is afgebroken",
    body: "De tijd waarin de concentratie van een stof in het bloed halveert. Loopt bij peptiden enorm uiteen: Ipamorelin ~2 uur, BPC-157 enkele uren, Semaglutide ~7 dagen (daarom wekelijkse dosering in klinisch onderzoek). De halfwaardetijd bepaalt de toedieningsfrequentie in een onderzoeksprotocol en hoe stabiel de spiegel blijft.",
    related: ["protocol", "glp1"],
  },
  {
    id: "subcutaan",
    term: "Subcutaan (SC)",
    short: "Toediening in de onderhuidse vetlaag",
    body: "Toediening in het onderhuidse vetweefsel, meestal rond de buik, met een korte fijne naald. De standaard toedieningsvorm voor peptiden in onderzoek: langzamere, gelijkmatige opname en eenvoudiger dan intramusculair. Peptiden oraal toedienen werkt bij de meeste sequenties niet - het maag-darmkanaal breekt ze af voordat ze opgenomen worden.",
    related: ["peptide", "u100"],
  },
  {
    id: "u100",
    term: "U100-spuit",
    short: "Insulinespuit-schaal: 100 eenheden per ml",
    body: "Insulinespuit met schaalverdeling van 100 eenheden (units) per milliliter; 1 unit = 0,01 ml. De standaard maat om kleine volumes gereconstitueerd peptide nauwkeurig af te meten. Rekenvoorbeeld: 5 mg peptide in 2 ml BAC-water = 2,5 mg/ml; 10 units (0,1 ml) bevat dan 250 mcg.",
    related: ["reconstitutie", "mgmcg"],
  },
  {
    id: "mgmcg",
    term: "Mg vs mcg",
    short: "1 milligram = 1000 microgram",
    body: "Vials worden gelabeld in milligram (5 mg, 10 mg), maar onderzoeksprotocollen noemen doseringen vaak in microgram (mcg of µg). 1 mg = 1000 mcg. Een factor-1000 rekenfout is de klassieke misser bij reconstitutie - reken het volume per unit altijd twee keer na.",
    related: ["u100", "reconstitutie"],
  },
  {
    id: "receptor-agonist",
    term: "Receptor-agonist",
    short: "Stof die een receptor activeert",
    body: "Een stof die aan een receptor bindt en deze activeert, zoals het lichaamseigen signaal dat zou doen. Semaglutide is een agonist van de GLP-1-receptor; Ipamorelin van de ghreline-receptor. Het tegenovergestelde is een antagonist, die de receptor juist blokkeert.",
    related: ["glp1", "ghs", "peptide"],
  },
  {
    id: "glp1",
    term: "GLP-1-receptoragonist",
    short: "Incretine-nabootser: verzadiging + glucoseregulatie",
    body: "Klasse peptiden die de GLP-1-receptor activeren, met effect op verzadiging, maaglediging en glucoseregulatie. Semaglutide is de mono-agonist; Tirzepatide combineert GLP-1 met GIP (dual agonist); Retatrutide voegt daar de glucagon-receptor aan toe (triple agonist). In fase-3-onderzoek liet deze klasse 15-24% gewichtsverlies zien.",
    related: ["gip", "incretine", "receptor-agonist"],
  },
  {
    id: "gip",
    term: "GIP",
    short: "Tweede incretine-hormoon",
    body: "Glucose-dependent Insulinotropic Polypeptide - naast GLP-1 het tweede belangrijke incretine-hormoon. De combinatie van GIP- en GLP-1-agonisme (zoals in Tirzepatide) bleek in klinisch onderzoek effectiever voor gewichtsverlies dan GLP-1 alleen.",
    related: ["glp1", "incretine"],
  },
  {
    id: "incretine",
    term: "Incretine",
    short: "Darmhormonen die insuline-afgifte stimuleren",
    body: "Verzamelnaam voor darmhormonen (GLP-1, GIP) die na een maaltijd de insuline-afgifte stimuleren en verzadiging signaleren. De incretine-route is de basis onder de moderne generatie vetverlies-peptiden: Semaglutide, Tirzepatide en Retatrutide bootsen deze hormonen na met een veel langere halfwaardetijd.",
    related: ["glp1", "gip"],
  },
  {
    id: "ghrh",
    term: "GHRH-analoog",
    short: "Nabootser van Growth Hormone Releasing Hormone",
    body: "Peptide dat het lichaamseigen GHRH nabootst en de hypofyse aanzet tot GH-afgifte. CJC-1295 (no-DAC) is het bekendste voorbeeld. Werkt op een andere receptor dan GH-secretagogen zoals Ipamorelin; in onderzoek worden beide routes vaak gecombineerd omdat ze elkaar versterken.",
    related: ["ghs", "igf1", "stack"],
  },
  {
    id: "ghs",
    term: "GH-secretagoog (GHRP)",
    short: "Stimuleert GH-afgifte via de ghreline-receptor",
    body: "Peptide dat de ghreline-receptor activeert en daarmee een puls groeihormoon uit de hypofyse losmaakt. Ipamorelin is de meest selectieve van deze klasse: minimale invloed op cortisol en prolactine. Het effect is een puls die het natuurlijke afgiftepatroon volgt, in tegenstelling tot toediening van GH zelf.",
    related: ["ghrh", "igf1"],
  },
  {
    id: "igf1",
    term: "IGF-1",
    short: "Insulin-like Growth Factor 1",
    body: "Groeifactor die vooral in de lever wordt aangemaakt als reactie op groeihormoon en veel van de weefseleffecten van GH uitvoert. In onderzoek naar GHRH-analogen en GH-secretagogen is IGF-1 de standaard biomarker om te meten of de GH-as daadwerkelijk gestimuleerd wordt.",
    related: ["ghrh", "ghs"],
  },
  {
    id: "nootropic",
    term: "Nootropisch peptide",
    short: "Peptide onderzocht voor cognitie en stemming",
    body: "Peptiden die onderzocht worden voor effect op focus, stressrespons, slaap of stemming. Selank (afgeleid van tuftsine) wordt onderzocht voor angst-demping zonder sedatie; Semax (ACTH-fragment) voor focus en neuroprotectie; DSIP voor slaapregulatie. Vrijwel al het onderzoek komt uit Rusland en is kleinschalig - de bewijsbasis is dunner dan bij de GLP-1-klasse.",
    related: ["peptide", "protocol"],
  },
  {
    id: "mitopeptide",
    term: "Mitochondriaal peptide",
    short: "Peptide gecodeerd in mitochondriaal DNA",
    body: "Kleine peptiden die in het mitochondriale DNA gecodeerd zijn en een rol spelen in energiehuishouding en celbescherming. MOTS-c wordt onderzocht voor metabole effecten die op inspanning lijken ('exercise mimetic'); Humanin voor cytoprotectie en longevity. Een jong onderzoeksveld met vooral dier- en celstudies.",
    related: ["peptide", "protocol"],
  },
  {
    id: "tfa",
    term: "TFA-restant",
    short: "Trifluorazijnzuur uit de synthese",
    body: "Trifluorazijnzuur wordt gebruikt bij de vaste-fase-synthese van peptiden en kan als zout-restant in het eindproduct achterblijven. Hoge TFA-restanten kunnen celkweek-experimenten verstoren en zeggen iets over de kwaliteit van de zuivering. Een goed COA vermeldt naast zuiverheid ook het TFA-gehalte.",
    related: ["zuiverheid", "coa", "hplc"],
  },
  {
    id: "protocol",
    term: "Onderzoeksprotocol",
    short: "Vast schema van dosering, frequentie en duur",
    body: "Het schema waarmee een peptide in onderzoek wordt toegepast: dosis, frequentie (bepaald door de halfwaardetijd), tijdstip en duur. In de literatuur zie je per peptide sterk verschillende protocollen; de kennisbank-artikelen per peptide zetten de gangbare onderzoeksprotocollen op een rij.",
    related: ["half-life", "stack"],
    link: "/kennisbank",
  },
  {
    id: "stack",
    term: "Stack",
    short: "Combinatie van peptiden in één protocol",
    body: "Het combineren van meerdere peptiden in één onderzoeksprotocol omdat ze via verschillende routes hetzelfde doel ondersteunen. Klassiek voorbeeld: CJC-1295 (GHRH-route) + Ipamorelin (ghreline-route) voor GH-afgifte - de combinatie geeft in onderzoek een sterkere GH-puls dan elk afzonderlijk.",
    related: ["ghrh", "ghs", "protocol"],
  },
  {
    id: "onderzoekspeptide",
    term: "Onderzoekspeptide",
    short: "Research-only status",
    body: "Peptide dat uitsluitend bestemd is voor laboratorium- en onderzoeksdoeleinden en niet is geregistreerd als geneesmiddel of supplement voor menselijke consumptie. Alles in de catalogus van Peptidehuis valt in deze categorie; de productinformatie beschrijft de stand van het onderzoek, geen medisch advies.",
    related: ["peptide", "coa"],
  },
];

export default function BegrippenlijstPage() {
  const definedTermSet = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "Begrippenlijst peptiden",
    url: "https://peptidehuis.nl/begrippenlijst",
    hasDefinedTerm: TERMS.map((t) => ({
      "@type": "DefinedTerm",
      "@id": `https://peptidehuis.nl/begrippenlijst#${t.id}`,
      name: t.term,
      description: t.body,
      inDefinedTermSet: "https://peptidehuis.nl/begrippenlijst",
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSet) }}
      />

      <section className="mx-auto max-w-7xl px-4 py-14 md:py-20">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-paper-soft px-3 py-1 text-xs text-text-muted">
          <BookOpen className="h-3.5 w-3.5" /> Begrippen &middot; peptiden &amp; lab-analyse
        </div>
        <h1 className="mt-5 max-w-3xl font-display text-4xl md:text-5xl">
          Begrippenlijst
        </h1>
        <p className="mt-4 max-w-2xl text-text-muted leading-relaxed">
          Uitleg van de begrippen die je op deze site en in de kennisbank tegenkomt. Hover over
          een term (dotted underline) om de korte definitie te zien, of klik op de volledige
          uitleg hieronder. Geschreven voor onderzoekers en biohackers die hun kennis willen
          checken.
        </p>
      </section>

      <article className="container-x mx-auto max-w-3xl pb-16 md:pb-20">
        <nav aria-label="A-Z navigatie" className="mb-10 flex flex-wrap gap-2 rounded-lg border border-border bg-paper-soft p-4 text-sm">
          {Array.from(new Set(TERMS.map((t) => t.term[0].toUpperCase())))
            .sort()
            .map((letter) => (
              <a
                key={letter}
                href={`#letter-${letter}`}
                className="rounded-full bg-background px-3 py-1 font-medium text-text hover:bg-accent hover:text-accent-foreground"
              >
                {letter}
              </a>
            ))}
        </nav>

        <div className="space-y-10">
          {Array.from(new Set(TERMS.map((t) => t.term[0].toUpperCase())))
            .sort()
            .map((letter) => (
              <section key={letter} id={`letter-${letter}`}>
                <h2 className="font-display text-3xl text-accent">{letter}</h2>
                <div className="mt-4 space-y-8">
                  {TERMS.filter((t) => t.term[0].toUpperCase() === letter).map((t) => (
                    <article
                      key={t.id}
                      id={t.id}
                      className="border-b border-border pb-6 last:border-0"
                    >
                      <h3 className="font-display text-xl text-text">{t.term}</h3>
                      <p className="mt-1 text-sm italic text-text-muted">{t.short}</p>
                      <p className="mt-3 text-[15px] leading-relaxed text-text">{t.body}</p>
                      {(t.link || (t.related && t.related.length > 0)) && (
                        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                          {t.link && (
                            <Link
                              href={t.link}
                              className="rounded-full bg-paper-soft px-3 py-1 font-medium text-text hover:bg-accent hover:text-accent-foreground"
                            >
                              → {t.link.slice(1)}
                            </Link>
                          )}
                          {t.related?.map((relId) => {
                            const rel = TERMS.find((x) => x.id === relId);
                            if (!rel) return null;
                            return (
                              <a
                                key={relId}
                                href={`#${relId}`}
                                className="rounded-full border border-border bg-background px-3 py-1 text-text-muted hover:border-accent hover:text-accent"
                              >
                                {rel.term}
                              </a>
                            );
                          })}
                        </div>
                      )}
                    </article>
                  ))}
                </div>
              </section>
            ))}
        </div>

        <div className="mt-16 rounded-lg border border-border bg-paper-soft p-6 md:p-8">
          <p className="text-xs uppercase tracking-wider text-accent font-semibold">Vraag beantwoord?</p>
          <h3 className="mt-2 font-display text-2xl text-text">
            Term nog niet gevonden of niet duidelijk?
          </h3>
          <p className="mt-2 text-sm text-text-muted">
            Stuur ons een berichtje via{" "}
            <Link href="/contact" className="text-accent underline">/contact</Link> - we vullen de
            begrippenlijst continu aan op basis van vragen die binnenkomen.
          </p>
        </div>
      </article>
    </>
  );
}
