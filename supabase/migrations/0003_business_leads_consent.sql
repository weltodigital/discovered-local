-- ---------------------------------------------------------------------------
-- Discovered Local — business lead consent
-- Records the contact-consent checkbox on /get-started, mirroring `consent`
-- on creators. Additive and idempotent; existing rows default to false
-- because we never asked them.
-- ---------------------------------------------------------------------------

alter table public.business_leads
  add column if not exists consent boolean not null default false;
