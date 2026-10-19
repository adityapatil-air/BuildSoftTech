import { NextResponse } from 'next/server';
import { COOKIE, checkPassword, cookieOptions, createToken, isConfigured } from '../../../../lib/auth';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  if (!isConfigured()) {
    return NextResponse.json({ error: 'Admin login is not configured. Set ADMIN_PASSWORD in the environment.' }, { status: 503 });
  }
  let body = {};
  try { body = await request.json(); } catch { /* empty body */ }
  if (!checkPassword(body.password)) {
    return NextResponse.json({ error: 'Incorrect password.' }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE, createToken(), cookieOptions());
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE, '', { ...cookieOptions(), maxAge: 0 });
  return res;
}
