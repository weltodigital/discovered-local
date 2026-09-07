import "server-only";

import { createClient } from "@supabase/supabase-js";

import { requiredEnv, supabaseUrl } from "./env";
import type { Database } from "@/lib/types/database";

/**
 * Service-role client. Bypasses RLS, so it must never be imported from a
 * client component. Used for the public application endpoint, where we need to
 * check for a duplicate email without granting the public read access.
 */
export function createSupabaseAdminClient() {
  return createClient<Database>(
    supabaseUrl(),
    requiredEnv("SUPABASE_SERVICE_ROLE_KEY"),
    { auth: { autoRefreshToken: false, persistSession: false } },
  );
}
