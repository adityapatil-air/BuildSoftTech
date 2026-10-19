import Page from '../../views/Courses';
import { getSettings } from '../../lib/store';
import OpenBatches from '../../components/OpenBatches';
import Flash from '../../components/Flash';

export const metadata = {
  title: 'Software Training & Technology Courses',
  description: 'Hands-on training in Python, Data Science, AI/ML, Full Stack, Cloud & DevOps and Cybersecurity.',
};

export default async function Route({ searchParams }) {
  const settings = await getSettings();
  const notice = searchParams?.error ? <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6"><Flash searchParams={searchParams} /></div> : null;
  return <Page settings={settings} batches={<>{notice}<OpenBatches kind="course" back="/courses" /></>} />;
}
