"use client";
import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import Link from "next/link";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="rounded-md border border-primary-muted bg-primary p-6 text-primary-foreground lg:p-8"
    >
      <h2 className="font-display text-2xl text-primary-foreground">Stuur een bericht</h2>
      <p className="mt-2 text-sm text-primary-foreground/75">
        Reactie binnen 1 werkdag. Voeg je ordernummer toe als het om een lopende bestelling gaat.
      </p>

      {sent ? (
        <div className="mt-6 rounded-md border border-accent/30 bg-accent/10 p-5 text-sm text-primary-foreground">
          <ShieldCheck size={18} className="text-accent" />
          <p className="mt-2 font-medium">Bedankt, je bericht staat in onze inbox.</p>
          <p className="mt-1 text-primary-foreground/75">
            We reageren binnen 1 werkdag op het door jou opgegeven e-mailadres. Voor spoed gebruik je de live chat.
          </p>
        </div>
      ) : (
        <div className="mt-6 grid gap-4">
          <label className="block">
            <span className="block text-sm font-medium text-primary-foreground mb-1.5">Naam</span>
            <input
              required
              placeholder="Voor- en achternaam"
              className="w-full h-11 px-3 rounded border border-primary-muted bg-primary-soft text-sm text-primary-foreground placeholder:text-primary-foreground/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            />
          </label>
          <label className="block">
            <span className="block text-sm font-medium text-primary-foreground mb-1.5">E-mail</span>
            <input
              type="email"
              required
              placeholder="jij@voorbeeld.nl"
              className="w-full h-11 px-3 rounded border border-primary-muted bg-primary-soft text-sm text-primary-foreground placeholder:text-primary-foreground/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            />
          </label>
          <label className="block">
            <span className="block text-sm font-medium text-primary-foreground mb-1.5">Ordernummer (optioneel)</span>
            <input
              placeholder="ANP-00012345"
              className="w-full h-11 px-3 rounded border border-primary-muted bg-primary-soft text-sm text-primary-foreground placeholder:text-primary-foreground/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            />
          </label>
          <div>
            <label className="block text-sm font-medium text-primary-foreground mb-1.5">Onderwerp</label>
            <select className="w-full h-11 px-3 rounded border border-primary-muted bg-primary-soft text-sm text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
              <option>Vraag over een bestelling</option>
              <option>Lab- of COA-vraag</option>
              <option>Retour aanmelden</option>
              <option>Productadvies</option>
              <option>Anders</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-primary-foreground mb-1.5">Bericht</label>
            <textarea
              rows={5}
              required
              placeholder="Beschrijf je vraag zo concreet mogelijk."
              className="w-full px-3 py-2.5 rounded border border-primary-muted bg-primary-soft text-sm text-primary-foreground placeholder:text-primary-foreground/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            />
          </div>
          <div className="flex items-center justify-between gap-4 pt-2">
            <p className="text-xs text-primary-foreground/55">
              Door te versturen ga je akkoord met onze{" "}
              <Link href="/privacy" className="text-accent hover:underline">privacyverklaring</Link>.
            </p>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded bg-accent px-5 h-11 text-sm font-semibold text-accent-foreground hover:bg-accent-soft"
            >
              Verstuur bericht
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
