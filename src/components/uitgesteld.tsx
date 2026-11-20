"use client";

import dynamic from "next/dynamic";

/**
 * Onderdelen die pas na de eerste weergave hoeven te hydrateren.
 *
 * `dynamic` met `ssr: false` haalt de code uit de hoofdbundel; `NaIdle` in de
 * layout zorgt dat hij ook pas draait als de browser klaar is met het
 * belangrijke werk. De twee horen samen: alleen `dynamic` laadt de chunk wel
 * apart maar hydrateert hem nog steeds midden in de drukte.
 *
 * Zie shop-core/README.md voor de gemeten cijfers.
 */

export const AnalyticsTracker = dynamic(() => import("@/components/analytics-tracker").then((m) => m.AnalyticsTracker), {
  ssr: false,
});

export const CartAbandonTracker = dynamic(() => import("@/components/cart-abandon-tracker").then((m) => m.CartAbandonTracker), {
  ssr: false,
});

export const GA4 = dynamic(() => import("@/components/ga4").then((m) => m.GA4), {
  ssr: false,
});

export const ConsentNotice = dynamic(() => import("@/components/consent-notice").then((m) => m.ConsentNotice), {
  ssr: false,
});

