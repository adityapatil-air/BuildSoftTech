import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Award, CalendarDays, FileText, FolderGit2, Link2, MonitorPlay, PlayCircle, Video } from 'lucide-react';
import Flash from '../../../../components/Flash';
import { enrolCourse } from '../../actions';
import { requireUser } from '../../../../lib/session';
import { fmtDate, isUuid, safeUrl } from '../../../../lib/forms';

export const metadata = { title: 'Course', robots: { index: false } };
export const dynamic = 'force-dynamic';

const RES_ICON = { pdf: FileText, youtube: MonitorPlay, github: FolderGit2, link: Link2 };
const TAG = { active: 'is-success', completed: 'is-dark', pending: 'is-warning', rejected: 'is-danger' };

export default async function StudentCourse({ params, searchParams }) {
  if (!isUuid(params.id)) notFound();
  const { supabase, user } = await requireUser(`/dashboard/courses/${params.id}`);

  const [{ data: course }, { data: enr }] = await Promise.all([
    supabase.from('courses').select('*').eq('id', params.id).maybeSingle(),
    supabase.from('course_enrollments').select('*').eq('course_id', params.id).eq('student_id', user.id).maybeSingle(),
  ]);
  if (!course) notFound();

  const hasAccess = enr && ['active', 'completed'].includes(enr.status);
  let sessions = [];
  let resources = [];
  let cert = null;
  if (hasAccess) {
    const [s, r, c] = await Promise.all([
      supabase.from('course_sessions').select('*').eq('course_id', course.id).order('position'),
      supabase.from('course_resources').select('*').eq('course_id', course.id).order('created_at'),
      supabase.from('certificates').select('certificate_no, issued_at').eq('kind', 'course').eq('enrollment_id', enr.id).maybeSingle(),
    ]);
    sessions = s.data || [];
    resources = r.data || [];
    cert = c.data;
    const pdfPaths = resources.filter((x) => x.kind === 'pdf' && x.storage_path).map((x) => x.storage_path);
    if (pdfPaths.length) {
      const { data: signed } = await supabase.storage.from('course-resources').createSignedUrls(pdfPaths, 60 * 60);
      const byPath = Object.fromEntries((signed || []).map((x) => [x.path, x.signedUrl]));
      resources = resources.map((x) => (x.kind === 'pdf' ? { ...x, href: byPath[x.storage_path] || '' } : { ...x, href: safeUrl(x.url) }));
    } else {
      resources = resources.map((x) => ({ ...x, href: safeUrl(x.url) }));
    }
  }
  const teams = safeUrl(course.teams_link);
  const canEnrol = !enr && ['open', 'running'].includes(course.status);

  return (
    <div className="portal site-container">
      <p className="form-hint"><Link href="/dashboard">← My dashboard</Link></p>
      <Flash searchParams={searchParams} />
      <div className="portal-head">
        <div>
          <p className="eyebrow accent">Course</p>
          <h1>{course.title}</h1>
          <p>{[course.duration, course.mode, course.fee, course.start_date && `Starts ${fmtDate(course.start_date)}`].filter(Boolean).join(' · ')}</p>
        </div>
        {enr && <span className={`tag ${TAG[enr.status] || ''}`}>{enr.status === 'active' ? 'Enrolled' : enr.status}</span>}
      </div>

      {course.description && <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">{course.description}</p>}
      {!!course.topics?.length && (
        <ul className="mt-4 flex flex-wrap gap-2">{course.topics.map((t) => <li key={t} className="rounded-full border border-border bg-card px-3 py-1 text-sm">{t}</li>)}</ul>
      )}

      {canEnrol && (
        <form action={enrolCourse} className="portal-empty" style={{ marginTop: 28 }}>
          <input type="hidden" name="id" value={course.id} />
          <input type="hidden" name="back" value={`/dashboard/courses/${course.id}`} />
          <p>You are not enrolled in this course yet. Request a place and we will confirm once it is approved.</p>
          <button type="submit" className="button button-primary">Request enrolment</button>
        </form>
      )}
      {!enr && !canEnrol && <div className="portal-empty" style={{ marginTop: 28 }}><p>This course is not taking enrolments right now.</p></div>}
      {enr?.status === 'pending' && <div className="portal-empty" style={{ marginTop: 28 }}><p>Your request is with our team. Class links, recordings and notes appear here once your place is approved.</p></div>}
      {enr?.status === 'rejected' && <div className="portal-empty" style={{ marginTop: 28 }}><p>Your enrolment was not approved. Please <Link href="/contact" className="text-primary">contact us</Link> if you have questions.</p></div>}

      {hasAccess && (
        <>
          {cert && (
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-accent/40 bg-accent/10 px-5 py-4">
              <p className="flex items-center gap-2 text-sm font-semibold"><Award className="h-5 w-5 text-accent" /> Certificate {cert.certificate_no} issued {fmtDate(cert.issued_at)}</p>
              <Link href={`/certificates/${cert.certificate_no}`} className="button button-primary button-small">View certificate</Link>
            </div>
          )}

          {teams && enr.status === 'active' && (
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-card px-5 py-4">
              <p className="flex items-center gap-2 text-sm"><Video className="h-5 w-5 text-primary" /> Live classes are held on Microsoft Teams.</p>
              <a href={teams} target="_blank" rel="noreferrer" className="button button-primary button-small">Join on Teams ↗</a>
            </div>
          )}

          <section className="portal-section">
            <div className="section-heading"><div><h2>Classes &amp; recordings</h2><p>Recordings open in Google Drive (view only).</p></div></div>
            {!sessions.length ? <div className="portal-empty"><p>No classes have been added yet.</p></div> : (
              <ol className="space-y-3">
                {sessions.map((s) => {
                  const rec = safeUrl(s.recording_url);
                  return (
                    <li key={s.id} className="paper-card flex flex-wrap items-center justify-between gap-4 rounded-xl p-5">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-accent">Class {s.position}</p>
                        <h3 className="font-display text-lg font-semibold">{s.title}</h3>
                        <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">{s.session_date && <><CalendarDays className="h-3.5 w-3.5" /> {fmtDate(s.session_date)}</>}</p>
                        {s.notes && <p className="mt-2 text-sm text-muted-foreground">{s.notes}</p>}
                      </div>
                      {rec ? <a href={rec} target="_blank" rel="noreferrer" className="button button-light button-small"><PlayCircle className="h-4 w-4" /> Watch recording</a> : <span className="form-hint">Recording not uploaded yet</span>}
                    </li>
                  );
                })}
              </ol>
            )}
          </section>

          <section className="portal-section">
            <div className="section-heading"><div><h2>Notes &amp; links</h2></div></div>
            {!resources.length ? <div className="portal-empty"><p>No notes or links yet.</p></div> : (
              <ul className="grid gap-3 sm:grid-cols-2">
                {resources.map((r) => {
                  const Icon = RES_ICON[r.kind] || Link2;
                  return (
                    <li key={r.id}>
                      {r.href ? (
                        <a href={r.href} target="_blank" rel="noreferrer" className="paper-card flex items-center gap-3 rounded-xl p-4 hover:bg-secondary">
                          <Icon className="h-5 w-5 shrink-0 text-accent" />
                          <span className="text-sm font-semibold">{r.title}</span>
                          <span className="ml-auto text-xs text-muted-foreground">{r.kind === 'pdf' ? 'PDF' : r.kind === 'youtube' ? 'YouTube' : r.kind === 'github' ? 'GitHub' : 'Link'} ↗</span>
                        </a>
                      ) : <span className="paper-card flex items-center gap-3 rounded-xl p-4 text-sm text-muted-foreground"><Icon className="h-5 w-5" /> {r.title} (unavailable)</span>}
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        </>
      )}
    </div>
  );
}
