// Small, dependency-free helpers for reading and validating FormData in server actions,
// and for rendering user-entered links safely.
import { redirect } from 'next/navigation';

export const str = (fd, key, max = 5000) => String(fd.get(key) ?? '').trim().slice(0, max);

// Only http(s) URLs are accepted, so a stored link can never become javascript: or data:.
export const safeUrl = (value) => {
  const v = String(value ?? '').trim();
  if (!v) return '';
  try {
    const u = new URL(v);
    return u.protocol === 'http:' || u.protocol === 'https:' ? u.toString() : '';
  } catch {
    return '';
  }
};

export const url = (fd, key) => safeUrl(str(fd, key, 2000));

export const int = (fd, key, { def = 0, min = -Infinity, max = Infinity } = {}) => {
  const n = Number.parseInt(String(fd.get(key) ?? ''), 10);
  if (Number.isNaN(n)) return def;
  return Math.min(max, Math.max(min, n));
};

export const date = (fd, key) => {
  const v = str(fd, key, 10);
  return /^\d{4}-\d{2}-\d{2}$/.test(v) ? v : null;
};

export const lines = (fd, key) => str(fd, key, 10000).split(/\r?\n/).map((t) => t.trim()).filter(Boolean);

export const oneOf = (fd, key, allowed, def) => {
  const v = str(fd, key, 40);
  return allowed.includes(v) ? v : def;
};

export const isUuid = (v) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(String(v || ''));

// Redirect back to a page with a one-line notice (?ok=… or ?error=…).
export function back(path, message, kind = 'ok') {
  const [base, hash] = path.split('#');
  const sep = base.includes('?') ? '&' : '?';
  redirect(`${base}${sep}${kind}=${encodeURIComponent(message)}${hash ? `#${hash}` : ''}`);
}

// Same-site relative path only (used for "return to" values coming from forms).
export const localPath = (fd, key, fallback) => {
  const v = str(fd, key, 300);
  return v.startsWith('/') && !v.startsWith('//') ? v.split('?')[0] : fallback;
};

export const fmtDate = (d) => (d ? new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—');
