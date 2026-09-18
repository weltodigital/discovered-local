export const SITE_NAME = "Discovered Local";
/**
 * Pricing. Founding businesses in Portsmouth pay the launch price; the standard
 * price is what the service costs once we're past the founding group, and is
 * shown alongside it. Kept here because it appears on both public pages, in
 * metadata, in the CTAs and in the terms.
 */
export const PRICE_FOUNDING = "£149";
export const PRICE_STANDARD = "£249";

/** Business-facing description. The homepage sells to businesses. */
export const SITE_DESCRIPTION =
  `Discovered Local connects Portsmouth businesses with local TikTok and Instagram creators. Get 4 creator collaborations every month for ${PRICE_FOUNDING} as a founding business.`;
export const CREATOR_DESCRIPTION =
  "Join Discovered Local and get opportunities to discover Portsmouth restaurants, cafés, bars and local businesses as a creator.";

const DEFAULT_SITE_URL = "https://discoveredlocal.com";

/**
 * Resolves the canonical site URL.
 *
 * Tolerates the two ways this is easy to get wrong in a dashboard: an empty
 * value (which `??` would happily pass through) and a host with no scheme.
 * Falls back to Vercel's own system variables, then to the production domain,
 * so a bad value can never break the build.
 */
function resolveSiteUrl(): string {
  const candidates = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL,
    process.env.NEXT_PUBLIC_VERCEL_URL,
    DEFAULT_SITE_URL,
  ];

  for (const candidate of candidates) {
    const trimmed = candidate?.trim().replace(/\/+$/, "");
    if (!trimmed) continue;

    const withScheme = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
    try {
      return new URL(withScheme).origin;
    } catch {
      // Try the next candidate.
    }
  }

  return DEFAULT_SITE_URL;
}

export const SITE_URL = resolveSiteUrl();

export const LOCATIONS = [
  "Portsmouth",
  "Southsea",
  "Fratton",
  "Cosham",
  "Portchester",
  "Havant",
  "Waterlooville",
  "Fareham",
  "Other",
] as const;

export const CONTENT_TYPES = [
  "Food",
  "Restaurants",
  "Lifestyle",
  "Travel",
  "Local",
  "Fashion",
  "Fitness",
  "Beauty",
  "Family",
  "Entertainment",
  "Photography",
  "Videography",
  "Other",
] as const;

export const BUSINESS_TYPES = [
  "Restaurants",
  "Cafés",
  "Bars & pubs",
  "Takeaways",
  "Food experiences",
  "Hotels",
  "Activities",
  "Independent shops",
  "Beauty & wellness",
  "Fitness",
  "Other",
] as const;

export const PRIMARY_PLATFORMS = ["Instagram", "TikTok", "Both", "Other"] as const;

export const COLLABORATION_FREQUENCIES = [
  "Once a month",
  "2–3 times a month",
  "Every week",
  "Whenever something interesting comes up",
] as const;

export const COMPLIMENTARY_ANSWERS = [
  "Yes",
  "Depends on the opportunity",
  "No",
] as const;

/** Business types on the lead form — plain language, not the creator taxonomy. */
export const LEAD_BUSINESS_TYPES = [
  "Restaurant",
  "Café",
  "Bar / Pub",
  "Takeaway",
  "Hotel",
  "Activity",
  "Retail",
  "Beauty / Wellness",
  "Other",
] as const;

export const LEAD_STATUSES = [
  "new",
  "contacted",
  "qualified",
  "customer",
  "not_interested",
] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number];

export const LEAD_STATUS_LABELS: Record<LeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  qualified: "Qualified",
  customer: "Customer",
  not_interested: "Not interested",
};

export const CREATOR_STATUSES = [
  "applied",
  "reviewing",
  "approved",
  "active",
  "rejected",
  "paused",
] as const;

export type CreatorStatus = (typeof CREATOR_STATUSES)[number];

export const STATUS_LABELS: Record<CreatorStatus, string> = {
  applied: "Applied",
  reviewing: "Reviewing",
  approved: "Approved",
  active: "Active",
  rejected: "Rejected",
  paused: "Paused",
};
