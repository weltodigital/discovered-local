import Link from "next/link";

import { SOCIAL_LINKS } from "@/lib/constants";
import { LogoLockup } from "@/components/site/Logo";

export function SiteFooter() {
  const year = new Date().getFullYear();

  const links = [
    { href: "/", label: "For Businesses", external: false },
    { href: "/creators", label: "For Creators", external: false },
    { href: "/#how-it-works", label: "How It Works", external: false },
    { href: "/apply", label: "Become a Creator", external: false },
    { href: "/privacy", label: "Privacy", external: false },
    { href: "/terms", label: "Terms", external: false },
  ];

  // Only ever linked once the accounts actually exist.
  const social = [
    SOCIAL_LINKS.instagram
      ? { href: SOCIAL_LINKS.instagram, label: "Instagram" }
      : null,
    SOCIAL_LINKS.tiktok ? { href: SOCIAL_LINKS.tiktok, label: "TikTok" } : null,
  ].filter(Boolean) as { href: string; label: string }[];

  return (
    <footer className="border-t border-line bg-paper-deep">
      <div className="container-page flex flex-col gap-10 py-14 sm:py-16">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-xs">
            <Link href="/" aria-label="Discovered Local home" className="inline-block">
              <LogoLockup className="h-12 w-auto" />
            </Link>
            <p className="mt-4 text-[0.95rem] leading-relaxed text-ink-muted">
              Every local business deserves to be discovered.
            </p>
          </div>

          <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
            <nav aria-label="Footer">
              <ul className="grid grid-cols-2 gap-x-10 gap-y-3 text-[0.95rem] sm:grid-cols-1">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-ink-muted transition-colors hover:text-ink"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {social.length ? (
              <nav aria-label="Social">
                <p className="text-xs font-medium tracking-wide text-ink-muted uppercase">
                  Follow
                </p>
                <ul className="mt-3 flex flex-col gap-3 text-[0.95rem]">
                  {social.map((link) => (
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
                  ))}
                </ul>
              </nav>
            ) : null}
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-line pt-6 text-sm text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Discovered Local.</p>
          <p>Launching in Portsmouth and the surrounding area.</p>
        </div>
      </div>
    </footer>
  );
}
