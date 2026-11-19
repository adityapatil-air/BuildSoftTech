import { Nunito_Sans, Sora } from 'next/font/google';
import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getSettings } from '../lib/store';
import { getSession } from '../lib/session';

const sora = Sora({ subsets: ['latin'], weight: ['600', '700', '800'], variable: '--font-sora', display: 'swap' });
const nunito = Nunito_Sans({ subsets: ['latin'], weight: ['400', '600', '700'], variable: '--font-nunito', display: 'swap' });

export const metadata = {
  metadataBase: new URL('https://buildsofttechin.vercel.app'),
  title: {
    default: 'BuildSoftTech – Software Training & Research Support, Pune',
    template: '%s | BuildSoftTech',
  },
  description: 'Data Science, DevOps, Python and Django training, paid internships, and journal, conference, book and patent publication support in Pune.',
  openGraph: {
    type: 'website',
    title: 'BuildSoftTech – Software Training & Research Support, Pune',
    description: 'Job-oriented software training, certified internships, and research publication and patent support in Pune.',
    images: ['/hero.jpg'],
  },
  robots: { index: true, follow: true },
};

export const dynamic = 'force-dynamic';

export const viewport = { themeColor: '#0f1b3d', width: 'device-width', initialScale: 1 };

export default async function RootLayout({ children }) {
  const [{ contact, social, topbar }, session] = await Promise.all([getSettings(), getSession()]);
  return (
    <html lang="en" className={`${sora.variable} ${nunito.variable}`}>
      <body>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <div className="flex min-h-screen flex-col">
          <Header
            contact={contact}
            topbar={topbar}
            user={session.user ? { email: session.user.email } : null}
            profile={session.profile ? { full_name: session.profile.full_name, role: session.profile.role } : null}
          />
          <main id="main-content" tabIndex={-1} className="flex-1">{children}</main>
          <Footer contact={contact} social={social} />
        </div>
      </body>
    </html>
  );
}
