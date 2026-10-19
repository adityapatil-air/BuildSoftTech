import { NextResponse } from 'next/server';
import { createSupabaseServer } from '../../../lib/supabase/server';

export const dynamic = 'force-dynamic';

// Landing point for the email-confirmation link: swaps the one-time code for a session,
// then sends the user on to their dashboard (or the page they were heading to).
export async function GET(request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const next = url.searchParams.get('next') || '/dashboard';
  const safeNext = next.startsWith('/') && !next.startsWith('//') ? next : '/dashboard';

  if (code) {
    const supabase = createSupabaseServer();
    const { error } = supabase ? await supabase.auth.exchangeCodeForSession(code) : { error: new Error('not configured') };
    if (!error) return NextResponse.redirect(new URL(safeNext, url.origin));
  }
  return NextResponse.redirect(new URL('/login?confirm=failed', url.origin));
}
