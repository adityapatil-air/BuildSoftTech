import Page from '../../views/Internships';
import { getSettings } from '../../lib/store';

export const metadata = {
  title: '45-Day Paid Internship Program',
  description: '45 days of practical training, a guided project, mentoring and an Internship Completion Certificate for ₹3,000/-.',
};

export default async function Route() {
  const settings = await getSettings();
  return <Page settings={settings} />;
}
