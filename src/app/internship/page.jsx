import Page from '../../views/Internship';
import { getSettings } from '../../lib/store';
import OpenBatches from '../../components/OpenBatches';
import Flash from '../../components/Flash';

export const metadata = {
  title: 'Industry Internship Program',
  description: 'Internships of 45 days to 6 months on live projects with mentor reviews, an offer letter and a completion certificate with verification ID.',
};

export default async function Route({ searchParams }) {
  const settings = await getSettings();
  const notice = searchParams?.error || searchParams?.ok ? <div className="wrap" style={{ paddingTop: 24 }}><Flash searchParams={searchParams} /></div> : null;
  return <Page settings={settings} plan={String(searchParams?.plan || '')} batches={<>{notice}<OpenBatches kind="internship" back="/internship" alt={false} /></>} />;
}
