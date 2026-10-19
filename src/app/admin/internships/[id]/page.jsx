import Link from 'next/link';
import { notFound } from 'next/navigation';
import EnrollmentTable from '../../../../components/admin/EnrollmentTable';
import InternshipForm from '../../../../components/admin/InternshipForm';
import ConfirmButton from '../../../../components/ConfirmButton';
import Flash from '../../../../components/Flash';
import { deleteInternship } from '../../actions';
import { requireAdmin } from '../../../../lib/session';
import { fmtDate, isUuid } from '../../../../lib/forms';

export const metadata = { title: 'Admin · Manage internship', robots: { index: false } };
export const dynamic = 'force-dynamic';

export default async function ManageInternship({ params, searchParams }) {
  if (!isUuid(params.id)) notFound();
  const { supabase } = await requireAdmin(`/admin/internships/${params.id}`);
  const page = `/admin/internships/${params.id}`;

  const [{ data: internship }, { data: enrollments }] = await Promise.all([
    supabase.from('internships').select('*').eq('id', params.id).maybeSingle(),
    supabase.from('internship_enrollments').select('id, status, enrolled_at, completed_at, weeks_total, student:profiles(full_name, email, phone, institution), internship_reviews(reviewed)').eq('internship_id', params.id).order('enrolled_at'),
  ]);
  if (!internship) notFound();

  const ids = (enrollments || []).map((e) => e.id);
  const { data: certs } = ids.length
    ? await supabase.from('certificates').select('id, certificate_no, issued_at, enrollment_id').eq('kind', 'internship').in('enrollment_id', ids)
    : { data: [] };
  const rows = (enrollments || []).map((e) => {
    const done = (e.internship_reviews || []).filter((r) => r.reviewed).length;
    return {
      ...e,
      certificate: (certs || []).find((c) => c.enrollment_id === e.id),
      student: { ...e.student, institution: [e.student?.institution, `${done}/${e.weeks_total} weeks reviewed`].filter(Boolean).join(' · ') },
    };
  });

  return (
    <>
      <p className="form-hint"><Link href="/admin/internships">← All internships</Link></p>
      <div className="admin-toolbar">
        <h1>{internship.title}</h1>
        <span className="tag">{internship.status}</span>
      </div>
      <Flash searchParams={searchParams} />

      <EnrollmentTable kind="internship" rows={rows} parentId={internship.id} back={page} manageHref={(r) => `${page}/${r.id}`} />

      <InternshipForm internship={internship} title="Internship details" note={`Created ${fmtDate(internship.created_at)}`} />

      <form action={deleteInternship} className="row-actions">
        <input type="hidden" name="id" value={internship.id} />
        <ConfirmButton message="Delete this internship with all its student records and weekly reviews? Issued certificates stay valid.">Delete internship</ConfirmButton>
      </form>
    </>
  );
}
