import Link from 'next/link';
import CourseForm from '../../../../components/admin/CourseForm';
import Flash from '../../../../components/Flash';

export const metadata = { title: 'Admin · New course', robots: { index: false } };
export const dynamic = 'force-dynamic';

export default function NewCourse({ searchParams }) {
  return (
    <>
      <p className="form-hint"><Link href="/admin/courses">← All courses</Link></p>
      <div className="admin-toolbar"><h1>New course</h1></div>
      <Flash searchParams={searchParams} />
      <CourseForm />
    </>
  );
}
