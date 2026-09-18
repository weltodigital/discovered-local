import Image from "next/image";

/**
 * A real map of the city with our own place labels on top, so the typography
 * matches the site.
 *
 * `/portsmouth-map.png` is a one-off render of OpenStreetMap data (via
 * OpenFreeMap's Positron style, recoloured to the paper palette) — a static
 * image rather than a live tile layer, so there is no map library, no
 * third-party requests and no API key to expire. The pins are projected from
 * real coordinates using the same centre and scale the image was rendered
 * at, which is what the constants below record. Re-render the image and
 * update them together.
 */
const IMAGE = { src: "/portsmouth-map.png", size: 1800 };

/** Web Mercator tile zoom the image was rendered at (256 px tiles). */
const ZOOM = 13;
/** Width of the square image in map pixels at ZOOM — about 11 km here. */
const VIEW = 900;
/** Portsea Island, nudged north so nothing sits under the header card on phones. */
const CENTER = { lat: 50.824, lon: -1.082 };

const PLACES = [
  { name: "Portchester", lat: 50.842, lon: -1.117 },
  { name: "Cosham", lat: 50.845, lon: -1.066 },
  { name: "Fratton", lat: 50.797, lon: -1.078 },
  { name: "Old Portsmouth", lat: 50.79, lon: -1.105 },
  { name: "Southsea", lat: 50.782, lon: -1.083 },
];

/** Web Mercator, in map pixels at ZOOM. */
function project(lat: number, lon: number) {
  const world = 2 ** ZOOM * 256;
  const rad = (lat * Math.PI) / 180;
  return {
    x: ((lon + 180) / 360) * world,
    y: ((1 - Math.log(Math.tan(rad) + 1 / Math.cos(rad)) / Math.PI) / 2) * world,
  };
}

const centre = project(CENTER.lat, CENTER.lon);

const MARKERS = PLACES.map((place) => {
  const p = project(place.lat, place.lon);
  return {
    name: place.name,
    left: ((p.x - centre.x) / VIEW + 0.5) * 100,
    top: ((p.y - centre.y) / VIEW + 0.5) * 100,
  };
});

export function PortsmouthMotif() {
  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-line bg-paper">
      <Image
        src={IMAGE.src}
        alt="Map of Portsmouth, from Portchester and Cosham in the north to Old Portsmouth and Southsea on the coast"
        width={IMAGE.size}
        height={IMAGE.size}
        sizes="(min-width: 1024px) 40vw, 100vw"
        className="absolute inset-0 size-full object-cover"
      />

      {MARKERS.map((place) => (
        <div
          key={place.name}
          className="absolute flex -translate-x-[0.1875rem] -translate-y-1/2 items-center gap-1.5"
          style={{ left: `${place.left}%`, top: `${place.top}%` }}
        >
          <span className="size-1.5 shrink-0 rounded-full bg-accent-deep ring-3 ring-accent/50" />
          <span className="rounded-full bg-paper/85 px-1.5 py-0.5 text-[0.7rem] font-medium tracking-[-0.01em] whitespace-nowrap text-ink backdrop-blur-[2px]">
            {place.name}
          </span>
        </div>
      ))}

      <div className="absolute inset-x-4 top-4 flex items-center justify-between rounded-2xl border border-line bg-paper/90 px-4 py-3 backdrop-blur-sm">
        <p className="text-sm font-semibold tracking-[-0.01em]">Portsmouth, first.</p>
        <p className="text-xs text-ink-muted">More cities later</p>
      </div>

      <p className="absolute bottom-2 left-2 max-w-[9rem] rounded-md bg-paper/80 px-1.5 py-0.5 text-[0.6rem] leading-snug text-ink-muted sm:max-w-none">
        ©{" "}
        <a
          href="https://www.openstreetmap.org/copyright"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          OpenStreetMap
        </a>{" "}
        contributors ·{" "}
        <a
          href="https://openmaptiles.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          OpenMapTiles
        </a>
      </p>
    </div>
  );
}
