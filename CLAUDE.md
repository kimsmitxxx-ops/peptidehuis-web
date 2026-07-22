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

Publieke Next.js webshop voor **peptidehuis.nl** — de top 20 onderzoeks-peptiden voor genezing, vetverlies, spiergroei, cognitie en longevity. Fork van anabolenpro-nextjs met een warm cream + champagne gold palette (retakopen-verwant maar aparte identiteit).

Data leeft in Supabase (`rexqfwibxawqnvrzbdoo` eu-west-1). Alle content (blogs, product-catalog, categorieën, shop-config incl. `payment_instructions`, order-flow) leest deze site direct uit die DB.

Shop-slug: `peptidehuis` — shop_id = `42ddf952-d3c1-4c81-8029-7b4c54a84913`.

## Product-catalog

20 peptiden geseed via `../shop-dash/scripts/seed-kamagra-peptide-shops.mjs`:

**Genezing:** BPC-157, TB-500, KPV, GHK-Cu
**Vetverlies:** Retatrutide, Semaglutide, Tirzepatide, HGH Fragment 176-191
**Spiergroei / GH:** CJC-1295 no-DAC, Ipamorelin, MOTS-c
**Cognitie / stemming:** Selank, Semax, DSIP, PT-141
**Longevity:** Epithalon, Thymosin Alpha-1, NAD+, Humanin, Kisspeptin-10

## Architectuur

Next.js 14 App Router, TypeScript strict, Tailwind. Path alias `@/*` → `./src/*`. UI is Nederlands.

### Verwijderde routes (t.o.v. anabolenpro-basis)

- `/[stof]` — AAS-stof pagina's — niet van toepassing op peptiden
- `/keuzehulp` — AAS kuur wizard
- `/risicos-en-bijwerkingen` — anabolen-specifieke bloedwerk-copy

### Nog aan te vullen

- Peptide-specifieke stof-pages (per top-20 peptide met werkingsmechanisme, halfwaardetijd, protocol)
- Reconstitutie-calculator (BAC water + peptide mg -> U100 streepjes)

## Content-tone

Informatief, wetenschappelijk maar toegankelijk. Doelgroep: biochemici, onderzoekers, biohackers 25-45. Concrete peptide-namen + werkingsmechanismen. Nadruk op HPLC-zuiverheid, COA per batch, gevriesdroogde stabiliteit. Uitsluitend voor onderzoeksdoeleinden — niet voor humane consumptie.

Bedrijfsprofiel staat in `../shop-dash` → cron_schedules waar `slug=peptidehuis AND agent_type=blog_writer`.

## Live-data rules

`dynamic = "force-dynamic"` + `revalidate = 0` op alle DB-pagina's.

## Env vars

Zelfde als anabolenpro-nextjs — Supabase URL + anon key + service role.

## Git

Identity: `kimsmitxxx-ops <kimsmitxxx@gmail.com>`. Token in `C:\Users\Administrator\Downloads\gh-token.txt`.

Repo: [github.com/kimsmitxxx-ops/peptidehuis-web](https://github.com/kimsmitxxx-ops/peptidehuis-web).
