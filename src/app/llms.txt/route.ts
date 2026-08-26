import { listCategories, listBlogPosts, listProducts, getShop } from "@/lib/queries";

export const revalidate = 3600;

/**
 * /llms.txt - AI-crawler manifest per llmstxt.org spec.
 * Bevat shop-identiteit + diepte-links naar categorie-, product- en
 * kennisbank-content.
 */
export async function GET() {
  const [shop, categories, products, blogs] = await Promise.all([
    getShop().catch(() => null),
    listCategories(),
    listProducts({ limit: 200 }),
    listBlogPosts(50),
  ]);

  const indexableProducts = products.filter((p: any) => p.noindex !== true);

  const lines: string[] = [];
  lines.push("# Peptidehuis");
  lines.push("");
  lines.push("> Nederlandse webshop voor onderzoekspeptiden: de top 20 peptiden voor genezing, vetverlies, spiergroei, cognitie en longevity. Iedere batch lab-getest bij Janoshik Analytical (HPLC), COA per batchcode. Anoniem verpakt vanaf NL-magazijn, snelle verzending. Uitsluitend voor onderzoeksdoeleinden - niet voor menselijke consumptie. Voor onderzoekers en biohackers die info zoeken over werkingsmechanismen, halfwaardetijden en reconstitutie.");
  lines.push("");
  lines.push("## Catalogus");
  lines.push("");
  for (const c of categories) {
    lines.push(`- [${c.name}](https://peptidehuis.nl/winkel/${c.slug}): ${c.description || c.name}`);
  }
  if (indexableProducts.length > 0) {
    lines.push("");
    lines.push("## Producten (lab-getest per batch)");
    lines.push("");
    for (const p of indexableProducts) {
      const catSlug = (p as any).categories?.slug || "winkel";
      const blurb = p.subtitle || p.description || p.name;
      lines.push(`- [${p.name}](https://peptidehuis.nl/product/${catSlug}/${p.slug}): ${blurb}`);
    }
  }
  lines.push("");
  lines.push("## Kennisbank");
  lines.push("");
  for (const b of blogs.slice(0, 30)) {
    lines.push(`- [${b.title}](https://peptidehuis.nl/kennisbank/${b.slug}): ${b.excerpt || b.title}`);
  }
  lines.push("");
  lines.push("## Lab & transparantie");
  lines.push("- [Hoe wij batches testen](https://peptidehuis.nl/lab): Janoshik-protocol, afkeur-archief, eigen-test aanvragen");
  lines.push("");
  lines.push("## Optional");
  lines.push("- [Sitemap](https://peptidehuis.nl/sitemap.xml)");
  lines.push("- [Contact](https://peptidehuis.nl/contact)");
  lines.push("- [Bezorging](https://peptidehuis.nl/bezorging)");

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
