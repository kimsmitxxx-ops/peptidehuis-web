import Link from "next/link";
import { listProducts, listBlogPosts, listCategories } from "@/lib/queries";
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

export default async function HomePage() {
  const [dbProducts, dbArticles, dbCategories] = await Promise.all([
    listProducts({ limit: 24 }),
    listBlogPosts(3),
    listCategories(),
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
              <FlaskConical size={12} /> Batch 2606-A nu beschikbaar
            </span>
            <h1 className="mt-5 font-display text-4xl md:text-6xl leading-[1.05] tracking-tight">
              Van dun naar
              <br />
              <span className="text-accent-soft">gespierd.</span>
              <span className="block mt-3 text-base md:text-lg font-sans font-normal tracking-normal text-primary-foreground/70">
                Anabolen, elke batch onafhankelijk getest.
              </span>
            </h1>
            <p className="mt-5 text-lg text-primary-foreground/80 max-w-xl leading-relaxed">
              Testosteron, Deca, Trenbolone en complete PCT. Geen mysteriedoosjes — wij publiceren
              elke COA, vermelden de fabrikant en versturen vanuit Nederland.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/winkel">
                <Button size="lg" trailingIcon={ArrowRight}>
                  Bekijk winkel
                </Button>
              </Link>
              <Link href="/wijzer">
                <Button size="lg" variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10">
                  Doe de Wijzer
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
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/75 to-primary/10" />
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
          Iedere stof heeft een eigen onderzoekspagina met werking, doseringen, bijwerkingen en COA's
          per batch.
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
              ctaHref="/kennisbank/pct-protocol-uitleg"
            >
              Een kuur zonder PCT-plan is geen kuur
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

      {/* Bestsellers */}
      {bestsellers.length > 0 && (
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
                  image={p.image_url || "/assets/cat-anabolen.png"}
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
          Transparantie als standaard
        </SectionHeading>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <TrustCard icon={FlaskConical} heading="Eigen lab in Rotterdam" sub="HPLC- en massaspectrometrie op iedere binnenkomende batch." />
          <TrustCard icon={Award} heading="Onafhankelijk geverifieerd" sub="Resultaten van Janoshik en Anabolic Lab, publiek per batchnummer." />
          <TrustCard icon={Lock} heading="Discrete verzending" sub="Neutrale verpakking, geen vermelding van inhoud op het etiket." />
          <TrustCard icon={Headphones} heading="Echt contact" sub="Online chat tussen 09:00 en 21:00, ook in het weekend." />
        </div>
      </section>

      {/* Lab spotlight */}
      <section className="bg-background border-y border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <Badge variant="accent">Batch-spotlight</Badge>
            <h2 className="mt-3 font-display text-3xl md:text-4xl leading-tight">
              Elke flacon traceerbaar tot een COA
            </h2>
            <p className="mt-4 text-text-muted leading-relaxed max-w-xl">
              Vind het batchnummer op je flacon, scan de QR-code en lees direct het originele
              rapport van het onafhankelijke lab. Wij verbergen niets — ook niet onze afwijzingen.
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
                image={a.image_url || "/assets/cat-anabolen.png"}
                publishedAt={new Date(a.published_at).toLocaleDateString("nl-NL")}
                author={{ name: a.author || "Redactie", credentials: "AnabolenPro" }}
                href={`/kennisbank/${a.slug}`}
              />
            ))}
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="mx-auto max-w-7xl px-4 py-16 grid lg:grid-cols-[1fr_2fr] gap-12">
        <div>
          <SectionHeading variant="eyebrow-plus-display" eyebrow="Veelgestelde vragen">
            Vragen die we elke dag krijgen
          </SectionHeading>
          <p className="mt-4 text-text-muted leading-relaxed">
            Antwoorden op de meestgestelde vragen over kuren, levering en betaling. Mis je iets?
            Stuur ons een bericht — antwoord binnen kantooruren altijd binnen een uur.
          </p>
        </div>
        <FaqAccordion
          items={[
            {
              question: "Welke anabolen zijn geschikt voor een eerste kuur?",
              answer:
                "In onderzoek wordt vrijwel altijd een testosteron-only protocol als eerste cyclus beschreven: 300–500 mg testosteron enanthate of cypionate per week, 12–16 weken, met PCT achteraf.",
            },
            {
              question: "Wat is het verschil tussen Test E, Test C en Sustanon?",
              answer:
                "Test E en Test C zijn praktisch uitwisselbaar (halfwaardetijd ~8 dagen). Sustanon is een mix van vier esters en geeft sneller stabiele plasmaspiegels.",
            },
            {
              question: "Is een PCT echt noodzakelijk?",
              answer:
                "Ja. Elke androgene cyclus onderdrukt de eigen LH/FSH-productie. Zonder PCT-protocol kan herstel maanden tot jaren duren. Standaard worden Nolvadex en Clomid gecombineerd.",
            },
            {
              question: "Hoe weet ik dat een batch écht getest is?",
              answer:
                "Iedere flacon draagt een batchcode die je terugvindt in onze publieke COA-database. Klik op het product en open het labrapport.",
            },
            {
              question: "Hoe lang duurt levering binnen Nederland?",
              answer:
                "Bestellingen voor 23:00 worden de volgende werkdag bezorgd door PostNL, in een neutrale verpakking zonder verwijzing naar de inhoud.",
            },
          ]}
        />
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20">
        <NewsletterForm
          heading="Nieuwe batches, nieuwe COA's"
          subhead="Eén keer per twee weken een mail met wat er nieuw is in het lab. Zonder verkooppraat."
        />
      </section>
    </>
  );
}
