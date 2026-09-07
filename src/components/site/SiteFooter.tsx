import Link from "next/link";

import { SOCIAL_LINKS } from "@/lib/constants";
import { LogoLockup } from "@/components/site/Logo";

export function SiteFooter() {
  const year = new Date().getFullYear();

  const links = [
    { href: "/apply", label: "Apply", external: false },
    SOCIAL_LINKS.instagram
      ? { href: SOCIAL_LINKS.instagram, label: "Instagram", external: true }
      : null,
    SOCIAL_LINKS.tiktok
      ? { href: SOCIAL_LINKS.tiktok, label: "TikTok", external: true }
      : null,
    { href: "/privacy", label: "Privacy", external: false },
    { href: "/terms", label: "Terms", external: false },
  ].filter(Boolean) as { href: string; label: string; external: boolean }[];

  return (
    <footer className="border-t border-line bg-paper-deep">
      <div className="container-page flex flex-col gap-10 py-14 sm:py-16">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-xs">
            <Link href="/" aria-label="Discovered Local — home" className="inline-block">
              <LogoLockup className="h-12 w-auto" />
            </Link>
            <p className="mt-4 text-[0.95rem] leading-relaxed text-ink-muted">
              Helping great local places get discovered.
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-10 gap-y-3 text-[0.95rem] sm:flex sm:gap-8">
              {links.map((link) =>
                link.external ? (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ink-muted transition-colors hover:text-ink"
                    >
                      {link.label}
                    </a>
                  </li>
                ) : (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-ink-muted transition-colors hover:text-ink"
                    >
                      {link.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>
        </div>

        <div className="flex flex-col gap-2 border-t border-line pt-6 text-sm text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Discovered Local. Made in Portsmouth.</p>
          <p>Currently accepting creators in Portsmouth and the surrounding area.</p>
        </div>
      </div>
    </footer>
  );
}
