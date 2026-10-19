import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Award, CheckCircle2, Circle, FolderGit2 } from 'lucide-react';
import Flash from '../../../../components/Flash';
import { requireUser } from '../../../../lib/session';
import { fmtDate, isUuid, safeUrl } from '../../../../lib/forms';

export const metadata = { title: 'My internship', robots: { index: false } };
export const dynamic = 'force-dynamic';

const TAG = { active: 'is-success', completed: 'is-dark', pending: 'is-warning', rejected: 'is-danger' };

export default async function StudentInternship({ params, searchParams }) {
  if (!isUuid(params.id)) notFound();
  const { supabase, user } = await requireUser(`/dashboard/internships/${params.id}`);

  // RLS already limits this to the signed-in student's own rows; the student_id filter keeps
  // an admin's "student view" from showing someone else's record by accident.
  const { data: enr } = await supabase.from('internship_enrollments').select('*, internship:internships(title, domain, duration, description)').eq('id', params.id).eq('student_id', user.id).maybeSingle();
  if (!enr) notFound();

  const [{ data: reviews }, { data: cert }] = await Promise.all([
    supabase.from('internship_reviews').select('*').eq('enrollment_id', enr.id).order('week_no'),
    supabase.from('certificates').select('certificate_no, issued_at').eq('kind', 'internship').eq('enrollment_id', enr.id).maybeSingle(),
  ]);
  const byWeek = Object.fromEntries((reviews || []).map((r) => [r.week_no, r]));
  const weeks = Array.from({ length: enr.weeks_total }, (_, i) => i + 1);
  const done = weeks.filter((w) => byWeek[w]?.reviewed).length;
  const repo = safeUrl(enr.repo_url);

  return (
    <div className="portal site-container">
      <p className="form-hint"><Link href="/dashboard">← My dashboard</Link></p>
      <Flash searchParams={searchParams} />
      <div className="portal-head">
        <div>
          <p className="eyebrow accent">Internship</p>
          <h1>{enr.internship?.title}</h1>
          <p>{[enr.internship?.domain, `${enr.weeks_total} weeks`, enr.start_date && `Started ${fmtDate(enr.start_date)}`].filter(Boolean).join(' · ')}</p>
        </div>
        <span className={`tag ${TAG[enr.status] || ''}`}>{enr.status}</span>
      </div>

      {enr.status === 'pending' && <div className="portal-empty" style={{ marginTop: 28 }}><p>Your application is with our team. Your problem statement and weekly reviews appear here once it is approved.</p></div>}
      {enr.status === 'rejected' && <div className="portal-empty" style={{ marginTop: 28 }}><p>Your application was not approved. Please <Link href="/contact" className="text-primary">contact us</Link> if you have questions.</p></div>}

      {['active', 'completed'].includes(enr.status) && (
        <>
          {cert && (
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-accent/40 bg-accent/10 px-5 py-4">
              <p className="flex items-center gap-2 text-sm font-semibold"><Award className="h-5 w-5 text-accent" /> Certificate {cert.certificate_no} issued {fmtDate(cert.issued_at)}</p>
              <Link href={`/certificates/${cert.certificate_no}`} className="button button-primary button-small">View certificate</Link>
            </div>
          )}

          <div className="mt-8 grid gap-5 lg:grid-cols-[1.5fr_1fr]">
            <section className="paper-card rounded-xl p-6">
              <p className="eyebrow">Problem statement</p>
              {enr.problem_statement
                ? <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-foreground">{enr.problem_statement}</p>
                : <p className="mt-3 text-sm text-muted-foreground">Your mentor will add the problem statement here.</p>}
            </section>
            <section className="paper-card rounded-xl p-6">
              <p className="eyebrow">Progress</p>
              <p className="mt-3 font-display text-3xl font-semibold text-primary">{done}<span className="text-lg text-muted-foreground"> / {enr.weeks_total} weeks reviewed</span></p>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-secondary"><div className="h-full rounded-full bg-accent" style={{ width: `${Math.round((done / enr.weeks_total) * 100)}%` }} /></div>
              <p className="mt-5 eyebrow">Repository</p>
              {repo
                ? <a href={repo} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-2 break-all text-sm font-semibold text-primary hover:underline"><FolderGit2 className="h-4 w-4 shrink-0" /> {repo.replace(/^https?:\/\//, '')}</a>
                : <p className="mt-2 text-sm text-muted-foreground">Your mentor will share the repository link.</p>}
            </section>
          </div>

          <section className="portal-section">
            <div className="section-heading"><div><h2>Weekly reviews</h2><p>Notes and suggestions from your mentor after each week's review.</p></div></div>
            <ol className="space-y-3">
              {weeks.map((w) => {
                const r = byWeek[w];
                return (
                  <li key={w} className="paper-card rounded-xl p-5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="flex items-center gap-2 font-display text-lg font-semibold">
                        {r?.reviewed ? <CheckCircle2 className="h-5 w-5 text-success" /> : <Circle className="h-5 w-5 text-muted-foreground" />} Week {w}
                      </h3>
                      <span className="form-hint">{r?.reviewed ? `Reviewed ${fmtDate(r.reviewed_at)}` : 'Not reviewed yet'}</span>
                    </div>
                    {(r?.notes || r?.suggestions) && (
                      <div className="mt-3 grid gap-4 sm:grid-cols-2">
                        {r.notes && <div><p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Review notes</p><p className="mt-1 whitespace-pre-line text-sm leading-relaxed">{r.notes}</p></div>}
                        {r.suggestions && <div><p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Suggestions</p><p className="mt-1 whitespace-pre-line text-sm leading-relaxed">{r.suggestions}</p></div>}
                      </div>
                    )}
                  </li>
                );
              })}
            </ol>
          </section>
        </>
      )}
    </div>
  );
}
