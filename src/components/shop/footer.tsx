import Link from "next/link";
import { PaymentRow } from "@/components/payment-row";
import { NewsletterForm } from "@/components/newsletter-form";
import { FlaskConical, Mail, MapPin, Syringe } from "lucide-react";
import { mainCategories } from "./data";

export function Footer() {
  return (
    <footer className="mt-20 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-14 grid gap-12 lg:grid-cols-[1.2fr_3fr]">
        <div>
          <Link href="/" className="inline-flex items-center gap-2 font-display text-2xl">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-accent/15 text-accent ring-1 ring-accent/30">
              <Syringe size={18} strokeWidth={2.25} className="-rotate-45" />
            </span>
            <span className="leading-none">
              <span className="text-primary-foreground">Peptide</span>{" "}
              <span className="text-accent">Huis</span>
            </span>
          </Link>
          <p className="mt-3 text-sm text-primary-foreground/70 max-w-sm leading-relaxed">
            Onderzoekspeptiden met een COA per batch, verstuurd vanuit Nederland. Uitsluitend voor
            onderzoeksdoeleinden - niet voor menselijke consumptie.
          </p>
          <ul className="mt-5 space-y-2 text-sm text-primary-foreground/70">
            <li className="inline-flex items-center gap-2">
              <FlaskConical size={14} className="text-accent" /> Janoshik lab-getest · HPLC-zuiverheid per batch
            </li>
            <li>
              <Link href="/contact" className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-accent">
                <Mail size={14} className="text-accent" /> Contactformulier
              </Link>
            </li>
            <li className="inline-flex items-center gap-2">
              <MapPin size={14} className="text-accent" /> NL-magazijn · adres op de factuur
            </li>
          </ul>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h4 className="font-display text-base mb-3 text-primary-foreground">Peptiden</h4>
            <ul className="space-y-2 text-sm">
              {mainCategories.map((c) => (
                <li key={c.slug}>
                  <Link href={c.to} className="text-primary-foreground/70 hover:text-accent">
                    {c.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/winkel" className="text-accent hover:text-accent-soft">
                  Alle peptiden →
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-base mb-3 text-primary-foreground">Lab &amp; kwaliteit</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/lab" className="text-primary-foreground/70 hover:text-accent">Hoe wij testen</Link></li>
              <li><Link href="/lab" className="text-primary-foreground/70 hover:text-accent">COA per batch opvragen</Link></li>
              <li><Link href="/begrippenlijst" className="text-primary-foreground/70 hover:text-accent">Begrippenlijst</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-base mb-3 text-primary-foreground">Kennisbank</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/peptiden" className="text-primary-foreground/70 hover:text-accent">Peptiden A-Z</Link></li>
              <li><Link href="/reconstitutie-calculator" className="text-primary-foreground/70 hover:text-accent">Reconstitutie-calculator</Link></li>
              <li><Link href="/kennisbank" className="text-accent hover:text-accent-soft">Alle artikelen →</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-base mb-3 text-primary-foreground">Service</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/bezorging" className="text-primary-foreground/70 hover:text-accent">Bezorging</Link></li>
              <li><Link href="/retourneren" className="text-primary-foreground/70 hover:text-accent">Retourneren</Link></li>
              <li><Link href="/contact" className="text-primary-foreground/70 hover:text-accent">Contact</Link></li>
              <li><Link href="/over-ons" className="text-primary-foreground/70 hover:text-accent">Over ons</Link></li>
              <li><Link href="/voorwaarden" className="text-primary-foreground/70 hover:text-accent">Voorwaarden</Link></li>
              <li><Link href="/privacy" className="text-primary-foreground/70 hover:text-accent">Privacy</Link></li>
              <li><a href="/sitemap.xml" className="text-primary-foreground/70 hover:text-accent">Sitemap</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-soft">
        <div className="mx-auto max-w-7xl px-4 py-8 grid gap-6 lg:grid-cols-[1.4fr_1fr] items-start">
          <NewsletterForm variant="footer-mini" heading="Nieuwe COA's in je inbox" />
          <div className="lg:justify-self-end">
            <p className="text-xs uppercase tracking-[0.15em] text-primary-foreground/60 mb-2">Betaalmethoden</p>
            <PaymentRow />
          </div>
        </div>
      </div>

      <div className="border-t border-primary-soft bg-primary-soft/40">
        <div className="mx-auto max-w-7xl px-4 py-5 flex flex-wrap items-center justify-between gap-3 text-xs text-primary-foreground/60">
          <p>© {new Date().getFullYear()} peptidehuis B.V. · KvK + BTW-nummer op de factuur</p>
          <p>Producten voor onderzoeksdoeleinden in een laboratoriumomgeving.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
