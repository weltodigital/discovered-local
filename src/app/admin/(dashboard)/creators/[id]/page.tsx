import Link from "next/link";
import { notFound } from "next/navigation";

import { StatusBadge } from "@/components/admin/StatusBadge";
import { StatusForm } from "@/components/admin/StatusForm";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { CreatorRow } from "@/lib/types/database";
import { updateCreatorNotes } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

function formatDateTime(value: string | null) {
  if (!value) return "—";
  return new Date(value).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
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

export default async function CreatorDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("creators")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("[admin] creator fetch failed", error);
  }
  if (!data) notFound();

  const creator = data as CreatorRow;
  const location =
    creator.location === "Other" && creator.location_other
      ? `${creator.location_other} (other)`
      : creator.location;

  return (
    <main className="container-page py-8 sm:py-10">
      <Link
        href="/admin"
        className="inline-flex items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-ink"
      >
        <span aria-hidden>←</span> All applications
      </Link>

      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-[-0.025em] sm:text-3xl">
            {creator.full_name}
          </h1>
          <p className="mt-1.5 text-[0.95rem] text-ink-muted">
            {location} · applied {formatDateTime(creator.created_at)}
          </p>
        </div>
        <StatusBadge status={creator.status} />
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-12">
        <div className="flex flex-col gap-8">
          <section>
            <h2 className="text-xs font-medium tracking-wide text-ink-muted uppercase">
              Contact & socials
            </h2>
            <dl className="mt-3 rounded-2xl border border-line bg-paper px-4">
              <Row label="Email">
                <a
                  href={`mailto:${creator.email}`}
                  className="font-medium underline decoration-line-strong underline-offset-2 hover:decoration-ink"
                >
                  {creator.email}
                </a>
              </Row>
              <Row label="Phone">
                {creator.phone ? (
                  <a
                    href={`tel:${creator.phone.replace(/\s+/g, "")}`}
                    className="font-medium underline decoration-line-strong underline-offset-2 hover:decoration-ink"
                  >
                    {creator.phone}
                  </a>
                ) : (
                  "—"
                )}
              </Row>
              <Row label="Instagram">
                {creator.instagram_username ? (
                  <ExternalLink
                    href={`https://instagram.com/${creator.instagram_username}`}
                  >
                    @{creator.instagram_username}
                  </ExternalLink>
                ) : (
                  "—"
                )}
              </Row>
              <Row label="TikTok">
                {creator.tiktok_username ? (
                  <ExternalLink
                    href={`https://tiktok.com/@${creator.tiktok_username}`}
                  >
                    @{creator.tiktok_username}
                  </ExternalLink>
                ) : (
                  "—"
                )}
              </Row>
              <Row label="Followers">
                {creator.instagram_followers != null
                  ? `Instagram ${creator.instagram_followers.toLocaleString("en-GB")}`
                  : "Instagram —"}
                {" · "}
                {creator.tiktok_followers != null
                  ? `TikTok ${creator.tiktok_followers.toLocaleString("en-GB")}`
                  : "TikTok —"}
              </Row>
              <Row label="Main platform">{creator.primary_platform ?? "—"}</Row>
            </dl>
          </section>

          <section>
            <h2 className="text-xs font-medium tracking-wide text-ink-muted uppercase">
              Content
            </h2>
            <dl className="mt-3 rounded-2xl border border-line bg-paper px-4">
              <Row label="Content types">
                {creator.content_types.length ? creator.content_types.join(", ") : "—"}
              </Row>
              <Row label="Best content">
                {creator.content_link_1 ? (
                  <ExternalLink href={creator.content_link_1}>
                    {creator.content_link_1}
                  </ExternalLink>
                ) : (
                  "—"
                )}
              </Row>
              <Row label="Additional link">
                {creator.content_link_2 ? (
                  <ExternalLink href={creator.content_link_2}>
                    {creator.content_link_2}
                  </ExternalLink>
                ) : (
                  "—"
                )}
              </Row>
              <Row label="Portfolio">
                {creator.portfolio_url ? (
                  <ExternalLink href={creator.portfolio_url}>
                    {creator.portfolio_url}
                  </ExternalLink>
                ) : (
                  "—"
                )}
              </Row>
              <Row label="About their content">
                <span className="whitespace-pre-line">{creator.bio || "—"}</span>
              </Row>
            </dl>
          </section>

          <section>
            <h2 className="text-xs font-medium tracking-wide text-ink-muted uppercase">
              Collaborating
            </h2>
            <dl className="mt-3 rounded-2xl border border-line bg-paper px-4">
              <Row label="Wants to visit">
                {creator.preferred_business_types.length
                  ? creator.preferred_business_types.join(", ")
                  : "—"}
              </Row>
              <Row label="Frequency">{creator.collaboration_frequency ?? "—"}</Row>
              <Row label="Complimentary ok?">
                {creator.complimentary_experience ?? "—"}
              </Row>
              <Row label="Committed to visits">
                {creator.commitment_ack ? "Yes" : "Not confirmed"}
              </Row>
              <Row label="Marketing consent">{creator.consent ? "Yes" : "No"}</Row>
              <Row label="Why they applied">
                <span className="whitespace-pre-line">{creator.why_join || "—"}</span>
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
            <StatusForm
              key={creator.status}
              id={creator.id}
              status={creator.status}
              reviewedAt={formatDateTime(creator.reviewed_at)}
            />
          </section>

          <section className="rounded-2xl border border-line bg-paper-deep p-5">
            <h2 className="text-xs font-medium tracking-wide text-ink-muted uppercase">
              Admin notes
            </h2>
            <form action={updateCreatorNotes} className="mt-3 flex flex-col gap-3">
              <input type="hidden" name="id" value={creator.id} />
              <textarea
                name="admin_notes"
                rows={6}
                defaultValue={creator.admin_notes ?? ""}
                placeholder="Anything worth remembering about this creator…"
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
