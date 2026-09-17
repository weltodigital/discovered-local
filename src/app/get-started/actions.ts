"use server";

import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { notifyAdminOfNewBusinessLead } from "@/lib/notifications";
import { businessLeadSchema } from "@/lib/validation/business";
import type { BusinessLeadInsert } from "@/lib/types/database";

export type LeadState =
  | { status: "ok" }
  | { status: "invalid"; message: string; fieldErrors: Record<string, string> }
  | { status: "error"; message: string };

const GENERIC_ERROR =
  "Something went wrong while sending your details. Please try again, or email us directly.";

function orNull(value: string | undefined): string | null {
  const trimmed = value?.trim() ?? "";
  return trimmed || null;
}

function cleanHandle(value: string | undefined): string | null {
  const trimmed = value?.trim().replace(/^@+/, "") ?? "";
  return trimmed || null;
}

/**
 * Public endpoint for the business enquiry form. Runs server-side only — the
 * browser never gets read access to the business_leads table.
 */
export async function submitBusinessLead(raw: unknown): Promise<LeadState> {
  const parsed = businessLeadSchema.safeParse(raw);

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

  const row: BusinessLeadInsert = {
    business_name: values.businessName.trim(),
    contact_name: values.contactName.trim(),
    email: values.email.trim().toLowerCase(),
    phone: orNull(values.phone),
    website: orNull(values.website),
    instagram: cleanHandle(values.instagram),
    business_type: values.businessType,
    location: orNull(values.location),
    notes: orNull(values.notes),
    status: "new",
  };

  let supabase;
  try {
    supabase = createSupabaseAdminClient();
  } catch (error) {
    console.error("[get-started] Supabase is not configured", error);
    return { status: "error", message: GENERIC_ERROR };
  }

  const { data, error } = await supabase
    .from("business_leads")
    .insert(row)
    .select("id, business_name, contact_name, email, business_type, location")
    .single();

  if (error) {
    console.error("[get-started] insert failed", error);
    return { status: "error", message: GENERIC_ERROR };
  }

  // Email is a nice-to-have; a failure here must not lose the enquiry.
  try {
    await notifyAdminOfNewBusinessLead(data);
  } catch (notifyError) {
    console.error("[get-started] notification failed", notifyError);
  }

  return { status: "ok" };
}
