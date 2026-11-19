import React from 'react';
import Link from 'next/link';
import { getSession } from '../lib/session';
import { fmtDate } from '../lib/forms';
import { Note, Section, SectionHead, Table } from './ui';

// Home page "Upcoming batches" table, from the courses the admin has opened.
const UpcomingBatches = async () => {
  const { supabase } = await getSession();
  const { data } = supabase
    ? await supabase.from('courses').select('id, title, mode, duration, start_date').eq('status', 'open').order('start_date', { ascending: true, nullsFirst: false }).limit(6)
    : { data: null };
  const rows = data || [];

  return (
    <Section tone="secondary">
      <SectionHead eyebrow="Upcoming batches" title="Start this month" />
      <div className="mt-8">
        {rows.length ? (
          <Table
            head={['Course', 'Mode', 'Start date', 'Duration', '']}
            rows={rows.map((r) => [
              <strong key="t" className="font-semibold text-foreground">{r.title}</strong>,
              r.mode || '—',
              <span key="d" className="whitespace-nowrap">{r.start_date ? fmtDate(r.start_date) : 'To be announced'}</span>,
              r.duration || '—',
              <Link key="e" href="/training#batches" className="font-semibold text-primary hover:underline">Enroll →</Link>,
            ])}
          />
        ) : (
          <Note>New weekday and weekend batches start every month. <Link href="/training#enquiry" className="font-semibold text-primary hover:underline">Ask for the next start date</Link> and we will call you back.</Note>
        )}
      </div>
    </Section>
  );
};

export default UpcomingBatches;
