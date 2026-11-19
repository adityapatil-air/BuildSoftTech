import Page from '../../views/Policies';
import { getSettings } from '../../lib/store';

export const metadata = {
  title: 'Policies',
  description: 'Publication ethics, disclaimer, privacy, refund and cancellation, and terms and conditions.',
};

export default async function Route() {
  return <Page settings={await getSettings()} />;
}
