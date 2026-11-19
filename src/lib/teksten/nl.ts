/**
 * De woordenlijst van Peptidehuis: de losse teksten van de site op één plek.
 *
 * Dit is de bron zolang niemand in shop-dash iets aanpast; wat daar wordt
 * gewijzigd komt er bij het renderen overheen (zie lib/teksten-server.ts uit
 * shop-core). Nieuwe tekst hoort hier en niet in een component.
 *
 * Let op: de verzendkostenregel in de mand vult het bedrag zelf in uit
 * VERZENDKOSTEN_CENTS; {bedrag} moet daarom in de tekst blijven staan.
 */
export const nl = {
  mand: {
    titel: "Winkelmand",
    leeg: "Je mand is leeg",
    overzicht: "Overzicht",
    subtotaal: "Subtotaal",
    bulkKorting: "Bulk-korting",
    kortingscode: "Kortingscode",
    totaal: "Totaal",
    naarCheckout: "Naar checkout",
    verzendkosten: "Verzendkosten vanaf {bedrag} euro per bestelling, anoniem en discreet verpakt.",
  },

  afrekenen: {
    titel: "Afrekenen",
    legeMand: "Lege mand.",
    naarWinkel: "Naar winkel",
    overzicht: "Overzicht",
    plaatsBestelling: "Plaats bestelling",
    bezig: "Bezig…",
    naBestellen:
      "Direct op de volgende pagina krijg je de betaalinstructies. Pakket verzonden zodra betaling binnen is.",
    fout: "Bestelling kon niet worden aangemaakt",
    verbindingsfout: "Verbindingsfout - probeer opnieuw",
  },

  contact: {
    kop: "Snelle antwoorden van ons team",
    intro:
      "Of het nu om een batch-COA, een retourvraag of een protocoladvies gaat: ons team reageert elke dag tussen 09:00 en 21:00.",
    chatKop: "Online chat",
    berichtKop: "Stuur ons een bericht",
    tijdenKop: "Openingstijden support",
  },
};

export type Teksten = typeof nl;
