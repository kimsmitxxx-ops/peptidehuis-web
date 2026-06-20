import { cn } from "@/lib/utils";
import { Bitcoin, Building2, Smartphone } from "lucide-react";

export type PaymentRowVariant = "full" | "compact";

export interface PaymentRowProps {
  variant?: PaymentRowVariant;
  className?: string;
}

const wrapper =
  "inline-flex h-7 items-center gap-1.5 rounded-sm border border-border bg-surface px-2.5 text-[11px] font-semibold tracking-wide text-text";

function Bank() {
  return (
    <span className={wrapper}>
      <Building2 size={12} className="text-accent" /> Bankoverboeking
    </span>
  );
}
function BankApp() {
  return (
    <span className={wrapper}>
      <Smartphone size={12} className="text-accent" /> Bank-app
    </span>
  );
}
function Crypto() {
  return (
    <span className={wrapper}>
      <Bitcoin size={12} className="text-accent" /> Crypto
    </span>
  );
}
function CryptoCoin({ label, color }: { label: string; color: string }) {
  return (
    <span className={cn(wrapper, "tabular")} style={{ color }}>
      {label}
    </span>
  );
}

export function PaymentRow({ variant = "full", className }: PaymentRowProps) {
  const items =
    variant === "compact"
      ? [<Bank key="b" />, <BankApp key="a" />, <Crypto key="c" />]
      : [
          <Bank key="b" />,
          <BankApp key="a" />,
          <Crypto key="c" />,
          <CryptoCoin key="btc" label="BTC" color="#F7931A" />,
          <CryptoCoin key="eth" label="ETH" color="#627EEA" />,
          <CryptoCoin key="usdt" label="USDT" color="#26A17B" />,
        ];
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)} aria-label="Betaalmethoden">
      {items}
    </div>
  );
}

export default PaymentRow;
