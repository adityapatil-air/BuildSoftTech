import Link from 'next/link';
import AdminDashboard from '../../components/admin/AdminDashboard';
import { getSettings, storageBackend } from '../../lib/store';
import { requireAdmin } from '../../lib/session';

export const metadata = { title: 'Admin · Overview', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

const count = async (q) => (await q).count ?? 0;

export default async function AdminPage() {
  const { supabase } = await requireAdmin('/admin');
  const head = { count: 'exact', head: true };
  const [settings, pendingCourses, pendingInterns, activeCourses, activeInterns, certs, reviewed, interns] = await Promise.all([
    getSettings(),
    count(supabase.from('course_enrollments').select('id', head).eq('status', 'pending')),
    count(supabase.from('internship_enrollments').select('id', head).eq('status', 'pending')),
    count(supabase.from('course_enrollments').select('id', head).eq('status', 'active')),
    count(supabase.from('internship_enrollments').select('id', head).eq('status', 'active')),
    count(supabase.from('certificates').select('id', head)),
    supabase.from('internship_reviews').select('enrollment_id, internship_enrollments!inner(status)').eq('reviewed', true).eq('internship_enrollments.status', 'active'),
    supabase.from('internship_enrollments').select('weeks_total').eq('status', 'active'),
  ]);
  const weeksDue = (interns.data || []).reduce((n, e) => n + e.weeks_total, 0) - (reviewed.data || []).length;

  const tiles = [
    ['Course requests to approve', pendingCourses, '/admin/courses'],
    ['Internship applications', pendingInterns, '/admin/internships'],
    ['Students in active courses', activeCourses, '/admin/courses'],
    ['Active interns', activeInterns, '/admin/internships'],
    ['Internship weeks not reviewed', Math.max(0, weeksDue), '/admin/internships'],
    ['Certificates issued', certs, '/admin/students'],
  ];

  return (
    <>
      <div className="admin-toolbar"><h1>Overview</h1></div>
      <div className="card-grid" style={{ marginBottom: 28 }}>
        {tiles.map(([label, n, href]) => (
          <Link key={label} href={href} className="service-card">
            <p className="form-hint" style={{ margin: 0 }}>{label}</p>
            <h3 style={{ fontSize: 30, margin: '6px 0 0' }}>{n}</h3>
          </Link>
        ))}
      </div>
      <AdminDashboard initial={settings} backend={storageBackend()} />
    </>
  );
}
