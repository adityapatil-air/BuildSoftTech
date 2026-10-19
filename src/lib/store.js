// Server-side settings store. Two backends:
//  - Supabase (REST, no SDK) when SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set.
//    Table: site_settings (key text primary key, value jsonb). This is what production
//    on Vercel needs, since its filesystem does not persist between requests.
//  - A local JSON file (.data/settings.json) otherwise — fine for development.
import fs from 'fs/promises';
import path from 'path';
import { DEFAULT_SETTINGS, mergeSettings } from '../data/defaults';

const FILE = path.join(process.cwd(), '.data', 'settings.json');
const KEY = 'site';

const supabase = () => {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return {
    endpoint: `${url.replace(/\/$/, '')}/rest/v1/site_settings`,
    headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
  };
};

export const storageBackend = () => (supabase() ? 'supabase' : 'file');

export async function getSettings() {
  try {
    const sb = supabase();
    if (sb) {
      const res = await fetch(`${sb.endpoint}?key=eq.${KEY}&select=value`, { headers: sb.headers, cache: 'no-store' });
      if (!res.ok) throw new Error(`Supabase read failed: ${res.status}`);
      const rows = await res.json();
      return mergeSettings(rows[0]?.value);
    }
    const raw = await fs.readFile(FILE, 'utf8');
    return mergeSettings(JSON.parse(raw));
  } catch (err) {
    if (err?.code !== 'ENOENT') console.error('[settings] falling back to defaults:', err.message);
    return DEFAULT_SETTINGS;
  }
}

export async function saveSettings(settings) {
  const value = { ...mergeSettings(settings), updatedAt: new Date().toISOString() };
  const sb = supabase();
  if (sb) {
    const res = await fetch(sb.endpoint, {
      method: 'POST',
      headers: { ...sb.headers, Prefer: 'resolution=merge-duplicates,return=minimal' },
      body: JSON.stringify({ key: KEY, value }),
    });
    if (!res.ok) throw new Error(`Supabase write failed: ${res.status} ${await res.text()}`);
    return value;
  }
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(value, null, 2), 'utf8');
  return value;
}
