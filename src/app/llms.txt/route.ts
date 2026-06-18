import { listCategories, listBlogPosts, getShop } from "@/lib/queries";

export const revalidate = 3600;

/**
 * /llms.txt — AI-crawler manifest per llmstxt.org spec.
 * Bevat shop-identiteit + diepte-links naar categorie- en kennisbank-content.
 */
export async function GET() {
  const [shop, categories, blogs] = await Promise.all([
    getShop().catch(() => null),
    listCategories(),
    listBlogPosts(50),
  ]);

  const lines: string[] = [];
  lines.push("# AnabolenPro");
  lines.push("");
  lines.push("> Nederlandse anabolen-webshop met no-bullshit aanpak. Lab-getest per batch (Janoshik), anoniem verpakt vanaf NL-magazijn, 24u verzending. Voor krachtsporters die hun eerste tot vijfde kuur doen, gevorderden die wisselen van protocol, en mannen die info zoeken over PCT, dosering of stack-combinaties.");
  lines.push("");
  lines.push("## Catalogus");
  lines.push("");
  for (const c of categories) {
    lines.push(`- [${c.name}](https://anabolenpro.com/winkel/${c.slug}): ${c.description || c.name}`);
  }
  lines.push("");
  lines.push("## Kennisbank");
  lines.push("");
  for (const b of blogs.slice(0, 30)) {
    lines.push(`- [${b.title}](https://anabolenpro.com/kennisbank/${b.slug}): ${b.excerpt || b.title}`);
  }
  lines.push("");
  lines.push("## Optional");
  lines.push("- [Sitemap](https://anabolenpro.com/sitemap.xml)");
  lines.push("- [Contact](https://anabolenpro.com/contact)");
  lines.push("- [Bezorging](https://anabolenpro.com/bezorging)");

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
