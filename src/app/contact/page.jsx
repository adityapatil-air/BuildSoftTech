import Page from '../../views/Contact';
import { getSettings } from '../../lib/store';

export const metadata = {
  title: 'Contact Us',
  description: 'Email, phone and office address for BuildSoftTech, Pune.',
};

export default async function Route() {
  const settings = await getSettings();
  return <Page settings={settings} />;
}
