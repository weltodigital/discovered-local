"use server";

import { applicationSchema } from "@/lib/validation/creator";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import {
  notifyAdminOfNewApplication,
  sendCreatorConfirmationEmail,
} from "@/lib/notifications";
import type { CreatorInsert } from "@/lib/types/database";

export type SubmitState =
  | { status: "ok" }
  | { status: "duplicate"; message: string }
  | { status: "invalid"; message: string; fieldErrors: Record<string, string> }
  | { status: "error"; message: string };

const GENERIC_ERROR =
  "Something went wrong while submitting your application. Please try again.";

function toInteger(value: string | undefined): number | null {
  if (!value) return null;
  const digits = value.replace(/[,\s]/g, "");
  if (!/^\d+$/.test(digits)) return null;
  const parsed = Number.parseInt(digits, 10);
  return Number.isFinite(parsed) ? parsed : null;
}

function cleanHandle(value: string | undefined): string | null {
  const trimmed = value?.trim().replace(/^@+/, "") ?? "";
  return trimmed || null;
}

function orNull(value: string | undefined): string | null {
  const trimmed = value?.trim() ?? "";
  return trimmed || null;
}

/**
 * Public endpoint for the creator application. Runs server-side only, so the
 * browser never needs read access to the creators table.
 */
export async function submitApplication(raw: unknown): Promise<SubmitState> {
  const parsed = applicationSchema.safeParse(raw);

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path.join(".");
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return {
      status: "invalid",
      message: "Please check the highlighted answers and try again.",
      fieldErrors,
    };
  }

  const values = parsed.data;
  const email = values.email.trim().toLowerCase();

  const row: CreatorInsert = {
    full_name: values.fullName.trim(),
    email,
    phone: orNull(values.phone),
    instagram_username: cleanHandle(values.instagramUsername),
    tiktok_username: cleanHandle(values.tiktokUsername),
    location: values.location,
    location_other: values.location === "Other" ? orNull(values.locationOther) : null,
    content_types: values.contentTypes,
    preferred_business_types: values.preferredBusinessTypes ?? [],
    bio: orNull(values.bio),
    instagram_followers: toInteger(values.instagramFollowers),
    tiktok_followers: toInteger(values.tiktokFollowers),
    primary_platform: values.primaryPlatform,
    content_link_1: orNull(values.contentLink1),
    content_link_2: orNull(values.contentLink2),
    portfolio_url: orNull(values.portfolioUrl),
    collaboration_frequency: values.collaborationFrequency,
    complimentary_experience: values.complimentaryExperience,
    why_join: orNull(values.whyJoin),
    consent: values.consent,
    commitment_ack: values.commitmentAck,
    status: "applied",
  };

  let supabase;
  try {
    supabase = createSupabaseAdminClient();
  } catch (error) {
    console.error("[apply] Supabase is not configured", error);
    return { status: "error", message: GENERIC_ERROR };
  }

  const { data, error } = await supabase
    .from("creators")
    .insert(row)
    .select("id, full_name, email, location, instagram_username, primary_platform")
    .single();

  if (error) {
    // 23505 = unique violation on the email index.
    if (error.code === "23505") {
      return {
        status: "duplicate",
        message:
          "Looks like you've already applied with this email — we've got your application and we'll be in touch.",
      };
    }
    console.error("[apply] insert failed", error);
    return { status: "error", message: GENERIC_ERROR };
  }

  // Email is a nice-to-have; a failure here must not lose the application.
  try {
    await Promise.all([
      notifyAdminOfNewApplication(data),
      sendCreatorConfirmationEmail(data),
    ]);
  } catch (notifyError) {
    console.error("[apply] notification failed", notifyError);
  }

  return { status: "ok" };
}
