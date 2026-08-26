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

Publieke Next.js webshop voor **peptidehuis.nl** — 30+ onderzoeks-peptiden voor genezing, vetverlies, spiergroei, cognitie, libido, huid en longevity, plus bundels en onderzoeksbenodigdheden. Fork van anabolenpro-nextjs met een **clinical navy + kobaltblauw** palet (peptidecenter-inspiratie) en categorie-tegels met Lucide lijn-icons.

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
