import Page from '../../views/Research';
import { getSettings } from '../../lib/store';

export const metadata = {
  title: 'Research & Publication Support',
  description: 'Guidance for SCI / Scopus journals, IEEE and Springer conferences, book chapters and books with ISBN, from manuscript to reviewer response.',
};

export default async function Route() {
  return <Page settings={await getSettings()} />;
}
