// Loads .env.local for the scripts in this folder (no dotenv dependency).
import fs from 'fs';
import path from 'path';
import WebSocketImpl from 'ws';

// Supabase client options that work on Node 20 (no built-in WebSocket) as well as Node 22+.
export const clientOpts = (extra = {}) => ({
  ...(typeof globalThis.WebSocket === 'undefined' ? { realtime: { transport: WebSocketImpl } } : {}),
  auth: { persistSession: false, autoRefreshToken: false },
  ...extra,
});

export function loadEnv() {
  const file = path.join(process.cwd(), '.env.local');
  if (!fs.existsSync(file)) throw new Error('.env.local not found — run from the project root.');
  for (const line of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const service = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !anon || !service) throw new Error('Supabase URL, publishable key and service role key must all be set in .env.local.');
  return { url, anon, service };
}

export const DATA_DIR = path.join(process.cwd(), '.data');
export const ACCOUNTS_FILE = path.join(DATA_DIR, 'test-accounts.json');
export const TEST_PREFIX = '[TEST]';
