# CLAUDE.md

Brief voor Claude Code werk in de anabolenpro-nextjs repo.

## Commands

```bash
npm run dev      # next dev (http://localhost:3000)
npm run build    # next build
npm run lint     # next lint (eslint-config-next 14)
```

Geen test runner. Content-management + images gaan via het shop-dash sister-repo (`../shop-dash`).

## Wat dit is

Publieke Next.js webshop voor **anabolenpro.com**. Live via Vercel op zowel productie-domein als preview `anabolenpro-site.vercel.app`. Klant: Nederlandse anabolen webshop, "professionals + eerlijk over lab-data + Janoshik test per batch".

Data leeft in Supabase (`rexqfwibxawqnvrzbdoo` eu-west-1) — dezelfde database als **shop-dash** (admin dashboard + 3-agent blog pipeline). Alle content (blogs, product-catalog, categorieën, shop-config incl. `payment_instructions`, order-flow) leest deze site direct uit die DB. Zie [../shop-dash/CLAUDE.md](../shop-dash/CLAUDE.md) voor admin/content-side.

Shop-slug voor deze site: `anabolenpro` — shop_id = `18a96da9-9f9f-466f-ac2b-3ab0349b78a6`.

## Architectuur

Next.js 14 App Router, TypeScript strict, Tailwind. Path alias `@/*` → `./src/*`. UI is Nederlands. Zwaar SSR — heel weinig client-components.

### Routing

- `/` — home (hero + category tiles + featured products + stof-cards + PCT-cards + FAQ + trust)
- `/winkel` + `/winkel/[categorie]` — catalog met sidebar filters (merk / stof / verzendlocatie / beschikbaarheid)
- `/product/[categorie]/[slug]` — product-detail (gallery, USPs, AddToCart, sections, reviews, related)
- `/[stof]` — kennis-pagina per stof (testosteron, trenbolone, anavar, dianabol, masteron, etc). 13 stof-slugs, statisch in `src/components/shop/data.ts` als `categoryContent`. Iedere stof-page rendert nu een `resultImage` (bodybuilder physique-match) + PubMed-bronnen uit `verified-sources.ts`.
- `/kennisbank` + `/kennisbank/[slug]` — blogs uit Supabase `blog_posts` waar `is_published = true`.
- `/onderzoek/[slug]` → **301 redirect naar `/kennisbank/[slug]`** (shop-dash agent bouwt intern `/onderzoek/` URLs).
- `/checkout` → `/checkout/bedankt/[orderId]` — bank-transfer + crypto uit `shops.payment_instructions` JSONB. Bedankt-page laat screenshot upload zien.
- `/account`, `/account/login`, `/account/orders/[id]` — noindex.
- Info pages: `/lab`, `/keuzehulp`, `/risicos-en-bijwerkingen`, `/bezorging`, `/retourneren`, `/voorwaarden`, `/cookies`, `/privacy`, `/contact`, `/over-ons`.

### Images: /img/* rewrite

`next.config.js` heeft **`/img/:path* → ${SUPABASE_URL}/storage/v1/object/public/blog-images/:path*`** rewrite (commit 5df74b6). Reden: klant wil in view-source geen Supabase URL zien. Iedere `image_url` in DB + hardcoded URLs in `data.ts` gebruikt nu relatieve `/img/...` paths, en OG-meta absolutiseert via `layout.metadataBase = https://anabolenpro.com`. Als je image URLs schrijft, gebruik **altijd `/img/`** — niet Supabase.

Idem `/media/:path*` voor `product-media/anabolenpro` bucket (foto's per product).

### Cart & checkout

`src/lib/cart-context.tsx` — client-side cart in localStorage. Elk cart-item krijgt een `shipping_method` op basis van `tags.includes("UT")` (UT = Locatie 01, rest = Locatie 02). Zie `src/lib/shipping.ts` — €10 per locatie, mix van beide = 2× €10.

Checkout POST → `/api/orders` → verifieert + berekent shipping + insert `orders` row → returns `order_id` → redirect `/checkout/bedankt/[orderId]`.

Bedankt-page toont IBAN + crypto uit `shops.payment_instructions` JSONB. Klant kan screenshot uploaden via `/api/payment-screenshot` (lazy Supabase client + `export const dynamic="force-dynamic"` — anders faalt Vercel build op env collectie).

### Filters

- **Merk**: `tags.includes(brand)` — brand codes zoals `UT`, `UP`, `LYY`, `AP`, `PR`, `Pharmacom` etc. Zie `src/lib/brands.ts` voor `BRAND_ORDER` + label mapping (bijv. `UT → Utinon`).
- **Stof**: `stof_slugs.includes(slug)` — TEXT[] kolom in DB (migratie 046). Auto-populated per naam-pattern. Dekt aliases (Parabolan→trenbolone, DHB→boldenone, Turinabol/Oxymetholone→dianabol, Sustanon/blends→testosteron).
- **Verzendlocatie**: `?locatie=01|02` → filter op UT-tag.
- **Beschikbaarheid**: `?stock=1` → alleen `availability !== "OutOfStock"`.

**Belangrijk**: `products.tags` mag ALLEEN brand codes bevatten — geen stof-namen zoals "Boldenone Undecylenate" (migratie 045 stripte die). ProductCard toont `tags[0]` als badge.

### Sortering

`sortProducts()` in `src/lib/queries.ts`: UT eerst, dan UP, dan rest. Binnen elk stof-cluster: goedkoopste eerst.

### SEO / indexing

- `layout.tsx` — `robots: { index: true, follow: true }` (live sinds commit d2f91a5)
- Individuele pagina's die noindex zijn: `/checkout/bedankt/[orderId]`, en producten met `p.noindex === true` (bijv. UP producten met canonical naar UT-equivalent)
- `app/sitemap.ts` — dynamische sitemap (blogs + categorieën + producten + stof-pages)
- `app/robots.ts` — leest `shops.noindex` uit DB; als true → block-all. Voor anabolenpro is `noindex=false` gezet.
- `app/llms.txt/route.ts` — machine-readable index voor LLM-crawlers (Anthropic Claude, Perplexity, ChatGPT) — alleen UT-producten (canonical-safe).
- E-E-A-T: iedere blog rendert `author_info` byline + medical disclaimer + ProfilePage JSON-LD.

## Content quirks

### Verified sources per stof (`src/components/shop/verified-sources.ts`)

Auto-gegenereerd door `../shop-dash/scripts/build-stof-sources.mjs`. NIET handmatig citaten schrijven — dat gaf mismatches met PMIDs. Iedere entry komt via ESEARCH + ESUMMARY + title-based post-filter (must-include stof-naam, exclude off-topic velden zoals veterinary/meat-science/breast-cancer-adjuvant).

Rebuild: `cd ../shop-dash && node scripts/build-stof-sources.mjs > ../anabolenpro-nextjs/src/components/shop/verified-sources.ts`

### Blog `Bronnen` block

Elke gepubliceerde blog moet een `<h2>Bronnen</h2>` block hebben met **klikbare** `<li><a href="pubmed...">Author (Year) — Title — Journal</a></li>` items. Plain-text items waren GPT-hallucinaties — gefixt via `../shop-dash/scripts/fix-blog-bronnen-links.mjs` (per-slug curated PubMed query + must-include filter).

### Result-image per stof

Elke stof heeft naast `heroImage` ook een `resultImage` — bodybuilder physique-match met de typische look die die stof geeft (dianabol=puffy full, masteron=droog hard, trenbolone=shredded, anavar=man+vrouw samen, etc). SEO alt-tekst met "kuur resultaat" + stof-naam als keywords. Sectie rendert tussen key-facts en long-content op iedere `/[stof]` page.

### Images verwerking

Alles WebP q82 via sharp (Supabase gecomprimeerd 75 MB → 2 MB, −97%). Regen-scripts in `../shop-dash/scripts/`:
- `regen-oldstyle-heros.mjs` — 8 category heros editorial daylight
- `regen-cat-subjects.mjs` — 4 category subjects met bodybuilders (afvallen/erectie/kuur/pillen)
- `regen-3-subjects.mjs` — 3 category subjects update (erectiemiddelen/pillen/injectie)
- `generate-stof-results.mjs` — 13 stof-resultaat + 4 category-heavy bodybuilder scenes
- `compress-bucket-images.mjs` — bulk PNG → JPEG q82 mozjpeg

DALL-E content-policy triggert soms op `shirtless` + `intimate bedroom` + `sexy` → gebruik "tank top", "elegant dressed woman", "warm living room".

## Live-data rules

Elke pagina die DB-data leest gebruikt `export const dynamic = "force-dynamic"` en/of `revalidate = 0` — de klant is allergisch voor stale cache. Zie `src/app/winkel/page.tsx` en `src/app/winkel/[categorie]/page.tsx`.

## Tables (Supabase, gedeeld met shop-dash)

Deze site leest (nooit schrijft, behalve orders + payment-screenshots + restock-notifications + support-tickets):

- `products` — met kolommen `stof_slugs TEXT[]` (migratie 046), `tags TEXT[]` (brand codes only), `stock_status`, `noindex`, `canonical_url` (UP → UT-equivalent).
- `categories` — `slug, name, description, hero_image, meta_title, meta_description, sort_order`.
- `blog_posts` — `slug, title, body, image_url, image_alt, is_published, published_at, author_id, category, meta_*`.
- `orders` — insert vanaf checkout, status flow via shop-dash admin.
- `payment_screenshots` — screenshot upload naar privé bucket + signed URL.
- `restock_notifications` — UNIQUE(product_id, email).
- `shops` — leest `payment_instructions JSONB`, `noindex`, `maintenance_mode`, `domain`.

## Env vars

| Var | Notes |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Fallback in `src/lib/supabase.ts` — werkt zonder env |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Fallback hardcoded — RLS-policies scoping alles naar shop_id |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only, alleen `/api/payment-screenshot` gebruikt 'm |

## Git

Identity: `kimsmitxxx-ops <kimsmitxxx@gmail.com>`. Pass inline via `-c user.name= -c user.email=` — do NOT `git config`. Token in `C:\Users\Administrator\Downloads\gh-token.txt`.

Repo: [github.com/kimsmitxxx-ops/anabolenpro-site](https://github.com/kimsmitxxx-ops/anabolenpro-site). Vercel deployt automatisch op push naar main.

## Cross-repo workflow

- **Blog + content changes** → shop-dash admin UI of scripts, DB in Supabase, deze site rendert automatisch via revalidate.
- **UI / component changes** → deze repo direct.
- **Image regen** → scripts in `../shop-dash/scripts/`, uploads naar Supabase Storage, refs in `data.ts` + DB updaten.
- **Supabase migrations** → altijd in `../shop-dash/supabase/NNN-name.sql` en runnen via `node scripts/run-migration-api.js supabase/NNN-name.sql`. Volgnummer 046 als laatst.
