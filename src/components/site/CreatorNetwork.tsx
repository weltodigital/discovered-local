import { ImageSlot } from "@/components/site/ImageSlot";

/**
 * Illustrative creator cards.
 *
 * These are NOT real people and are labelled as such on the page. They exist
 * to show a business owner the shape of the network we’re recruiting — a local
 * area, a couple of content categories, a realistic follower count. Swap this
 * array for approved, real creators the moment we have their permission.
 */
const DEMO_CREATORS = [
  {
    handle: "@creatorname",
    area: "Portsmouth",
    categories: "Food · Lifestyle",
    followers: "4.2k followers",
    tone: "sand" as const,
  },
  {
    handle: "@creatorname",
    area: "Southsea",
    categories: "Food · Local",
    followers: "7.8k followers",
    tone: "accent" as const,
  },
  {
    handle: "@creatorname",
    area: "Portsmouth",
    categories: "Lifestyle · Restaurants",
    followers: "2.1k followers",
    tone: "moss" as const,
  },
];

export function CreatorNetwork() {
  return (
    <div>
      <ul className="grid gap-4 sm:grid-cols-3">
        {DEMO_CREATORS.map((creator, index) => (
          <li
            key={index}
            className="flex flex-col rounded-2xl border border-line bg-paper p-4"
          >
            <div className="flex items-center gap-3">
              <ImageSlot
                tone={creator.tone}
                className="size-11 shrink-0 rounded-full border border-line"
              />
              <div className="min-w-0">
                <p className="truncate font-semibold tracking-[-0.015em]">
                  {creator.handle}
                </p>
                <p className="truncate text-sm text-ink-muted">{creator.area}</p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between gap-3 border-t border-line pt-3.5 text-sm text-ink-muted">
              <span className="truncate">{creator.categories}</span>
              <span className="shrink-0 whitespace-nowrap">{creator.followers}</span>
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-4 text-sm text-ink-muted">
        Illustrative examples of the creators we&rsquo;re recruiting, not real
        profiles. We&rsquo;ll show real creators here once they&rsquo;ve agreed to be
        featured.
      </p>
    </div>
  );
}
