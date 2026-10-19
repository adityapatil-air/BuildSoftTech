import Link from 'next/link';
import { BadgeCheck, ShieldX } from 'lucide-react';
import PrintButton from '../../../components/PrintButton';
import { createSupabaseServer } from '../../../lib/supabase/server';
import { IJEPA } from '../../../data/site';

export const dynamic = 'force-dynamic';

const NUMBER_RE = /^BST-[CI]-\d{4}-\d{3,6}$/;

export async function generateMetadata({ params }) {
  return { title: `Certificate ${params.number}`, robots: { index: false, follow: false } };
}

const fmt = (d) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

export default async function CertificatePage({ params }) {
  const number = decodeURIComponent(params.number || '').toUpperCase();
  let cert = null;
  if (NUMBER_RE.test(number)) {
    const supabase = createSupabaseServer();
    const { data } = supabase ? await supabase.rpc('verify_certificate', { p_no: number }) : { data: null };
    cert = data?.[0] || null;
  }

  if (!cert) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <ShieldX className="mx-auto h-12 w-12 text-destructive" />
        <h1 className="mt-4 font-display text-3xl font-semibold">Certificate not found</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          No BuildSoftTech certificate matches <strong className="text-foreground">{number || 'this number'}</strong>. Check the number printed on the certificate, or write to us if you think this is a mistake.
        </p>
        <Link href="/contact" className="mt-6 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Contact us</Link>
      </div>
    );
  }

  const isCourse = cert.kind === 'course';
  const verifyUrl = `buildsofttechin.vercel.app/certificates/${cert.certificate_no}`;

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <div className="no-print mb-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-success/30 bg-success/10 px-5 py-4">
        <p className="flex items-center gap-2 text-sm font-semibold text-success">
          <BadgeCheck className="h-5 w-5" /> Valid certificate — issued by BuildSoftTech on {fmt(cert.issued_at)}
        </p>
        <PrintButton />
      </div>

      <article className="certificate paper-card relative overflow-hidden rounded-2xl p-8 sm:p-14">
        <div className="pointer-events-none absolute inset-3 rounded-xl border-2 border-accent/50" />
        <div className="relative text-center">
          <img src="/logo.png" alt="" width="72" height="72" className="mx-auto h-[72px] w-[72px] rounded-full" />
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">BuildSoftTech · Publisher of {IJEPA.name}</p>
          <h1 className="mt-6 font-display text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
            {isCourse ? 'Certificate of Course Completion' : 'Internship Completion Certificate'}
          </h1>
          <p className="mt-8 text-sm text-muted-foreground">This is to certify that</p>
          <p className="mt-3 font-display text-3xl font-semibold text-foreground sm:text-4xl">{cert.student_name || 'the participant'}</p>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground">
            has successfully completed the {isCourse ? 'course' : 'internship program'}
          </p>
          <p className="mt-2 font-display text-xl font-semibold text-foreground sm:text-2xl">{cert.title}</p>
          <p className="mt-2 text-sm text-muted-foreground">conducted by BuildSoftTech, Pune.</p>

          <div className="mt-12 grid gap-6 text-sm sm:grid-cols-3">
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Date of issue</p>
              <p className="mt-1 font-semibold">{fmt(cert.issued_at)}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Certificate no.</p>
              <p className="mt-1 font-mono font-semibold">{cert.certificate_no}</p>
            </div>
            <div>
              <div className="mx-auto mb-1 w-40 border-b border-foreground/40" />
              <p className="font-semibold">Authorised signatory</p>
              <p className="text-xs text-muted-foreground">BuildSoftTech</p>
            </div>
          </div>
          <p className="mt-10 text-xs text-muted-foreground">Verify at {verifyUrl}</p>
        </div>
      </article>
    </div>
  );
}
