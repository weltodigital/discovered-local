import type { Metadata } from "next";

import { BusinessLeadForm } from "@/components/business/BusinessLeadForm";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { PRICE_FOUNDING, PRICE_STANDARD } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Get started",
  description:
    `Tell us about your business and we’ll show you how Discovered Local gets local Portsmouth creators through your doors. 4 collaborations every month, ${PRICE_FOUNDING} for founding businesses.`,
  alternates: { canonical: "/get-started" },
  openGraph: {
    title: "Get started with Discovered Local",
    description:
      `4 local creator collaborations every month, ${PRICE_FOUNDING} for founding businesses. Tell us about your business.`,
    url: "/get-started",
  },
};

const INCLUDED = [
  "4 local creator collaborations",
  "4+ pieces of social content",
  "Creators matched to your business",
  "All coordination handled by us",
  "No long-term contract",
];

export default function GetStartedPage() {
  return (
    <>
      <SiteHeader audience="business" />

      <main className="container-page py-12 sm:py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow">Get started</p>
            <h1 className="h-section mt-4">
              Let&rsquo;s get your business{" "}
              <span className="serif-accent">discovered.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-muted">
              Tell us a little about your business and we&rsquo;ll come back to you
              with how Discovered Local would work for you: which creators are a fit,
              how the visits are arranged and what to expect each month.
            </p>

            <div className="mt-8 rounded-2xl border border-line bg-paper-deep p-6">
              <span className="inline-flex items-center rounded-full border border-accent-deep/30 bg-accent-soft px-3 py-1.5 text-xs font-medium tracking-[0.08em] text-accent-deep uppercase">
                Founding businesses
              </span>
              <p className="mt-5 flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                <span className="sr-only">Standard price</span>
                <span
                  aria-hidden
                  className="text-xl leading-none font-medium tracking-[-0.03em] text-ink-muted line-through"
                >
                  {PRICE_STANDARD}
                </span>
                <span className="sr-only">Founding price</span>
                <span className="text-[2.5rem] leading-none font-semibold tracking-[-0.04em]">
                  {PRICE_FOUNDING}
                </span>
                <span className="text-ink-muted">/ month</span>
              </p>
              <ul className="mt-5 flex flex-col gap-2.5">
                {INCLUDED.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <svg
                      viewBox="0 0 20 20"
                      className="mt-0.5 size-5 shrink-0 text-accent-deep"
                      aria-hidden
                    >
                      <path
                        d="M4 10.5l4 4 8-9"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="text-[0.95rem] leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 border-t border-line pt-4 text-sm leading-relaxed text-ink-muted">
                Our standard price is {PRICE_STANDARD}/month. The first Portsmouth
                businesses to join pay {PRICE_FOUNDING}. Nothing to pay now: this is
                an enquiry, not a sign-up, and we&rsquo;ll talk it through with you
                first.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-line bg-paper-deep/60 p-5 sm:p-8">
            <BusinessLeadForm />
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
