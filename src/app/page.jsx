import Page from '../views/Home';
import { getSettings } from '../lib/store';

export default async function Route() {
  const settings = await getSettings();
  return <Page settings={settings} />;
}
