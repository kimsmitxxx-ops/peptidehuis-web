# peptidehuis.nl — Next.js productie site

Next.js 14 App Router. Data live uit Supabase shop `peptidehuis` via de anon
key (RLS-policy migratie 049 in shop-dash staat publieke reads toe).

## Stack

- Next.js 14 (App Router) + TypeScript strict + Tailwind
- Supabase (gedeeld project met shop-dash) — producten, categorieën, blogs,
  orders, analytics
- Huisstijl: clinical navy + kobaltblauw, Lucide lijn-icons per categorie

## Belangrijkste onderdelen

- **Winkel** — `/winkel` + `/winkel/[categorie]` met filters, `/product/[categorie]/[slug]`
- **Kennisbank** — `/kennisbank` leest blog_posts uit Supabase
- **Lab** — `/lab` COA-opvraag per batchcode + eigen-test aanvraag
- **Checkout** — orders via service-role key, betaalinstructies uit de shops-rij
- **Media** — `/media/*` rewrite naar Supabase Storage `product-media/peptidehuis/*`

## Lokaal draaien

```bash
npm install
npm run dev   # http://localhost:3000
```

Content-management en seed-scripts leven in het sister-repo `../shop-dash`
(`scripts/seed-peptidehuis-catalog.mjs`, `scripts/seed-peptidehuis-blogs.mjs`).

Zie CLAUDE.md voor de volledige repo-briefing.
