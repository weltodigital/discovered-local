"use client";

import { track } from "@vercel/analytics";

/**
 * Two funnels, tracked end to end.
 *
 *   Business: homepage_view -> business_cta_clicked -> business_lead_started
 *             -> business_lead_submitted
 *   Creator:  creator_page_view -> creator_cta_clicked -> application_started
 *             -> application_submitted
 */
export type AnalyticsEvent =
  | "homepage_view"
  | "business_cta_clicked"
  | "business_lead_started"
  | "business_lead_submitted"
  | "creator_page_view"
  | "creator_cta_clicked"
  | "application_started"
  | "application_submitted";

type Properties = Record<string, string | number | boolean | null>;

/**
 * The Analytics component initialises `window.va` in its own effect, which can
 * land after an effect that fires on mount (a page view, for instance), so
 * retry briefly rather than silently dropping the first event.
 */
function send(event: AnalyticsEvent, properties?: Properties, attempt = 0) {
  if (typeof window === "undefined") return;

  if (!("va" in window)) {
    if (attempt < 20) {
      window.setTimeout(() => send(event, properties, attempt + 1), 150);
    }
    return;
  }

  try {
    track(event, properties);
  } catch {
    // Analytics must never break the page.
  }
}

export function trackEvent(event: AnalyticsEvent, properties?: Properties) {
  send(event, properties);
}
