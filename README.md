# Discovered Local

A UK local creator marketing platform, starting in Portsmouth.

This repository is the MVP: a landing page that recruits Portsmouth creators, an
application form that saves to Supabase, and a private admin area for reviewing
applicants. The business subscription side of the product is deliberately not
built yet.

- `/` — landing page
- `/apply` — creator application (3 short steps)
- `/success` — post-application confirmation
- `/admin` — private dashboard (Supabase email/password auth)
- `/privacy`, `/terms` — supporting pages

## Stack

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Supabase (Postgres +
Auth + RLS) · React Hook Form + Zod · Vercel Web Analytics.

---

## 1. Supabase setup

1. Create a project at [supabase.com](https://supabase.com). Pick the London
   (`eu-west-2`) region — the audience and the data are UK-based.
2. Open **SQL Editor → New query**, paste the contents of
   [`supabase/migrations/0001_init.sql`](supabase/migrations/0001_init.sql) and
   run it. This creates:
   - `public.creators` — the applications table, with a unique index on
     `lower(email)` so one person can't apply twice.
   - `public.admin_users` — who is allowed into `/admin`.
   - `public.is_admin()` — the security-definer helper the RLS policies use.
   - Row Level Security policies (see [Security](#4-security) below).
3. Go to **Project Settings → API** and copy the project URL, the `anon` key and
   the `service_role` key.

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
| `NEXT_PUBLIC_INSTAGRAM_URL` | footer, success page | Optional. Leave blank and the links hide themselves. |
| `NEXT_PUBLIC_TIKTOK_URL` | footer, success page | Optional. |

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

| Who | `creators` |
| --- | --- |
| Anonymous visitors | `INSERT` only, and only rows with `status = 'applied'`, `consent = true` and no admin fields set |
| Signed-in non-admins | nothing |
| Admins (`admin_users` row) | `SELECT` and `UPDATE` |
| Anyone | no `DELETE` |

Two more things worth knowing:

- **The application endpoint is a server action** (`src/app/apply/actions.ts`).
  It runs on the server with the service-role key so it can check for a
  duplicate email without ever granting the public read access to the table. A
  duplicate returns a friendly message, not a database error.
- **`/admin` is protected twice.** `src/proxy.ts` bounces signed-out requests to
  `/admin/login` before a page renders, and the admin layout re-checks the
  `admin_users` row on the server. Every admin server action re-checks it again.
  Admin reads and writes go through the signed-in user's client, so RLS is the
  real boundary — not the UI.

---

## 5. Creating an admin account

Admin accounts are created deliberately, not through a sign-up form.

1. In Supabase, go to **Authentication → Users → Add user**, and create a user
   with an email and password. Tick *Auto Confirm User*.
2. Copy that user's UUID.
3. In the SQL editor, grant them admin access:

   ```sql
   insert into public.admin_users (user_id, email)
   values ('<the-user-uuid>', 'you@discoveredlocal.com');
   ```

4. Sign in at `/admin/login`.

To revoke access, delete the `admin_users` row. The auth user can still sign in
but will be bounced straight back out of `/admin`.

---

## 6. Deploying to Vercel

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

## 7. Analytics

Vercel Web Analytics records page views automatically. On top of that we track
the four events that make up the funnel:

| Event | Fired when |
| --- | --- |
| `landing_page_view` | the landing page mounts |
| `apply_button_clicked` | any "apply" CTA is clicked (with a `location` property naming the section) |
| `application_started` | the applicant focuses the first form field |
| `application_submitted` | the application saves successfully |

The metric that matters: **visitor → application conversion**.

---

## 8. Project structure

```
src/
  app/
    page.tsx                     landing page
    apply/                       application form + server action
    success/                     confirmation
    admin/
      login/                     public sign-in page
      actions.ts                 admin server actions (status, notes, sign out)
      (dashboard)/               everything behind the admin check
        page.tsx                 applications list, search, status filters
        creators/[id]/page.tsx   application detail
    opengraph-image.tsx          generated OG image
    robots.ts, sitemap.ts        SEO
  components/
    site/                        landing page building blocks
    apply/                       form + field primitives
    admin/                       admin-only components
    ui/                          shared button styles
  lib/
    constants.ts                 locations, content types, statuses, copy config
    validation/creator.ts        the single Zod schema, shared client and server
    supabase/                    browser / server / service-role clients
    notifications.ts             email hook-points (see below)
    analytics.ts                 event tracking
  proxy.ts                       session refresh + /admin gate
supabase/migrations/             schema, indexes and RLS policies
```

---

## 9. Brand assets

| File | Used for |
| --- | --- |
| `public/logo-mark.png` | the mark in the site nav and admin header |
| `public/logo-full.png` | the stacked lockup in the footer and on the admin sign-in |
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

The landing page uses no photography yet. `src/components/site/ImageSlot.tsx`
renders tasteful placeholders that become real photos the moment you pass a
`src` — nothing about the layout changes.

---

## 10. Adding emails later

`src/lib/notifications.ts` holds four empty functions that are already called in
the right places:

- `notifyAdminOfNewApplication` and `sendCreatorConfirmationEmail` — called
  after a successful application, wrapped so a failure can never lose the
  application itself.
- `sendCreatorDecisionEmail` — for acceptance/rejection when an admin changes a
  status.
- `sendOpportunityEmail` — for when opportunities exist.

Drop a provider (Resend, Postmark, …) into those functions and nothing else has
to change.

## 11. Where this grows next

The MVP is scoped tightly on purpose, but nothing here blocks the next steps:
`creators` is a standalone table ready to gain a profile and a reliability
score; the admin area is already a route group with its own auth boundary, so
`businesses`, `opportunities` and `collaborations` can sit alongside it; and the
validation schema and status list are single sources of truth in `src/lib`.
