import { VERZENDKOSTEN_CENTS } from "@/lib/shipping";

/**
 * Vragen over prijs en levering, per product opgebouwd uit de actuele gegevens.
 *
 * Bewust niet als vaste tekst in de stof-data: een prijs die met de hand in een
 * gids staat gaat vroeg of laat afwijken van wat er in de winkelwagen komt.
 * Deze vragen vangen de zoekopdrachten "<stof> prijs" en "<stof> belgie" op de
 * stofpagina zelf op, zodat daar geen losse dunne pagina voor nodig is.
 */

const euro = (cents: number) => "€ " + (cents / 100).toFixed(2).replace(".", ",");

export type Faq = { q: string; a: string };

export function commercieleFaqs(p: {
  name: string;
  price_cents: number;
  availability?: string | null;
}): Faq[] {
  const uitverkocht = p.availability === "OutOfStock";
  const faqs: Faq[] = [];

  faqs.push({
    q: `Wat kost ${p.name}?`,
    a: uitverkocht
      ? `De laatste prijs was ${euro(p.price_cents)} per vial. Zodra de nieuwe batch binnen is staat de actuele prijs hier; laat je e-mailadres achter op deze pagina als je bericht wilt.`
      : `${euro(p.price_cents)} per vial. Vanaf 5 stuks gaat er 10 procent af en vanaf 10 stuks 15 procent, automatisch verrekend in de winkelwagen.`,
  });

  faqs.push({
    q: `Kan ik ${p.name} in Belgie bestellen?`,
    a: `Ja. We versturen vanuit Nederland naar heel Belgie voor ${euro(VERZENDKOSTEN_CENTS.BE)} per bestelling, doorgaans 1 tot 3 werkdagen na verzending. Binnen Nederland is het ${euro(VERZENDKOSTEN_CENTS.NL)} en meestal de volgende werkdag.`,
  });

  if (!uitverkocht) {
    faqs.push({
      q: `Hoe snel heb ik ${p.name} in huis?`,
      a: "Betaal je op een werkdag voor 15:00, dan gaat het pakket dezelfde dag de deur uit. Nederland is daarna meestal een werkdag, Belgie 1 tot 3 werkdagen. Alles wordt neutraal verpakt verstuurd, zonder productnaam op het label.",
    });
  }

  return faqs;
}
