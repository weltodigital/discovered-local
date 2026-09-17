import Link from "next/link";

import { LeadStatusBadge } from "@/components/admin/LeadStatusBadge";
import { LEAD_STATUSES, LEAD_STATUS_LABELS } from "@/lib/constants";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { BusinessLeadRow } from "@/lib/types/database";

export const dynamic = "force-dynamic";

type SearchParams = Promise<{ q?: string; status?: string }>;

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/** The table only exists once 0002_business_leads.sql has been run. */
function isMissingTable(code?: string) {
  return code === "42P01" || code === "PGRST205";
}

export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { q = "", status = "" } = await searchParams;
  const supabase = await createSupabaseServerClient();

  let query = supabase
    .from("business_leads")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(500);

  const statusFilter = LEAD_STATUSES.find((option) => option === status);
  if (statusFilter) {
    query = query.eq("status", statusFilter);
  }

  // PostgREST `or` uses commas and parens as syntax — strip them from input.
  const term = q.trim().replace(/[(),*%]/g, "");
  if (term) {
    query = query.or(
      [
        `business_name.ilike.%${term}%`,
        `contact_name.ilike.%${term}%`,
        `email.ilike.%${term}%`,
        `location.ilike.%${term}%`,
        `business_type.ilike.%${term}%`,
      ].join(","),
    );
  }

  const [{ data, error }, { data: allStatuses }] = await Promise.all([
    query,
    supabase.from("business_leads").select("status"),
  ]);

  const leads = (data ?? []) as BusinessLeadRow[];

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
    return search ? `/admin/leads?${search}` : "/admin/leads";
  };

  return (
    <main className="container-page py-8 sm:py-10">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-[-0.025em] sm:text-3xl">
            Business leads
          </h1>
          <p className="mt-1.5 text-[0.95rem] text-ink-muted">
            {total} {total === 1 ? "enquiry" : "enquiries"} so far
            {status || term ? ` · showing ${leads.length}` : ""}
          </p>
        </div>

        <form method="get" className="flex w-full gap-2 sm:w-auto">
          {status ? <input type="hidden" name="status" value={status} /> : null}
          <input
            type="search"
            name="q"
            defaultValue={q}
            placeholder="Search business, contact, email…"
            aria-label="Search business leads"
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
            status
              ? "border-line-strong text-ink-muted hover:border-ink"
              : "border-ink bg-ink text-paper"
          }`}
        >
          All ({total})
        </Link>
        {LEAD_STATUSES.map((option) => (
          <Link
            key={option}
            href={filterHref(option)}
            className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
              status === option
                ? "border-ink bg-ink text-paper"
                : "border-line-strong text-ink-muted hover:border-ink"
            }`}
          >
            {LEAD_STATUS_LABELS[option]} ({counts.get(option) ?? 0})
          </Link>
        ))}
      </nav>

      {error ? (
        <p className="mt-8 rounded-xl border border-danger/30 bg-danger-soft px-4 py-3 text-sm text-danger">
          {isMissingTable(error.code)
            ? "The business_leads table doesn't exist yet. Run supabase/migrations/0002_business_leads.sql in the Supabase SQL editor."
            : `Couldn't load business leads: ${error.message}`}
        </p>
      ) : null}

      {!error && leads.length === 0 ? (
        <p className="mt-10 rounded-2xl border border-dashed border-line-strong px-6 py-14 text-center text-ink-muted">
          {total === 0
            ? "No business enquiries yet. Every /get-started submission lands here."
            : "No enquiries match that search."}
        </p>
      ) : null}

      {/* Mobile: cards */}
      <ul className="mt-6 flex flex-col gap-3 lg:hidden">
        {leads.map((lead) => (
          <li key={lead.id}>
            <Link
              href={`/admin/leads/${lead.id}`}
              className="flex flex-col gap-2 rounded-2xl border border-line bg-paper p-4 transition-colors hover:border-ink"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold tracking-[-0.01em]">
                    {lead.business_name}
                  </p>
                  <p className="text-sm text-ink-muted">
                    {lead.business_type ?? "-"}
                    {lead.location ? ` · ${lead.location}` : ""}
                  </p>
                </div>
                <LeadStatusBadge status={lead.status} />
              </div>
              <p className="text-sm text-ink-muted">
                {lead.contact_name} · {lead.email}
              </p>
              <p className="text-xs text-ink-muted">
                Enquired {formatDate(lead.created_at)}
              </p>
            </Link>
          </li>
        ))}
      </ul>

      {/* Desktop: table */}
      {leads.length > 0 ? (
        <div className="mt-6 hidden overflow-x-auto rounded-2xl border border-line lg:block">
          <table className="w-full min-w-[54rem] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-line bg-paper-deep text-xs tracking-wide text-ink-muted uppercase">
                <th className="px-3 py-3 font-medium whitespace-nowrap">Business</th>
                <th className="px-3 py-3 font-medium whitespace-nowrap">Type</th>
                <th className="px-3 py-3 font-medium whitespace-nowrap">Contact</th>
                <th className="px-3 py-3 font-medium whitespace-nowrap">Phone</th>
                <th className="px-3 py-3 font-medium whitespace-nowrap">Location</th>
                <th className="px-3 py-3 font-medium whitespace-nowrap">Enquired</th>
                <th className="px-3 py-3 font-medium whitespace-nowrap">Status</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr
                  key={lead.id}
                  className="border-b border-line last:border-0 hover:bg-paper-deep/60"
                >
                  <td className="max-w-[13rem] px-3 py-3">
                    <Link
                      href={`/admin/leads/${lead.id}`}
                      className="font-medium underline-offset-2 hover:underline"
                    >
                      {lead.business_name}
                    </Link>
                    <span className="block truncate text-xs text-ink-muted">
                      {lead.email}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-ink-muted">
                    {lead.business_type ?? "-"}
                  </td>
                  <td className="px-3 py-3 text-ink-muted">{lead.contact_name}</td>
                  <td className="px-3 py-3 whitespace-nowrap text-ink-muted">
                    {lead.phone ?? "-"}
                  </td>
                  <td className="max-w-[10rem] truncate px-3 py-3 text-ink-muted">
                    {lead.location ?? "-"}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap text-ink-muted">
                    {formatDate(lead.created_at)}
                  </td>
                  <td className="px-3 py-3">
                    <LeadStatusBadge status={lead.status} />
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
