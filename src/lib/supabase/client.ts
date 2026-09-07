"use client";

import { createBrowserClient } from "@supabase/ssr";

import { supabaseAnonKey, supabaseUrl } from "./env";
import type { Database } from "@/lib/types/database";

/** Browser client. Only ever sees the public anon key. */
export function createSupabaseBrowserClient() {
  return createBrowserClient<Database>(supabaseUrl(), supabaseAnonKey());
}
