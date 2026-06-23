import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/components/shop/cart-store";
import { Header } from "@/components/shop/header";
import { Footer } from "@/components/shop/footer";
import { CartDrawer } from "@/components/shop/cart-drawer";
import { MobileTabBar } from "@/components/shop/mobile-tabbar";
import { WhatsAppFab } from "@/components/whatsapp-fab";

export const metadata: Metadata = {
  metadataBase: new URL("https://anabolenpro.com"),
  title: { default: "AnabolenPro — lab-getest, vandaag besteld, morgen in huis", template: "%s · AnabolenPro" },
  description: "AnabolenPro: Janoshik lab-getest, anoniem verpakt, 24u verzending vanaf NL-magazijn. Anavar, Dianabol, testosteron-esters, PCT, kuurpakketten.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://rexqfwibxawqnvrzbdoo.supabase.co" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap" />
      </head>
      <body>
        <CartProvider>
          <div className="min-h-screen flex flex-col bg-background text-text overflow-x-hidden">
            <Header />
            <main className="flex-1 pb-16 md:pb-0 min-w-0">{children}</main>
            <Footer />
            <WhatsAppFab />
            <CartDrawer />
            <MobileTabBar />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
