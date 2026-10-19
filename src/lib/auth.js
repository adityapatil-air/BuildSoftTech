// Single-admin login. The password lives in ADMIN_PASSWORD; a successful login sets an
// httpOnly cookie carrying an HMAC-signed expiry, so no session table is needed.
import crypto from 'crypto';
import { cookies } from 'next/headers';

export const COOKIE = 'bst_admin';
const TTL_SECONDS = 60 * 60 * 8; // 8 hours

const secret = () => process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD || '';

const sign = (payload) => crypto.createHmac('sha256', secret()).update(payload).digest('base64url');

export const isConfigured = () => Boolean(process.env.ADMIN_PASSWORD);

export function checkPassword(candidate) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || typeof candidate !== 'string') return false;
  const a = Buffer.from(candidate);
  const b = Buffer.from(expected);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export function createToken() {
  const exp = String(Math.floor(Date.now() / 1000) + TTL_SECONDS);
  return `${exp}.${sign(exp)}`;
}

export function verifyToken(token) {
  if (!token || !secret()) return false;
  const [exp, sig] = token.split('.');
  if (!exp || !sig) return false;
  if (Number(exp) < Math.floor(Date.now() / 1000)) return false;
  const expected = sign(exp);
  return sig.length === expected.length && crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
}

export function isAdmin() {
  return verifyToken(cookies().get(COOKIE)?.value);
}

export const cookieOptions = () => ({
  httpOnly: true,
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
  path: '/',
  maxAge: TTL_SECONDS,
});
