# Discovered Local

A UK local creator marketing platform, starting in Portsmouth.

Two audiences, two funnels. The homepage sells the monthly creator service to
local businesses; `/creators` recruits the creators who make it work. Both funnels end
in a Supabase table, read directly in the Supabase dashboard for now.

- `/` — business homepage (the monthly offer)
- `/get-started` — business enquiry form → `business_leads`
- `/creators` — creator proposition
- `/apply` — creator application (3 short steps) → `creators`
- `/success` — post-application confirmation
- `/privacy`, `/cookies`, `/terms` — supporting pages

Billing is deliberately not built. `/get-started` starts a conversation; there
is no Stripe subscription yet.

## Stack

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Supabase (Postgres +
Auth + RLS) · React Hook Form + Zod · Motion · Vercel Web Analytics.

### Pricing

`PRICE_FOUNDING` and `PRICE_STANDARD` in `src/lib/constants.ts` are the single
source of truth. They feed the CTAs, both pricing cards, the metadata, the OG
card and the terms, so changing the price is a one-line edit.

### Motion

Scroll entrances, the hero chain and the compounding counter use
[Motion](https://motion.dev) (`motion/react`). Everything animated goes through
`Reveal`, `CountUp` or a local variant set, and every one of them checks
`useReducedMotion()` first, so the site is completely still for anyone who has
asked for that. `EASE` in `src/components/site/Reveal.tsx` is the shared curve.

---

## 1. Supabase setup

1. Create a project at [supabase.com](https://supabase.com). Pick the London
   (`eu-west-2`) region — the audience and the data are UK-based.
2. Open **SQL Editor → New query**, paste the contents of
   [`supabase/migrations/0001_init.sql`](supabase/migrations/0001_init.sql) and
   run it. This creates:
   - `public.creators` — the applications table, with a unique index on
     `lower(email)` so one person can't apply twice.
   - `public.admin_users` and `public.is_admin()` — the admin role check the
     RLS policies use. Nothing in the site uses these yet; they're here for
     when an admin area comes back.
   - Row Level Security policies (see [Security](#4-security) below).
3. Run [`supabase/migrations/0002_business_leads.sql`](supabase/migrations/0002_business_leads.sql)
   the same way. This adds:
   - `public.business_leads` — enquiries from `/get-started`, with the same
     admin-only RLS shape as `creators`.
4. Go to **Project Settings → API** and copy the project URL, the `anon` key and
   the `service_role` key.

4. Run [`supabase/migrations/0003_business_leads_consent.sql`](supabase/migrations/0003_business_leads_consent.sql).
   This adds the `consent` column that the business enquiry form now writes.

All migrations are additive and idempotent — running `0002` or `0003` never
touches the `creators` table, its policies or existing applications.

The migration is idempotent, so it is safe to re-run.

### Using the Supabase CLI instead

```bash
supabase link --project-ref <your-project-ref>
supabase db push
```

---

## 2. Environment variables

Copy the example file and fill it in:

```bash
cp .env.example .env.local
```

| Variable | Where it's used | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | browser + server | Project URL. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | browser + server | Public key, safe to expose. RLS does the work. |
| `SUPABASE_SERVICE_ROLE_KEY` | **server only** | Used by the application endpoint. Never prefix with `NEXT_PUBLIC_` and never import it into a client component. |
| `NEXT_PUBLIC_SITE_URL` | metadata | Canonical URL used by Open Graph tags, `sitemap.xml` and `robots.txt`. Optional: blank falls back to the Vercel deployment URL, then to `https://discoveredlocal.com`, and a missing `https://` is added. |

---

## 3. Local development

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run typecheck  # tsc --noEmit
```

---

## 4. Security

Row Level Security is on for every table. The rules are:

| Who | `creators` | `business_leads` |
| --- | --- | --- |
| Anonymous visitors | `INSERT` only, and only rows with `status = 'applied'`, `consent = true` and no admin fields set | nothing — writes only ever arrive through the server action |
| Admins (`admin_users` row) | `SELECT` and `UPDATE` | `SELECT` and `UPDATE` |
| Anyone | no `DELETE` | no `DELETE` |

Two more things worth knowing:

- **Both public endpoints are server actions** (`src/app/apply/actions.ts` and
  `src/app/get-started/actions.ts`). They run on the server with the
  service-role key, so the browser never needs read — or, for business leads,
  any — access to the tables. A duplicate creator email returns a friendly
  message, not a database error.
- **There is no admin UI.** Applications and leads are reviewed in the
  Supabase dashboard. The `admin_users` RLS policies stay in place so an admin
  area can be added back without touching the database.

---

## 5. Deploying to Vercel

1. Push the repository to GitHub.
2. In Vercel, **Add New → Project**, import the repo. The framework is detected
   automatically; no build settings need changing.
3. Add all the variables from `.env.example` under **Settings → Environment
   Variables**, for Production *and* Preview. Set `NEXT_PUBLIC_SITE_URL` to the
   real domain (`https://discoveredlocal.com`).
4. Deploy, then add the domain under **Settings → Domains**.
5. Turn on **Web Analytics** in the Vercel project (the `<Analytics />`
   component is already wired up).

Any change to `NEXT_PUBLIC_*` variables needs a redeploy — they are inlined at
build time.

---

## 6. Analytics

Vercel Web Analytics records page views automatically. On top of that we track
both funnels end to end. Every CTA event carries a `location` property naming
the section it was clicked from.

**Business — the revenue funnel:**

| Event | Fired when |
| --- | --- |
| `homepage_view` | the business homepage mounts |
| `business_cta_clicked` | any "get started" CTA is clicked |
| `business_lead_started` | the enquirer focuses the first field on `/get-started` |
| `business_lead_submitted` | the enquiry saves successfully |

**Creator — the supply funnel:**

| Event | Fired when |
| --- | --- |
| `creator_page_view` | `/creators` mounts |
| `creator_cta_clicked` | any "become a creator" CTA is clicked |
| `application_started` | the applicant focuses the first form field |
| `application_submitted` | the application saves successfully |

The event names are a closed union in `src/lib/analytics.ts`, so a typo is a
type error rather than a silently missing metric.

---

## 7. Project structure

```
src/
  app/
    page.tsx                     business homepage (the monthly offer)
    get-started/                 business enquiry form + server action
    creators/                    creator proposition + its own OG image
    apply/                       creator application + server action
    success/                     post-application confirmation
    opengraph-image.tsx          generated OG image
    robots.ts, sitemap.ts        SEO
  components/
    site/                        page building blocks, shared by both audiences
    business/                    the business lead form
    apply/                       the creator application form
    ui/                          button styles + form field primitives
  lib/
    constants.ts                 locations, content types, statuses, the offer
    validation/creator.ts        creator application schema (client + server)
    validation/business.ts       business lead schema (client + server)
    supabase/                    service-role client (server only)
    notifications.ts             email hook-points (see below)
    analytics.ts                 event tracking
    og.tsx                       shared Open Graph card renderer
supabase/migrations/             schema, indexes and RLS policies
```

---

## 8. Brand assets

| File | Used for |
| --- | --- |
| `public/logo-mark.png` | the mark in the site nav |
| `public/logo-full.png` | the stacked lockup in the footer |
| `src/app/icon.png`, `src/app/apple-icon.png` | favicon and iOS home-screen icon (Next.js file conventions — no `<link>` tags needed) |
| `src/app/opengraph-image.tsx` | the social share card, generated at request time |

Brand colours live in one place, the `@theme` block in `src/app/globals.css`:

| Token | Value | Used for |
| --- | --- | --- |
| `--color-ink` | `#0a1122` | body text, dark sections, secondary buttons |
| `--color-accent` | `#95b8d1` | the brand blue: button fills, tags, the logo wordmark |
| `--color-accent-deep` | `#35688c` | the same hue darkened, for accent *text* and small marks on paper — the brand blue is too light to read at body size |
| `--color-paper` | `#fbf8f3` | page background |
| `--color-danger` | `#b4342a` | form validation errors only, so they never read as brand accents |

Because the brand blue is light, primary buttons are blue with navy text
(8.5:1 contrast) rather than white text.

Neither page uses photography yet. `src/components/site/ImageSlot.tsx`
renders tasteful placeholders that become real photos the moment you pass a
`src` — nothing about the layout changes.

---

## 9. Adding emails later

`src/lib/notifications.ts` holds empty functions that are already called in the
right places:

- `notifyAdminOfNewBusinessLead` — called after a successful `/get-started`
  enquiry. This is the revenue funnel, so it is the first one worth wiring up.
- `notifyAdminOfNewApplication` and `sendCreatorConfirmationEmail` — called
  after a successful application, wrapped so a failure can never lose the
  application itself.
- `sendCreatorDecisionEmail` — for acceptance/rejection once there's a way to
  change a status.
- `sendOpportunityEmail` — for when opportunities exist.

Drop a provider (Resend, Postmark, …) into those functions and nothing else has
to change.

## 10. Where this grows next

The MVP is scoped tightly on purpose, but nothing here blocks the next steps:
`creators` and `business_leads` are standalone tables ready to gain a profile, a
reliability score and a subscription; the `admin_users` role and RLS policies
are already in the database, so an admin area can come back as a route group
with its own auth boundary; and the validation schemas and status lists are
single sources of truth in `src/lib`.

Two things the site deliberately does *not* have yet, and shouldn't gain by
accident:

- **Stripe.** `/get-started` collects an enquiry. Billing happens in a
  conversation until the offer is proven.
- **Social proof.** No testimonials, view counts or customer numbers exist
  because no customers do. The founder-stage section on the homepage is the
  placeholder; replace it with real results, not invented ones.
