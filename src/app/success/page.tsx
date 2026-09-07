import type { Metadata } from "next";
import Link from "next/link";

import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { buttonStyles } from "@/components/ui/button";
import { SOCIAL_LINKS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Application received",
  description: "Thanks for applying to become a Discovered Local creator.",
  robots: { index: false, follow: false },
};

export default function SuccessPage() {
  const followUrl = SOCIAL_LINKS.instagram || SOCIAL_LINKS.tiktok;

  return (
    <>
      <SiteHeader />

      <main className="container-page flex min-h-[70vh] items-center py-16 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="mx-auto grid size-14 place-items-center rounded-2xl border border-line bg-paper-deep">
            <svg viewBox="0 0 24 24" className="size-7 text-accent-deep" aria-hidden>
              <path
                d="M4.5 12.5l5 5 10-11"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>

          <h1 className="h-display mt-8">
            You&rsquo;re <span className="serif-accent text-accent-deep">in.</span>
          </h1>

          <div className="mx-auto mt-6 max-w-xl space-y-4 text-lg leading-relaxed text-ink-muted">
            <p>Thanks for applying to become a Discovered Local creator.</p>
            <p>
              We&rsquo;ll review your application and be in touch if you&rsquo;re a good
              fit for upcoming Portsmouth opportunities.
            </p>
            <p className="text-ink">In the meantime, keep creating.</p>
          </div>

          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            {followUrl ? (
              <a
                href={followUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonStyles({ size: "lg", className: "w-full sm:w-auto" })}
              >
                Follow Discovered Local
              </a>
            ) : null}
            <Link
              href="/"
              className={buttonStyles({
                variant: "ghost",
                size: "lg",
                className: "w-full sm:w-auto",
              })}
            >
              Back to home
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
