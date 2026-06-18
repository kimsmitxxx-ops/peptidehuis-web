import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { CartDrawer } from "@/components/cart-drawer";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { listCategories } from "@/lib/queries";

export const metadata: Metadata = {
  metadataBase: new URL("https://anabolenpro.com"),
  title: { default: "AnabolenPro — lab-getest, vandaag besteld, morgen in huis", template: "%s · AnabolenPro" },
  description: "AnabolenPro: Janoshik lab-getest, anoniem verpakt, 24u verzending vanaf NL-magazijn. Anavar, Dianabol, testosteron-esters, PCT, kuurpakketten.",
  robots: { index: false, follow: false }, // pre-launch
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const categories = await listCategories();
  return (
    <html lang="nl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap" />
      </head>
      <body>
        <CartProvider>
          <Header categories={categories.map((c) => ({ slug: c.slug, name: c.name }))} />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
