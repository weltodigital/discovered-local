function required(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(
      `Missing environment variable ${name}. Copy .env.example to .env.local and fill it in.`,
    );
  }
  return value;
}

/**
 * `NEXT_PUBLIC_*` variables are inlined at build time only when referenced as a
 * static property — `process.env[name]` would be undefined in the browser.
 */
export const supabaseUrl = () =>
  required("NEXT_PUBLIC_SUPABASE_URL", process.env.NEXT_PUBLIC_SUPABASE_URL);

export const supabaseAnonKey = () =>
  required(
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );

/** Server-only variables can be read dynamically. */
export function requiredEnv(name: string): string {
  return required(name, process.env[name]);
}
