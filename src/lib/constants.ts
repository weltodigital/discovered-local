export const SITE_NAME = "Discovered Local";
export const SITE_DESCRIPTION =
  "Discovered Local connects Portsmouth creators with great local restaurants, cafés, businesses and experiences. Apply to become a local creator.";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://discoveredlocal.com";

export const SOCIAL_LINKS = {
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "",
  tiktok: process.env.NEXT_PUBLIC_TIKTOK_URL || "",
};

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
