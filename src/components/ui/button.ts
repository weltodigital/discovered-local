type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60 active:translate-y-px whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-ink hover:bg-accent-dark shadow-[0_1px_0_0_rgba(0,0,0,0.04)]",
  secondary:
    "bg-ink text-paper hover:bg-ink/90",
  ghost:
    "border border-line-strong bg-transparent text-ink hover:border-ink hover:bg-paper-deep",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-[0.95rem]",
  lg: "h-14 px-7 text-base sm:text-[1.05rem]",
};

export function buttonStyles({
  variant = "primary",
  size = "md",
  className = "",
}: { variant?: Variant; size?: Size; className?: string } = {}) {
  return [base, variants[variant], sizes[size], className].filter(Boolean).join(" ");
}
