"use client";

import Link from "next/link";

import { trackEvent } from "@/lib/analytics";
import { buttonStyles } from "@/components/ui/button";

/**
 * Every route into /apply goes through here so `apply_button_clicked` is
 * recorded consistently, with the section it came from.
 */
export function ApplyCta({
  children = "Apply to become a creator",
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
      href="/apply"
      onClick={() => trackEvent("apply_button_clicked", { location })}
      className={buttonStyles({ variant, size, className })}
    >
      {children}
    </Link>
  );
}
