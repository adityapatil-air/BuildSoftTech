import React from 'react';
import Link from 'next/link';
import { getSession } from '../lib/session';
import { enrolCourse, enrolInternship } from '../app/dashboard/actions';
import { fmtDate } from '../lib/forms';

const STATUS_LABEL = { pending: 'Request sent', active: 'Enrolled', completed: 'Completed', rejected: 'Not approved' };
const COLORS = ['c-blue', 'c-teal', 'c-violet', 'c-orange', 'c-pink', 'c-sun'];

// Live list of open course or internship batches from the database, with Enrol / Apply.
// Renders nothing when Supabase is unreachable or nothing is open.
const OpenBatches = async ({ kind, back, alt }) => {
  const { supabase, user } = await getSession();
  if (!supabase) return null;
  const isCourse = kind === 'course';
  const { data: items } = await supabase.from(isCourse ? 'courses' : 'internships').select('*').in('status', isCourse ? ['open', 'running'] : ['open']).order('created_at', { ascending: false });
  if (!items?.length) return null;

  let mine = {};
  if (user) {
    const { data } = await supabase.from(isCourse ? 'course_enrollments' : 'internship_enrollments').select(`id, status, ${isCourse ? 'course_id' : 'internship_id'}`).eq('student_id', user.id);
    mine = Object.fromEntries((data || []).map((e) => [isCourse ? e.course_id : e.internship_id, e]));
  }
  const action = isCourse ? enrolCourse : enrolInternship;

  return (
    <section id="batches" className={`section${alt ? ' alt' : ''}`} style={{ scrollMarginTop: 80 }}>
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">Now enrolling</span>
          <h2>{isCourse ? 'Open course batches' : 'Open internship batches'}</h2>
          <p className="lead">{isCourse ? 'Enrol with your student account. You get class recordings, notes and your certificate in your dashboard.' : 'Apply with your student account. Your problem statement, weekly reviews and certificate appear in your dashboard.'}</p>
        </div>
        <div className="grid grid-3">
          {items.map((it, i) => {
            const e = mine[it.id];
            const detail = isCourse ? `/dashboard/courses/${it.id}` : e ? `/dashboard/internships/${e.id}` : null;
            const meta = [isCourse ? it.duration : it.domain, isCourse ? it.mode : it.duration].filter(Boolean).join(' · ');
            return (
              <article key={it.id} className={`card ${COLORS[i % COLORS.length]}`}>
                <h3>{it.title}</h3>
                {meta && <p>{meta}</p>}
                {isCourse && it.start_date && <span className="tag is-brand" style={{ alignSelf: 'flex-start' }}>Starts {fmtDate(it.start_date)}</span>}
                {it.description && <p style={{ fontSize: '.95rem' }}>{it.description}</p>}
                <div style={{ marginTop: 'auto', paddingTop: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, borderTop: '1px dashed var(--line)' }}>
                  <span className="price">{it.fee || ''}</span>
                  {e ? (
                    <span style={{ display: 'flex', gap: 12, alignItems: 'center', fontWeight: 700, fontSize: '.92rem' }}>
                      {STATUS_LABEL[e.status]}
                      {detail && <Link href={detail}>Open &rarr;</Link>}
                    </span>
                  ) : user ? (
                    <form action={action}>
                      <input type="hidden" name="id" value={it.id} />
                      <input type="hidden" name="back" value={back} />
                      <button type="submit" className="btn btn-primary btn-sm">{isCourse ? 'Enrol' : 'Apply'}</button>
                    </form>
                  ) : (
                    <Link href={`/login?next=${encodeURIComponent(back)}`} className="btn btn-outline btn-sm">Sign in to {isCourse ? 'enrol' : 'apply'}</Link>
                  )}
                </div>
              </article>
            );
          })}
        </div>
        {!user && <p style={{ marginTop: 20, color: 'var(--muted)' }}>New here? <Link href={`/register?next=${encodeURIComponent(back)}`}>Create a student account</Link>. It takes a minute.</p>}
      </div>
    </section>
  );
};

export default OpenBatches;
