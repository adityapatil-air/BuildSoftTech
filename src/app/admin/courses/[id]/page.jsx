import Link from 'next/link';
import { notFound } from 'next/navigation';
import CourseForm from '../../../../components/admin/CourseForm';
import EnrollmentTable from '../../../../components/admin/EnrollmentTable';
import PdfUpload from '../../../../components/admin/PdfUpload';
import ConfirmButton from '../../../../components/ConfirmButton';
import Flash from '../../../../components/Flash';
import { addLinkResource, deleteCourse, deleteResource, deleteSession, saveSession } from '../../actions';
import { requireAdmin } from '../../../../lib/session';
import { fmtDate, isUuid, safeUrl } from '../../../../lib/forms';

export const metadata = { title: 'Admin · Manage course', robots: { index: false } };
export const dynamic = 'force-dynamic';

const KIND_LABEL = { pdf: 'PDF', youtube: 'YouTube', github: 'GitHub', link: 'Link' };

export default async function ManageCourse({ params, searchParams }) {
  if (!isUuid(params.id)) notFound();
  const { supabase } = await requireAdmin(`/admin/courses/${params.id}`);
  const page = `/admin/courses/${params.id}`;

  const [{ data: course }, { data: sessions }, { data: resources }, { data: enrollments }] = await Promise.all([
    supabase.from('courses').select('*').eq('id', params.id).maybeSingle(),
    supabase.from('course_sessions').select('*').eq('course_id', params.id).order('position'),
    supabase.from('course_resources').select('*').eq('course_id', params.id).order('created_at'),
    supabase.from('course_enrollments').select('id, status, enrolled_at, completed_at, student:profiles(full_name, email, phone, institution)').eq('course_id', params.id).order('enrolled_at'),
  ]);
  if (!course) notFound();

  const enrIds = (enrollments || []).map((e) => e.id);
  const { data: certs } = enrIds.length
    ? await supabase.from('certificates').select('id, certificate_no, issued_at, enrollment_id').eq('kind', 'course').in('enrollment_id', enrIds)
    : { data: [] };
  const rows = (enrollments || []).map((e) => ({ ...e, certificate: (certs || []).find((c) => c.enrollment_id === e.id) }));

  return (
    <>
      <p className="form-hint"><Link href="/admin/courses">← All courses</Link></p>
      <div className="admin-toolbar">
        <h1>{course.title}</h1>
        <div className="row-actions">
          <span className="tag">{course.status}</span>
          <Link href={`/dashboard/courses/${course.id}`} className="button button-light button-small">Student view</Link>
        </div>
      </div>
      <Flash searchParams={searchParams} />

      <EnrollmentTable kind="course" rows={rows} parentId={course.id} back={page} />

      <section id="classes" className="admin-card">
        <div className="admin-card-head"><strong>Classes &amp; recordings</strong><small className="form-hint">Paste the Google Drive share link of each recording (view-only).</small></div>
        {(sessions || []).map((s) => (
          <form key={s.id} action={saveSession} className="form-grid" style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: 12, marginBottom: 12 }}>
            <input type="hidden" name="id" value={s.id} />
            <input type="hidden" name="course_id" value={course.id} />
            <div className="form-group"><label>Class {s.position} title</label><input name="title" className="form-input" defaultValue={s.title} required /></div>
            <div className="form-group"><label>Date</label><input name="session_date" type="date" className="form-input" defaultValue={s.session_date || ''} /></div>
            <div className="form-group is-full"><label>Recording link</label><input name="recording_url" type="url" className="form-input" defaultValue={s.recording_url || ''} placeholder="https://drive.google.com/file/d/…/view" /></div>
            <div className="form-group is-full"><label>Notes for students</label><input name="notes" className="form-input" defaultValue={s.notes || ''} /></div>
            <div className="is-full row-actions">
              <button type="submit" className="button button-light button-small">Save class</button>
              {s.recording_url && safeUrl(s.recording_url) && <a href={safeUrl(s.recording_url)} target="_blank" rel="noreferrer" className="form-hint">Open recording ↗</a>}
              <ConfirmButton formAction={deleteSession} message={`Remove "${s.title}"?`}>Remove</ConfirmButton>
            </div>
          </form>
        ))}
        <form key={`new-session-${sessions?.length || 0}`} action={saveSession} className="form-grid">
          <input type="hidden" name="course_id" value={course.id} />
          <div className="form-group"><label htmlFor="ns-title">New class title</label><input id="ns-title" name="title" className="form-input" required placeholder={`Class ${(sessions?.length || 0) + 1} — topic`} /></div>
          <div className="form-group"><label htmlFor="ns-date">Date</label><input id="ns-date" name="session_date" type="date" className="form-input" /></div>
          <div className="form-group is-full"><label htmlFor="ns-rec">Recording link (can be added later)</label><input id="ns-rec" name="recording_url" type="url" className="form-input" placeholder="https://drive.google.com/file/d/…/view" /></div>
          <div className="form-group is-full"><label htmlFor="ns-notes">Notes</label><input id="ns-notes" name="notes" className="form-input" /></div>
          <div className="is-full row-actions"><button type="submit" className="button button-primary button-small">Add class</button></div>
        </form>
      </section>

      <section id="resources" className="admin-card">
        <div className="admin-card-head"><strong>Notes &amp; links</strong><small className="form-hint">Visible only to approved students.</small></div>
        {!!resources?.length && (
          <div className="table-wrap" style={{ marginBottom: 18 }}>
            <table className="data-table">
              <thead><tr><th>Type</th><th>Title</th><th>Link / file</th><th></th></tr></thead>
              <tbody>
                {resources.map((r) => (
                  <tr key={r.id}>
                    <td><span className="tag">{KIND_LABEL[r.kind] || r.kind}</span></td>
                    <td><strong>{r.title}</strong></td>
                    <td>{r.kind === 'pdf' ? <small className="form-hint">{r.storage_path.split('/').pop()}</small> : safeUrl(r.url) ? <a href={safeUrl(r.url)} target="_blank" rel="noreferrer">{r.url.replace(/^https?:\/\//, '').slice(0, 60)}</a> : '—'}</td>
                    <td>
                      <form action={deleteResource}>
                        <input type="hidden" name="id" value={r.id} />
                        <input type="hidden" name="course_id" value={course.id} />
                        <ConfirmButton message={`Remove "${r.title}"?`}>Remove</ConfirmButton>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <h4 style={{ margin: '0 0 8px', fontWeight: 600 }}>Upload a PDF</h4>
        <PdfUpload courseId={course.id} />
        <h4 style={{ margin: '18px 0 8px', fontWeight: 600 }}>Add a link</h4>
        <form key={`new-link-${resources?.length || 0}`} action={addLinkResource} className="form-grid">
          <input type="hidden" name="course_id" value={course.id} />
          <div className="form-group"><label htmlFor="lr-kind">Type</label><select id="lr-kind" name="kind" className="form-select"><option value="youtube">YouTube</option><option value="github">GitHub</option><option value="link">Other link</option></select></div>
          <div className="form-group"><label htmlFor="lr-title">Title</label><input id="lr-title" name="title" className="form-input" required /></div>
          <div className="form-group is-full"><label htmlFor="lr-url">URL</label><input id="lr-url" name="url" type="url" className="form-input" required placeholder="https://" /></div>
          <div className="is-full row-actions"><button type="submit" className="button button-primary button-small">Add link</button></div>
        </form>
      </section>

      <CourseForm course={course} title="Course details" note={`Created ${fmtDate(course.created_at)}`} />

      <form action={deleteCourse} className="row-actions">
        <input type="hidden" name="id" value={course.id} />
        <ConfirmButton message="Delete this course with all its classes, resources and enrolments? Issued certificates stay valid.">Delete course</ConfirmButton>
      </form>
    </>
  );
}
