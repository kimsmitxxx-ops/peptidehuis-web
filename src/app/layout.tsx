import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/shop/cart-store";
import { Header } from "@/components/shop/header";
import { Footer } from "@/components/shop/footer";
import { CartDrawer } from "@/components/shop/cart-drawer";
import { MobileTabBar } from "@/components/shop/mobile-tabbar";

// Self-hosted fonts via next/font: elimineert render-blocking Google Fonts request
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-manrope",
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--font-space-grotesk",
});

// Defer chat-widget — niet kritiek voor FCP/LCP; pas hydrateren na main content
const WhatsAppFab = dynamic(
  () => import("@/components/whatsapp-fab").then((m) => m.WhatsAppFab),
  { ssr: false },
);

export const metadata: Metadata = {
  metadataBase: new URL("https://anabolenpro.com"),
  title: { default: "AnabolenPro — lab-getest, vandaag besteld, morgen in huis", template: "%s · AnabolenPro" },
  description: "AnabolenPro: Janoshik lab-getest, anoniem verpakt, 24u verzending vanaf NL-magazijn. Anavar, Dianabol, testosteron-esters, PCT, kuurpakketten.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className={`${manrope.variable} ${spaceGrotesk.variable}`}>
      <head>
        <link rel="preconnect" href="https://rexqfwibxawqnvrzbdoo.supabase.co" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        {/* Preload hero image (LCP) */}
        <link
          rel="preload"
          as="image"
          href="/assets/transform-after.jpg"
          fetchPriority="high"
        />
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
