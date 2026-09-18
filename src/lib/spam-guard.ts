/**
 * Cheap, dependency-free bot filtering for the public forms.
 *
 * Two signals: a honeypot field that humans never see (so anything in it came
 * from a script filling every input it finds) and how long the form was open
 * before it was submitted. Neither is bulletproof, but together they stop the
 * drive-by form spam that hits any public URL within days of going live. If
 * that stops being enough, Turnstile slots in behind the same `SpamGuard`.
 */

/** Named to look like a real field to a script and nothing else. */
export const HONEYPOT_FIELD = "website_url";

/**
 * A real person needs longer than this to read the first question, never mind
 * three steps. Kept low so a returning creator with a restored draft is never
 * caught by it.
 */
export const MIN_FILL_MS = 3_000;

export type SpamGuard = {
  /** Value of the honeypot input. Empty for humans. */
  honeypot: string;
  /** `Date.now()` on the client when the form mounted. */
  startedAt: number;
};

export function looksLikeBot(guard: SpamGuard | undefined): boolean {
  if (!guard) return true;
  if (typeof guard.honeypot === "string" && guard.honeypot.trim() !== "") return true;
  if (!Number.isFinite(guard.startedAt)) return true;
  // A client clock can drift either way; only a clearly impossible fill time
  // counts against it.
  const elapsed = Date.now() - guard.startedAt;
  return elapsed >= 0 && elapsed < MIN_FILL_MS;
}
