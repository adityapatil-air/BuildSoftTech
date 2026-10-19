import Link from 'next/link';
import { notFound } from 'next/navigation';
import ConfirmButton from '../../../../../components/ConfirmButton';
import Flash from '../../../../../components/Flash';
import { issueCertificate, revokeCertificate, saveInternshipStudent, saveReview, setEnrollmentStatus } from '../../../actions';
import { requireAdmin } from '../../../../../lib/session';
import { fmtDate, isUuid, safeUrl } from '../../../../../lib/forms';

export const metadata = { title: 'Admin · Intern', robots: { index: false } };
export const dynamic = 'force-dynamic';

const TAG = { active: 'is-success', completed: 'is-dark', pending: 'is-warning', rejected: 'is-danger' };

export default async function ManageIntern({ params, searchParams }) {
  if (!isUuid(params.id) || !isUuid(params.enrollmentId)) notFound();
  const page = `/admin/internships/${params.id}/${params.enrollmentId}`;
  const { supabase } = await requireAdmin(page);

  const [{ data: enr }, { data: reviews }, { data: cert }] = await Promise.all([
    supabase.from('internship_enrollments').select('*, internship:internships(id, title, domain, duration), student:profiles(full_name, email, phone, institution, degree)').eq('id', params.enrollmentId).eq('internship_id', params.id).maybeSingle(),
    supabase.from('internship_reviews').select('*').eq('enrollment_id', params.enrollmentId).order('week_no'),
    supabase.from('certificates').select('id, certificate_no, issued_at').eq('kind', 'internship').eq('enrollment_id', params.enrollmentId).maybeSingle(),
  ]);
  if (!enr) notFound();

  const byWeek = Object.fromEntries((reviews || []).map((r) => [r.week_no, r]));
  const weeks = Array.from({ length: enr.weeks_total }, (_, i) => i + 1);
  const reviewedCount = weeks.filter((w) => byWeek[w]?.reviewed).length;
  const extra = (reviews || []).filter((r) => r.week_no > enr.weeks_total);
  const repo = safeUrl(enr.repo_url);

  const Status = ({ status, label, primary }) => (
    <form action={setEnrollmentStatus}>
      <input type="hidden" name="kind" value="internship" />
      <input type="hidden" name="id" value={enr.id} />
      <input type="hidden" name="status" value={status} />
      <input type="hidden" name="back" value={page} />
      <button type="submit" className={`button button-small ${primary ? 'button-primary' : 'button-light'}`}>{label}</button>
    </form>
  );

  return (
    <>
      <p className="form-hint"><Link href={`/admin/internships/${params.id}`}>← {enr.internship?.title}</Link></p>
      <div className="admin-toolbar">
        <div>
          <h1>{enr.student?.full_name || enr.student?.email}</h1>
          <p className="form-hint" style={{ margin: '4px 0 0' }}>
            <a href={`mailto:${enr.student?.email}`}>{enr.student?.email}</a>
            {enr.student?.phone ? ` · ${enr.student.phone}` : ''}{enr.student?.institution ? ` · ${enr.student.institution}` : ''}{enr.student?.degree ? ` · ${enr.student.degree}` : ''}
          </p>
        </div>
        <div className="row-actions">
          <span className={`tag ${TAG[enr.status] || ''}`}>{enr.status}</span>
          <span className="tag">{reviewedCount}/{enr.weeks_total} weeks reviewed</span>
        </div>
      </div>
      <Flash searchParams={searchParams} />

      <section className="admin-card">
        <div className="admin-card-head"><strong>Status &amp; certificate</strong></div>
        <div className="row-actions">
          {enr.status === 'pending' && <><Status status="active" label="Approve" primary /><Status status="rejected" label="Reject" /></>}
          {enr.status === 'active' && <Status status="completed" label="Mark internship completed" primary={reviewedCount === enr.weeks_total} />}
          {enr.status === 'completed' && !cert && (
            <>
              <form action={issueCertificate}>
                <input type="hidden" name="kind" value="internship" />
                <input type="hidden" name="enrollment_id" value={enr.id} />
                <input type="hidden" name="back" value={page} />
                <button type="submit" className="button button-primary button-small">Issue certificate</button>
              </form>
              <Status status="active" label="Reopen" />
            </>
          )}
          {cert && (
            <>
              <Link href={`/certificates/${cert.certificate_no}`} target="_blank" className="button button-light button-small">Certificate {cert.certificate_no} ↗</Link>
              <form action={revokeCertificate}>
                <input type="hidden" name="id" value={cert.id} />
                <input type="hidden" name="back" value={page} />
                <ConfirmButton message={`Revoke certificate ${cert.certificate_no}?`}>Revoke</ConfirmButton>
              </form>
            </>
          )}
          {enr.status === 'rejected' && <Status status="pending" label="Undo reject" />}
        </div>
        {enr.status === 'active' && reviewedCount < enr.weeks_total && <p className="form-hint" style={{ marginTop: 10 }}>{enr.weeks_total - reviewedCount} week(s) not reviewed yet.</p>}
      </section>

      <form action={saveInternshipStudent} className="admin-card">
        <div className="admin-card-head"><strong>Problem statement, weeks &amp; repository</strong><small className="form-hint">Visible to the student</small></div>
        <input type="hidden" name="id" value={enr.id} />
        <input type="hidden" name="back" value={page} />
        <div className="form-grid">
          <div className="form-group is-full"><label htmlFor="ps">Problem statement</label><textarea id="ps" name="problem_statement" className="form-textarea" style={{ minHeight: 140 }} defaultValue={enr.problem_statement || ''} placeholder="Describe the project the student will build…" /></div>
          <div className="form-group"><label htmlFor="wk">Number of weeks</label><input id="wk" name="weeks_total" type="number" min="1" max="52" className="form-input" defaultValue={enr.weeks_total} /><div className="form-hint">Lowering it hides later weeks; their reviews are kept.</div></div>
          <div className="form-group"><label htmlFor="sd">Start date</label><input id="sd" name="start_date" type="date" className="form-input" defaultValue={enr.start_date || ''} /></div>
          <div className="form-group is-full"><label htmlFor="repo">Repository link</label><input id="repo" name="repo_url" type="url" className="form-input" defaultValue={enr.repo_url || ''} placeholder="https://github.com/…" />{repo && <div className="form-hint"><a href={repo} target="_blank" rel="noreferrer">Open repository ↗</a></div>}</div>
        </div>
        <div className="row-actions"><button type="submit" className="button button-primary">Save</button></div>
      </form>

      <section className="admin-card">
        <div className="admin-card-head"><strong>Weekly reviews</strong><small className="form-hint">Tick the week once reviewed. Notes and suggestions are shown to the student.</small></div>
        {weeks.map((w) => {
          const r = byWeek[w] || {};
          return (
            <form key={w} id={`week-${w}`} action={saveReview} className="form-grid" style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: 14, marginBottom: 14, scrollMarginTop: 90 }}>
              <input type="hidden" name="enrollment_id" value={enr.id} />
              <input type="hidden" name="week_no" value={w} />
              <input type="hidden" name="back" value={page} />
              <div className="is-full row-actions" style={{ justifyContent: 'space-between' }}>
                <strong className="font-display" style={{ fontSize: 17 }}>Week {w}</strong>
                <label className="row-actions" style={{ fontSize: 14 }}>
                  <input type="checkbox" name="reviewed" defaultChecked={!!r.reviewed} style={{ width: 16, height: 16 }} />
                  Reviewed{r.reviewed_at ? ` · ${fmtDate(r.reviewed_at)}` : ''}
                </label>
              </div>
              <div className="form-group"><label>Review notes</label><textarea name="notes" className="form-textarea" style={{ minHeight: 80 }} defaultValue={r.notes || ''} /></div>
              <div className="form-group"><label>Suggestions for next week</label><textarea name="suggestions" className="form-textarea" style={{ minHeight: 80 }} defaultValue={r.suggestions || ''} /></div>
              <div className="is-full row-actions"><button type="submit" className="button button-light button-small">Save week {w}</button></div>
            </form>
          );
        })}
        {!!extra.length && <p className="form-hint">{extra.length} review(s) for weeks beyond week {enr.weeks_total} are kept but hidden. Increase the number of weeks to see them.</p>}
      </section>
    </>
  );
}
