/**
 * Abstract map motif: the two harbours, the island between them and the
 * Solent below. A city reference, not a navigational map or a tourism poster.
 */
const PLACES = [
  { name: "Portchester", x: 9, y: 17 },
  { name: "Cosham", x: 50, y: 23 },
  { name: "Fratton", x: 53, y: 48 },
  { name: "Old Portsmouth", x: 41, y: 70 },
  { name: "Southsea", x: 55, y: 78 },
];

export function PortsmouthMotif() {
  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-line bg-paper">
      <svg viewBox="0 0 100 100" className="absolute inset-0 size-full" aria-hidden>
        <defs>
          <pattern id="dl-grid" width="5" height="5" patternUnits="userSpaceOnUse">
            <path d="M5 0H0V5" fill="none" stroke="var(--color-line)" strokeWidth="0.25" />
          </pattern>
        </defs>

        <rect width="100" height="100" fill="url(#dl-grid)" />

        {/* Water: Portsmouth Harbour, Langstone Harbour, the Solent. */}
        <g fill="var(--color-sand)">
          <path d="M24 20 C32 23 35 33 35 46 C35 58 33 64 33 74 C33 81 32 86 31 90 L26 90 C25 82 24 74 23 68 C21 59 14 53 12 45 C9 33 14 18 24 20 Z" />
          <path d="M84 22 C77 25 74 34 74 46 C74 57 75 64 75 74 C75 82 76 86 77 90 L82 90 C83 82 84 74 85 68 C87 59 94 53 96 45 C98 34 93 20 84 22 Z" />
          <path d="M0 88 C22 92 44 89 66 93 C80 95 90 94 100 92 L100 100 L0 100 Z" />
        </g>

        {/* Portsea Island */}
        <path
          d="M38 20 C48 14 62 14 70 21 C74 32 74 50 72 64 C70 77 66 84 58 86 C48 87 42 81 40 70 C38 56 36 34 38 20 Z"
          fill="none"
          stroke="var(--color-ink)"
          strokeWidth="0.8"
          opacity="0.4"
        />

        {/* Mainland edge */}
        <path
          d="M0 10 C10 7 22 6 34 8 C44 9.5 56 11 68 10.5 C82 10 92 8 100 5"
          fill="none"
          stroke="var(--color-ink)"
          strokeWidth="0.7"
          opacity="0.16"
        />

        {/* Routes */}
        <g fill="none" stroke="var(--color-line-strong)" strokeWidth="0.5">
          <path d="M50 19 C54 32 55 46 56 58 C57 70 57 78 58 86" />
          <path d="M40 42 C50 41 60 40 71 39" />
          <path d="M40 66 C50 67 60 68 71 66" />
        </g>
      </svg>

      {PLACES.map((place) => (
        <div
          key={place.name}
          className="absolute flex -translate-y-1/2 items-center gap-1.5"
          style={{ left: `${place.x}%`, top: `${place.y}%` }}
        >
          <span className="size-1.5 shrink-0 rounded-full bg-accent-deep ring-3 ring-accent/40" />
          <span className="text-[0.7rem] font-medium tracking-[-0.01em] whitespace-nowrap text-ink-muted">
            {place.name}
          </span>
        </div>
      ))}

      <div className="absolute inset-x-4 top-4 flex items-center justify-between rounded-2xl border border-line bg-paper/90 px-4 py-3 backdrop-blur-sm">
        <p className="text-sm font-semibold tracking-[-0.01em]">Portsmouth, first.</p>
        <p className="text-xs text-ink-muted">More cities later</p>
      </div>
    </div>
  );
}
