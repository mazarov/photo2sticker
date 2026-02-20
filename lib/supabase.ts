import { createClient, SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

/**
 * Supabase client for landing API routes (read-only).
 * Returns null when SUPABASE_URL or SUPABASE_ANON_KEY is not set — API will use fallback.
 */
export function getSupabase(): SupabaseClient | null {
  if (client !== null) return client;
  const url = process.env.SUPABASE_URL ?? process.env.SUPABASE_SUPABASE_PUBLIC_URL;
  const key =
    process.env.SUPABASE_ANON_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  client = createClient(url, key, { auth: { persistSession: false } });
  return client;
}
