import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/shop/page-hero";
import { MedicalDisclaimer } from "@/components/medical-disclaimer";
import { Heart, Activity, FlaskConical, Brain, AlertTriangle, ShieldAlert } from "lucide-react";

export const metadata: Metadata = {
  title: "Risico's en bijwerkingen anabolen — eerlijk overzicht · AnabolenPro",
  description:
    "Geen marketing-praat: de echte risico's van AAS en peptiden. Cardiovasculair, hormonaal, lever, mentaal. Wat te monitoren via bloedwerk en wanneer arts in te schakelen.",
  alternates: { canonical: "/risicos-en-bijwerkingen" },
};

export const revalidate = 86400;

const blocks = [
  {
    icon: Heart,
    title: "Cardiovasculair — het grootste risico",
    body: "AAS verhogen LDL-cholesterol vaak met 20-40% en verlagen HDL met 30-50%. Hematocriet kan stijgen tot boven 54 (verhoogd trombose-risico). Langetermijn-gebruik = aantoonbaar verhoogd risico op vroege cardiovasculaire events. Monitor minimaal 1× per kuur bloeddruk, hematocriet, totaal/LDL/HDL.",
    sources: "Bron: Baggish et al, Circulation 2010 (PMID 22429660).",
  },
  {
    icon: Activity,
    title: "HPTA-suppressie en herstel",
    body: "Iedere AAS-kuur onderdrukt je eigen testosteron-productie. Recovery na een 12-weken kuur duurt 3-6 maanden. Bij hoge doses of lange kuren is volledig herstel niet gegarandeerd — primair hypogonadisme blijft een reëel risico. PCT (Clomid/Nolvadex/HCG) helpt maar lost het niet altijd op.",
    sources: "Bron: Coviello et al, JCEM 2005 (PMID 15741275).",
  },
  {
    icon: FlaskConical,
    title: "Lever-toxiciteit (orale AAS)",
    body: "17-α-alkyl orale anabolen (Dianabol, Anavar, Winstrol, Oxymetholone) belasten de lever. ALT/AST kunnen 3-10× normaal worden. Bij hoge dose/langer dan 8 weken: cholestatische geelzucht of peliosis hepatitis mogelijk. Niet stapelen met andere lever-belastende middelen, geen alcohol tijdens kuur.",
    sources: "Bron: Westaby et al, Lancet 1977 (PMID 4929946).",
  },
  {
    icon: Brain,
    title: "Mentaal & gedrag",
    body: "Stemming-wisselingen, agressie (\"roid rage\" is overdreven maar verhoogde prikkelbaarheid is reëel), libido-pieken on-cycle en libido-crash off-cycle. Bij pre-existing depressie/angst: AAS kan symptomen verergeren. Bij trenbolone specifiek vaker slapeloosheid + nachtelijk zweten + sombere stemming.",
    sources: "Bron: Piacentino et al, Curr Neuropharmacol 2015 (PMID 26834024).",
  },
  {
    icon: AlertTriangle,
    title: "Gyno + vrouwelijke virilisatie",
    body: "Mannen: aromatiseerbare AAS (testosteron, deca, dbol) → estradiol stijgt → gevoelige tepels of weefselvorming. Aromatase-inhibitor zoals Arimidex of Aromasin nodig. Vrouwen: alle AAS riskeren stem-verlaging, clitoris-vergroting, mannelijke haargroei — vaak onomkeerbaar. Anavar in lage dose meest gebruikt voor vrouwen maar nooit risicovrij.",
    sources: "Bron: Khan et al, Br J Surg 2004 (PMID 15728205).",
  },
  {
    icon: ShieldAlert,
    title: "Onbekende batches & contaminatie",
    body: "Het grootste risico in NL is NIET de farmacologie maar de bron. Underdosed, onverwachte stoffen, endotoxines, oplosmiddel-residu. 1 op de 4 zwart-markt batches faalt het 97%-zuiverheidscriterium bij lab-test. Vraag áltijd het COA + batchcode voordat je iets injecteert.",
    sources: "Zie /lab voor onze Janoshik-test-procedure + afkeur-archief.",
  },
];

export default function RisicosPage() {
  return (
    <>
      <PageHero
        eyebrow="Veiligheid"
        title="Risico's en bijwerkingen — eerlijk overzicht"
        intro="Geen marketing-praat. AAS en peptiden hebben reële risico's. Hier wat de literatuur + onze praktijkdata wij zien, plus wat je moet monitoren als je toch besluit te gebruiken."
      />

      <section className="mx-auto max-w-3xl px-4 py-12 space-y-6">
        {blocks.map((b) => (
          <article
            key={b.title}
            className="rounded-xl border border-paper-border bg-paper-soft p-6"
          >
            <div className="flex items-start gap-3">
              <b.icon size={24} className="text-accent shrink-0 mt-0.5" />
              <div className="min-w-0">
                <h2 className="font-display text-xl text-primary">{b.title}</h2>
                <p className="mt-2 text-sm text-text leading-relaxed">{b.body}</p>
                <p className="mt-2 text-xs text-text-subtle">{b.sources}</p>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-12">
        <div className="rounded-xl border-2 border-accent/40 bg-accent-soft/20 p-6">
          <h2 className="font-display text-xl text-primary">Wat te monitoren (bloedwerk)</h2>
          <p className="mt-2 text-sm text-text-muted">
            Minimum-set bloedwaarden vóór, tijdens (4-6 weken in) en 4 weken na de kuur:
          </p>
          <ul className="mt-3 space-y-1.5 text-sm text-text">
            <li>• Hematocriet + Hemoglobine + Erytrocyten</li>
            <li>• Totaal/LDL/HDL cholesterol + Triglyceriden</li>
            <li>• ALT, AST, GGT (lever)</li>
            <li>• Creatinine + eGFR (nier)</li>
            <li>• Testosteron (totaal + vrij), LH, FSH, SHBG, Prolactine, Estradiol</li>
            <li>• Bloeddruk (eigen meter, dagelijks)</li>
          </ul>
          <p className="mt-4 text-xs text-text-muted">
            Aanvragen via huisarts of via diensten als{" "}
            <a
              href="https://www.bloedwaardentest.nl"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="text-accent hover:underline"
            >
              bloedwaardentest.nl
            </a>{" "}
            (Nederland) of{" "}
            <a
              href="https://www.bloedwaardentest.be"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="text-accent hover:underline"
            >
              bloedwaardentest.be
            </a>{" "}
            (België) — vanaf €50.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-12">
        <MedicalDisclaimer variant="prominent" />
      </section>

      <section className="bg-primary text-primary-foreground border-t border-primary-muted">
        <div className="mx-auto max-w-3xl px-4 py-12 text-center">
          <h2 className="font-display text-2xl">Twijfels? Lees verder of vraag het ons.</h2>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link
              href="/kennisbank"
              className="rounded-full border border-primary-foreground/30 px-5 py-2.5 text-sm font-semibold hover:bg-primary-soft"
            >
              Naar kennisbank
            </Link>
            <Link
              href="/lab"
              className="rounded-full bg-accent text-accent-foreground px-5 py-2.5 text-sm font-semibold hover:bg-accent-soft"
            >
              Lab-procedure
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-primary-foreground/30 px-5 py-2.5 text-sm font-semibold hover:bg-primary-soft"
            >
              Stel een vraag
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
