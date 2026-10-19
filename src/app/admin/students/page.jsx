import { requireAdmin } from '../../../lib/session';

export const metadata = { title: 'Admin · Students', robots: { index: false } };
export const dynamic = 'force-dynamic';

export default async function AdminStudents() {
  const { supabase } = await requireAdmin('/admin/students');
  const { data: students, error } = await supabase
    .from('profiles')
    .select('id, full_name, email, phone, institution, degree, role, created_at, course_enrollments(count), internship_enrollments(count)')
    .order('created_at', { ascending: false });

  return (
    <>
      <div className="admin-toolbar">
        <h1>Students</h1>
        <span className="form-hint">{students?.length ?? 0} registered</span>
      </div>
      {error && <div className="admin-alert is-error">Could not load students: {error.message}.</div>}
      {!error && !students?.length && <div className="portal-empty"><p>Nobody has registered yet. Students create accounts at <code>/register</code>.</p></div>}
      {!!students?.length && (
        <div className="table-wrap">
          <table className="data-table">
            <thead><tr><th>Name</th><th>Email</th><th>Mobile</th><th>Institution</th><th>Degree</th><th>Courses</th><th>Internships</th><th>Joined</th></tr></thead>
            <tbody>
              {students.map((s) => (
                <tr key={s.id}>
                  <td><strong>{s.full_name || '—'}</strong>{s.role === 'admin' && <> <span className="tag is-dark">admin</span></>}</td>
                  <td><a href={`mailto:${s.email}`}>{s.email}</a></td>
                  <td>{s.phone || '—'}</td>
                  <td>{s.institution || '—'}</td>
                  <td>{s.degree || '—'}</td>
                  <td>{s.course_enrollments?.[0]?.count ?? 0}</td>
                  <td>{s.internship_enrollments?.[0]?.count ?? 0}</td>
                  <td>{new Date(s.created_at).toLocaleDateString('en-IN')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
