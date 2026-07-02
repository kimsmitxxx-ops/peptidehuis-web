import Link from "next/link";
import { listProducts, listBlogPosts, listCategories, listFeaturedProducts } from "@/lib/queries";
import { Button } from "@/components/button";
import { SectionHeading } from "@/components/section-heading";
import { ProductCard } from "@/components/product-card";
import { HomeUspBar } from "@/components/shop/home-usp-bar";
import { TrustCard } from "@/components/trust-card";
import { LabBadge } from "@/components/lab-badge";
import { ReviewSnippet } from "@/components/review-snippet";
import { ArticleCard } from "@/components/article-card";
import { FaqAccordion } from "@/components/faq-accordion";
import { NewsletterForm } from "@/components/newsletter-form";
import { Badge } from "@/components/badge";
import { Stars } from "@/components/stars";
import { BeforeAfterSlider } from "@/components/before-after-slider";
import { categoryContent, mainCategories } from "@/components/shop/data";
import {
  Truck,
  ShieldCheck,
  FlaskConical,
  Headphones,
  PackageCheck,
  Lock,
  Award,
  ArrowRight,
} from "lucide-react";

export const revalidate = 300;

const HOMEPAGE_FAQ = [
  {
    question: "Wat is de beste anabolenkuur voor beginners?",
    answer:
      "Voor een eerste kuur wordt vrijwel unaniem testosteron-only aangeraden: 300–500 mg testosteron enanthate of cypionate per week, 12 tot 16 weken. Testosteron is de stof die je lichaam al kent, dus bijwerkingen zijn voorspelbaar en je weet hoe je lijf reageert vóór je iets ingewikkelders erbij doet. PCT (Clomid + Nolvadex) start je 2 weken na de laatste injectie. Geen dianabol-kickstart als eerste kuur — die voegt risico toe zonder dat je weet of de basis werkt.",
  },
  {
    question: "Wat is het verschil tussen testosteron enanthate, cypionate en sustanon?",
    answer:
      "Test E (enanthate) en Test C (cypionate) zijn praktisch identiek: halfwaardetijd van ongeveer 8 dagen, 2x per week injecteren is genoeg voor stabiele bloedwaardes. Sustanon is een mix van 4 esters (propionaat, fenylpropionaat, isocaproaat, decanoaat). Daardoor krijg je sneller een effect (de korte esters trappen vroeg in) maar voor strakke piek-en-dal moet je 2–3x per week injecteren. Pure prijs/kwaliteit kies je Test E of C; Sustanon is handiger als je sneller op niveau wil komen.",
  },
  {
    question: "Hoe lang moet een PCT duren en welke producten heb ik nodig?",
    answer:
      "Een standaard PCT duurt 4 weken en bestaat uit Clomid (50/50/25/25 mg per dag) gecombineerd met Nolvadex (20/20/10/10 mg). Start 2 weken na je laatste lange-ester injectie of meteen na een orale-only cycle. HCG kun je optioneel inzetten in de cruise/blast naar PCT-transitie om je testikels al voor de PCT wakker te schudden (500–1500 IE 2x/week, 2 weken). Skip de PCT en je herstelt soms een half jaar later nog steeds niet — dat is geen bangmakerij, dat is gewoon hoe HPTA-suppressie werkt.",
  },
  {
    question: "Hoe weet ik dat de anabolen die ik koop écht zijn en niet underdosed?",
    answer:
      "Elke batch die wij verkopen heeft een batchcode op het flesje. Die code zoek je op de productpagina onder COA — daar staat het PDF-rapport van Janoshik Analytical (TS) of Anabolic Lab (US): werkzame stof, gemeten zuiverheid (minimum 97%), oplosmiddel-residu en eventuele isomeren. Geen rapport = geen verkoop. Ben je nog kritischer: stuur zelf een flesje op naar Janoshik (~€80), wij vergoeden het verschil als jouw meting buiten 5% van onze meting valt.",
  },
  {
    question: "Hoe ziet de verpakking eruit en wat staat er op het label?",
    answer:
      "Bruine of grijze kartonnen doos zonder logo, zonder QR-code, zonder afbeelding. Op het verzendlabel staat alleen onze bedrijfsnaam en jouw adres. Geen vermelding van productnaam, geen \"medisch\" stempel, geen waarschuwingsstickers. De bezorger ziet één van de duizenden anonieme webshop-pakketjes. Wij verzenden alleen naar vaste huisadressen — geen PostNL-afhaalpunten als aflever-optie.",
  },
  {
    question: "Hoe lang duurt verzending binnen Nederland en hoe wordt betaald?",
    answer:
      "Als je betaling vóór 11:00 op een werkdag binnen is, wordt je pakket dezelfde dag nog verzonden — morgen in huis met PostNL of DPD. Betaling na 11:00 of in het weekend? Dan gaat je bestelling de eerstvolgende werkdag de deur uit. Betalen doe je via bank-overschrijving (IBAN) of crypto (BTC/ETH/USDT). Geen kaart, geen tussenpartij. Op je bankafschrift verschijnt alleen onze bedrijfsnaam, geen productomschrijving.",
  },
  {
    question: "Welke bijwerkingen kan ik verwachten en hoe houd ik die in de gaten?",
    answer:
      "Standaard tijdens een testosteron-cycle: acne, hogere bloeddruk, hogere hematocriet (= dikker bloed, geeft hoofdpijn), mogelijk gynecomastie via aromatisatie naar oestradiol, lagere natuurlijke testosteronproductie (HPTA-suppressie). Trenbolone voegt slapeloosheid, nachtelijk zweten en mentale onrust toe. Houd in de gaten via bloedwerk vóór, tijdens (week 6) en na de cycle: lipidenpanel, LH, FSH, totaal+vrij testosteron, oestradiol, SHBG, hematocriet, ALT/AST, creatinine. Bij hematocriet >54 doneer je bloed, bij oestradiol >40 pg/ml voeg je een AI toe.",
  },
  {
    question: "Wat zijn natuurlijke alternatieven voor anabolen en werken die echt?",
    answer:
      "Volledig vervangen: nee. Maar het verschil tussen iemand die geoptimaliseerd traint+eet en iemand die dat niet doet is groter dan veel mensen denken. Concreet werkt: creatine monohydraat (5 g/dag, +10–15% kracht binnen 4 weken), 1.6–2.2 g eiwit per kg lichaamsgewicht, progressive overload met 3–5x training per week, 7+ uur slaap, vitamine D + zink + magnesium als je tekort hebt. Je natural plafond hangt af van genetica (FFMI ~25 voor de meeste mannen). Voor lifestyle-redenen kies je natural; voor competitie-niveau is anabolen vrijwel altijd onderdeel van het verhaal — dat is geen oordeel, gewoon hoe het is.",
  },
  {
    question: "Kan ik mijn bestelling retourneren of annuleren als ik van gedachten verander?",
    answer:
      "Nee. Vanwege onze branche kunnen we geen fysiek retour-adres publiek voeren en zodra je betaling binnen is, gaat de bestelling in behandeling. Neem daarom vóór je betaalt goed de tijd om je bestelling te controleren. Wél garanderen we dat je pakket aankomt: doet-ie dat niet binnen 14 dagen na verzending, dan sturen wij automatisch een nieuwe. En bij een aantoonbare batch-afwijking (>5% van het COA) krijg je het item kosteloos vervangen in je volgende bestelling.",
  },
  {
    question: "Werken kuurpakketten beter dan losse producten kopen?",
    answer:
      "Voor beginners en intermediates ja — wij stellen pakketten samen waarin de doseringen op elkaar afgestemd zijn (geen rare verhoudingen) en de PCT zit er al in. Scheelt je de berekening en zorgt dat je niet halverwege merkt dat je Nolvadex vergat te bestellen. Ervaren gebruikers met een specifiek doel (lean bulk, recomp, contest prep) stellen vaak liever zelf samen — daar zijn losse producten goedkoper en preciezer.",
  },
  {
    question: "Vanaf welke leeftijd kan je veilig anabolen gebruiken?",
    answer:
      "Medisch antwoord: pas nadat je natuurlijke groei klaar is, oftewel ergens tussen 23 en 25 jaar. Daarvoor zit je groeischijven nog open en kan AAS-gebruik die voortijdig sluiten — je wordt korter dan je had kunnen zijn. Ook is je eigen testosteron-productie tussen 18 en 23 op zijn hoogtepunt; je hebt niks toe te voegen behalve risico. Realistisch gebruiken veel mensen het eerder — onze rol is dan zorgen dat je weet wat je doet, niet doen alsof het probleem niet bestaat.",
  },
  {
    question: "Wat is FFMI en waarom matter dat voor mijn doelen?",
    answer:
      "FFMI (Fat-Free Mass Index) is je vetvrije massa gestandaardiseerd voor lengte. Natuurlijke mannen zonder enhancers hebben zelden meer dan FFMI 24–25; daarboven kom je in gebied dat statistisch alleen haalbaar is met AAS, peptiden of buitengewone genetica. Bereken: vetvrije massa (kg) / lengte² (m²) + 6.1 × (1.8 – lengte in meters). Voor planning: vorm verwachting voor wat je natural kan halen vs. wat je verwacht van een cycle. Tien jaar fanatiek trainen + perfect dieet zit je in de buurt van FFMI 23–24; een eerste 16-weken test-only cycle voegt typisch 2–4 punten toe waarvan ~50% behouden blijft post-PCT.",
  },
];

export default async function HomePage() {
  const [dbProducts, dbArticles, dbCategories, featuredProducts] = await Promise.all([
    listProducts({ limit: 24 }),
    listBlogPosts(3),
    listCategories(),
    listFeaturedProducts(8),
  ]);

  const cats =
    dbCategories.length > 0
      ? dbCategories.slice(0, 6).map((c, i) => ({
          slug: c.slug,
          name: c.name,
          tagline: c.description || mainCategories[i % mainCategories.length].tagline,
          image: c.hero_image || mainCategories[i % mainCategories.length].image,
          to: `/winkel/${c.slug}`,
        }))
      : mainCategories;

  const anabolen = categoryContent.filter((c) => c.group === "anabolen");
  const pct = categoryContent.filter((c) => c.group === "pct");

  const bestsellers = dbProducts.slice(0, 4);
  const featured = featuredProducts.slice(0, 8);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-soft to-primary" />
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, var(--color-accent) 0%, transparent 40%), radial-gradient(circle at 80% 70%, var(--color-accent-soft) 0%, transparent 35%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-16 md:py-24 grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
          <div className="text-primary-foreground">
            <span className="inline-flex items-center gap-2 rounded-sm border border-primary-foreground/20 bg-primary-foreground/5 px-3 py-1 text-xs uppercase tracking-[0.18em] text-accent-soft">
              <FlaskConical size={12} /> Janoshik &amp; Anabolic Lab — batch 2606-A live
            </span>
            <h1 className="mt-5 font-display text-4xl md:text-6xl leading-[1.05] tracking-tight">
              Anabolen die écht kloppen
              <br />
              <span className="text-accent-soft">met de lab-data.</span>
              <span className="block mt-3 text-base md:text-lg font-sans font-normal tracking-normal text-primary-foreground/70">
                Janoshik HPLC per batch · Anoniem verpakt · Morgen in huis.
              </span>
            </h1>
            <p className="mt-5 text-lg text-primary-foreground/80 max-w-xl leading-relaxed">
              Testosteron, trenbolone, anavar, dianabol, complete kuurpakketten met PCT — iedere
              batch onafhankelijk getest door Janoshik Analytical, COA publiek per batchcode op de
              productpagina. Geen mysteriedoosjes, geen ompak-route via Polen, geen leverancier
              die plots offline is.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/winkel">
                <Button size="lg" trailingIcon={ArrowRight}>
                  Bekijk winkel
                </Button>
              </Link>
              <Link href="/kennisbank">
                <Button size="lg" variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10">
                  Lees de kennisbank
                </Button>
              </Link>
            </div>
            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-primary-foreground/75">
              <span className="inline-flex items-center gap-2">
                <Stars value={4.8} size="sm" count={2412} /> 4,8 op basis van 2.412 reviews
              </span>
              <span className="inline-flex items-center gap-2">
                <PackageCheck size={16} className="text-accent-soft" /> 18.000+ pakketten verzonden
              </span>
            </div>
          </div>

          <div className="relative">
            <BeforeAfterSlider
              beforeSrc="/assets/transform-before.jpg"
              afterSrc="/assets/transform-after.jpg"
              beforeLabel="Voor"
              afterLabel="Na"
              priority
              className="aspect-[4/5] w-full"
            />
            <div className="hidden lg:block absolute -bottom-6 -right-6 rounded-lg bg-primary p-4 shadow-lift w-60 border border-primary-muted text-primary-foreground">
              <div className="flex items-center gap-2 text-accent-soft">
                <ShieldCheck size={18} />
                <span className="text-sm font-medium">Batch TE-2605-A</span>
              </div>
              <p className="mt-1 text-xs text-primary-foreground/70">
                99,4% zuiverheid · Janoshik geverifieerd
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* USP bar */}
      <section className="border-y border-accent/20 bg-accent-soft/15">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <HomeUspBar />
        </div>
      </section>

      {/* Hoofdcategorieën */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <SectionHeading variant="eyebrow-plus-display" eyebrow="Productcategorieën">
          Bekijk de productcategorieën
        </SectionHeading>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cats.map((c) => (
            <Link
              key={c.slug}
              href={c.to}
              className="group relative block overflow-hidden rounded-xl border border-primary-muted bg-primary text-primary-foreground shadow-card transition-all hover:border-accent hover:shadow-lift aspect-[4/3]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={c.image}
                alt={`${c.name} categorie`}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Lichte zwarte overlay voor editorial gevoel + tekst-leesbaarheid */}
              <div className="absolute inset-0 bg-black/25" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent-soft">
                  Categorie
                </span>
                <h3 className="mt-1.5 font-display text-2xl md:text-3xl uppercase tracking-tight text-primary-foreground leading-none">
                  {c.name}
                </h3>
                <p className="mt-2 text-sm text-primary-foreground/80 leading-snug max-w-[32ch]">
                  {c.tagline}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-accent-soft group-hover:text-accent">
                  Bekijken <ArrowRight size={12} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Anabolen per stof */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <SectionHeading
          variant="eyebrow-plus-display"
          eyebrow="Anabolen per stof"
          ctaLabel="Kennisbank"
          ctaHref="/kennisbank"
        >
          Kies je stof, lees voor je koopt
        </SectionHeading>
        <p className="mt-3 max-w-2xl text-text-muted">
          Eerst weten wat je in je lijf stopt? Per stof een aparte pagina: werking, halfwaardetijd,
          dosering per cycle-niveau, bijwerkingen en welke bloedwaardes je in de gaten houdt.
          Klik door voor je iets bestelt.
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {anabolen.map((c) => (
            <Link
              key={c.slug}
              href={`/${c.slug}`}
              className="group flex flex-col rounded-lg border border-primary-muted bg-primary p-5 text-primary-foreground hover:border-accent transition-colors"
            >
              <h3 className="font-display text-xl text-primary-foreground group-hover:text-accent">{c.name}</h3>
              {c.aka && (
                <p className="mt-0.5 text-xs text-primary-foreground/55 tabular">{c.aka.join(" · ")}</p>
              )}
              <p className="mt-3 text-sm text-primary-foreground/70 line-clamp-2 flex-1">{c.tagline}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm text-accent">
                Bekijken <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* PCT */}
      {pct.length > 0 && (
        <section className="border-y border-border bg-background">
          <div className="mx-auto max-w-7xl px-4 py-16">
            <SectionHeading
              variant="eyebrow-plus-display"
              eyebrow="Post-cycle therapy"
              ctaLabel="Lees protocol"
              ctaHref="/kennisbank/welke-pct-past-bij-een-deca-kuur-nolva-clomid-hcg-timing"
            >
              Skip de PCT en je herstelt half jaar later nog steeds niet
            </SectionHeading>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {pct.map((c) => (
                <Link
                  key={c.slug}
                  href={`/${c.slug}`}
                  className="group rounded-lg border border-primary-muted bg-primary text-primary-foreground p-5 hover:border-accent transition-colors"
                >
                  <h3 className="font-display text-lg text-primary-foreground group-hover:text-accent">{c.name}</h3>
                  <p className="mt-2 text-sm text-primary-foreground/70 line-clamp-3">{c.tagline}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured products */}
      {featured.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-16">
          <SectionHeading
            variant="eyebrow-plus-display"
            eyebrow="★ Uitgelicht"
            ctaLabel="Volledige catalogus"
            ctaHref="/winkel"
          >
            Onze uitgelichte producten
          </SectionHeading>
          <div className="mt-8 grid gap-5 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {featured.map((p) => (
              <Link
                key={p.id}
                href={`/product/${p.categories?.slug || "winkel"}/${p.slug}`}
                className="block"
              >
                <ProductCard
                  image={p.image_url || "/assets/cat-anabolen.webp"}
                  name={p.name}
                  slug={p.slug}
                  priceFrom={p.price_cents / 100}
                  ratingValue={4.8}
                  ratingCount={0}
                  inStock={p.availability !== "OutOfStock"}
                  tag="Uitgelicht"
                  category={p.categories?.name}
                  shortDescription={p.subtitle || undefined}
                />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Bestsellers (fallback grid uit alle products) */}
      {featured.length === 0 && bestsellers.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-16">
          <SectionHeading
            variant="eyebrow-plus-display"
            eyebrow="Best beoordeeld"
            ctaLabel="Volledige catalogus"
            ctaHref="/winkel"
          >
            Onze meest bestelde batches
          </SectionHeading>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {bestsellers.map((p) => (
              <Link
                key={p.id}
                href={`/product/${p.categories?.slug || "winkel"}/${p.slug}`}
                className="block"
              >
                <ProductCard
                  image={p.image_url || "/assets/cat-anabolen.webp"}
                  name={p.name}
                  slug={p.slug}
                  priceFrom={p.price_cents / 100}
                  ratingValue={4.8}
                  ratingCount={0}
                  inStock={p.availability !== "OutOfStock"}
                  tag={p.tags?.[0]}
                  category={p.categories?.name}
                  shortDescription={p.subtitle || undefined}
                />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Trust */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <SectionHeading variant="eyebrow-plus-display" eyebrow="Waarom AnabolenPro">
          Geen gok, gewoon weten wat je krijgt
        </SectionHeading>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <TrustCard icon={FlaskConical} heading="Eigen lab in Rotterdam" sub="HPLC + GC-MS op elke binnenkomende batch. Niets gaat de deur uit zonder dubbel-check." />
          <TrustCard icon={Award} heading="Onafhankelijk getest" sub="Janoshik (TS) en Anabolic Lab (US) verifiëren. COA staat publiek per batchcode op de productpagina." />
          <TrustCard icon={Lock} heading="Discreet bezorgd" sub="Neutrale doos, geen logo of productnaam op het label. Alleen een neutrale bedrijfsnaam — staat nergens steroïde op." />
          <TrustCard icon={Headphones} heading="Echte mensen" sub="Live chat 09:00–21:00, ook weekend. Geen bot, geen ticketsysteem — direct iemand die het verschil tussen Test E en Sustanon kent." />
        </div>
      </section>

      {/* Lab spotlight */}
      <section className="bg-background border-y border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <Badge variant="accent">Batch-spotlight</Badge>
            <h2 className="mt-3 font-display text-3xl md:text-4xl leading-tight">
              Elke flacon heeft een batchcode, elke batchcode een rapport
            </h2>
            <p className="mt-4 text-text-muted leading-relaxed max-w-xl">
              Geen "ja vertrouw ons maar" — gewoon kijken. Pak het flesje, scan de QR of zoek de
              batchcode op onze lab-pagina, en je hebt het PDF-rapport van Janoshik in 10 seconden.
              We laten ook de afgekeurde batches staan, met de reden erbij. Dat is voor ons
              transparantie, niet "marketing".
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/lab">
                <Button variant="secondary" trailingIcon={ArrowRight}>
                  Doorzoek alle batches
                </Button>
              </Link>
            </div>
          </div>
          <LabBadge
            variant="full"
            labName="Janoshik Analytical"
            batchCode="TE-2605-A"
            testDate="12-05-2026"
            purityPct={99.4}
            coaUrl="#coa"
          />
        </div>
      </section>

      {/* Reviews */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <SectionHeading variant="eyebrow-plus-display" eyebrow="Reviews">
          Wat klanten zeggen
        </SectionHeading>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <ReviewSnippet name="Lars D." rating={5} date="08-06-2026" body="Snelle levering, nette verpakking en het COA matchte exact het batchnummer op de flacon. Eindelijk een Nederlandse leverancier die zijn werk serieus neemt." verified />
          <ReviewSnippet name="Marleen K." rating={5} date="29-05-2026" body="Vraag gesteld in de live chat om 22:00, om 09:00 volgend antwoord met onderbouwing en studieverwijzing. Dat zie je nergens anders." verified />
          <ReviewSnippet name="Sander B." rating={4} date="17-05-2026" body="Producten kloppen, dosering klopt. Enige minpunt is dat nieuwe batches soms snel uitverkocht zijn — verder top." verified />
        </div>
      </section>

      {/* Articles */}
      {dbArticles.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-8">
          <SectionHeading
            variant="eyebrow-plus-display"
            eyebrow="Kennisbank"
            ctaLabel="Alle artikelen"
            ctaHref="/kennisbank"
          >
            Onderbouwing zonder mythes
          </SectionHeading>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {dbArticles.map((a) => (
              <ArticleCard
                key={a.id}
                kindTag={
                  a.category === "Onderzoek" ? "Studie" : a.category === "Nieuws" ? "Nieuws" : "Gids"
                }
                title={a.title}
                excerpt={a.excerpt || ""}
                image={a.image_url || "/assets/cat-anabolen.webp"}
                publishedAt={a.published_at ? new Date(a.published_at).toLocaleDateString("nl-NL") : ""}
                author={{ name: a.author || "Redactie", credentials: "AnabolenPro" }}
                href={`/kennisbank/${a.slug}`}
              />
            ))}
          </div>
        </section>
      )}

      {/* FAQ — uitgebreid voor LLM/SEO indexering */}
      <section className="mx-auto max-w-7xl px-4 py-16 grid lg:grid-cols-[1fr_2fr] gap-12">
        <div>
          <SectionHeading variant="eyebrow-plus-display" eyebrow="Veelgestelde vragen">
            Alles wat je wil weten voor je bestelt
          </SectionHeading>
          <p className="mt-4 text-text-muted leading-relaxed">
            De vragen die we elke week krijgen via chat, mail of fora. Recht door zee, geen
            commerciële spin. Mis je iets? Stuur een bericht via <a href="/contact" className="text-accent hover:underline">contact</a> —
            we reageren tussen 09:00 en 21:00 doorgaans binnen het uur.
          </p>
          <div className="mt-6 rounded-lg border border-accent/30 bg-accent-soft/15 p-4 text-sm text-text">
            <p className="font-semibold">Geen antwoord op jouw vraag?</p>
            <p className="mt-1 text-text-muted">Stuur ons een bericht via het <Link className="text-accent hover:underline" href="/contact">contactformulier</Link> of start een chat via de bubble rechtsonder.</p>
          </div>
        </div>
        <FaqAccordion items={HOMEPAGE_FAQ} />
      </section>

      {/* FAQPage schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: HOMEPAGE_FAQ.map((f) => ({
              "@type": "Question",
              name: f.question,
              acceptedAnswer: { "@type": "Answer", text: f.answer },
            })),
          }),
        }}
      />

      <section className="mx-auto max-w-7xl px-4 pb-20">
        <NewsletterForm
          heading="Nieuwe batches, nieuwe COA's"
          subhead="Eén keer per twee weken een mail met wat er nieuw is in het lab. Zonder verkooppraat."
        />
      </section>
    </>
  );
}
