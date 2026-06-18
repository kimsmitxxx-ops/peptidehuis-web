# anabolenpro.com — Next.js productie site

Next.js 14 App Router. Data live uit Supabase shop `anabolenpro` via scoped
anon JWT (shop_id claim) — RLS isoleert deze site automatisch.

## Architectuur

- **ISR** op alle pages (`export const revalidate = 300/600/3600`)
- **On-demand revalidate** via `/api/revalidate` (shop-dash POSTs hierheen na admin save)
- **Clean URLs**:
  - `/winkel` — full catalog
  - `/winkel/[categorie]` — categorie listing
  - `/product/[categorie]/[slug]` — product detail
  - `/[stof]` — info-page per stof (anavar, dianabol, etc) met producten
  - `/kennisbank` + `/kennisbank/[slug]` — blogs
- **SEO** — `sitemap.xml` + `robots.txt` + `llms.txt` allemaal DB-driven
- **Cart** — client-only (localStorage), checkout server-side naar Supabase orders
- **Auth** — Supabase magic-link, long-session via cookie middleware
- **Media** — `/media/*` rewrite naar Supabase Storage `product-media/anabolenpro/*`

## Setup

```bash
cp .env.example .env.local      # vul JWT in
npm install
npm run dev
```

## Deploy

1. Vercel: importeer repo
2. Env vars uit `.env.example`
3. Deploy
4. Koppel domein anabolenpro.com via shop-dash

## SEO

- `robots.txt` leest `shops.noindex` uit DB — toggle live aan/uit via dashboard
- `sitemap.xml` lijst alle products + categorieën + blogs auto-generated
- `llms.txt` — manifest voor AI-crawlers (GPTBot, ClaudeBot, PerplexityBot)
- Schema.org JSON-LD per product (`Product` + `Offer`) en categorie (`CollectionPage` + `ItemList`)
