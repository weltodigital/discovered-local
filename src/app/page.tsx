import type { Metadata } from "next";

import { ApplyCta } from "@/components/site/ApplyCta";
import { HeroVisual } from "@/components/site/HeroVisual";
import { PageViewTracker } from "@/components/site/PageViewTracker";
import { PortsmouthMotif } from "@/components/site/PortsmouthMotif";
import { Reveal } from "@/components/site/Reveal";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${SITE_NAME} — Portsmouth Creators & Local Businesses`,
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
};

const STEPS = [
  {
    number: "01",
    title: "Apply",
    copy: "Tell us about yourself, your content and where you create.",
  },
  {
    number: "02",
    title: "Get matched",
    copy: "When a local business is looking for creators, we'll send opportunities to creators who fit.",
  },
  {
    number: "03",
    title: "Create",
    copy: "Visit, experience the place and create content your audience will actually enjoy.",
  },
  {
    number: "04",
    title: "Get invited back",
    copy: "Create great content, show up and we'll keep you in the loop about future opportunities.",
  },
];

const BENEFITS = [
  {
    emoji: "🍴",
    title: "Free experiences",
    copy: "Discover restaurants, cafés and local businesses without paying for the experience.",
  },
  {
    emoji: "📱",
    title: "Content opportunities",
    copy: "Find interesting places and experiences worth sharing with your audience.",
  },
  {
    emoji: "📍",
    title: "Local connections",
    copy: "Build relationships with businesses and other creators around Portsmouth.",
  },
  {
    emoji: "🔁",
    title: "More opportunities",
    copy: "Reliable creators who make good content will get access to more collaborations.",
  },
];

const CRITERIA = [
  "You create on TikTok, Instagram or both",
  "You're based in or around Portsmouth",
  "You enjoy food, hospitality, lifestyle or local businesses",
  "You create good-quality video",
  "You're reliable and actually show up",
  "You want to discover new places",
];

export default function HomePage() {
  return (
    <>
      <PageViewTracker event="landing_page_view" />
      <SiteHeader />

      <main id="main">
        {/* ---------------------------------------------------------- Hero */}
        <section className="container-page relative pt-10 pb-24 sm:pt-16 sm:pb-28 lg:pt-20 lg:pb-36">
          <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-16">
            <div>
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full border border-line bg-paper-deep px-3 py-1.5 text-xs font-medium tracking-[-0.005em] text-ink-muted">
                  <span className="size-1.5 rounded-full bg-accent-deep" />
                  Now recruiting in Portsmouth
                </span>
              </Reveal>

              <Reveal delay={60}>
                <h1 className="h-display mt-6">
                  Discover local.
                  <br />
                  Create content.
                  <br />
                  <span className="serif-accent text-accent-deep">Get invited back.</span>
                </h1>
              </Reveal>

              <Reveal delay={120}>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted sm:text-xl">
                  Discovered Local connects Portsmouth creators with great local
                  restaurants, cafés, bars and businesses. Discover somewhere new,
                  create content for your audience and become part of the local
                  creator community.
                </p>
              </Reveal>

              <Reveal delay={180}>
                <div className="mt-8 flex flex-col items-start gap-3">
                  <ApplyCta location="hero" className="w-full sm:w-auto" />
                  <p className="text-sm text-ink-muted">Portsmouth creators wanted.</p>
                </div>
              </Reveal>
            </div>

            <Reveal delay={140} className="lg:pl-4">
              <HeroVisual />
            </Reveal>
          </div>
        </section>

        {/* --------------------------------------- What is Discovered Local */}
        <section
          id="for-creators"
          className="border-y border-line bg-paper-deep py-20 sm:py-28"
        >
          <div className="container-page grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
            <Reveal>
              <p className="eyebrow">What is Discovered Local?</p>
              <h2 className="h-section mt-4">
                Great local places need <span className="serif-accent">great local creators.</span>
              </h2>
            </Reveal>

            <Reveal delay={80} className="max-w-2xl space-y-5 text-lg leading-relaxed text-ink-muted lg:pt-2">
              <p>
                There are brilliant restaurants, cafés, bars and independent
                businesses all over Portsmouth. There are also loads of people
                creating brilliant content about the city.
              </p>
              <p className="text-ink">We&rsquo;re bringing the two together.</p>
              <p>
                Discovered Local gives local creators opportunities to discover new
                places, create content and build relationships with the businesses
                that make Portsmouth interesting.
              </p>
            </Reveal>
          </div>
        </section>

        {/* -------------------------------------------------- How it works */}
        <section id="how-it-works" className="container-page py-20 sm:py-28">
          <Reveal>
            <p className="eyebrow">How it works</p>
            <h2 className="h-section mt-4 max-w-2xl">It&rsquo;s pretty simple.</h2>
          </Reveal>

          <ol className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, index) => (
              <Reveal as="li" key={step.number} delay={index * 70}>
                <div className="flex h-full flex-col border-t border-line-strong pt-5">
                  <span className="font-display text-[2.75rem] leading-none text-accent-deep">
                    {step.number}
                  </span>
                  <h3 className="h-card mt-4">{step.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink-muted">{step.copy}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </section>

        {/* ---------------------------------------------- What creators get */}
        <section className="border-y border-line bg-paper-deep py-20 sm:py-28">
          <div className="container-page">
            <Reveal>
              <p className="eyebrow">What creators get</p>
              <h2 className="h-section mt-4 max-w-2xl">What&rsquo;s in it for you?</h2>
            </Reveal>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {BENEFITS.map((benefit, index) => (
                <Reveal as="article" key={benefit.title} delay={index * 70}>
                  <div className="h-full rounded-2xl border border-line bg-paper p-6">
                    <span
                      aria-hidden
                      className="grid size-11 place-items-center rounded-xl border border-line bg-paper-deep text-xl"
                    >
                      {benefit.emoji}
                    </span>
                    <h3 className="h-card mt-5">{benefit.title}</h3>
                    <p className="mt-2 leading-relaxed text-ink-muted">{benefit.copy}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={120}>
              <p className="mt-8 max-w-2xl text-sm leading-relaxed text-ink-muted">
                Opportunities depend on what local businesses are looking for, so we
                can&rsquo;t promise every applicant a collaboration. We&rsquo;ll be
                straight with you about what&rsquo;s available.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ------------------------------------------ Who we're looking for */}
        <section className="container-page py-20 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
            <Reveal>
              <p className="eyebrow">Who we&rsquo;re looking for</p>
              <h2 className="h-section mt-4">
                You don&rsquo;t need <span className="serif-accent">100k followers.</span>
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">
                We&rsquo;re much more interested in whether you create good content and
                whether your audience actually cares about Portsmouth.
              </p>
              <p className="mt-6 max-w-xl text-lg leading-relaxed">
                Whether you&rsquo;ve got 1,000 followers or 100,000, we&rsquo;d still
                love to hear from you.
              </p>
            </Reveal>

            <Reveal delay={80}>
              <ul className="divide-y divide-line border-y border-line">
                {CRITERIA.map((item) => (
                  <li key={item} className="flex items-start gap-4 py-4">
                    <svg
                      viewBox="0 0 20 20"
                      className="mt-1 size-5 shrink-0 text-accent-deep"
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
                    <span className="text-[1.05rem] leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* --------------------------------------------------- The standard */}
        <section className="border-y border-line bg-ink py-20 text-paper sm:py-28">
          <div className="container-page grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
            <Reveal>
              <p className="eyebrow text-paper/50">The standard</p>
              <h2 className="h-section mt-4">
                A little effort goes <span className="serif-accent">a long way.</span>
              </h2>
            </Reveal>

            <Reveal delay={80} className="max-w-2xl space-y-5 text-lg leading-relaxed text-paper/70 lg:pt-2">
              <p>
                We&rsquo;re building a community of creators that local businesses can
                trust.
              </p>
              <p>
                That means turning up when you say you will, creating content
                you&rsquo;re proud of and treating the businesses you visit well.
              </p>
              <p className="text-paper">
                Do that consistently and you&rsquo;ll get access to more opportunities.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ---------------------------------------------------- Portsmouth */}
        <section className="container-page py-20 sm:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-20">
            <Reveal>
              <p className="eyebrow">Our first city</p>
              <h2 className="h-section mt-4">Starting in Portsmouth.</h2>
              <div className="mt-6 max-w-xl space-y-5 text-lg leading-relaxed text-ink-muted">
                <p>We&rsquo;re starting right here in Portsmouth.</p>
                <p>
                  From independent restaurants and cafés to bars, food spots and
                  everything in between, we&rsquo;re on a mission to help more great
                  local businesses get discovered.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-2">
                {[
                  "Southsea",
                  "Old Portsmouth",
                  "Fratton",
                  "Cosham",
                  "Portchester",
                  "Havant",
                  "Waterlooville",
                  "Fareham",
                ].map((area) => (
                  <span
                    key={area}
                    className="rounded-full border border-line bg-paper-deep px-3 py-1.5 text-sm text-ink-muted"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={80}>
              <PortsmouthMotif />
            </Reveal>
          </div>
        </section>

        {/* ---------------------------------------------------------- CTA */}
        <section className="container-page pb-20 sm:pb-28">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-line bg-paper-deep px-6 py-16 text-center sm:px-12 sm:py-24">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-70"
                style={{
                  backgroundImage:
                    "radial-gradient(var(--color-line-strong) 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                  maskImage:
                    "radial-gradient(60% 60% at 50% 50%, transparent 20%, #000 100%)",
                  WebkitMaskImage:
                    "radial-gradient(60% 60% at 50% 50%, transparent 20%, #000 100%)",
                }}
              />
              <div className="relative mx-auto max-w-2xl">
                <h2 className="h-section">
                  Want to discover <span className="serif-accent">what&rsquo;s next?</span>
                </h2>
                <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink-muted">
                  Join the Discovered Local creator community and we&rsquo;ll let you
                  know when new local opportunities become available.
                </p>
                <div className="mt-9 flex flex-col items-center gap-3">
                  <ApplyCta location="footer_cta" className="w-full sm:w-auto" />
                  <p className="text-sm text-ink-muted">
                    Free to join. Portsmouth only for now.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
