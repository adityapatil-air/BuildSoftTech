import AdminLogin from '../../components/admin/AdminLogin';
import AdminDashboard from '../../components/admin/AdminDashboard';
import { isAdmin, isConfigured } from '../../lib/auth';
import { getSettings, storageBackend } from '../../lib/store';

export const metadata = {
  title: 'Admin',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  if (!isAdmin()) return <AdminLogin configured={isConfigured()} />;
  const settings = await getSettings();
  return <AdminDashboard initial={settings} backend={storageBackend()} />;
}
