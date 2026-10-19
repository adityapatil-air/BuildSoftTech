import AdminDashboard from '../../components/admin/AdminDashboard';
import { getSettings, storageBackend } from '../../lib/store';

export const metadata = { title: 'Admin · Site settings', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const settings = await getSettings();
  return <AdminDashboard initial={settings} backend={storageBackend()} />;
}
