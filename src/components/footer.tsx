import Link from "next/link";
import { ShieldCheck, Truck, FlaskConical, Lock } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-paper-border bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <h3 className="font-display text-lg">anabolenpro</h3>
            <p className="mt-3 text-sm text-primary-foreground/70 leading-relaxed">
              Lab-getest, anoniem verzonden vanaf NL-magazijn. Geen tussenpartijen, geen marketing-bullshit.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Catalogus</h4>
            <ul className="mt-3 space-y-2 text-sm text-primary-foreground/70">
              <li><Link href="/winkel/pillen" className="hover:text-accent">Pillen & tabletten</Link></li>
              <li><Link href="/winkel/injectie" className="hover:text-accent">Injecties</Link></li>
              <li><Link href="/winkel/nakuur" className="hover:text-accent">Nakuur (PCT)</Link></li>
              <li><Link href="/winkel/kuur-pakketten" className="hover:text-accent">Kuurpakketten</Link></li>
              <li><Link href="/winkel/afvallen" className="hover:text-accent">Afvallen</Link></li>
              <li><Link href="/winkel/erectiemiddelen" className="hover:text-accent">Erectiemiddelen</Link></li>
              <li><Link href="/winkel/hgh-peptides" className="hover:text-accent">HGH & Peptides</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Info</h4>
            <ul className="mt-3 space-y-2 text-sm text-primary-foreground/70">
              <li><Link href="/kennisbank" className="hover:text-accent">Kennisbank</Link></li>
              <li><Link href="/lab" className="hover:text-accent">Lab tests</Link></li>
              <li><Link href="/bezorging" className="hover:text-accent">Bezorging</Link></li>
              <li><Link href="/retourneren" className="hover:text-accent">Retourneren</Link></li>
              <li><Link href="/contact" className="hover:text-accent">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Juridisch</h4>
            <ul className="mt-3 space-y-2 text-sm text-primary-foreground/70">
              <li><Link href="/voorwaarden" className="hover:text-accent">Voorwaarden</Link></li>
              <li><Link href="/privacy" className="hover:text-accent">Privacy</Link></li>
              <li><Link href="/over-ons" className="hover:text-accent">Over ons</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 grid gap-4 border-t border-primary-muted pt-6 md:grid-cols-4">
          {[
            { icon: Truck, label: "24u verzending NL" },
            { icon: ShieldCheck, label: "Anoniem verpakt" },
            { icon: FlaskConical, label: "Janoshik lab-getest" },
            { icon: Lock, label: "SEPA + track & trace" },
          ].map((x, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-primary-foreground/70">
              <x.icon className="h-4 w-4 text-accent" /> {x.label}
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-[11px] text-primary-foreground/50">
          © {new Date().getFullYear()} AnabolenPro — Voor onderzoeksdoeleinden.
        </p>
      </div>
    </footer>
  );
}
