import Link from 'next/link';
import { requireAdmin } from '../../../lib/session';

export const metadata = { title: 'Admin · Courses', robots: { index: false } };
export const dynamic = 'force-dynamic';

export default async function AdminCourses() {
  const { supabase } = await requireAdmin('/admin/courses');
  const { data: courses, error } = await supabase
    .from('courses')
    .select('id, title, status, fee, duration, mode, start_date, course_enrollments(count)')
    .order('created_at', { ascending: false });

  return (
    <>
      <div className="admin-toolbar">
        <h1>Courses</h1>
        <Link href="/admin/courses/new" className="button button-primary">+ New course</Link>
      </div>
      {error && <div className="admin-alert is-error">Could not load courses: {error.message}. Has <code>supabase/schema.sql</code> been run?</div>}
      {!error && !courses?.length && (
        <div className="portal-empty"><p>No courses yet. Create the first one and students will be able to enrol from the website.</p><Link href="/admin/courses/new" className="button button-primary button-small">Create a course</Link></div>
      )}
      {!!courses?.length && (
        <div className="table-wrap">
          <table className="data-table">
            <thead><tr><th>Course</th><th>Status</th><th>Fee</th><th>Duration</th><th>Mode</th><th>Enrolled</th><th></th></tr></thead>
            <tbody>
              {courses.map((c) => (
                <tr key={c.id}>
                  <td><strong>{c.title}</strong>{c.start_date && <><br /><small>Starts {new Date(c.start_date).toLocaleDateString('en-IN')}</small></>}</td>
                  <td><span className="tag">{c.status}</span></td>
                  <td>{c.fee || '—'}</td>
                  <td>{c.duration || '—'}</td>
                  <td>{c.mode || '—'}</td>
                  <td>{c.course_enrollments?.[0]?.count ?? 0}</td>
                  <td><Link href={`/admin/courses/${c.id}`} className="button button-light button-small">Manage</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
