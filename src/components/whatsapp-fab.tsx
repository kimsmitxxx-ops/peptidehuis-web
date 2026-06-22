"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { MessageCircle, Send, X, CheckCircle2 } from "lucide-react";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";

const SHOP_DASH_URL = "https://shop-dash-ruby.vercel.app";
const SHOP_ID = "18a96da9-9f9f-466f-ac2b-3ab0349b78a6"; // anabolenpro

export interface ChatFabProps {
  variant?: "fab" | "inline";
  pulse?: boolean;
  label?: string;
  className?: string;
}

export function ChatFab({ variant = "fab", pulse, label = "Start chat", className }: ChatFabProps) {
  const [open, setOpen] = useState(false);
  const trigger = variant === "inline" ? (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className={cn(
        "inline-flex items-center gap-2 rounded bg-accent px-5 h-11 text-accent-foreground font-medium hover:bg-accent-muted transition-colors",
        className,
      )}
    >
      <MessageCircle size={18} /> {label}
    </button>
  ) : (
    <button
      type="button"
      onClick={() => setOpen(true)}
      aria-label={label}
      style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 5rem)" }}
      className={cn(
        "fixed right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground ring-2 ring-accent-soft/40 shadow-lift hover:bg-accent-muted transition-colors md:!bottom-5",
        pulse && "after:absolute after:inset-0 after:rounded-full after:bg-accent after:opacity-40 after:animate-ping",
        className,
      )}
    >
      <MessageCircle size={26} strokeWidth={2.25} />
    </button>
  );

  return (
    <>
      {trigger}
      <ChatPanel open={open} onOpenChange={setOpen} />
    </>
  );
}

function ChatPanel({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reply, setReply] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim()) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`${SHOP_DASH_URL}/api/support`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shopId: SHOP_ID,
          visitorName: name.trim() || null,
          visitorEmail: email.trim() || null,
          message: message.trim(),
          subject: message.trim().slice(0, 80),
        }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Versturen mislukt");
      }
      const j = await res.json();
      setReply(j.aiReply || null);
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || "Kon bericht niet versturen");
    } finally {
      setBusy(false);
    }
  }

  function reset() {
    setName("");
    setEmail("");
    setMessage("");
    setBusy(false);
    setError(null);
    setReply(null);
    setSubmitted(false);
  }

  return (
    <Sheet open={open} onOpenChange={(v) => { onOpenChange(v); if (!v) reset(); }}>
      <SheetContent side="right" className="w-full sm:max-w-md p-0 flex flex-col bg-background">
        <header className="px-5 py-4 border-b border-border flex items-center gap-2">
          <MessageCircle size={18} className="text-accent" />
          <SheetTitle className="font-display text-lg">Live chat</SheetTitle>
          <span className="ml-auto text-xs text-text-muted">Antwoord binnen 1 uur</span>
        </header>

        {submitted ? (
          <div className="flex-1 overflow-y-auto px-5 py-6 space-y-4">
            <div className="rounded-lg border border-success/30 bg-success-soft/30 p-4 flex items-start gap-3">
              <CheckCircle2 size={20} className="text-success shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-text">Bericht verstuurd</p>
                <p className="mt-1 text-text-muted">We hebben je bericht ontvangen. {email ? `Je krijgt antwoord op ${email}.` : "Vul je e-mail in als je antwoord wil ontvangen."}</p>
              </div>
            </div>
            {reply && (
              <div className="rounded-lg border border-accent/30 bg-accent-soft/15 p-4">
                <p className="text-[10px] uppercase tracking-wider text-accent font-semibold mb-2">Direct antwoord (AI-FAQ)</p>
                <p className="text-sm text-text leading-relaxed whitespace-pre-wrap">{reply}</p>
                <p className="mt-3 text-xs text-text-muted">Klopt dit antwoord niet? Een medewerker reageert handmatig binnen 1 uur.</p>
              </div>
            )}
            <button
              type="button"
              onClick={reset}
              className="w-full rounded-md border border-border-strong px-5 py-2.5 text-sm font-medium hover:border-accent hover:text-accent"
            >
              Nieuw bericht
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
            <p className="text-sm text-text-muted">
              Vraag over een product, batchcode of bestelling? Stuur een bericht — we reageren tussen 09:00 en 21:00.
            </p>
            <label className="block">
              <span className="text-xs font-medium text-text mb-1 block">Naam (optioneel)</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-10 px-3 rounded border border-border bg-surface text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              />
            </label>
            <label className="block">
              <span className="text-xs font-medium text-text mb-1 block">E-mail (voor antwoord)</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jij@voorbeeld.nl"
                className="w-full h-10 px-3 rounded border border-border bg-surface text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              />
            </label>
            <label className="block">
              <span className="text-xs font-medium text-text mb-1 block">Bericht</span>
              <textarea
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                placeholder="Wat is je vraag?"
                className="w-full px-3 py-2.5 rounded border border-border bg-surface text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent resize-none"
              />
            </label>
            {error && <p className="text-sm text-danger">{error}</p>}
            <button
              type="submit"
              disabled={busy || !message.trim()}
              className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-accent px-5 h-11 text-sm font-semibold text-accent-foreground hover:bg-accent-soft disabled:opacity-50"
            >
              {busy ? "Versturen…" : (<><Send size={15} /> Verstuur bericht</>)}
            </button>
          </form>
        )}
      </SheetContent>
    </Sheet>
  );
}

export const WhatsAppFab = ChatFab;
export default ChatFab;
