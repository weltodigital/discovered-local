"use client";

import Link from "next/link";

import { trackEvent } from "@/lib/analytics";
import { buttonStyles } from "@/components/ui/button";
import { PRICE_FOUNDING } from "@/lib/constants";

/**
 * The revenue button. Every route into /get-started goes through here so
 * `business_cta_clicked` always records which section did the persuading.
 */
export function BusinessCta({
  children = `Get started for ${PRICE_FOUNDING}/month`,
  location,
  variant = "primary",
  size = "lg",
  className = "",
}: {
  children?: React.ReactNode;
  location: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  return (
    <Link
      href="/get-started"
      onClick={() => trackEvent("business_cta_clicked", { location })}
      className={buttonStyles({ variant, size, className })}
    >
      {children}
    </Link>
  );
}
