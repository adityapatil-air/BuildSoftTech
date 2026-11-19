import React from 'react';
import Link from 'next/link';
import { getSession } from '../lib/session';
import { fmtDate } from '../lib/forms';

// Home page "Upcoming batches" table, from the courses the admin has opened.
const UpcomingBatches = async () => {
  const { supabase } = await getSession();
  const { data } = supabase
    ? await supabase.from('courses').select('id, title, mode, duration, start_date').eq('status', 'open').order('start_date', { ascending: true, nullsFirst: false }).limit(6)
    : { data: null };
  const rows = data || [];

  return (
    <section className="section alt">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">Upcoming batches</span>
          <h2>Start this month</h2>
        </div>
        {rows.length ? (
          <div className="table-wrap">
            <table>
              <thead><tr><th>Course</th><th>Mode</th><th>Start date</th><th>Duration</th><th /></tr></thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id}>
                    <td><b>{r.title}</b></td>
                    <td>{r.mode || '—'}</td>
                    <td className="num">{r.start_date ? fmtDate(r.start_date) : 'To be announced'}</td>
                    <td>{r.duration || '—'}</td>
                    <td><Link className="btn btn-outline btn-sm" href="/training#batches">Enroll</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="note info">New weekday and weekend batches start every month. <Link href="/training#enquiry">Ask for the next start date</Link> and we will call you back.</p>
        )}
      </div>
    </section>
  );
};

export default UpcomingBatches;
