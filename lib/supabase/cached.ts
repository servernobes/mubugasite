// Supabase client for "use cache" server components.
// Does NOT use cookies — safe to call inside cached scopes.
// Only use for public read-only queries (anon key, RLS must allow public reads).
import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

export function createCachedClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
