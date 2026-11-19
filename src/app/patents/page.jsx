import Page from '../../views/Patents';
import { getSettings } from '../../lib/store';

export const metadata = {
  title: 'Patent Filing & Grant Support',
  description: 'Patentability search, drafting, filing through registered patent agents, early publication, examination and FER response support in India.',
};

export default async function Route() {
  return <Page settings={await getSettings()} />;
}
