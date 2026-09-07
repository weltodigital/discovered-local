import Image from "next/image";

/**
 * A drop-in slot for real photography.
 *
 * Until we have Portsmouth shoots, this renders a warm editorial placeholder
 * that still looks intentional. To use a real photo later, pass `src` — nothing
 * else about the layout changes.
 */
export function ImageSlot({
  src,
  alt = "",
  label,
  tone = "sand",
  className = "",
  children,
}: {
  src?: string;
  alt?: string;
  label?: string;
  tone?: "sand" | "ink" | "accent" | "moss";
  className?: string;
  children?: React.ReactNode;
}) {
  const tones: Record<string, string> = {
    sand: "bg-[linear-gradient(150deg,#f6efe1_0%,#e8dac1_48%,#d8c5a6_100%)]",
    ink: "bg-[linear-gradient(150deg,#232f4a_0%,#111a30_58%,#070d1b_100%)]",
    accent: "bg-[linear-gradient(150deg,#c3dcec_0%,#95b8d1_52%,#6d97b5_100%)]",
    moss: "bg-[linear-gradient(150deg,#5d6c58_0%,#3f4c3a_60%,#2b3428_100%)]",
  };

  return (
    <div
      className={`relative overflow-hidden ${src ? "bg-sand" : tones[tone]} ${className}`}
    >
      {src ? (
        <Image src={src} alt={alt} fill sizes="(max-width: 768px) 90vw, 40vw" className="object-cover" />
      ) : (
        <>
          {/* Soft optical texture so the placeholder reads as a composition, not a gap. */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-25 mix-blend-overlay"
            style={{
              backgroundImage:
                "radial-gradient(circle at 22% 28%, #fff 0px, transparent 42%), radial-gradient(circle at 78% 76%, #fff 0px, transparent 38%)",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.1]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(115deg, transparent 0 9px, rgba(0,0,0,0.5) 9px 10px)",
            }}
          />
          {label ? (
            <span
              className={`absolute bottom-3 left-3 rounded-full px-2.5 py-1 text-[0.7rem] font-medium tracking-wide backdrop-blur-sm ${
                tone === "sand" || tone === "accent"
                  ? "bg-white/65 text-ink"
                  : "bg-black/25 text-white/90"
              }`}
            >
              {label}
            </span>
          ) : null}
        </>
      )}
      {children}
    </div>
  );
}
