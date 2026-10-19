import Page from '../../views/Internships';
import { getSettings } from '../../lib/store';
import OpenBatches from '../../components/OpenBatches';
import Flash from '../../components/Flash';

export const metadata = {
  title: '45-Day Paid Internship Program',
  description: '45 days of practical training, a guided project, mentoring and an Internship Completion Certificate for ₹3,000/-.',
};

export default async function Route({ searchParams }) {
  const settings = await getSettings();
  const notice = searchParams?.error ? <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6"><Flash searchParams={searchParams} /></div> : null;
  return <Page settings={settings} batches={<>{notice}<OpenBatches kind="internship" back="/internships" /></>} />;
}
