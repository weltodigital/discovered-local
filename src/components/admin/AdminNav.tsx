"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const SECTIONS = [
  { href: "/admin", label: "Creators" },
  { href: "/admin/leads", label: "Business leads" },
];

/** Two separate books of work; creator management stays the default view. */
export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-1" aria-label="Admin sections">
      {SECTIONS.map((section) => {
        const active =
          section.href === "/admin"
            ? !pathname.startsWith("/admin/leads")
            : pathname.startsWith(section.href);

        return (
          <Link
            key={section.href}
            href={section.href}
            aria-current={active ? "page" : undefined}
            className={`rounded-full px-3.5 py-1.5 text-sm transition-colors ${
              active
                ? "bg-ink font-medium text-paper"
                : "text-ink-muted hover:bg-paper-deep hover:text-ink"
            }`}
          >
            {section.label}
          </Link>
        );
      })}
    </nav>
  );
}
