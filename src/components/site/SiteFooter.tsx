import Link from "next/link";

import { LogoLockup } from "@/components/site/Logo";

export function SiteFooter() {
  const year = new Date().getFullYear();

  const links = [
    { href: "/", label: "For Businesses", external: false },
    { href: "/creators", label: "For Creators", external: false },
    { href: "/#how-it-works", label: "How It Works", external: false },
    { href: "/apply", label: "Become a Creator", external: false },
    { href: "/privacy", label: "Privacy", external: false },
    { href: "/cookies", label: "Cookies", external: false },
    { href: "/terms", label: "Terms", external: false },
  ];

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
        </div>

        <div className="flex flex-col gap-2 border-t border-line pt-6 text-sm text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Discovered Local.</p>
          <p>Launching in Portsmouth and the surrounding area.</p>
        </div>
      </div>
    </footer>
  );
}
