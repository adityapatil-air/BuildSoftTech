import { Inter } from 'next/font/google';
import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import { getSettings } from '../lib/store';
import { getSession } from '../lib/session';

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800', '900'], display: 'swap' });

export const metadata = {
  metadataBase: new URL('https://buildsofttech.vercel.app'),
  title: {
    default: 'BuildSoftTech — Research · Publication · Training · Technology',
    template: '%s | BuildSoftTech',
  },
  description: 'BuildSoftTech — professional research publication support, SCI/Scopus research collaboration, internships and technology training for researchers, faculty, students and institutions.',
  icons: { icon: '/logo.png', apple: '/logo.png' },
  openGraph: {
    type: 'website',
    title: 'BuildSoftTech — Research · Publication · Training · Technology',
    description: 'Research publication support, research collaboration, internships and technology training services.',
    images: ['/logo.png'],
  },
  robots: { index: true, follow: true },
};

export const dynamic = 'force-dynamic';

export const viewport = { themeColor: '#3f1e0c', width: 'device-width', initialScale: 1 };

export default async function RootLayout({ children }) {
  const [{ contact }, session] = await Promise.all([getSettings(), getSession()]);
  return (
    <html lang="en" className={inter.className}>
      <body>
        <div className="app-shell">
          <a href="#main-content" className="skip-link">Skip to main content</a>
          <Header contact={contact} user={session.user ? { email: session.user.email } : null} profile={session.profile ? { full_name: session.profile.full_name, role: session.profile.role } : null} />
          <main id="main-content" tabIndex={-1}>{children}</main>
          <Footer contact={contact} />
          <BackToTop />
        </div>
      </body>
    </html>
  );
}
