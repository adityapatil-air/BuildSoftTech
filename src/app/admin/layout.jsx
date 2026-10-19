import Link from 'next/link';
import Icon from '../../components/Icon';
import AdminNav from '../../components/admin/AdminNav';
import { requireAdmin } from '../../lib/session';
import { storageBackend } from '../../lib/store';

export const dynamic = 'force-dynamic';

export default async function AdminLayout({ children }) {
  const { profile } = await requireAdmin('/admin');
  return (
    <div className="admin-shell site-container">
      <aside className="admin-side">
        <div className="admin-side-head">
          <img src="/logo.png" alt="" width="36" height="36" />
          <div><strong>BuildSoftTech</strong><small>Admin</small></div>
        </div>
        <AdminNav />
        <div className="admin-side-foot">
          <small>Signed in as {profile?.full_name || profile?.email}</small>
          <small>Settings storage: {storageBackend() === 'supabase' ? 'Supabase' : 'local file'}</small>
          <Link href="/" className="button button-light button-small">View website</Link>
          <form action="/auth/signout" method="post"><button type="submit" className="button button-light button-small" style={{ width: '100%' }}><Icon name="x" size={13} /> Sign out</button></form>
        </div>
      </aside>
      <section className="admin-main">{children}</section>
    </div>
  );
}
