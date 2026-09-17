"use client";

import { useState } from "react";

import { updateLeadStatus } from "@/app/admin/actions";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { LEAD_STATUSES, LEAD_STATUS_LABELS, type LeadStatus } from "@/lib/constants";

/**
 * Controlled on purpose: an uncontrolled <select> loses its selection when the
 * server action re-renders the page.
 */
export function LeadStatusForm({
  id,
  status,
  updatedAt,
}: {
  id: string;
  status: LeadStatus;
  updatedAt: string;
}) {
  const [value, setValue] = useState<LeadStatus>(status);

  return (
    <form action={updateLeadStatus} className="mt-3 flex flex-col gap-3">
      <input type="hidden" name="id" value={id} />
      <select
        name="status"
        value={value}
        onChange={(event) => setValue(event.target.value as LeadStatus)}
        aria-label="Lead status"
        className="h-11 w-full rounded-xl border border-line-strong bg-paper px-3 text-[0.95rem] focus:border-ink focus:outline-none"
      >
        {LEAD_STATUSES.map((option) => (
          <option key={option} value={option}>
            {LEAD_STATUS_LABELS[option]}
          </option>
        ))}
      </select>
      <SubmitButton pendingLabel="Saving..." className="w-full">
        Update status
      </SubmitButton>
      <p className="text-xs text-ink-muted">Last updated {updatedAt}</p>
    </form>
  );
}
