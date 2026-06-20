"use client";
import { cn } from "@/lib/utils";
import { MessageCircle } from "lucide-react";

export type ChatFabVariant = "fab" | "inline";

export interface ChatFabProps {
  variant?: ChatFabVariant;
  pulse?: boolean;
  label?: string;
  className?: string;
  onClick?: () => void;
}

/**
 * Online chat launcher (replaces the legacy WhatsApp fab).
 * Backwards-compat alias `WhatsAppFab` keeps existing imports working.
 */
export function ChatFab({
  variant = "fab",
  pulse,
  label = "Start chat",
  className,
  onClick,
}: ChatFabProps) {
  if (variant === "inline") {
    return (
      <button
        type="button"
        onClick={onClick}
        className={cn(
          "inline-flex items-center gap-2 rounded bg-accent px-5 h-11 text-accent-foreground font-medium hover:bg-accent-muted transition-colors",
          className,
        )}
      >
        <MessageCircle size={18} />
        {label}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 5rem)" }}
      className={cn(
        "fixed right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground ring-2 ring-accent-soft/40 shadow-lift hover:bg-accent-muted transition-colors md:!bottom-5",
        pulse &&
          "after:absolute after:inset-0 after:rounded-full after:bg-accent after:opacity-40 after:animate-ping",
        className,
      )}
    >
      <MessageCircle size={26} strokeWidth={2.25} />
    </button>
  );
}

export const WhatsAppFab = ChatFab;
export default ChatFab;
