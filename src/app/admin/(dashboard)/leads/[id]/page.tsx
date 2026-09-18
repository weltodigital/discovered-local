import Link from "next/link";
import { notFound } from "next/navigation";

import { LeadStatusBadge } from "@/components/admin/LeadStatusBadge";
import { LeadStatusForm } from "@/components/admin/LeadStatusForm";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { BusinessLeadRow } from "@/lib/types/database";
import { updateLeadNotes } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

function formatDateTime(value: string | null) {
  if (!value) return "-";
  return new Date(value).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1 border-b border-line py-3.5 last:border-0 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-4">
      <dt className="text-sm text-ink-muted">{label}</dt>
      <dd className="text-[0.95rem] break-words">{children}</dd>
    </div>
  );
}

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 font-medium text-ink underline decoration-line-strong underline-offset-2 hover:decoration-ink"
    >
      {children}
      <svg viewBox="0 0 16 16" className="size-3.5 text-ink-muted" aria-hidden>
        <path
          d="M6 3h7v7M13 3 4 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("business_leads")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("[admin] lead fetch failed", error);
  }
  if (!data) notFound();

  const lead = data as BusinessLeadRow;

  return (
    <main className="container-page py-8 sm:py-10">
      <Link
        href="/admin/leads"
        className="inline-flex items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-ink"
      >
        <span aria-hidden>←</span> All business leads
      </Link>

      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-[-0.025em] sm:text-3xl">
            {lead.business_name}
          </h1>
          <p className="mt-1.5 text-[0.95rem] text-ink-muted">
            {lead.business_type ?? "Type not given"}
            {lead.location ? ` · ${lead.location}` : ""} · enquired{" "}
            {formatDateTime(lead.created_at)}
          </p>
        </div>
        <LeadStatusBadge status={lead.status} />
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-12">
        <div className="flex flex-col gap-8">
          <section>
            <h2 className="text-xs font-medium tracking-wide text-ink-muted uppercase">
              Contact
            </h2>
            <dl className="mt-3 rounded-2xl border border-line bg-paper px-4">
              <Row label="Contact name">{lead.contact_name}</Row>
              <Row label="Email">
                <a
                  href={`mailto:${lead.email}`}
                  className="font-medium underline decoration-line-strong underline-offset-2 hover:decoration-ink"
                >
                  {lead.email}
                </a>
              </Row>
              <Row label="Phone">
                {lead.phone ? (
                  <a
                    href={`tel:${lead.phone.replace(/\s+/g, "")}`}
                    className="font-medium underline decoration-line-strong underline-offset-2 hover:decoration-ink"
                  >
                    {lead.phone}
                  </a>
                ) : (
                  "-"
                )}
              </Row>
            </dl>
          </section>

          <section>
            <h2 className="text-xs font-medium tracking-wide text-ink-muted uppercase">
              The business
            </h2>
            <dl className="mt-3 rounded-2xl border border-line bg-paper px-4">
              <Row label="Type">{lead.business_type ?? "-"}</Row>
              <Row label="Location">{lead.location ?? "-"}</Row>
              <Row label="Website">
                {lead.website ? (
                  <ExternalLink href={lead.website}>{lead.website}</ExternalLink>
                ) : (
                  "-"
                )}
              </Row>
              <Row label="Instagram">
                {lead.instagram ? (
                  <ExternalLink href={`https://instagram.com/${lead.instagram}`}>
                    @{lead.instagram}
                  </ExternalLink>
                ) : (
                  "-"
                )}
              </Row>
              <Row label="What they said">
                <span className="whitespace-pre-line">{lead.notes || "-"}</span>
              </Row>
              <Row label="Contact consent">
                {lead.consent ? "Yes" : "Not recorded (enquired before we asked)"}
              </Row>
            </dl>
          </section>
        </div>

        {/* ------------------------------------------------------- Sidebar */}
        <div className="flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start">
          <section className="rounded-2xl border border-line bg-paper-deep p-5">
            <h2 className="text-xs font-medium tracking-wide text-ink-muted uppercase">
              Status
            </h2>
            <LeadStatusForm
              key={lead.status}
              id={lead.id}
              status={lead.status}
              updatedAt={formatDateTime(lead.updated_at)}
            />
          </section>

          <section className="rounded-2xl border border-line bg-paper-deep p-5">
            <h2 className="text-xs font-medium tracking-wide text-ink-muted uppercase">
              Admin notes
            </h2>
            <form action={updateLeadNotes} className="mt-3 flex flex-col gap-3">
              <input type="hidden" name="id" value={lead.id} />
              <textarea
                name="admin_notes"
                rows={6}
                defaultValue={lead.admin_notes ?? ""}
                placeholder="Called 12 Sep, wants to start next month…"
                className="w-full resize-y rounded-xl border border-line-strong bg-paper px-3.5 py-3 text-[0.95rem] leading-relaxed focus:border-ink focus:outline-none"
              />
              <SubmitButton pendingLabel="Saving..." variant="ghost" className="w-full">
                Save notes
              </SubmitButton>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}
