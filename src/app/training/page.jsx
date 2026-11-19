import Page from '../../views/Training';
import { getSettings } from '../../lib/store';
import OpenBatches from '../../components/OpenBatches';
import Flash from '../../components/Flash';

export const metadata = {
  title: 'Software Training Programs',
  description: 'Data Science, Data Engineering, Data Analytics, DevOps, Python and Django training in Pune. Online, classroom, weekend and fast-track batches.',
};

export default async function Route({ searchParams }) {
  const settings = await getSettings();
  const notice = searchParams?.error || searchParams?.ok ? <div className="wrap" style={{ paddingTop: 24 }}><Flash searchParams={searchParams} /></div> : null;
  return <Page settings={settings} course={String(searchParams?.course || '')} batches={<>{notice}<OpenBatches kind="course" back="/training" /></>} />;
}
