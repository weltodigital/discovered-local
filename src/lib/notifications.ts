import "server-only";

import type { BusinessLeadRow, CreatorRow } from "@/lib/types/database";

/**
 * Email hook-points.
 *
 * Deliberately empty for the MVP — the database write is what matters. When we
 * add a provider (Resend, Postmark, …) it slots in here and nothing else in the
 * application flow has to change. Every call site already treats failures as
 * non-fatal.
 */

type NewApplication = Pick<
  CreatorRow,
  "id" | "full_name" | "email" | "location" | "instagram_username" | "primary_platform"
>;

export async function notifyAdminOfNewApplication(
  application: NewApplication,
): Promise<void> {
  // TODO: send the admin a "new creator application" email.
  if (process.env.NODE_ENV !== "production") {
    console.info(
      `[discovered-local] new application: ${application.full_name} <${application.email}> (${application.location})`,
    );
  }
}

export async function sendCreatorConfirmationEmail(
  application: NewApplication,
): Promise<void> {
  // TODO: send the creator a "thanks, we've got your application" email.
}

export async function sendCreatorDecisionEmail(
  _application: Pick<CreatorRow, "id" | "full_name" | "email" | "status">,
): Promise<void> {
  // TODO: send acceptance / rejection email when an admin changes the status.
}

type NewBusinessLead = Pick<
  BusinessLeadRow,
  "id" | "business_name" | "contact_name" | "email" | "business_type" | "location"
>;

export async function notifyAdminOfNewBusinessLead(
  lead: NewBusinessLead,
): Promise<void> {
  // TODO: send the admin a "new business enquiry" email. This one is the
  // revenue funnel, so it should be the first email we actually wire up.
  if (process.env.NODE_ENV !== "production") {
    console.info(
      `[discovered-local] new business lead: ${lead.business_name} — ${lead.contact_name} <${lead.email}> (${lead.business_type ?? "unknown type"})`,
    );
  }
}

export async function sendOpportunityEmail(): Promise<void> {
  // TODO: notify matched creators when a business opportunity opens.
}
