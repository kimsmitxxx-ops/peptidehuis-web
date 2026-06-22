"use client";
import Link from "next/link";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { mainCategories, categoriesByGroup } from "./data";
import { Store, BookOpen, FlaskConical, Mail, User, ChevronRight } from "lucide-react";

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}

export function MobileMenuDrawer({ open, onOpenChange }: Props) {
  const anabolen = categoriesByGroup("anabolen");
  const pct = categoriesByGroup("pct");
  const close = () => onOpenChange(false);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-[88%] max-w-sm p-0 flex flex-col bg-primary text-primary-foreground">
        <header className="px-5 py-4 border-b border-primary-soft">
          <SheetTitle className="font-display text-lg text-primary-foreground">Menu</SheetTitle>
        </header>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">
          <section>
            <p className="text-[10px] uppercase tracking-[0.18em] text-accent-soft font-semibold mb-2">Winkel</p>
            <ul className="space-y-0.5">
              {mainCategories.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={c.to}
                    onClick={close}
                    className="flex items-center justify-between px-2 py-2 rounded text-sm text-primary-foreground/85 hover:bg-primary-soft hover:text-accent"
                  >
                    <span>{c.name}</span>
                    <ChevronRight size={14} className="text-primary-foreground/40" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <p className="text-[10px] uppercase tracking-[0.18em] text-accent-soft font-semibold mb-2">Anabolen per stof</p>
            <ul className="grid grid-cols-2 gap-x-2">
              {anabolen.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/${c.slug}`}
                    onClick={close}
                    className="block px-2 py-1.5 rounded text-sm text-primary-foreground/80 hover:bg-primary-soft hover:text-accent"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <p className="text-[10px] uppercase tracking-[0.18em] text-accent-soft font-semibold mb-2">PCT</p>
            <ul className="grid grid-cols-2 gap-x-2">
              {pct.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/${c.slug}`}
                    onClick={close}
                    className="block px-2 py-1.5 rounded text-sm text-primary-foreground/80 hover:bg-primary-soft hover:text-accent"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="border-t border-primary-soft pt-4">
            <ul className="space-y-0.5">
              <li>
                <Link href="/winkel" onClick={close} className="flex items-center gap-3 px-2 py-2.5 rounded text-sm text-primary-foreground/85 hover:bg-primary-soft hover:text-accent">
                  <Store size={16} className="text-accent" /> Volledige winkel
                </Link>
              </li>
              <li>
                <Link href="/kennisbank" onClick={close} className="flex items-center gap-3 px-2 py-2.5 rounded text-sm text-primary-foreground/85 hover:bg-primary-soft hover:text-accent">
                  <BookOpen size={16} className="text-accent" /> Kennisbank
                </Link>
              </li>
              <li>
                <Link href="/lab" onClick={close} className="flex items-center gap-3 px-2 py-2.5 rounded text-sm text-primary-foreground/85 hover:bg-primary-soft hover:text-accent">
                  <FlaskConical size={16} className="text-accent" /> Labtesten
                </Link>
              </li>
              <li>
                <Link href="/contact" onClick={close} className="flex items-center gap-3 px-2 py-2.5 rounded text-sm text-primary-foreground/85 hover:bg-primary-soft hover:text-accent">
                  <Mail size={16} className="text-accent" /> Contact
                </Link>
              </li>
              <li>
                <Link href="/account" onClick={close} className="flex items-center gap-3 px-2 py-2.5 rounded text-sm text-primary-foreground/85 hover:bg-primary-soft hover:text-accent">
                  <User size={16} className="text-accent" /> Account
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
}
