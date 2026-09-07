import Link from "next/link";

import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { buttonStyles } from "@/components/ui/button";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="container-page flex min-h-[60vh] items-center py-20">
        <div className="mx-auto max-w-lg text-center">
          <p className="eyebrow">404</p>
          <h1 className="h-section mt-4">Nothing to discover here.</h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-muted">
            That page doesn&rsquo;t exist — but the creator community is still open.
          </p>
          <Link
            href="/"
            className={buttonStyles({ size: "lg", className: "mt-8" })}
          >
            Back to home
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
