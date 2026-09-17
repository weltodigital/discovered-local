import { LEAD_STATUS_LABELS, type LeadStatus } from "@/lib/constants";

const TONES: Record<LeadStatus, string> = {
  new: "border-line-strong bg-paper-deep text-ink",
  contacted: "border-amber-300 bg-amber-50 text-amber-900",
  qualified: "border-sky-300 bg-sky-50 text-sky-900",
  customer: "border-emerald-500 bg-emerald-600 text-white",
  not_interested: "border-line-strong bg-paper text-ink-muted",
};

export function LeadStatusBadge({ status }: { status: LeadStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium whitespace-nowrap ${
        TONES[status] ?? TONES.new
      }`}
    >
      {LEAD_STATUS_LABELS[status] ?? status}
    </span>
  );
}
