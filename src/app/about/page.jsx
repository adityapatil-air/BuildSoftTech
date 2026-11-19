import Page from '../../views/About';
import { getSettings } from '../../lib/store';

export const metadata = {
  title: 'About Us',
  description: 'A Pune-based training and research support organisation helping learners and researchers build skills, gain project experience and publish ethically.',
};

export default async function Route() {
  return <Page settings={await getSettings()} />;
}
