import Page from '../../views/Books';
import { getSettings } from '../../lib/store';

export const metadata = {
  title: 'Become an Author',
  description: 'Books with ISBN that are open for authors. See the price and contact BuildSoftTech by phone, email or WhatsApp to join.',
};

export default async function Route() {
  const settings = await getSettings();
  return <Page settings={settings} />;
}
