/**
 * Opmaak-helpers zonder afhankelijkheden.
 *
 * formatEUR stond in lib/queries.ts, en dat bestand maakt de Supabase-client
 * aan. Vijf client-componenten (winkelmand, checkout, twee cart-drawers, de
 * add-to-cart-knop) importeerden alleen dit ene functietje daaruit, waardoor de
 * hele Supabase-client inclusief URL en sleutel in de JS-bundle van bijna elke
 * pagina belandde. Vandaar een eigen bestand: wat de browser nodig heeft, hoort
 * niets van de database te weten.
 *
 * lib/queries.ts exporteert het door, zodat server-code niets hoeft te wijzigen.
 *
 * Let op: dit rekent met centen. components/lib/format.ts heeft een
 * gelijknamige functie die met hele euro's rekent; die blijft waar hij staat.
 */

export const formatEUR = (cents: number) =>
  new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(cents / 100);
