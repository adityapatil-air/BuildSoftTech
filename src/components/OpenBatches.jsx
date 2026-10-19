import React from 'react';
import Link from 'next/link';
import { Container } from './ui';
import { getSession } from '../lib/session';
import { enrolCourse, enrolInternship } from '../app/dashboard/actions';
import { fmtDate } from '../lib/forms';

const STATUS_LABEL = { pending: 'Request sent', active: 'Enrolled', completed: 'Completed', rejected: 'Not approved' };

// Live list of open courses or internships from the database, with an Enrol button.
// Renders nothing when Supabase is not configured or nothing is open.
const OpenBatches = async ({ kind, back }) => {
  const { supabase, user } = await getSession();
  if (!supabase) return null;
  const isCourse = kind === 'course';
  const table = isCourse ? 'courses' : 'internships';
  const { data: items } = await supabase.from(table).select('*').in('status', isCourse ? ['open', 'running'] : ['open']).order('created_at', { ascending: false });
  if (!items?.length) return null;

  let mine = {};
  if (user) {
    const { data } = await supabase.from(isCourse ? 'course_enrollments' : 'internship_enrollments').select(`id, status, ${isCourse ? 'course_id' : 'internship_id'}`).eq('student_id', user.id);
    mine = Object.fromEntries((data || []).map((e) => [isCourse ? e.course_id : e.internship_id, e]));
  }
  const action = isCourse ? enrolCourse : enrolInternship;

  return (
    <section id="batches" className="scroll-mt-24 border-b border-border bg-secondary">
      <Container className="py-14">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Now enrolling</p>
        <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight">{isCourse ? 'Open course batches' : 'Open internship batches'}</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => {
            const e = mine[it.id];
            const detail = isCourse ? `/dashboard/courses/${it.id}` : e ? `/dashboard/internships/${e.id}` : null;
            return (
              <div key={it.id} className="paper-card flex flex-col rounded-xl p-6">
                <h3 className="font-display text-xl font-semibold tracking-tight">{it.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{[isCourse ? it.duration : it.domain, isCourse ? it.mode : it.duration, it.fee].filter(Boolean).join(' · ')}</p>
                {isCourse && it.start_date && <p className="mt-1 text-xs font-semibold text-primary">Starts {fmtDate(it.start_date)}</p>}
                {it.description && <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{it.description}</p>}
                <div className="mt-5">
                  {e ? (
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm font-semibold text-foreground">{STATUS_LABEL[e.status]}</span>
                      {detail && <Link href={detail} className="text-sm font-semibold text-primary hover:underline">Open →</Link>}
                    </div>
                  ) : user ? (
                    <form action={action}>
                      <input type="hidden" name="id" value={it.id} />
                      <input type="hidden" name="back" value={back} />
                      <button type="submit" className="inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90">
                        {isCourse ? 'Enrol in this course' : 'Apply for this internship'}
                      </button>
                    </form>
                  ) : (
                    <Link href={`/login?next=${encodeURIComponent(back)}`} className="inline-flex w-full items-center justify-center rounded-md border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-secondary">
                      Sign in to {isCourse ? 'enrol' : 'apply'}
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        {!user && <p className="mt-5 text-sm text-muted-foreground">New here? <Link href="/register" className="font-semibold text-primary">Create a student account</Link> — it takes a minute.</p>}
      </Container>
    </section>
  );
};

export default OpenBatches;
