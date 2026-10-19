import Link from 'next/link';
import Icon from '../../components/Icon';
import { requireUser } from '../../lib/session';
import Flash from '../../components/Flash';

export const metadata = { title: 'My dashboard', robots: { index: false } };
export const dynamic = 'force-dynamic';

const statusTag = (s) => ({ active: 'is-success', completed: 'is-dark', pending: 'is-warning', rejected: 'is-danger' }[s] || '');

export default async function DashboardPage({ searchParams }) {
  const { user, profile, supabase } = await requireUser('/dashboard');

  const [{ data: courses }, { data: internships }, { data: certificates }] = await Promise.all([
    supabase.from('course_enrollments').select('id, status, enrolled_at, course:courses(id, title, duration, mode, status)').eq('student_id', user.id).order('enrolled_at', { ascending: false }),
    supabase.from('internship_enrollments').select('id, status, weeks_total, start_date, internship:internships(id, title, domain)').eq('student_id', user.id).order('enrolled_at', { ascending: false }),
    supabase.from('certificates').select('id, certificate_no, kind, title, issued_at').eq('student_id', user.id).order('issued_at', { ascending: false }),
  ]);

  const firstName = profile?.full_name?.split(' ')[0] || 'there';

  return (
    <div className="portal site-container">
      {searchParams?.denied && <div className="admin-alert is-error">That page is for administrators only.</div>}
      <Flash searchParams={searchParams} />
      <div className="portal-head">
        <div>
          <p className="eyebrow accent">Student dashboard</p>
          <h1>Hello, {firstName}</h1>
          <p>{profile?.institution ? `${profile.institution} · ` : ''}{user.email}</p>
        </div>
        <div className="row-actions">
          <Link href="/courses" className="button button-light button-small">Browse courses</Link>
          <Link href="/internships" className="button button-light button-small">Internship program</Link>
        </div>
      </div>

      <section className="portal-section">
        <div className="section-heading"><div><h2>My courses</h2><p>Recordings, notes and links appear here once your enrolment is approved.</p></div></div>
        {!courses?.length ? (
          <div className="portal-empty"><Icon name="book" size={26} /><p>You are not enrolled in any course yet.</p><Link href="/courses" className="button button-primary button-small">See available courses</Link></div>
        ) : (
          <div className="card-grid">
            {courses.map((e) => (
              <Link key={e.id} href={`/dashboard/courses/${e.course?.id}`} className="service-card">
                <span className={`tag ${statusTag(e.status)}`} style={{ alignSelf: 'flex-start', marginBottom: 12 }}>{e.status}</span>
                <h3>{e.course?.title}</h3>
                <p>{[e.course?.duration, e.course?.mode].filter(Boolean).join(' · ')}</p>
                <span className="section-link">{e.status === 'pending' ? 'Awaiting approval' : 'Open course →'}</span>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="portal-section">
        <div className="section-heading"><div><h2>My internships</h2><p>Your problem statement, weekly reviews and repository link.</p></div></div>
        {!internships?.length ? (
          <div className="portal-empty"><Icon name="briefcase" size={26} /><p>No internship yet.</p><Link href="/internships" className="button button-primary button-small">About the 45-day internship</Link></div>
        ) : (
          <div className="card-grid">
            {internships.map((e) => (
              <Link key={e.id} href={`/dashboard/internships/${e.id}`} className="service-card">
                <span className={`tag ${statusTag(e.status)}`} style={{ alignSelf: 'flex-start', marginBottom: 12 }}>{e.status}</span>
                <h3>{e.internship?.title}</h3>
                <p>{[e.internship?.domain, `${e.weeks_total} weeks`].filter(Boolean).join(' · ')}</p>
                <span className="section-link">{e.status === 'pending' ? 'Awaiting approval' : 'Open internship →'}</span>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="portal-section">
        <div className="section-heading"><div><h2>Certificates</h2></div></div>
        {!certificates?.length ? (
          <div className="portal-empty"><Icon name="award" size={26} /><p>Certificates you earn will be listed here.</p></div>
        ) : (
          <div className="table-wrap">
            <table className="data-table">
              <thead><tr><th>Certificate no.</th><th>For</th><th>Issued</th><th></th></tr></thead>
              <tbody>
                {certificates.map((c) => (
                  <tr key={c.id}><td><strong>{c.certificate_no}</strong></td><td>{c.title} <span className="tag">{c.kind}</span></td><td>{new Date(c.issued_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</td><td><Link href={`/certificates/${c.certificate_no}`} className="button button-light button-small">View</Link></td></tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
