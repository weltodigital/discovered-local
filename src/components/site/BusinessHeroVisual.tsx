"use client";

import { motion, useReducedMotion } from "motion/react";

import { ImageSlot } from "@/components/site/ImageSlot";
import { EASE } from "@/components/site/Reveal";

function PlayGlyph({ className = "" }: { className?: string }) {
  return (
    <span
      className={`grid size-9 place-items-center rounded-full bg-paper/85 backdrop-blur-sm ${className}`}
    >
      <svg viewBox="0 0 24 24" className="ml-0.5 size-3.5 fill-ink" aria-hidden>
        <path d="M8 5.5v13l11-6.5-11-6.5Z" />
      </svg>
    </span>
  );
}

/**
 * The local audience, as faces rather than coloured discs. Decorative: the
 * sentence beside the stack carries the meaning, so every alt is empty.
 */
const AUDIENCE_FACES = [
  "/28-yo-woman.png",
  "/40-yo-man.png",
  "/50-yo-woman.png",
  "/old-couple.png",
];

/**
 * The chain assembles itself top to bottom on load: business, then creator,
 * then the content, then the audience. It reads as the process happening
 * rather than four cards appearing at once.
 */
const CHAIN = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.25 } },
};

const LINK = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

/** Dotted connector with the step it represents, spoken in plain language. */
function Connector({ label }: { label: string }) {
  return (
    <motion.div variants={LINK} className="flex items-center gap-3 py-2.5 pl-[1.6rem]">
      <span
        aria-hidden
        className="h-8 w-px border-l border-dashed border-line-strong"
      />
      <span className="text-xs tracking-[-0.005em] text-ink-muted">{label}</span>
    </motion.div>
  );
}

/**
 * The whole product in one column: a local business, a local creator, the
 * content they make and the local audience that sees it. Deliberately built
 * from social-content cards rather than dashboard chrome — the customer is a
 * restaurant owner, not a marketing ops team.
 *
 * The names and handles are illustrative; the page says so beneath.
 */
export function BusinessHeroVisual() {
  const reduced = useReducedMotion();

  return (
    <div className="relative mx-auto w-full max-w-[27rem] lg:max-w-none">
      <div
        aria-hidden
        className="absolute -inset-5 -z-10 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(var(--color-line-strong) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
          maskImage: "radial-gradient(72% 60% at 50% 45%, #000 25%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(72% 60% at 50% 45%, #000 25%, transparent 100%)",
        }}
      />

      <motion.div
        variants={CHAIN}
        initial={reduced ? false : "hidden"}
        animate={reduced ? undefined : "show"}
        className="rounded-3xl border border-line bg-paper p-4 shadow-[0_28px_60px_-40px_rgba(10,17,34,0.45)] sm:p-5"
      >
        {/* ---------------------------------------------------- Business */}
        <motion.div variants={LINK} className="flex items-center gap-3.5">
          <ImageSlot
            src="/southsea-cafe-bistro.png"
            alt="An independent café in Southsea, with pavement tables outside"
            sizes="56px"
            className="size-14 shrink-0 rounded-2xl border border-line"
          />
          <div className="min-w-0">
            <p className="eyebrow">Your business</p>
            <p className="mt-1 truncate font-semibold tracking-[-0.015em]">
              Independent bistro, Southsea
            </p>
          </div>
          <span className="ml-auto shrink-0 rounded-full border border-line bg-paper-deep px-2.5 py-1 text-xs text-ink-muted">
            Restaurant
          </span>
        </motion.div>

        <Connector label="We find and match a local creator" />

        {/* ----------------------------------------------------- Creator */}
        <motion.div
          variants={LINK}
          className="flex items-center gap-3.5 rounded-2xl border border-line bg-paper-deep p-3.5"
        >
          <ImageSlot
            src="/portsmouth-plates.png"
            alt=""
            sizes="44px"
            className="size-11 shrink-0 rounded-full border border-line"
          />
          <div className="min-w-0">
            <p className="truncate text-[0.95rem] font-semibold tracking-[-0.015em]">
              @portsmouth.plates
            </p>
            <p className="truncate text-sm text-ink-muted">
              Portsmouth · Food &amp; lifestyle
            </p>
          </div>
          <div className="ml-auto flex shrink-0 gap-1.5">
            {["TikTok", "Instagram"].map((platform) => (
              <span
                key={platform}
                className="rounded-full border border-line bg-paper px-2 py-0.5 text-[0.7rem] text-ink-muted"
              >
                {platform}
              </span>
            ))}
          </div>
        </motion.div>

        <Connector label="They visit and create the content" />

        {/* ----------------------------------------------------- Content */}
        <motion.div variants={LINK} className="grid grid-cols-2 gap-3">
          {[
            {
              tone: "ink" as const,
              caption: "Found the best brunch in Southsea",
              meta: "TikTok",
            },
            {
              tone: "moss" as const,
              caption: "Sunday roast, Old Portsmouth",
              meta: "Reels",
            },
          ].map((card) => (
            <div
              key={card.caption}
              className="overflow-hidden rounded-2xl border border-line"
            >
              <ImageSlot tone={card.tone} className="aspect-4/5">
                <div className="absolute inset-0 grid place-items-center">
                  <PlayGlyph />
                </div>
                <span className="absolute top-2.5 left-2.5 rounded-full bg-black/30 px-2 py-0.5 text-[0.65rem] font-medium text-white/90 backdrop-blur-sm">
                  {card.meta}
                </span>
              </ImageSlot>
              <p className="bg-paper px-3 py-2.5 text-xs leading-snug text-ink-muted">
                {card.caption}
              </p>
            </div>
          ))}
        </motion.div>

        <Connector label="Their local audience discovers you" />

        {/* ---------------------------------------------- Local audience */}
        <motion.div
          variants={LINK}
          className="flex items-center gap-3 rounded-2xl border border-line bg-paper-deep px-3.5 py-3"
        >
          <div className="flex -space-x-2">
            {AUDIENCE_FACES.map((src) => (
              <ImageSlot
                key={src}
                src={src}
                alt=""
                sizes="32px"
                className="size-8 shrink-0 rounded-full border-2 border-paper"
              />
            ))}
          </div>
          <p className="text-sm leading-snug">
            <span className="font-semibold">People nearby</span>
            <span className="text-ink-muted"> looking for somewhere new to go</span>
          </p>
        </motion.div>
      </motion.div>

      <p className="mt-3 text-center text-xs text-ink-muted">
        Illustrative example, not a real collaboration.
      </p>
    </div>
  );
}
