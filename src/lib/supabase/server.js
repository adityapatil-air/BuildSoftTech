// Supabase clients for server components, route handlers and server actions.
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';
import WebSocketImpl from 'ws';

// supabase-js refuses to start on Node < 22 without a WebSocket. We never use realtime on the
// server, but the client still needs one to construct, so supply `ws` when the runtime has none.
const realtimeOpts = typeof globalThis.WebSocket === 'undefined' ? { realtime: { transport: WebSocketImpl } } : {};

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '';
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

export const isSupabaseConfigured = () => Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

// Client that acts as the signed-in user (RLS applies). Reads/writes the auth cookies.
export function createSupabaseServer() {
  if (!isSupabaseConfigured()) return null;
  const cookieStore = cookies();
  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    ...realtimeOpts,
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (toSet) => {
        try {
          toSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // Called from a Server Component: cookies are read-only there. Middleware refreshes them.
        }
      },
    },
  });
}

// Privileged client (bypasses RLS). Server-only; never import from client components.
export function createSupabaseAdmin() {
  if (!SUPABASE_URL || !SERVICE_KEY) return null;
  return createClient(SUPABASE_URL, SERVICE_KEY, { ...realtimeOpts, auth: { persistSession: false, autoRefreshToken: false } });
}
