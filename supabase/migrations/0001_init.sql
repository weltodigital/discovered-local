-- ---------------------------------------------------------------------------
-- Discovered Local — initial schema
-- Creator applications + admin access control.
-- Run this in the Supabase SQL editor (or via the Supabase CLI).
-- ---------------------------------------------------------------------------

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Admin users
-- A row here grants access to /admin. Insert manually after creating the
-- auth user (see README -> Creating an admin account).
-- ---------------------------------------------------------------------------
create table if not exists public.admin_users (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  email      text,
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;

-- An admin may read their own row (used by the app to confirm the role).
-- Nobody can write to this table through the API — inserts happen in the
-- SQL editor or with the service role.
drop policy if exists "admins read own row" on public.admin_users;
create policy "admins read own row"
  on public.admin_users
  for select
  to authenticated
  using (user_id = auth.uid());

-- Security definer so the check itself is not blocked by RLS.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admin_users a where a.user_id = auth.uid()
  );
$$;

-- ---------------------------------------------------------------------------
-- Creator applications
-- ---------------------------------------------------------------------------
create table if not exists public.creators (
  id                      uuid primary key default gen_random_uuid(),
  created_at              timestamptz not null default now(),
  updated_at              timestamptz not null default now(),

  full_name               text not null check (char_length(trim(full_name)) between 2 and 120),
  email                   text not null check (position('@' in email) > 1),
  phone                   text,

  instagram_username      text,
  tiktok_username         text,

  location                text not null,
  location_other          text,

  content_types           text[] not null default '{}',
  preferred_business_types text[] not null default '{}',

  bio                     text,

  instagram_followers     integer check (instagram_followers is null or instagram_followers >= 0),
  tiktok_followers        integer check (tiktok_followers is null or tiktok_followers >= 0),

  primary_platform        text,

  content_link_1          text,
  content_link_2          text,
  portfolio_url           text,

  collaboration_frequency text,
  complimentary_experience text,

  why_join                text,

  status                  text not null default 'applied'
                            check (status in ('applied','reviewing','approved','active','rejected','paused')),

  consent                 boolean not null default false,
  commitment_ack          boolean not null default false,

  admin_notes             text,
  reviewed_at             timestamptz
);

-- One application per email address.
create unique index if not exists creators_email_key on public.creators (lower(email));
create index if not exists creators_status_idx on public.creators (status);
create index if not exists creators_created_at_idx on public.creators (created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists creators_set_updated_at on public.creators;
create trigger creators_set_updated_at
  before update on public.creators
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Row Level Security
--   * anyone may submit an application (insert only)
--   * nobody may read, update or delete unless they are an admin
-- ---------------------------------------------------------------------------
alter table public.creators enable row level security;

drop policy if exists "public can apply" on public.creators;
create policy "public can apply"
  on public.creators
  for insert
  to anon, authenticated
  with check (
    status = 'applied'
    and consent = true
    and admin_notes is null
    and reviewed_at is null
  );

drop policy if exists "admins read creators" on public.creators;
create policy "admins read creators"
  on public.creators
  for select
  to authenticated
  using (public.is_admin());

drop policy if exists "admins update creators" on public.creators;
create policy "admins update creators"
  on public.creators
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- No delete policy: applications cannot be deleted through the API.

revoke all on public.creators from anon, authenticated;
grant insert on public.creators to anon, authenticated;
grant select, update on public.creators to authenticated;
grant select on public.admin_users to authenticated;
