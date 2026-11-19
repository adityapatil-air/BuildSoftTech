import Page from '../views/Home';
import UpcomingBatches from '../components/UpcomingBatches';
import { getSettings } from '../lib/store';

export default async function Route() {
  const settings = await getSettings();
  return <Page settings={settings} upcoming={<UpcomingBatches />} />;
}
