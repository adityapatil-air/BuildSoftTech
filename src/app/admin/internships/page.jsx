import Link from 'next/link';
import { requireAdmin } from '../../../lib/session';
import Flash from '../../../components/Flash';

export const metadata = { title: 'Admin · Internships', robots: { index: false } };
export const dynamic = 'force-dynamic';

export default async function AdminInternships({ searchParams }) {
  const { supabase } = await requireAdmin('/admin/internships');
  const { data: rows, error } = await supabase
    .from('internships')
    .select('id, title, domain, status, fee, duration, internship_enrollments(count)')
    .order('created_at', { ascending: false });

  return (
    <>
      <div className="admin-toolbar">
        <h1>Internships</h1>
        <Link href="/admin/internships/new" className="button button-primary">+ New internship</Link>
      </div>
      <Flash searchParams={searchParams} />
      {error && <div className="admin-alert is-error">Could not load internships: {error.message}. Has <code>supabase/schema.sql</code> been run?</div>}
      {!error && !rows?.length && (
        <div className="portal-empty"><p>No internship programs yet.</p><Link href="/admin/internships/new" className="button button-primary button-small">Create an internship</Link></div>
      )}
      {!!rows?.length && (
        <div className="table-wrap">
          <table className="data-table">
            <thead><tr><th>Internship</th><th>Domain</th><th>Status</th><th>Fee</th><th>Duration</th><th>Students</th><th></th></tr></thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td><strong>{r.title}</strong></td>
                  <td>{r.domain || '—'}</td>
                  <td><span className="tag">{r.status}</span></td>
                  <td>{r.fee || '—'}</td>
                  <td>{r.duration || '—'}</td>
                  <td>{r.internship_enrollments?.[0]?.count ?? 0}</td>
                  <td><Link href={`/admin/internships/${r.id}`} className="button button-light button-small">Manage</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
