import { NextResponse } from 'next/server';
import { getSession, isAdminSession } from '../../../lib/session';
import { getSettings, saveSettings, storageBackend } from '../../../lib/store';

export const dynamic = 'force-dynamic';

export async function GET() {
  const settings = await getSettings();
  return NextResponse.json(settings);
}

export async function PUT(request) {
  if (!isAdminSession(await getSession())) return NextResponse.json({ error: 'Admin sign-in required.' }, { status: 401 });
  let body;
  try { body = await request.json(); } catch { return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 }); }
  if (!body || typeof body !== 'object') return NextResponse.json({ error: 'Invalid settings.' }, { status: 400 });
  try {
    const saved = await saveSettings(body);
    return NextResponse.json({ ok: true, settings: saved, backend: storageBackend() });
  } catch (err) {
    console.error('[settings] save failed:', err);
    const hint = storageBackend() === 'file'
      ? ' The server could not write .data/settings.json. On Vercel, set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY so settings persist.'
      : '';
    return NextResponse.json({ error: `Could not save settings.${hint}` }, { status: 500 });
  }
}
