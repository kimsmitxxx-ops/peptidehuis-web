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
      "Testosteron-only, 300–500 mg per week, 12 tot 16 weken. Test kent je lichaam al, dus je weet wat je bijwerkingen zijn en hoe je erop reageert. Combineren met dianabol of iets anders bewaar je voor kuur 2 of 3 — eerst weten of de basis werkt. Nakuur (PCT) start 2 weken na de laatste prik.",
  },
  {
    question: "Wat is het verschil tussen Test E, Test C en Sustanon?",
    answer:
      "Test E en Test C zijn praktisch hetzelfde: 2× per week injecteren, stabiele waardes. Sustanon is een mix van 4 esters — sneller effect maar je moet 2–3× per week prikken voor stabiele bloedwaardes. Kies Test E of C voor beste prijs; Sustanon als je sneller op niveau wil.",
  },
  {
    question: "Hoe lang duurt een PCT en wat heb ik nodig?",
    answer:
      "4 weken Clomid + Nolvadex. Dosering: Clomid 50/50/25/25 mg per dag, Nolvadex 20/20/10/10 mg. Start 2 weken na je laatste injectie. hCG kun je optioneel gebruiken vlak vóór PCT om je testikels alvast wakker te maken. Skip je de PCT? Dan kan herstel maanden extra kosten.",
  },
  {
    question: "Hoe weet ik dat wat ik koop echt is en niet underdosed?",
    answer:
      "Iedere batch heeft een batchcode op het flesje. Die zoek je op onze /lab-pagina en krijgt het volledige labrapport (Janoshik) met werkzame stof + zuiverheid. Geen rapport = geen verkoop. Extra zeker weten? Stuur zelf een flesje op naar een lab (~€80) — wijkt onze meting >5% af, dan vergoeden we het verschil.",
  },
  {
    question: "Hoe ziet de verpakking eruit?",
    answer:
      "Bruine of grijze doos zonder logo, zonder QR-code, zonder afbeelding. Op het label alleen onze bedrijfsnaam en jouw adres — geen productnaam, geen medisch-stempel. Ziet eruit als elk ander webshop-pakket. Alleen naar vaste huisadressen, geen PostNL-afhaalpunten.",
  },
  {
    question: "Hoe snel is de verzending in Nederland en hoe betaal ik?",
    answer:
      "Betaling voor 11:00 op een werkdag = dezelfde dag verstuurd via PostNL of DPD. Betaling na 11:00 of in het weekend gaat de eerstvolgende werkdag de deur uit. Betalen doe je via IBAN of crypto (BTC/ETH/USDT). Op je bankafschrift staat alleen onze bedrijfsnaam.",
  },
  {
    question: "Welke bijwerkingen kan ik verwachten?",
    answer:
      "Standaard bij testosteron: acne, hogere bloeddruk, dikker bloed (hematocriet), risico op gynecomastie via oestrogeen. Je eigen productie wordt tijdelijk stilgezet — dat herstel je met PCT. Trenbolone voegt slaapproblemen en nachtelijk zweten toe. Bloedwerk vóór, tijdens (week 6) en na de kuur laat zien of alles binnen normale waardes blijft.",
  },
  {
    question: "Werken natuurlijke alternatieven?",
    answer:
      "Volledig vervangen: nee. Maar goed trainen + eten + slapen scheelt meer dan mensen denken. Concreet werkt: 5 g creatine per dag, 1.6–2.2 g eiwit per kilo, 3–5× per week trainen met progressive overload, 7+ uur slaap, en bijstellen van tekorten (vitamine D, zink, magnesium). Voor competitie-niveau spelen AAS meestal een rol — dat is geen oordeel, gewoon hoe het werkt.",
  },
  {
    question: "Kan ik mijn bestelling retourneren?",
    answer:
      "Nee — zodra je betaling binnen is gaat het pakket dezelfde dag de deur uit, dus check je bestelling voordat je betaalt. Wél garanderen we levering: komt je pakket niet binnen 14 dagen aan, dan sturen wij automatisch een nieuwe. Wijkt een batch >5% af van het COA, dan krijg je het item kosteloos vervangen bij je volgende bestelling.",
  },
  {
    question: "Werken kuurpakketten beter dan losse producten?",
    answer:
      "Voor beginners en intermediates: ja. Doseringen zijn op elkaar afgestemd en de PCT zit erin — scheelt je de reken- en bestelklus. Ervaren gebruikers stellen vaak zelf samen omdat ze doelgerichter en goedkoper uitkomen. Wij verkopen beide.",
  },
  {
    question: "Vanaf welke leeftijd kun je veilig anabolen gebruiken?",
    answer:
      "Medisch: pas na 23–25 jaar, wanneer je natuurlijke groei klaar is. Daarvoor zit je groeischijven nog open en zet AAS die voortijdig dicht — je wordt korter. Tussen je 18 en 23 zit je eigen testosteron ook op zijn hoogtepunt — er is dus letterlijk niks toe te voegen behalve risico. Realistisch gebruiken veel mensen het eerder — onze rol is dan zorgen dat je weet wat je doet.",
  },
  {
    question: "Hebben jullie een 100% leveringsgarantie?",
    answer:
      "Ja. Komt je pakket niet aan — kwijtgeraakt, teruggestuurd of transportschade — dan verzenden wij automatisch een nieuwe zending. Zonder discussie, zonder extra kosten, zonder aanvullend bewijs. Meld het via het contactformulier met je ordernummer, wij regelen de rest.",
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
              <FlaskConical size={12} /> Onafhankelijk lab-getest — batch 2606-A live
            </span>
            <h1 className="mt-5 font-display text-4xl md:text-6xl leading-[1.05] tracking-tight">
              Anabolen die écht kloppen
              <br />
              <span className="text-accent-soft">met de lab-data.</span>
              <span className="block mt-3 text-base md:text-lg font-sans font-normal tracking-normal text-primary-foreground/70">
                Iedere batch onafhankelijk lab-getest · Anoniem verpakt · Vandaag verstuurd.
              </span>
            </h1>
            <p className="mt-5 text-lg text-primary-foreground/80 max-w-xl leading-relaxed">
              Testosteron, trenbolone, anavar, dianabol, complete kuurpakketten met PCT — iedere
              batch wordt onafhankelijk lab-getest en het rapport staat publiek per batchcode
              op de productpagina. Geen mysteriedoosjes, geen ompak-route via Polen, geen
              leverancier die plots offline is.
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
                <Stars value={4.8} size="sm" count={1206} /> 4,8 op basis van 1.206 reviews
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
                99,4% zuiverheid · onafhankelijk lab-geverifieerd
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
          <TrustCard icon={Award} heading="Onafhankelijk getest" sub="Iedere batch wordt door een onafhankelijk lab gecheckt. Het rapport staat publiek per batchcode op de productpagina." />
          <TrustCard icon={Lock} heading="Discreet bezorgd" sub="Neutrale doos, geen logo of productnaam op het label. Staat nergens steroïde op." />
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
              batchcode op onze lab-pagina, en je hebt het lab-rapport in 10 seconden.
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
            labName="Onafhankelijk lab"
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
