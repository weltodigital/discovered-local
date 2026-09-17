"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { ApplyCta } from "@/components/site/ApplyCta";
import { BusinessCta } from "@/components/site/BusinessCta";
import { Logo } from "@/components/site/Logo";
import { EASE } from "@/components/site/Reveal";
import { PRICE_FOUNDING } from "@/lib/constants";

type Audience = "business" | "creator";

/**
 * One header, two audiences. The links stay the same so a business owner and a
 * creator can always find the other side of the marketplace; only the primary
 * action changes to match the page they're on.
 */
export function SiteHeader({ audience = "business" }: { audience?: Audience }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const reduced = useReducedMotion();

  const navLinks = [
    { href: "/", label: "For Businesses", active: pathname === "/" },
    { href: "/creators", label: "For Creators", active: pathname === "/creators" },
    {
      href: audience === "creator" ? "/creators#how-it-works" : "/#how-it-works",
      label: "How It Works",
      active: false,
    },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the panel on navigation, and never leave the page unscrollable.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    // The panel is hidden at `md`, so close it rather than leave the body
    // locked if the viewport grows while it's open.
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const primaryCta =
    audience === "creator" ? (
      <ApplyCta location="nav" size="sm">
        Become a Creator
      </ApplyCta>
    ) : (
      <BusinessCta location="nav" size="sm">
        Get Started
      </BusinessCta>
    );

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-line bg-paper/85 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between gap-3 sm:h-[4.5rem]">
        <Logo />

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              aria-current={link.active ? "page" : undefined}
              className={`text-[0.95rem] transition-colors hover:text-ink ${
                link.active ? "font-medium text-ink" : "text-ink-muted"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {primaryCta}

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-10 place-items-center rounded-full border border-line-strong text-ink transition-colors hover:border-ink md:hidden"
          >
            <svg viewBox="0 0 20 20" className="size-5" aria-hidden>
              {open ? (
                <path
                  d="M5 5l10 10M15 5 5 15"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M3 6h14M3 10h14M3 14h14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id="mobile-nav"
            key="mobile-nav"
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={reduced ? undefined : { height: "auto", opacity: 1 }}
            exit={reduced ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: EASE }}
            className="overflow-hidden border-t border-line bg-paper md:hidden"
          >
            <nav className="container-page flex flex-col py-3" aria-label="Mobile">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-line py-4 text-lg font-medium tracking-[-0.015em] last:border-0"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="container-page flex flex-col gap-2.5 pb-6">
              {audience === "creator" ? (
                <>
                  <ApplyCta location="mobile_nav" className="w-full">
                    Become a Creator
                  </ApplyCta>
                  <BusinessCta
                    location="mobile_nav"
                    variant="ghost"
                    className="w-full"
                  >
                    I&rsquo;m a business
                  </BusinessCta>
                </>
              ) : (
                <>
                  <BusinessCta location="mobile_nav" className="w-full">
                    Get started for {PRICE_FOUNDING}/month
                  </BusinessCta>
                  <Link
                    href="/creators"
                    onClick={() => setOpen(false)}
                    className="inline-flex h-14 w-full items-center justify-center rounded-full border border-line-strong text-base font-medium transition-colors hover:border-ink"
                  >
                    I&rsquo;m a creator
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
