import Link from "next/link";
import { listProducts, listBlogPosts, listCategories, listFeaturedProducts } from "@/lib/queries";
import { ProductCard } from "@/components/product-card";
import { HomeUspBar } from "@/components/shop/home-usp-bar";
import { ArticleCard } from "@/components/article-card";
import { FaqAccordion } from "@/components/faq-accordion";
import { NewsletterForm } from "@/components/newsletter-form";
import { mainCategories } from "@/components/shop/data";
import { Truck, ShieldCheck, PackageCheck, ArrowRight, FlaskConical, Beaker } from "lucide-react";

export const revalidate = 300;
export const dynamic = "force-dynamic";

const HOMEPAGE_FAQ = [
  {
    question: "Wat zijn onderzoeks-peptiden precies?",
    answer:
      "Korte ketens aminozuren (2-50) die als signaal-molecuul werken in het lichaam. Ze binden aan specifieke receptoren en activeren processen zoals weefselherstel, GH-afgifte, vetverbranding of neuroplasticiteit. Onze peptiden zijn lab-grade (≥98% HPLC) uitsluitend voor onderzoek — niet voor humane consumptie.",
  },
  {
    question: "Waarom hier kopen — waarom geen andere leverancier?",
    answer:
      "Iedere batch heeft een openbaar COA met HPLC-zuiverheid ≥98%, monomeer-fractie ≥95%, endotoxine <5 EU/mg. Direct van EU-gecertificeerde synthese-labs — geen ompak-route via drop-shippers. Gevriesdroogd geleverd voor maximale stabiliteit. Discrete verzending vanaf NL binnen 24 uur.",
  },
  {
    question: "Hoe bewaar en gebruik ik gevriesdroogde peptiden?",
    answer:
      "Ongeopend: koelkast (2-8°C), donker, tot 24 maanden stabiel. Reconstitutie met bacteriostatisch water (0,9% benzylalcohol) — rustig langs de wand injecteren, zwenken tot helder. Aangemaakt gekoeld bewaren, binnen 30 dagen gebruiken.",
  },
  {
    question: "Wat is het verschil tussen Retatrutide, Tirzepatide en Semaglutide?",
    answer:
      "Semaglutide (Ozempic) is een GLP-1 mono-agonist — één receptor. Tirzepatide (Mounjaro) is dual-agonist (GLP-1 + GIP) — twee receptoren. Retatrutide is triple-agonist: GLP-1, GIP én glucagon. Meer receptoren = meer effect: fase-II studies toonden tot 24% gewichtsverlies bij 12 mg/week.",
  },
  {
    question: "Welke peptide voor pees-/spierletsel herstel?",
    answer:
      "BPC-157 en TB-500 zijn de klassiekers. BPC-157 werkt lokaal + systemisch op weefselherstel, doorbloeding en ontstekingsremming. TB-500 stimuleert cel-migratie en herstel op grotere schaal. Meestal 4-6 weken protocol. GHK-Cu is aanvullend voor collageenopbouw.",
  },
  {
    question: "Heb ik een recept nodig?",
    answer:
      "Nee — deze peptiden worden geleverd voor onderzoeksdoeleinden en vallen niet onder receptplicht in NL/EU. Wel belangrijk: uitsluitend voor lab- en in-vitro-onderzoek, niet voor humane toepassing. Onderzoekers zijn zelf verantwoordelijk voor gepaste ethische goedkeuring.",
  },
  {
    question: "Hoe lang duurt de verzending?",
    answer:
      "Betaling voor 15:00 op een werkdag = dezelfde dag verstuurd via PostNL. NL binnen 1 werkdag (gratis), BE 1-2 werkdagen (gratis), rest EU 3-5 werkdagen. Neutrale verpakking zonder productnaam op het label.",
  },
  {
    question: "Wat is een COA en waarom belangrijk?",
    answer:
      "Certificate of Analysis — per batch een lab-rapport met identiteit (mass-spec), HPLC-zuiverheid, monomeer-fractie, endotoxine (LAL-test). Zonder COA weet je niet wat je hebt. Al onze COA's zijn digitaal opvraagbaar per batchcode.",
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

  const bestsellers = dbProducts.slice(0, 4);
  const featured = featuredProducts.slice(0, 8);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: HOMEPAGE_FAQ.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

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
              <FlaskConical size={12} /> Lab-grade · ≥98% HPLC · COA per batch
            </span>
            <h1 className="mt-5 font-display text-4xl md:text-6xl leading-[1.05] tracking-tight">
              Onderzoeks-peptiden
              <br />
              <span className="text-accent-soft">van EU-gecertificeerde synthese-labs.</span>
              <span className="block mt-3 text-base md:text-lg font-sans font-normal tracking-normal text-primary-foreground/70">
                BPC-157 · Retatrutide · Tirzepatide · Semaglutide · CJC-1295 · Ipamorelin — 20+ peptiden.
              </span>
            </h1>
            <p className="mt-5 text-lg text-primary-foreground/80 max-w-xl leading-relaxed">
              Genezing, vetverlies, spiergroei, cognitie en longevity — de top 20 onderzoeks-peptiden
              op één plek. Iedere batch met openbaar COA, gevriesdroogd geleverd, discrete verzending
              vanuit NL. Voor lab- en in-vitro onderzoek.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/winkel" className="inline-flex items-center gap-2 rounded bg-accent px-6 h-12 text-accent-foreground font-medium hover:bg-accent-muted transition-colors">
                Bekijk producten <ArrowRight size={16} />
              </Link>
              <Link href="/kennisbank" className="inline-flex items-center gap-2 rounded border border-primary-foreground/25 px-6 h-12 text-primary-foreground/90 font-medium hover:bg-primary-foreground/10 transition-colors">
                Kennisbank
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {cats.slice(0, 4).map((c) => (
              <Link
                key={c.slug}
                href={c.to}
                className="group relative overflow-hidden rounded-lg border border-primary-foreground/10 bg-primary-foreground/5 p-4 hover:border-accent transition-colors"
              >
                <p className="text-xs uppercase tracking-wider text-accent-soft">{c.name}</p>
                <p className="mt-2 text-sm text-primary-foreground/80 leading-snug">{c.tagline}</p>
                <ArrowRight size={14} className="mt-4 text-accent group-hover:translate-x-1 transition-transform" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <HomeUspBar />

      {featured.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-16">
          <div className="flex items-baseline justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-accent font-semibold">Meest bestelde peptiden</p>
              <h2 className="mt-2 font-display text-3xl md:text-4xl">Onze top 20 in het onderzoek</h2>
            </div>
            <Link href="/winkel" className="text-sm text-accent hover:text-accent-muted inline-flex items-center gap-1">
              Volledige catalogus <ArrowRight size={14} />
            </Link>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p) => (
              <Link key={p.id} href={`/product/${p.categories?.slug || "winkel"}/${p.slug}`} className="block">
                <ProductCard
                  image={p.image_url || "/assets/cat-peptide-healing.jpg"}
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

      {featured.length === 0 && bestsellers.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-16">
          <h2 className="font-display text-3xl">Meest bestelde peptiden</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {bestsellers.map((p) => (
              <Link key={p.id} href={`/product/${p.categories?.slug || "winkel"}/${p.slug}`} className="block">
                <ProductCard
                  image={p.image_url || "/assets/cat-peptide-healing.jpg"}
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

      <section className="bg-surface py-16">
        <div className="mx-auto max-w-7xl px-4">
          <p className="text-xs uppercase tracking-[0.15em] text-accent font-semibold">Categorieën</p>
          <h2 className="mt-2 font-display text-3xl md:text-4xl">Per doel gerangschikt</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cats.map((c) => (
              <Link key={c.slug} href={c.to} className="group rounded-lg border border-border bg-background p-6 hover:border-accent transition-colors">
                <p className="font-display text-xl text-text group-hover:text-accent">{c.name}</p>
                <p className="mt-2 text-sm text-text-muted leading-relaxed line-clamp-2">{c.tagline}</p>
                <ArrowRight size={14} className="mt-4 text-accent group-hover:translate-x-1 transition-transform" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {dbArticles.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-16">
          <div className="flex items-baseline justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-accent font-semibold">Kennisbank</p>
              <h2 className="mt-2 font-display text-3xl md:text-4xl">Onderbouwd &amp; scherp</h2>
            </div>
            <Link href="/kennisbank" className="text-sm text-accent hover:text-accent-muted inline-flex items-center gap-1">
              Alle artikelen <ArrowRight size={14} />
            </Link>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {dbArticles.map((a: any) => (
              <Link key={a.id} href={`/kennisbank/${a.slug}`} className="block group">
                <ArticleCard
                  title={a.title}
                  image={a.image_url || "/assets/cat-peptide-healing.jpg"}
                  excerpt={a.excerpt || ""}
                  kindTag={a.category || "Onderzoek"}
                  publishedAt={new Date(a.published_at).toLocaleDateString("nl-NL", { day: "numeric", month: "short", year: "numeric" })}
                  author={{ name: a.author || "Redactie", credentials: "" }}
                />
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="bg-surface py-14">
        <div className="mx-auto max-w-7xl px-4 grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border border-border bg-background p-6">
            <Beaker size={22} className="text-accent" />
            <h3 className="mt-4 font-display text-xl text-text">Lab-getest per batch</h3>
            <p className="mt-2 text-sm text-text-muted">
              HPLC-zuiverheid ≥98%, monomeer ≥95%, endotoxine &lt;5 EU/mg. COA per batchcode.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-background p-6">
            <PackageCheck size={22} className="text-accent" />
            <h3 className="mt-4 font-display text-xl text-text">Gevriesdroogd &amp; stabiel</h3>
            <p className="mt-2 text-sm text-text-muted">
              Lyofiliseerd voor maximale opslag-stabiliteit. Neutrale verpakking, discreet verzonden.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-background p-6">
            <Truck size={22} className="text-accent" />
            <h3 className="mt-4 font-display text-xl text-text">Snel verzonden</h3>
            <p className="mt-2 text-sm text-text-muted">
              Betaling voor 15:00 werkdag = dezelfde dag verstuurd. NL &amp; BE gratis.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16">
        <p className="text-xs uppercase tracking-[0.15em] text-accent font-semibold">Veelgestelde vragen</p>
        <h2 className="mt-2 font-display text-3xl md:text-4xl">Direct antwoord</h2>
        <div className="mt-8">
          <FaqAccordion items={HOMEPAGE_FAQ.map((f) => ({ question: f.question, answer: f.answer }))} />
        </div>
      </section>

      <section className="bg-primary text-primary-foreground py-14">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <p className="text-xs uppercase tracking-wider text-accent-soft">Nieuwsbrief</p>
          <h2 className="mt-2 font-display text-3xl">Nieuwe peptiden &amp; onderzoek in je inbox</h2>
          <p className="mt-3 text-primary-foreground/70 text-sm">
            Krijg als eerste bericht bij nieuwe voorraden en aanbiedingen. Geen spam, unsubscribe met één klik.
          </p>
          <div className="mt-6 flex justify-center">
            <NewsletterForm variant="hero-mini" />
          </div>
        </div>
      </section>
    </>
  );
}
