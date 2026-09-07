import { STATUS_LABELS, type CreatorStatus } from "@/lib/constants";

const TONES: Record<CreatorStatus, string> = {
  applied: "border-line-strong bg-paper-deep text-ink",
  reviewing: "border-amber-300 bg-amber-50 text-amber-900",
  approved: "border-emerald-300 bg-emerald-50 text-emerald-900",
  active: "border-emerald-500 bg-emerald-600 text-white",
  rejected: "border-line-strong bg-paper text-ink-muted",
  paused: "border-sky-300 bg-sky-50 text-sky-900",
};

export function StatusBadge({ status }: { status: CreatorStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium whitespace-nowrap ${
        TONES[status] ?? TONES.applied
      }`}
    >
      {STATUS_LABELS[status] ?? status}
    </span>
  );
}
