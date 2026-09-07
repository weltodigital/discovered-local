import { ImageSlot } from "@/components/site/ImageSlot";

function PlayGlyph() {
  return (
    <span className="grid size-11 place-items-center rounded-full bg-paper/85 backdrop-blur-sm">
      <svg viewBox="0 0 24 24" className="ml-0.5 size-4 fill-ink" aria-hidden>
        <path d="M8 5.5v13l11-6.5-11-6.5Z" />
      </svg>
    </span>
  );
}

/**
 * Editorial composition standing in for photography: a portrait "content" frame,
 * a live opportunity card and a supporting frame, over a soft dot grid.
 */
export function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[30rem] lg:max-w-none">
      <div
        aria-hidden
        className="absolute -inset-4 -z-10 opacity-60 sm:-inset-6"
        style={{
          backgroundImage: "radial-gradient(var(--color-line-strong) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
          maskImage: "radial-gradient(70% 60% at 50% 45%, #000 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(70% 60% at 50% 45%, #000 30%, transparent 100%)",
        }}
      />

      <div className="grid grid-cols-5 gap-3 sm:gap-4">
        <ImageSlot
          tone="ink"
          label="Southsea · brunch"
          className="col-span-3 aspect-4/5 rounded-3xl border border-line"
        >
          <div className="absolute inset-0 grid place-items-center">
            <PlayGlyph />
          </div>
        </ImageSlot>

        <div className="col-span-2 flex flex-col gap-3 sm:gap-4">
          <ImageSlot
            tone="accent"
            label="Albert Road"
            className="aspect-square rounded-2xl border border-line"
          />
          <ImageSlot
            tone="sand"
            label="Old Portsmouth"
            className="flex-1 rounded-2xl border border-line"
          />
        </div>
      </div>

      {/* Live-feeling opportunity card, deliberately understated. */}
      <div className="absolute -bottom-6 left-0 w-[17.5rem] rounded-2xl border border-line bg-paper p-4 shadow-[0_18px_40px_-24px_rgba(21,19,15,0.45)] sm:-bottom-8 sm:-left-6">
        <div className="flex items-center gap-2">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent-deep opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-accent-deep" />
          </span>
          <span className="eyebrow">New opportunity</span>
        </div>
        <p className="mt-2 text-[0.95rem] font-semibold tracking-[-0.01em]">
          Independent bistro, Southsea
        </p>
        <p className="mt-1 text-sm text-ink-muted">
          Dinner for two · 4 creators matched
        </p>
        <div className="mt-3 flex items-center gap-2">
          <div className="flex -space-x-1.5">
            {["bg-sand", "bg-accent-soft", "bg-line", "bg-paper-deep"].map((tone, index) => (
              <span
                key={index}
                className={`size-6 rounded-full border border-paper ${tone}`}
              />
            ))}
          </div>
          <span className="text-xs text-ink-muted">Portsmouth creators</span>
        </div>
      </div>
    </div>
  );
}
