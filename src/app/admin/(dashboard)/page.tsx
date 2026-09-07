import Link from "next/link";

import { StatusBadge } from "@/components/admin/StatusBadge";
import { CREATOR_STATUSES, STATUS_LABELS, type CreatorStatus } from "@/lib/constants";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { CreatorRow } from "@/lib/types/database";

export const dynamic = "force-dynamic";

type SearchParams = Promise<{ q?: string; status?: string }>;

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatFollowers(creator: CreatorRow) {
  const parts = [
    creator.instagram_followers != null
      ? `IG ${creator.instagram_followers.toLocaleString("en-GB")}`
      : null,
    creator.tiktok_followers != null
      ? `TT ${creator.tiktok_followers.toLocaleString("en-GB")}`
      : null,
  ].filter(Boolean);
  return parts.length ? parts.join(" · ") : "—";
}

function creatorLocation(creator: CreatorRow) {
  return creator.location === "Other" && creator.location_other
    ? creator.location_other
    : creator.location;
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { q = "", status = "" } = await searchParams;
  const supabase = await createSupabaseServerClient();

  let query = supabase
    .from("creators")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(500);

  const statusFilter = CREATOR_STATUSES.find((option) => option === status);
  if (statusFilter) {
    query = query.eq("status", statusFilter);
  }

  // PostgREST `or` uses commas and parens as syntax — strip them from input.
  const term = q.trim().replace(/[(),*%]/g, "");
  if (term) {
    query = query.or(
      [
        `full_name.ilike.%${term}%`,
        `email.ilike.%${term}%`,
        `instagram_username.ilike.%${term}%`,
        `tiktok_username.ilike.%${term}%`,
        `location.ilike.%${term}%`,
        `location_other.ilike.%${term}%`,
      ].join(","),
    );
  }

  const [{ data, error }, { data: allStatuses }] = await Promise.all([
    query,
    supabase.from("creators").select("status"),
  ]);

  const creators = (data ?? []) as CreatorRow[];

  const counts = new Map<string, number>();
  for (const row of allStatuses ?? []) {
    counts.set(row.status, (counts.get(row.status) ?? 0) + 1);
  }
  const total = (allStatuses ?? []).length;

  const filterHref = (nextStatus: string) => {
    const params = new URLSearchParams();
    if (term) params.set("q", term);
    if (nextStatus) params.set("status", nextStatus);
    const search = params.toString();
    return search ? `/admin?${search}` : "/admin";
  };

  return (
    <main className="container-page py-8 sm:py-10">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-[-0.025em] sm:text-3xl">
            Creator applications
          </h1>
          <p className="mt-1.5 text-[0.95rem] text-ink-muted">
            {total} {total === 1 ? "application" : "applications"} so far
            {status || term ? ` · showing ${creators.length}` : ""}
          </p>
        </div>

        <form method="get" className="flex w-full gap-2 sm:w-auto">
          {status ? <input type="hidden" name="status" value={status} /> : null}
          <input
            type="search"
            name="q"
            defaultValue={q}
            placeholder="Search name, email, handle…"
            aria-label="Search applications"
            className="h-11 w-full rounded-xl border border-line-strong bg-paper px-4 text-[0.95rem] focus:border-ink focus:outline-none sm:w-72"
          />
          <button
            type="submit"
            className="h-11 shrink-0 rounded-xl bg-ink px-4 text-[0.95rem] font-medium text-paper"
          >
            Search
          </button>
        </form>
      </div>

      <nav className="mt-6 flex flex-wrap gap-2" aria-label="Filter by status">
        <Link
          href={filterHref("")}
          className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
            status ? "border-line-strong text-ink-muted hover:border-ink" : "border-ink bg-ink text-paper"
          }`}
        >
          All ({total})
        </Link>
        {CREATOR_STATUSES.map((option) => (
          <Link
            key={option}
            href={filterHref(option)}
            className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
              status === option
                ? "border-ink bg-ink text-paper"
                : "border-line-strong text-ink-muted hover:border-ink"
            }`}
          >
            {STATUS_LABELS[option]} ({counts.get(option) ?? 0})
          </Link>
        ))}
      </nav>

      {error ? (
        <p className="mt-8 rounded-xl border border-danger/30 bg-danger-soft px-4 py-3 text-sm text-danger">
          Couldn&rsquo;t load applications: {error.message}
        </p>
      ) : null}

      {!error && creators.length === 0 ? (
        <p className="mt-10 rounded-2xl border border-dashed border-line-strong px-6 py-14 text-center text-ink-muted">
          {total === 0
            ? "No applications yet. Share the link with Portsmouth creators."
            : "No applications match that search."}
        </p>
      ) : null}

      {/* Mobile: cards */}
      <ul className="mt-6 flex flex-col gap-3 lg:hidden">
        {creators.map((creator) => (
          <li key={creator.id}>
            <Link
              href={`/admin/creators/${creator.id}`}
              className="flex flex-col gap-2 rounded-2xl border border-line bg-paper p-4 transition-colors hover:border-ink"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold tracking-[-0.01em]">{creator.full_name}</p>
                  <p className="text-sm text-ink-muted">{creatorLocation(creator)}</p>
                </div>
                <StatusBadge status={creator.status} />
              </div>
              <p className="text-sm text-ink-muted">
                {creator.instagram_username ? `@${creator.instagram_username}` : "—"} ·{" "}
                {formatFollowers(creator)}
              </p>
              <p className="text-xs text-ink-muted">
                Applied {formatDate(creator.created_at)}
              </p>
            </Link>
          </li>
        ))}
      </ul>

      {/* Desktop: table */}
      {creators.length > 0 ? (
        <div className="mt-6 hidden overflow-x-auto rounded-2xl border border-line lg:block">
          <table className="w-full min-w-[58rem] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-line bg-paper-deep text-xs tracking-wide text-ink-muted uppercase">
                <th className="px-3 py-3 font-medium whitespace-nowrap">Name</th>
                <th className="px-3 py-3 font-medium whitespace-nowrap">Location</th>
                <th className="px-3 py-3 font-medium whitespace-nowrap">Instagram</th>
                <th className="px-3 py-3 font-medium whitespace-nowrap">TikTok</th>
                <th className="px-3 py-3 font-medium whitespace-nowrap">Followers</th>
                <th className="px-3 py-3 font-medium whitespace-nowrap">Platform</th>
                <th className="px-3 py-3 font-medium whitespace-nowrap">Content</th>
                <th className="px-3 py-3 font-medium whitespace-nowrap">Applied</th>
                <th className="px-3 py-3 font-medium whitespace-nowrap">Status</th>
              </tr>
            </thead>
            <tbody>
              {creators.map((creator) => (
                <tr
                  key={creator.id}
                  className="border-b border-line last:border-0 hover:bg-paper-deep/60"
                >
                  <td className="max-w-[11rem] px-3 py-3">
                    <Link
                      href={`/admin/creators/${creator.id}`}
                      className="font-medium underline-offset-2 hover:underline"
                    >
                      {creator.full_name}
                    </Link>
                    <span className="block truncate text-xs text-ink-muted">{creator.email}</span>
                  </td>
                  <td className="px-3 py-3 text-ink-muted">{creatorLocation(creator)}</td>
                  <td className="px-3 py-3 text-ink-muted">
                    {creator.instagram_username ? `@${creator.instagram_username}` : "—"}
                  </td>
                  <td className="px-3 py-3 text-ink-muted">
                    {creator.tiktok_username ? `@${creator.tiktok_username}` : "—"}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap text-ink-muted">
                    {formatFollowers(creator)}
                  </td>
                  <td className="px-3 py-3 text-ink-muted">
                    {creator.primary_platform ?? "—"}
                  </td>
                  <td className="max-w-[8rem] truncate px-3 py-3 text-xs text-ink-muted">
                    {creator.content_types.length ? creator.content_types.join(", ") : "—"}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap text-ink-muted">
                    {formatDate(creator.created_at)}
                  </td>
                  <td className="px-3 py-3">
                    <StatusBadge status={creator.status as CreatorStatus} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </main>
  );
}
