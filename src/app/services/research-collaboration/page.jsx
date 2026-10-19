import Page from '../../../views/ResearchCollaboration';
import { getSettings } from '../../../lib/store';

export const metadata = {
  title: 'SCI / Scopus Research Collaboration',
  description: 'Contribution-based research collaboration and publication support toward SCI/SCIE or Scopus-indexed journals.',
};

export default async function Route() {
  const settings = await getSettings();
  return <Page settings={settings} />;
}
