import Image from "next/image";
import Link from "next/link";

/**
 * Brand mark plus wordmark. The nav needs a horizontal lockup, so the stacked
 * logo file is used in the footer instead.
 *
 * Below `sm` the wordmark drops away: on a 360px phone the header has to fit
 * the mark, the primary CTA and the menu button, and the CTA is worth more
 * than a second rendering of the name.
 */
export function Logo({
  className = "",
  tone = "ink",
}: {
  className?: string;
  tone?: "ink" | "paper";
}) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-2.5 ${className}`}
      aria-label="Discovered Local home"
    >
      <Image
        src="/logo-mark.png"
        alt=""
        width={512}
        height={512}
        priority
        className="size-8 shrink-0 object-contain transition-transform duration-300 group-hover:scale-105"
      />
      <span
        className={`hidden text-[1.05rem] font-semibold tracking-[-0.02em] sm:inline ${
          tone === "paper" ? "text-paper" : "text-ink"
        }`}
      >
        Discovered <span className="text-accent">Local</span>
      </span>
    </Link>
  );
}

/** Stacked lockup, for the places that have room for it. */
export function LogoLockup({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/logo-full.png"
      alt="Discovered Local"
      width={793}
      height={296}
      className={`object-contain ${className}`}
    />
  );
}
