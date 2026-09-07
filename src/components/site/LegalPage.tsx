import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <main className="container-page py-14 sm:py-20">
        <div className="mx-auto max-w-2xl">
          <p className="eyebrow">Last updated {updated}</p>
          <h1 className="h-section mt-4">{title}</h1>
          <div className="mt-10 space-y-8 text-[1.05rem] leading-relaxed text-ink-muted [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:tracking-[-0.015em] [&_h2]:text-ink [&_li]:mt-2 [&_p]:mt-3 [&_ul]:list-disc [&_ul]:pl-5">
            {children}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
