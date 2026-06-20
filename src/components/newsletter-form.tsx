"use client";
import { useState, type FormEvent } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

export type NewsletterFormVariant = "default" | "footer-mini";

export interface NewsletterFormProps {
  variant?: NewsletterFormVariant;
  heading?: string;
  subhead?: string;
  className?: string;
  onSubmit?: (email: string) => void;
}

const PRIVACY = "We sturen je 1-2 mails per maand · uitschrijven kan altijd";

export function NewsletterForm({
  variant = "default",
  heading = "Onderzoek in je inbox",
  subhead = "Studies, batch-updates en nieuwe COA's — zonder verkoopgedoe.",
  className,
  onSubmit,
}: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const handle = (e: FormEvent) => {
    e.preventDefault();
    onSubmit?.(email);
  };

  if (variant === "footer-mini") {
    return (
      <form onSubmit={handle} className={cn("flex flex-col gap-2 w-full max-w-md", className)}>
        <div className="flex gap-2">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="je@email.nl"
            className="flex-1 h-11 px-3 rounded border border-border bg-surface text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          />
          <Button type="submit" size="md">Inschrijven</Button>
        </div>
        <p className="text-xs text-text-subtle">{PRIVACY}</p>
      </form>
    );
  }

  return (
    <div className={cn("rounded-lg border border-border bg-surface p-6 md:p-8 shadow-card", className)}>
      <h3 className="font-display text-2xl text-text">{heading}</h3>
      <p className="mt-2 text-sm text-text-muted max-w-md">{subhead}</p>
      <form onSubmit={handle} className="mt-5 flex flex-col sm:flex-row gap-2 max-w-md">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="je@email.nl"
          className="flex-1 h-11 px-3 rounded border border-border bg-background text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        />
        <Button type="submit" size="md">Inschrijven</Button>
      </form>
      <p className="mt-3 text-xs text-text-subtle">{PRIVACY}</p>
    </div>
  );
}

export default NewsletterForm;
