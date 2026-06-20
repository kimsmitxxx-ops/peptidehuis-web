import type { ReactNode } from "react";
import { Header, type HeaderProps } from "./header";
import { Footer } from "./footer";
import { WhatsAppFab } from "@/components/whatsapp-fab";
import { CartProvider } from "./cart-store";
import { CartDrawer } from "./cart-drawer";
import { MobileTabBar } from "./mobile-tabbar";

export interface ShopLayoutProps {
  children: ReactNode;
  headerVariant?: HeaderProps["variant"];
}

export function ShopLayout({ children, headerVariant = "default" }: ShopLayoutProps) {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-background text-text overflow-x-hidden">
        <Header variant={headerVariant} />
        <main className="flex-1 pb-16 md:pb-0 min-w-0">{children}</main>
        <Footer />
        <WhatsAppFab />
        <CartDrawer />
        <MobileTabBar />
      </div>
    </CartProvider>
  );
}

export default ShopLayout;
