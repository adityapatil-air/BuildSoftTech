import Page from '../../views/Contact';
import { getSettings } from '../../lib/store';

export const metadata = {
  title: 'Contact Us',
  description: 'Questions about courses, internships or research support? Call, email or send a message to BuildSoftTech, Pune.',
};

export default async function Route({ searchParams }) {
  const settings = await getSettings();
  return <Page settings={settings} service={String(searchParams?.service || '')} />;
}
