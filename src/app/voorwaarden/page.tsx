import type { Metadata } from "next";
export const revalidate = 3600;
export const metadata: Metadata = { title: "Voorwaarden", alternates: { canonical: "/voorwaarden" } };
export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-display text-3xl md:text-4xl">Voorwaarden</h1>
      <p className="mt-4 text-text-muted">Inhoud van deze pagina wordt binnenkort vanuit het dashboard gevuld.</p>
    </div>
  );
}
