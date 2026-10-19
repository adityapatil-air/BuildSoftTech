import Page from '../../views/Courses';
import { getSettings } from '../../lib/store';

export const metadata = {
  title: 'Software Training & Technology Courses',
  description: 'Hands-on training in Python, Data Science, AI/ML, Full Stack, Cloud & DevOps and Cybersecurity.',
};

export default async function Route() {
  const settings = await getSettings();
  return <Page settings={settings} />;
}
