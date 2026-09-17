import type { Metadata } from "next";
import Link from "next/link";

import { BusinessCta } from "@/components/site/BusinessCta";
import { CountUp } from "@/components/site/CountUp";
import { BusinessHeroVisual } from "@/components/site/BusinessHeroVisual";
import { CreatorNetwork } from "@/components/site/CreatorNetwork";
import { FlowChain } from "@/components/site/FlowChain";
import { PageViewTracker } from "@/components/site/PageViewTracker";
import { PortsmouthMotif } from "@/components/site/PortsmouthMotif";
import { Reveal } from "@/components/site/Reveal";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { buttonStyles } from "@/components/ui/button";
import {
  PRICE_FOUNDING,
  PRICE_STANDARD,
  SITE_DESCRIPTION,
  SITE_NAME,
} from "@/lib/constants";

const TITLE = `${SITE_NAME} | Get Discovered by Local Creators`;

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: SITE_DESCRIPTION,
  keywords: [
    "local creator marketing",
    "Portsmouth creators",
    "Portsmouth TikTok creators",
    "local influencer marketing",
    "Portsmouth restaurant marketing",
    "local content creators",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
  },
  twitter: { title: TITLE, description: SITE_DESCRIPTION },
};

const PROBLEMS = [
  { title: "Finding creators", copy: "Who actually has a local audience?" },
  { title: "Outreach", copy: "Who should you message? What do you say?" },
  {
    title: "Organisation",
    copy: "Who’s coming in? When? What are they creating?",
  },
  { title: "Follow-up", copy: "Did they post? Where? When?" },
];

const STEPS = [
  {
    number: "01",
    title: "We find the creators",
    copy: "We build a network of local TikTok and Instagram creators and identify the people who are a good fit for your business.",
  },
  {
    number: "02",
    title: "We arrange the collaborations",
    copy: "We handle the outreach, matching, scheduling and reminders.",
  },
  {
    number: "03",
    title: "They visit and create",
    copy: "Creators experience your business and create authentic content for their audience.",
  },
  {
    number: "04",
    title: "You get discovered",
    copy: "Your business gets in front of people nearby who are looking for somewhere new to go.",
  },
];

const INCLUDED = [
  "4 local creator collaborations",
  "4+ pieces of social content",
  "TikTok & Instagram exposure",
  "Creators matched to your business",
  "Creator coordination handled",
  "Fresh creators regularly introduced",
  "No long-term contract",
];

/**
 * The benefit layer. Everything here is something we actually control or that
 * follows from the mechanism — no promised views, bookings or revenue.
 */
const BENEFITS = [
  {
    title: "A content bank that keeps growing",
    copy: "Every month adds more real video of your food, your room and your people, made by someone who actually came in.",
  },
  {
    title: "Audiences that aren’t yours yet",
    copy: "Every creator brings their own local following, so you turn up in front of people nearby who haven’t found you, via someone they already watch.",
  },
  {
    title: "A recommendation, not an advert",
    copy: "It doesn’t read like marketing, because it isn’t. It’s someone local telling their audience about somewhere they went.",
  },
  {
    title: "Nothing for you to produce",
    copy: "No shoot to organise, no filming, no editing, no captions to write. You host the visit. The creator makes the content.",
  },
  {
    title: "Content you can use yourself",
    copy: "Agree it with the creator and their content can live on your own channels and website too, long after the visit.",
  },
  {
    title: "Pointed where you need it",
    copy: "Quiet Tuesday lunches, a new menu, a refurb, a seasonal push. Tell us what matters this month and we’ll aim the collaborations at it.",
  },
];

/** Cumulative collaborations. Arithmetic on the commitment, not a forecast. */
const MILESTONES = [
  { month: "Month 1", total: 4 },
  { month: "Month 3", total: 12 },
  { month: "Month 6", total: 24 },
  { month: "Month 12", total: 48 },
];

const AUDIENCE = [
  {
    title: "Restaurants",
    copy: "Get more people discovering what’s on the menu.",
  },
  {
    title: "Cafés",
    copy: "Put your coffee, brunch and atmosphere in front of local audiences.",
  },
  {
    title: "Bars & pubs",
    copy: "Show people why they should visit.",
  },
  {
    title: "Independent businesses",
    copy: "Turn great experiences into content people want to share.",
  },
];

const RESPONSIBILITIES = [
  {
    who: "You",
    lines: ["Provide the experience."],
  },
  {
    who: "Us",
    lines: [
      "Find creators.",
      "Match them.",
      "Arrange the visit.",
      "Send reminders.",
      "Track the content.",
    ],
  },
  {
    who: "Creators",
    lines: ["Visit.", "Create.", "Post."],
  },
];

function Tick({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={`size-5 shrink-0 ${className}`} aria-hidden>
      <path
        d="M4 10.5l4 4 8-9"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function HomePage() {
  return (
    <>
      <PageViewTracker event="homepage_view" />
      <SiteHeader audience="business" />

      <main id="main">
        {/* ---------------------------------------------------------- Hero */}
        <section className="container-page relative pt-10 pb-20 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-28">
          <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
            <div>
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full border border-line bg-paper-deep px-3 py-1.5 text-xs font-medium tracking-[-0.005em] text-ink-muted">
                  <span className="size-1.5 rounded-full bg-accent-deep" />
                  For local businesses in Portsmouth
                </span>
              </Reveal>

              <Reveal delay={60}>
                <h1 className="h-display mt-6">
                  Get discovered by{" "}
                  <span className="serif-accent text-accent-deep">local creators.</span>
                </h1>
              </Reveal>

              <Reveal delay={120}>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted sm:text-xl">
                  Discovered Local connects your business with relevant TikTok and
                  Instagram creators in your area, and handles everything from
                  finding the right creators to arranging visits and getting the
                  content posted.
                </p>
              </Reveal>

              <Reveal delay={180}>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <BusinessCta location="hero" className="w-full sm:w-auto" />
                  <Link
                    href="#how-it-works"
                    className={buttonStyles({
                      variant: "ghost",
                      size: "lg",
                      className: "w-full sm:w-auto",
                    })}
                  >
                    See how it works
                  </Link>
                </div>
              </Reveal>

              <Reveal delay={240}>
                <p className="mt-6 text-sm leading-relaxed text-ink-muted">
                  4 local creator collaborations every month · No long-term contract ·
                  Starting in Portsmouth
                </p>
              </Reveal>
            </div>

            <Reveal delay={140} className="lg:pl-4">
              <BusinessHeroVisual />
            </Reveal>
          </div>
        </section>

        {/* ------------------------------------------------- 2. The problem */}
        <section className="border-y border-line bg-paper-deep py-20 sm:py-28">
          <div className="container-page">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-20">
              <Reveal>
                <p className="eyebrow">The problem</p>
                <h2 className="h-section mt-4">
                  Finding good local creators{" "}
                  <span className="serif-accent">shouldn&rsquo;t be your job.</span>
                </h2>
              </Reveal>

              <Reveal
                delay={80}
                className="max-w-2xl space-y-5 text-lg leading-relaxed text-ink-muted lg:pt-2"
              >
                <p>You know social media matters.</p>
                <p>
                  But finding creators, checking whether they&rsquo;re actually local,
                  messaging them, arranging visits, chasing content and figuring out
                  who&rsquo;s worth working with takes time.
                </p>
                <p className="text-xl font-semibold tracking-[-0.02em] text-ink">
                  We do all of that for you.
                </p>
              </Reveal>
            </div>

            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {PROBLEMS.map((problem, index) => (
                <Reveal as="article" key={problem.title} delay={index * 70}>
                  <div className="h-full rounded-2xl border border-line bg-paper p-6">
                    <h3 className="h-card">{problem.title}</h3>
                    <p className="mt-2 leading-relaxed text-ink-muted">
                      {problem.copy}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={120}>
              <p className="mt-10 text-center text-xl font-semibold tracking-[-0.02em] sm:text-2xl">
                Discovered Local takes the work off your plate.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ------------------------------------------------- 3. The product */}
        <section id="how-it-works" className="container-page py-20 sm:py-28">
          <Reveal>
            <p className="eyebrow">How it works</p>
            <h2 className="h-section mt-4 max-w-3xl">
              A simple way to get local creators{" "}
              <span className="serif-accent">through your doors.</span>
            </h2>
          </Reveal>

          <ol className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
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

          <Reveal delay={120}>
            <div className="mt-14">
              <FlowChain
                steps={[
                  { step: "business", label: "Business", detail: "You host the visit" },
                  { step: "creator", label: "Creator", detail: "Matched by us" },
                  { step: "content", label: "Content", detail: "TikTok & Instagram" },
                  {
                    step: "audience",
                    label: "Local audience",
                    detail: "People nearby",
                  },
                ]}
              />
            </div>
          </Reveal>
        </section>

        {/* ------------------------------------------------- 4. The offer */}
        <section
          id="pricing"
          className="border-y border-line bg-ink py-20 text-paper sm:py-28"
        >
          <div className="container-page">
            <Reveal>
              <p className="eyebrow text-paper/50">Pricing</p>
              <h2 className="h-section mt-4 max-w-2xl">
                One simple <span className="serif-accent">monthly price.</span>
              </h2>
            </Reveal>

            <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start lg:gap-16">
              <Reveal delay={80}>
                <div className="rounded-3xl border border-paper/15 bg-paper/5 p-7 sm:p-9">
                  <span className="inline-flex items-center rounded-full border border-accent/40 bg-accent/10 px-3 py-1.5 text-xs font-medium tracking-[0.08em] text-accent uppercase">
                    Founding businesses
                  </span>

                  <p className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="sr-only">Standard price</span>
                    <span
                      aria-hidden
                      className="text-[1.75rem] leading-none font-medium tracking-[-0.03em] text-paper/40 line-through"
                    >
                      {PRICE_STANDARD}
                    </span>
                    <span className="sr-only">Founding price</span>
                    <span className="text-[3.75rem] leading-none font-semibold tracking-[-0.04em] sm:text-[4.5rem]">
                      {PRICE_FOUNDING}
                    </span>
                    <span className="text-lg text-paper/60">/ month</span>
                  </p>

                  <p className="mt-5 leading-relaxed text-paper/70">
                    4 local creator collaborations every month, fully coordinated.
                    Our standard price is {PRICE_STANDARD}/month. The first
                    Portsmouth businesses to join pay {PRICE_FOUNDING}.
                  </p>
                  <BusinessCta
                    location="pricing"
                    className="mt-8 w-full"
                  >
                    Get started
                  </BusinessCta>
                  <p className="mt-4 text-sm text-paper/60">
                    No long-term contract.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={140}>
                <p className="text-lg font-medium tracking-[-0.015em]">
                  Every month you get:
                </p>
                <ul className="mt-5 grid gap-x-10 sm:grid-cols-2">
                  {INCLUDED.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 border-b border-paper/10 py-3.5 last:border-0"
                    >
                      <Tick className="mt-0.5 text-accent" />
                      <span className="text-[1.05rem] leading-relaxed text-paper/90">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                <p className="mt-8 text-lg leading-relaxed text-paper/70">
                  You provide the experience. We handle everything else.
                </p>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-paper/50">
                  The commitment is 4 creator collaborations a month. Most
                  collaborations produce more than one piece of content, but creators
                  decide what they publish, so we don&rsquo;t guarantee views,
                  or customers.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* -------------------------------------------- 5. Why local creators */}
        <section className="container-page py-20 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-20">
            <Reveal>
              <p className="eyebrow">Why local creators</p>
              <h2 className="h-section mt-4">
                Local followers matter more than{" "}
                <span className="serif-accent">huge follower counts.</span>
              </h2>
              <div className="mt-6 max-w-xl space-y-5 text-lg leading-relaxed text-ink-muted">
                <p>We&rsquo;re not looking for celebrities.</p>
                <p>
                  We&rsquo;re looking for creators whose audiences actually live
                  nearby.
                </p>
                <p>
                  A Portsmouth creator with a few thousand engaged local followers can
                  be far more relevant to a Portsmouth restaurant than someone with a
                  huge audience spread across the country.
                </p>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className="flex flex-col gap-3">
                <div className="rounded-2xl border border-accent-deep/30 bg-accent-soft p-6">
                  <p className="text-[2.25rem] leading-none font-semibold tracking-[-0.035em] text-accent-deep sm:text-[2.75rem]">
                    3,000
                  </p>
                  <p className="mt-2 font-medium">local followers</p>
                  <p className="mt-1 text-sm text-ink-muted">
                    People who can actually walk through your door.
                  </p>
                </div>

                <p className="px-1 text-sm font-medium text-ink-muted">
                  can be more relevant than
                </p>

                <div className="rounded-2xl border border-line bg-paper-deep p-6">
                  <p className="text-[2.25rem] leading-none font-semibold tracking-[-0.035em] text-ink-muted sm:text-[2.75rem]">
                    100,000
                  </p>
                  <p className="mt-2 font-medium text-ink-muted">
                    nationwide followers
                  </p>
                  <p className="mt-1 text-sm text-ink-muted">
                    Spread across the whole country.
                  </p>
                </div>

                <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                  An illustration of how we pick creators, not a performance claim.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* --------------------------------------- 6. What the business gets */}
        <section className="border-y border-line bg-paper-deep py-20 sm:py-28">
          <div className="container-page">
            <Reveal>
              <p className="eyebrow">What you get</p>
              <h2 className="h-section mt-4 max-w-2xl">
                More than <span className="serif-accent">another social media post.</span>
              </h2>
            </Reveal>

            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: "Content",
                  copy: "Get a regular stream of authentic content created by people who actually visit and experience your business.",
                },
                {
                  title: "Distribution",
                  copy: "Every creator brings their own audience, putting your business in front of people who may not have discovered you otherwise.",
                },
              ].map((item, index) => (
                <Reveal as="article" key={item.title} delay={index * 80}>
                  <div className="h-full rounded-2xl border border-line bg-paper p-7 sm:p-8">
                    <h3 className="text-xl font-semibold tracking-[-0.02em]">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-[1.05rem] leading-relaxed text-ink-muted">
                      {item.copy}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="mt-16">
              <Reveal>
                <h3 className="text-2xl font-semibold tracking-[-0.025em] sm:text-3xl">
                  What that means, month after month.
                </h3>
                <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">
                  The point isn’t the posts. It’s what a steady stream of local
                  creator content does for a business that people have to find
                  before they can visit.
                </p>
              </Reveal>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {BENEFITS.map((benefit, index) => (
                  <Reveal as="article" key={benefit.title} delay={(index % 3) * 70}>
                    <div className="h-full rounded-2xl border border-line bg-paper p-6">
                      <h4 className="h-card">{benefit.title}</h4>
                      <p className="mt-2.5 leading-relaxed text-ink-muted">
                        {benefit.copy}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={120}>
                <p className="mt-6 max-w-2xl text-sm leading-relaxed text-ink-muted">
                  What we control is the collaborations and the content. What
                  audiences do next is up to them, which is why we don’t promise
                  views, bookings or customers.
                </p>
              </Reveal>
            </div>

            <Reveal delay={120}>
              <div className="mt-16">
                <h3 className="h-card">One collaboration can create:</h3>
                <div className="mt-5">
                  <FlowChain
                    steps={[
                      { step: "creator", label: "Creator visit" },
                      { step: "content", label: "Social content" },
                      { step: "audience", label: "Local reach" },
                      { step: "business", label: "New people discovering you" },
                    ]}
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* -------------------------------------------------- 7. Why recurring */}
        <section className="container-page py-20 sm:py-28">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
            <Reveal>
              <p className="eyebrow">Why recurring</p>
              <h2 className="h-section mt-4">
                One creator post is nice.{" "}
                <span className="serif-accent">Four every month is a strategy.</span>
              </h2>
            </Reveal>

            <Reveal delay={80} className="max-w-2xl lg:pt-2">
              <div className="space-y-5 text-lg leading-relaxed text-ink-muted">
                <p>
                  The goal isn&rsquo;t one big influencer post and then nothing.
                </p>
                <p>
                  We want your business to keep showing up in local feeds throughout
                  the year.
                </p>
              </div>

              <p className="mt-7 text-xl font-semibold tracking-[-0.02em] sm:text-2xl">
                Different creators. Different audiences. Fresh content. Every month.
              </p>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <div className="mt-14 rounded-3xl border border-line bg-paper-deep p-6 sm:p-9">
              <p className="eyebrow">Your content bank, compounding</p>

              <ol className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {MILESTONES.map((milestone) => (
                  <li key={milestone.month}>
                    <p className="text-sm font-medium text-ink-muted">
                      {milestone.month}
                    </p>
                    <p className="mt-1.5 text-[2.5rem] leading-none font-semibold tracking-[-0.04em] tabular-nums sm:text-[3rem]">
                      <CountUp to={milestone.total} />
                    </p>
                    <p className="mt-1.5 text-sm leading-snug text-ink-muted">
                      collaborations so far
                    </p>
                  </li>
                ))}
              </ol>

              <p className="mt-8 border-t border-line pt-6 text-[1.05rem] leading-relaxed text-ink-muted">
                A year of Discovered Local is{" "}
                <span className="font-semibold text-ink">
                  48 local creator collaborations
                </span>{" "}
                and the content that comes with them, for {PRICE_FOUNDING} a month
                as a founding business. Your own channels keep doing their job.
                This is everything happening on everyone else’s.
              </p>
            </div>
          </Reveal>
        </section>

        {/* --------------------------------------------- 8. Creator network */}
        <section className="border-y border-line bg-paper-deep py-20 sm:py-28">
          <div className="container-page">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-20">
              <Reveal>
                <p className="eyebrow">The network</p>
                <h2 className="h-section mt-4">
                  We&rsquo;re building Portsmouth&rsquo;s{" "}
                  <span className="serif-accent">local creator network.</span>
                </h2>
              </Reveal>

              <Reveal
                delay={80}
                className="max-w-2xl space-y-5 text-lg leading-relaxed text-ink-muted lg:pt-2"
              >
                <p>
                  We&rsquo;re recruiting creators who make content about food,
                  restaurants, lifestyle and local life.
                </p>
                <p>
                  That means when you join Discovered Local, you&rsquo;re not starting
                  from scratch trying to find someone to work with.
                </p>
                <p className="text-ink">
                  We&rsquo;ve already started building the network.
                </p>
              </Reveal>
            </div>

            <Reveal delay={120} className="mt-12">
              <CreatorNetwork />
            </Reveal>
          </div>
        </section>

        {/* ------------------------------------------------- 9. Portsmouth */}
        <section className="container-page py-20 sm:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-20">
            <Reveal>
              <p className="eyebrow">Our first city</p>
              <h2 className="h-section mt-4">Starting in Portsmouth.</h2>
              <div className="mt-6 max-w-xl space-y-5 text-lg leading-relaxed text-ink-muted">
                <p>
                  We&rsquo;re building the UK&rsquo;s local creator network one city at
                  a time.
                </p>
                <p>
                  We&rsquo;re starting with Portsmouth, connecting the city&rsquo;s
                  restaurants and independent businesses with the creators who live
                  here.
                </p>
              </div>

              <ol className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-2">
                {["Portsmouth", "Southampton", "Bournemouth", "Brighton", "more"].map(
                  (city, index) => (
                    <li key={city} className="flex items-center gap-2">
                      <span
                        className={`rounded-full border px-3 py-1.5 text-sm ${
                          index === 0
                            ? "border-ink bg-ink font-medium text-paper"
                            : "border-line bg-paper-deep text-ink-muted"
                        }`}
                      >
                        {city}
                      </span>
                      {index < 4 ? (
                        <span aria-hidden className="text-line-strong">
                          →
                        </span>
                      ) : null}
                    </li>
                  ),
                )}
              </ol>

              <p className="mt-5 text-sm leading-relaxed text-ink-muted">
                Portsmouth is our launch city. The others are where we&rsquo;re headed
                next. They aren&rsquo;t live yet.
              </p>
            </Reveal>

            <Reveal delay={80}>
              <PortsmouthMotif />
            </Reveal>
          </div>
        </section>

        {/* --------------------------------------- 10. Objection handling */}
        <section className="border-y border-line bg-paper-deep py-20 sm:py-28">
          <div className="container-page">
            <Reveal>
              <div className="mx-auto max-w-3xl rounded-3xl border border-line bg-paper px-6 py-12 sm:px-12 sm:py-16">
                <p className="eyebrow">A fair question</p>
                <h2 className="h-section mt-4">
                  &ldquo;We already post on{" "}
                  <span className="serif-accent">Instagram.</span>&rdquo;
                </h2>
                <div className="mt-6 space-y-5 text-lg leading-relaxed text-ink-muted">
                  <p>That&rsquo;s great.</p>
                  <p>
                    But your own content mainly reaches the people who already follow
                    you.
                  </p>
                  <p>
                    Discovered Local helps you get in front of{" "}
                    <span className="font-semibold text-ink">
                      other people&rsquo;s local audiences
                    </span>{" "}
                    through creators who already make content people enjoy.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ------------------------------------------------ 11. Who is this for */}
        <section className="container-page py-20 sm:py-28">
          <Reveal>
            <p className="eyebrow">Who it&rsquo;s for</p>
            <h2 className="h-section mt-4 max-w-2xl">
              Built for businesses{" "}
              <span className="serif-accent">people discover locally.</span>
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {AUDIENCE.map((item, index) => (
              <Reveal as="article" key={item.title} delay={index * 70}>
                <div className="h-full rounded-2xl border border-line bg-paper-deep p-6">
                  <h3 className="h-card">{item.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink-muted">{item.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ------------------------------------ 12. Done-for-you breakdown */}
        <section className="border-y border-line bg-ink py-20 text-paper sm:py-28">
          <div className="container-page">
            <Reveal>
              <p className="eyebrow text-paper/50">Done for you</p>
              <h2 className="h-section mt-4 max-w-2xl">
                You don&rsquo;t need{" "}
                <span className="serif-accent">another thing to manage.</span>
              </h2>
            </Reveal>

            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {RESPONSIBILITIES.map((group, index) => (
                <Reveal as="article" key={group.who} delay={index * 80}>
                  <div
                    className={`flex h-full flex-col rounded-2xl border p-6 sm:p-7 ${
                      group.who === "Us"
                        ? "border-accent/40 bg-paper/10"
                        : "border-paper/15 bg-paper/5"
                    }`}
                  >
                    <h3 className="text-xl font-semibold tracking-[-0.02em]">
                      {group.who}
                    </h3>
                    <ul className="mt-4 flex flex-col gap-2.5">
                      {group.lines.map((line) => (
                        <li key={line} className="flex items-start gap-2.5">
                          <Tick className="mt-0.5 text-accent" />
                          <span className="text-[1.05rem] leading-snug text-paper/85">
                            {line}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* --------------------------------------------- 13. Founder stage */}
        <section className="container-page py-20 sm:py-28">
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-20">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-accent-deep/30 bg-accent-soft px-3 py-1.5 text-xs font-medium tracking-[0.08em] text-accent-deep uppercase">
                  Founding businesses
                </span>
                <h2 className="h-section mt-5">
                  We&rsquo;re just <span className="serif-accent">getting started.</span>
                </h2>
              </div>

              <div className="max-w-xl space-y-5 text-lg leading-relaxed text-ink-muted">
                <p>
                  Discovered Local is launching in Portsmouth, starting with a small
                  group of local businesses and creators.
                </p>
                <p className="text-ink">
                  Join the first businesses using Discovered Local in Portsmouth.
                </p>
                <BusinessCta
                  location="founding"
                  variant="ghost"
                  className="w-full sm:w-auto"
                >
                  Get started for {PRICE_FOUNDING}/month
                </BusinessCta>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ------------------------------------------------------- 14. CTA */}
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
                  Ready to <span className="serif-accent">get discovered?</span>
                </h2>
                <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink-muted">
                  Join the first businesses using Discovered Local in Portsmouth.
                </p>
                <div className="mt-9 flex flex-col items-center gap-3">
                  <BusinessCta location="footer_cta" className="w-full sm:w-auto" />
                  <p className="text-sm text-ink-muted">
                    4 local creator collaborations every month · No long-term contract
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
