"use client";

import { useState } from "react";

import { updateCreatorStatus } from "@/app/admin/actions";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { CREATOR_STATUSES, STATUS_LABELS, type CreatorStatus } from "@/lib/constants";

/**
 * Controlled on purpose: an uncontrolled <select> loses its selection when the
 * server action re-renders the page.
 */
export function StatusForm({
  id,
  status,
  reviewedAt,
}: {
  id: string;
  status: CreatorStatus;
  reviewedAt: string;
}) {
  const [value, setValue] = useState<CreatorStatus>(status);

  return (
    <form action={updateCreatorStatus} className="mt-3 flex flex-col gap-3">
      <input type="hidden" name="id" value={id} />
      <select
        name="status"
        value={value}
        onChange={(event) => setValue(event.target.value as CreatorStatus)}
        aria-label="Application status"
        className="h-11 w-full rounded-xl border border-line-strong bg-paper px-3 text-[0.95rem] focus:border-ink focus:outline-none"
      >
        {CREATOR_STATUSES.map((option) => (
          <option key={option} value={option}>
            {STATUS_LABELS[option]}
          </option>
        ))}
      </select>
      <SubmitButton pendingLabel="Saving..." className="w-full">
        Update status
      </SubmitButton>
      <p className="text-xs text-ink-muted">Last reviewed {reviewedAt}</p>
    </form>
  );
}
