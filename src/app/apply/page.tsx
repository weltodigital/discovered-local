import type { Metadata } from "next";

import { ApplicationForm } from "@/components/apply/ApplicationForm";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";

export const metadata: Metadata = {
  title: "Become a Portsmouth creator",
  description:
    "Apply to join the Discovered Local creator community. Discover new Portsmouth restaurants, cafés and local businesses, create content and get invited back.",
  alternates: { canonical: "/apply" },
  openGraph: {
    title: "Become a Discovered Local creator",
    description:
      "Apply to join the Discovered Local creator community in Portsmouth.",
    url: "/apply",
  },
};

const REASSURANCE = [
  { label: "Takes about 3 minutes", detail: "Three short sections, that's it." },
  { label: "No follower minimum", detail: "We care about the content, not the count." },
  { label: "Free to join", detail: "Portsmouth and the surrounding area, for now." },
];

export default function ApplyPage() {
  return (
    <>
      <SiteHeader />

      <main className="container-page py-12 sm:py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow">Creator application</p>
            <h1 className="h-section mt-4">
              Become a <span className="serif-accent">Discovered Local</span> creator.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-muted">
              Tell us a little about yourself and the content you create. If
              you&rsquo;re a good fit, we&rsquo;ll be in touch when opportunities come
              up.
            </p>

            <ul className="mt-8 hidden divide-y divide-line border-y border-line lg:block">
              {REASSURANCE.map((item) => (
                <li key={item.label} className="py-4">
                  <p className="font-medium tracking-[-0.01em]">{item.label}</p>
                  <p className="mt-1 text-[0.95rem] text-ink-muted">{item.detail}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-line bg-paper-deep/60 p-5 sm:p-8">
            <ApplicationForm />
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
