# CLAUDE.md

Brief voor Claude Code werk in de peptidehuis-web repo.

## Commands

```bash
npm run dev      # next dev (http://localhost:3000)
npm run build    # next build
npm run lint     # next lint (eslint-config-next 14)
```

Content-management gaat via het shop-dash sister-repo (`../shop-dash`).

## Wat dit is

Publieke Next.js webshop voor **peptidehuis.nl** — 30+ onderzoeks-peptiden voor genezing, vetverlies, spiergroei, cognitie, libido, huid en longevity, plus bundels en onderzoeksbenodigdheden. Gebouwd op het gedeelde webshop-theme van de andere shops, met een eigen **clinical navy + kobaltblauw** palet en categorie-tegels met Lucide lijn-icons. Het theme is volledig ontdaan van vorige-shop-vocabulaire en herbruikbaar voor nieuwe shops (palet = tokens in `globals.css`, categorieën + icons = `src/components/shop/data.ts`, shop_id op 3 plekken: `lib/queries.ts`, `api/orders`, `api/reviews`, `components/whatsapp-fab.tsx`).

Data leeft in Supabase (`rexqfwibxawqnvrzbdoo` eu-west-1). Alle content (blogs, product-catalog, categorieën, shop-config incl. `payment_instructions`, order-flow) leest deze site direct uit die DB.

Shop-slug: `peptidehuis` — shop_id = `42ddf952-d3c1-4c81-8029-7b4c54a84913`.

## Product-catalog

Volledige catalogus (42 producten incl. bundels + benodigdheden) beheerd via
`../shop-dash/scripts/seed-peptidehuis-catalog.mjs` — idempotent, upsert op slug.
9 categorieën: genezing / vetverlies / spiergroei / cognitie / libido /
huid-bruining / longevity / bundels / benodigdheden. Elk product heeft
long_description, specifications (Record<string,string>), faqs, usps, meta.
Blogs seeden via `../shop-dash/scripts/seed-peptidehuis-blogs.mjs`.

Productfoto's ontbreken nog; fallback is `/assets/vial-placeholder.jpg`
(stijl A uit `/assets/style-samples/`).

## Architectuur

Next.js 14 App Router, TypeScript strict, Tailwind. Path alias `@/*` → `./src/*`. UI is Nederlands.

### Verwijderde routes (t.o.v. de theme-basis)

- `/[stof]` — stof-pagina's van de vorige shop — niet van toepassing
- `/keuzehulp` — wizard van de vorige shop
- `/risicos-en-bijwerkingen` — shop-specifieke copy van de vorige shop

### Stof-pagina's (/peptiden/[stof]) + calculator

- `/peptiden` = index; `/peptiden/<slug>` = per-stof SEO-gids (werking, onderzoek
  met geverifieerde PubMed/NEJM-bronnen, protocol, reconstitutie, LLM-FAQ met
  FAQPage JSON-LD, product-CTA's in de sidebar). Data in `src/lib/stoffen/`
  (data-a.ts + data-b.ts, 12 stoffen). Productpagina's cross-linken automatisch
  via `stofForProductSlug()`. In sitemap + llms.txt opgenomen.
- Nog geen gids voor: KPV, Thymosin Alpha-1, HGH-frag, IGF-1 LR3, ACE-031,
  MOTS-c, DSIP, P21, PE 22-28, SNAP-8, MT-1, Oxytocine, Epithalon, NAD+,
  Humanin, Kisspeptin, SS-31, Glutathion - zelfde patroon, toevoegen in data-b.
- `/reconstitutie-calculator` = client-side U100-rekentool
  (`src/components/reconstitutie-calculator.tsx`).

## Content-tone

Informatief, wetenschappelijk maar toegankelijk. Doelgroep: biochemici, onderzoekers, biohackers 25-45. Concrete peptide-namen + werkingsmechanismen. Nadruk op HPLC-zuiverheid, COA per batch, gevriesdroogde stabiliteit. Uitsluitend voor onderzoeksdoeleinden — niet voor humane consumptie.

Bedrijfsprofiel staat in `../shop-dash` → cron_schedules waar `slug=peptidehuis AND agent_type=blog_writer`.

## Live-data rules

`dynamic = "force-dynamic"` + `revalidate = 0` op alle DB-pagina's.

## Env vars

Zelfde als de andere shop-repos — Supabase URL + anon key + service role (zie `.env.example`).

## Git

Identity: `kimsmitxxx-ops <kimsmitxxx@gmail.com>`. Token in `C:\Users\Administrator\Downloads\gh-token.txt`.

Repo: [github.com/kimsmitxxx-ops/peptidehuis-web](https://github.com/kimsmitxxx-ops/peptidehuis-web).
