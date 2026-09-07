"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { ApplyCta } from "@/components/site/ApplyCta";
import { Logo } from "@/components/site/Logo";

const NAV_LINKS = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#for-creators", label: "For creators" },
  { href: "/apply", label: "Apply" },
];

/**
 * Minimal by design. On mobile the nav collapses to the one action that
 * matters — no burger menu, no hidden navigation.
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-line bg-paper/85 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between gap-3 sm:h-[4.5rem]">
        <Logo />

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[0.95rem] text-ink-muted transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <ApplyCta location="nav" size="sm">
          <span className="hidden sm:inline">Become a creator</span>
          <span className="sm:hidden">Apply</span>
        </ApplyCta>
      </div>
    </header>
  );
}
