import type { Metadata } from "next";
import Link from "next/link";

import { LegalPage } from "@/components/site/LegalPage";

export const metadata: Metadata = {
  title: "Cookies",
  description:
    "Discovered Local sets no cookies on its public pages. Here's what the site does store, and why.",
  alternates: { canonical: "/cookies" },
};

export default function CookiesPage() {
  return (
    <LegalPage title="Cookies policy" updated="September 2026">
      <section>
        <h2>The short version</h2>
        <p>
          Discovered Local doesn&rsquo;t set any cookies. No advertising cookies,
          no tracking cookies, no analytics cookies. That&rsquo;s why you
          don&rsquo;t see a cookie banner.
        </p>
      </section>

      <section>
        <h2>The one thing the site does store</h2>
        <p>
          While you&rsquo;re filling in the creator application, your answers are
          saved in your browser&rsquo;s local storage so a refresh or a lost
          connection doesn&rsquo;t wipe the form. This stays on your device,
          isn&rsquo;t sent to us until you press submit and is cleared when you do.
          It isn&rsquo;t a cookie and we can&rsquo;t read it.
        </p>
      </section>

      <section>
        <h2>Analytics</h2>
        <p>
          We use Vercel Web Analytics to count page views. It works without
          cookies: it doesn&rsquo;t store anything on your device, doesn&rsquo;t
          follow you to other websites and doesn&rsquo;t let us identify you.
        </p>
      </section>

      <section>
        <h2>Changes</h2>
        <p>
          If we ever add something that uses cookies, we&rsquo;ll update this page
          and, where the law requires it, ask for your consent first. For how we
          handle the information you give us in our forms, see the{" "}
          <Link href="/privacy" className="text-ink underline underline-offset-2">
            privacy policy
          </Link>
          .
        </p>
      </section>
    </LegalPage>
  );
}
