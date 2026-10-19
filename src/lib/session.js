// Who is signed in, and what role they have. Server-only.
import { cache } from 'react';
import { redirect } from 'next/navigation';
import { createSupabaseServer } from './supabase/server';

// Memoised per request so layout + page can both call it without two round trips.
export const getSession = cache(async () => {
  const supabase = createSupabaseServer();
  if (!supabase) return { user: null, profile: null, supabase: null };
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { user: null, profile: null, supabase };
  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).maybeSingle();
  return { user, profile: profile || { id: user.id, email: user.email, full_name: '', role: 'student' }, supabase };
});

export async function requireUser(next = '/dashboard') {
  const session = await getSession();
  if (!session.user) redirect(`/login?next=${encodeURIComponent(next)}`);
  return session;
}

export async function requireAdmin(next = '/admin') {
  const session = await getSession();
  if (!session.user) redirect(`/login?next=${encodeURIComponent(next)}`);
  if (session.profile?.role !== 'admin') redirect('/dashboard?denied=1');
  return session;
}

export const isAdminSession = (session) => session?.profile?.role === 'admin';
