"use client";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { formatEUR } from "@/lib/queries";
import { useState } from "react";

export default function CheckoutPage() {
  const cart = useCart();
  const [form, setForm] = useState({ email: "", name: "", street: "", postal: "", city: "", country: "NL", phone: "" });
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, items: cart.items }),
      });
      if (res.ok) { setDone(true); cart.clear(); }
    } finally { setBusy(false); }
  };

  if (done) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <h1 className="font-display text-3xl">Bedankt!</h1>
        <p className="mt-3 text-text-muted">Je bestelling is binnen. Je ontvangt zo de IBAN-gegevens per email.</p>
        <Link href="/" className="mt-6 inline-flex rounded-full bg-accent px-5 py-2 text-sm font-semibold text-accent-foreground">Terug naar home</Link>
      </div>
    );
  }

  if (cart.items.length === 0) {
    return <div className="mx-auto max-w-md px-4 py-20 text-center text-text-muted">Lege mand. <Link href="/winkel" className="text-accent underline">Naar winkel</Link></div>;
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="font-display text-3xl">Afrekenen</h1>
      <form onSubmit={submit} className="mt-6 grid gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {[
            { k: "email", l: "Email", type: "email" },
            { k: "name", l: "Naam" },
            { k: "street", l: "Adres + huisnr" },
            { k: "postal", l: "Postcode" },
            { k: "city", l: "Stad" },
            { k: "phone", l: "Telefoon (optioneel)", required: false },
          ].map((f) => (
            <label key={f.k} className="block">
              <span className="mb-1 block text-sm font-medium">{f.l}</span>
              <input
                type={(f as any).type || "text"} required={(f as any).required !== false}
                value={(form as any)[f.k]} onChange={(e) => setForm({ ...form, [f.k]: e.target.value })}
                className="w-full rounded-lg border border-paper-border bg-paper-soft px-3 py-2 text-sm outline-none focus:border-accent"
              />
            </label>
          ))}
        </div>
        <div>
          <div className="sticky top-32 rounded-2xl border border-paper-border bg-paper-soft p-6">
            <h2 className="font-display text-xl">Overzicht</h2>
            {cart.items.map((it) => (
              <div key={it.id} className="mt-3 flex justify-between text-sm">
                <span>{it.qty}× {it.name}</span>
                <span>{formatEUR(it.price_cents * it.qty)}</span>
              </div>
            ))}
            <div className="mt-4 border-t border-paper-border pt-4 text-sm">
              <div className="flex justify-between"><span>Verzending</span><span>{cart.total >= 7500 ? "Gratis" : formatEUR(595)}</span></div>
              <div className="mt-2 flex justify-between font-display text-lg"><span>Totaal</span><span>{formatEUR(cart.total + (cart.total >= 7500 ? 0 : 595))}</span></div>
            </div>
            <button type="submit" disabled={busy} className="mt-5 w-full rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground hover:bg-accent-soft disabled:opacity-50">
              {busy ? "Bezig…" : "Plaats bestelling"}
            </button>
            <p className="mt-3 text-center text-[11px] text-text-muted">Betalen via SEPA — IBAN per email</p>
          </div>
        </div>
      </form>
    </div>
  );
}
