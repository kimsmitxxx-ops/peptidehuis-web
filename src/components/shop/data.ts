/**
 * Shared static data voor peptidehuis-web.
 * Product-catalog + blogs komen uit Supabase; deze file bevat de
 * categorie-structuur met lijn-icons (Lucide) voor homepage-tegels,
 * footer en mobiel menu. Geen categorie-afbeeldingen nodig: de tegels
 * zijn icon-gedreven.
 */

import type { LucideIcon } from "lucide-react";
import {
  HeartPulse,
  Zap,
  BicepsFlexed,
  Brain,
  Flame,
  Sun,
  Dna,
  Package,
  Beaker,
} from "lucide-react";

export interface MainCategory {
  slug: string;
  name: string;
  tagline: string;
  to: string;
  icon: LucideIcon;
}

export const mainCategories: MainCategory[] = [
  { slug: "genezing", name: "Genezing & herstel", tagline: "BPC-157, TB-500, KPV - voor pees-, spier- en weefselherstel.", to: "/winkel/genezing", icon: HeartPulse },
  { slug: "vetverlies", name: "Vetverlies", tagline: "Retatrutide, Semaglutide, Tirzepatide - de GLP-1-klasse.", to: "/winkel/vetverlies", icon: Zap },
  { slug: "spiergroei", name: "Spiergroei & GH", tagline: "CJC-1295, Ipamorelin, Tesamorelin - de GH-as.", to: "/winkel/spiergroei", icon: BicepsFlexed },
  { slug: "cognitie", name: "Cognitie & focus", tagline: "Selank, Semax, DSIP - focus, stress en slaap.", to: "/winkel/cognitie", icon: Brain },
  { slug: "libido", name: "Libido & seksuele gezondheid", tagline: "PT-141 en Oxytocine - centraal werkende peptiden.", to: "/winkel/libido", icon: Flame },
  { slug: "huid-bruining", name: "Huid, haar & bruining", tagline: "GHK-Cu, SNAP-8, Melanotan - huid en pigmentatie.", to: "/winkel/huid-bruining", icon: Sun },
  { slug: "longevity", name: "Longevity & anti-aging", tagline: "Epithalon, NAD+, SS-31 - cellulair herstel.", to: "/winkel/longevity", icon: Dna },
  { slug: "bundels", name: "Bundels", tagline: "Veelgebruikte combinaties met vast bundelvoordeel.", to: "/winkel/bundels", icon: Package },
  { slug: "benodigdheden", name: "Onderzoeksbenodigdheden", tagline: "BAC-water, U100-spuiten en opslag.", to: "/winkel/benodigdheden", icon: Beaker },
];

export function categoryIcon(slug: string): LucideIcon | undefined {
  return mainCategories.find((c) => c.slug === slug)?.icon;
}
