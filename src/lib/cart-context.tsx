"use client";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type CartItem = { id: string; sku: string; name: string; price_cents: number; image: string | null; qty: number };

type Ctx = {
  items: CartItem[];
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  total: number;
  count: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const CartCtx = createContext<Ctx | null>(null);
const KEY = "anabolenpro.cart.v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    try { const s = localStorage.getItem(KEY); if (s) setItems(JSON.parse(s)); } catch {}
  }, []);
  useEffect(() => { try { localStorage.setItem(KEY, JSON.stringify(items)); } catch {} }, [items]);

  const add: Ctx["add"] = (it, qty = 1) => {
    setItems((p) => {
      const ex = p.find((x) => x.id === it.id);
      if (ex) return p.map((x) => x.id === it.id ? { ...x, qty: x.qty + qty } : x);
      return [...p, { ...it, qty }];
    });
    setOpen(true);
  };
  const remove = (id: string) => setItems((p) => p.filter((x) => x.id !== id));
  const setQty = (id: string, qty: number) =>
    setItems((p) => qty <= 0 ? p.filter((x) => x.id !== id) : p.map((x) => x.id === id ? { ...x, qty } : x));
  const clear = () => setItems([]);
  const total = items.reduce((s, x) => s + x.price_cents * x.qty, 0);
  const count = items.reduce((s, x) => s + x.qty, 0);

  return (
    <CartCtx.Provider value={{ items, add, remove, setQty, clear, total, count, isOpen, open: () => setOpen(true), close: () => setOpen(false) }}>
      {children}
    </CartCtx.Provider>
  );
}

export function useCart() {
  const c = useContext(CartCtx);
  if (!c) throw new Error("useCart buiten CartProvider");
  return c;
}
