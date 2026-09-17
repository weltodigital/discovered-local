-- ---------------------------------------------------------------------------
-- Discovered Local — business leads
-- Enquiries from the /get-started page. Additive: nothing here touches the
-- creators table, its policies or the admin role check from 0001_init.sql.
-- Run this in the Supabase SQL editor (or via the Supabase CLI).
-- ---------------------------------------------------------------------------

create table if not exists public.business_leads (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),

  business_name text not null check (char_length(trim(business_name)) between 2 and 160),
  contact_name  text not null check (char_length(trim(contact_name)) between 2 and 120),
  email         text not null check (position('@' in email) > 1),
  phone         text,
  website       text,
  instagram     text,
  business_type text,
  location      text,
  notes         text,

  status        text not null default 'new'
                  check (status in ('new','contacted','qualified','customer','not_interested')),
  admin_notes   text
);

create index if not exists business_leads_status_idx on public.business_leads (status);
create index if not exists business_leads_created_at_idx on public.business_leads (created_at desc);

drop trigger if exists business_leads_set_updated_at on public.business_leads;
create trigger business_leads_set_updated_at
  before update on public.business_leads
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Row Level Security
-- Same shape as creators: writes land through the server action (service role),
-- reads and updates are admin-only. No public policy at all, so an anon key
-- can do nothing here.
-- ---------------------------------------------------------------------------
alter table public.business_leads enable row level security;

drop policy if exists "admins read business leads" on public.business_leads;
create policy "admins read business leads"
  on public.business_leads
  for select
  to authenticated
  using (public.is_admin());

drop policy if exists "admins update business leads" on public.business_leads;
create policy "admins update business leads"
  on public.business_leads
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

revoke all on public.business_leads from anon, authenticated;
grant select, update on public.business_leads to authenticated;
