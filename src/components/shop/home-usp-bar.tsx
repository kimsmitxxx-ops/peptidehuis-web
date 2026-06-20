"use client";
import { Truck, ShieldCheck, FlaskConical, Headphones } from "lucide-react";
import { UspStrip } from "@/components/usp-strip";

const ITEMS = [
  { icon: Truck, title: "Vandaag besteld, morgen in huis" },
  { icon: ShieldCheck, title: "Anoniem en discreet verpakt" },
  { icon: FlaskConical, title: "Onafhankelijk lab-getest" },
  { icon: Headphones, title: "Live chat — advies binnen 1 min" },
];

export function HomeUspBar() {
  return <UspStrip items={ITEMS} variant="compact" className="justify-between text-text" />;
}
