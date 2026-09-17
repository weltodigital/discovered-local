type Step = "business" | "creator" | "content" | "audience";

const GLYPHS: Record<Step, React.ReactNode> = {
  business: (
    <path
      d="M4 9.5 5.5 5h13L20 9.5M4 9.5V19h16V9.5M4 9.5h16M9.5 19v-5.5h5V19"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  creator: (
    <>
      <circle cx="12" cy="8.5" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M5 19.5c1.2-3.4 3.8-5 7-5s5.8 1.6 7 5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </>
  ),
  content: (
    <>
      <rect
        x="7"
        y="3"
        width="10"
        height="18"
        rx="2.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M10.8 9.4v5.2l4.2-2.6-4.2-2.6Z" fill="currentColor" />
    </>
  ),
  audience: (
    <>
      <circle cx="9" cy="9" r="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M3.5 19c.9-2.8 3-4.2 5.5-4.2S13.6 16.2 14.5 19"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M15.5 6.6a3 3 0 0 1 0 4.8M17.5 14.9c1.5.7 2.6 2.1 3.1 4.1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </>
  ),
};

function Arrow({ tone }: { tone: "ink" | "paper" }) {
  return (
    <span
      aria-hidden
      className={`flex shrink-0 items-center justify-center ${
        tone === "paper" ? "text-paper/40" : "text-line-strong"
      }`}
    >
      {/* Down on mobile, along on desktop. */}
      <svg viewBox="0 0 24 24" className="size-5 sm:hidden">
        <path
          d="M12 4v16m0 0 5-5m-5 5-5-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <svg viewBox="0 0 24 24" className="hidden size-5 sm:block">
        <path
          d="M4 12h16m0 0-5-5m5 5-5 5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

/**
 * Business -> Creator -> Content -> Local audience.
 *
 * The single idea the homepage has to land, so it appears more than once —
 * once in the product section, once where we explain what a collaboration
 * actually produces.
 */
export function FlowChain({
  steps,
  tone = "ink",
}: {
  steps: { step: Step; label: string; detail?: string }[];
  tone?: "ink" | "paper";
}) {
  return (
    <ol className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:gap-3">
      {steps.map((item, index) => (
        <li
          key={item.label}
          className="contents sm:flex sm:flex-1 sm:items-center sm:gap-3"
        >
          <div
            className={`flex flex-1 items-center gap-3 rounded-2xl border px-4 py-3.5 sm:flex-col sm:items-start sm:gap-3 sm:px-5 sm:py-5 ${
              tone === "paper"
                ? "border-paper/15 bg-paper/5"
                : "border-line bg-paper"
            }`}
          >
            <span
              aria-hidden
              className={`grid size-10 shrink-0 place-items-center rounded-xl border ${
                tone === "paper"
                  ? "border-paper/15 bg-paper/5 text-paper"
                  : "border-line bg-paper-deep text-accent-deep"
              }`}
            >
              <svg viewBox="0 0 24 24" className="size-5">
                {GLYPHS[item.step]}
              </svg>
            </span>
            <div className="min-w-0">
              <p
                className={`font-semibold tracking-[-0.015em] ${
                  tone === "paper" ? "text-paper" : ""
                }`}
              >
                {item.label}
              </p>
              {item.detail ? (
                <p
                  className={`mt-0.5 text-sm leading-snug ${
                    tone === "paper" ? "text-paper/60" : "text-ink-muted"
                  }`}
                >
                  {item.detail}
                </p>
              ) : null}
            </div>
          </div>

          {index < steps.length - 1 ? <Arrow tone={tone} /> : null}
        </li>
      ))}
    </ol>
  );
}
