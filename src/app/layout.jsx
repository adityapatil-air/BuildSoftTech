import { Fraunces, Work_Sans } from 'next/font/google';
import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getSettings } from '../lib/store';
import { getSession } from '../lib/session';

const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-fraunces', display: 'swap', axes: ['opsz'] });
const workSans = Work_Sans({ subsets: ['latin'], variable: '--font-work-sans', display: 'swap' });

export const metadata = {
  metadataBase: new URL('https://buildsofttechin.vercel.app'),
  title: {
    default: 'BuildSoftTech — Research · Publication · Training · Technology',
    template: '%s | BuildSoftTech',
  },
  description: 'BuildSoftTech: IJEPA journal publication support, SCI/Scopus research collaboration, software classes and internships for researchers, faculty, students and institutions.',
  icons: { icon: '/logo.png', apple: '/logo.png' },
  openGraph: {
    type: 'website',
    title: 'BuildSoftTech — Research · Publication · Training · Technology',
    description: 'Journal publication support, research collaboration, software classes and internships.',
    images: ['/hero.jpg'],
  },
  robots: { index: true, follow: true },
};

export const dynamic = 'force-dynamic';

export const viewport = { themeColor: '#1d2f55', width: 'device-width', initialScale: 1 };

export default async function RootLayout({ children }) {
  const [{ contact }, session] = await Promise.all([getSettings(), getSession()]);
  return (
    <html lang="en" className={`${fraunces.variable} ${workSans.variable}`}>
      <body>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <div className="flex min-h-screen flex-col bg-background text-foreground">
          <Header
            user={session.user ? { email: session.user.email } : null}
            profile={session.profile ? { full_name: session.profile.full_name, role: session.profile.role } : null}
          />
          <main id="main-content" tabIndex={-1} className="flex-1">{children}</main>
          <Footer contact={contact} />
        </div>
      </body>
    </html>
  );
}
