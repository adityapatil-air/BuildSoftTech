import Link from 'next/link';
import InternshipForm from '../../../../components/admin/InternshipForm';
import Flash from '../../../../components/Flash';

export const metadata = { title: 'Admin · New internship', robots: { index: false } };
export const dynamic = 'force-dynamic';

export default function NewInternship({ searchParams }) {
  return (
    <>
      <p className="form-hint"><Link href="/admin/internships">← All internships</Link></p>
      <div className="admin-toolbar"><h1>New internship</h1></div>
      <Flash searchParams={searchParams} />
      <InternshipForm />
    </>
  );
}
