import React from 'react';
import Link from 'next/link';
import { DISCLAIMER, IJEPA, SITE } from '../data/site';

const COLS = [
  {
    title: 'Services',
    links: [
      ['/services/research-publication', 'Journal Publication'],
      ['/courses', 'Software Classes'],
      ['/internships', 'Internship & Training'],
      ['/services/research-collaboration', 'SCI/Scopus Research Collaboration'],
      ['/services/research-support', 'Research Support'],
      ['/for-institutions', 'Institutional Programs'],
    ],
  },
  {
    title: 'About',
    links: [
      ['/about', 'About BuildSoftTech'],
      ['/research-areas', 'Research Areas'],
      ['/for-faculty', 'For Faculty'],
      ['/for-students', 'For Students'],
      ['/for-research-scholars', 'For Research Scholars'],
      ['/faq', 'FAQ'],
    ],
  },
  {
    title: 'Policies',
    links: [
      ['/privacy-policy', 'Privacy Policy'],
      ['/terms', 'Terms & Conditions'],
      ['/refund-policy', 'Refund & Cancellation'],
      ['/research-ethics', 'Research & Publication Ethics'],
      ['/authorship-policy', 'Authorship Policy'],
      ['/disclaimer', 'Disclaimer'],
    ],
  },
];

const Footer = ({ contact }) => {
  const c = { ...SITE, ...(contact || {}) };
  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <p className="font-display text-xl font-semibold">BuildSoftTech</p>
          <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.14em] opacity-70">{SITE.tagline}</p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed opacity-80">
            Research publication support, research collaboration, internships and technology training for researchers, academicians, students and institutions.
          </p>
          <ul className="mt-5 space-y-2 text-sm opacity-90">
            <li><a href={`mailto:${c.email}`} className="hover:underline">{c.email}</a></li>
            <li><a href={`tel:${c.phoneLink}`} className="hover:underline">{c.phoneDisplay}</a></li>
            <li className="opacity-80">{c.address}</li>
            <li><a href={IJEPA.url} target="_blank" rel="noreferrer" className="hover:underline">ijepa.vercel.app — journal portal ↗</a></li>
          </ul>
        </div>
        {COLS.map((col) => (
          <div key={col.title}>
            <p className="text-sm font-semibold uppercase tracking-wider opacity-90">{col.title}</p>
            <ul className="mt-4 space-y-2 text-sm opacity-90">
              {col.links.map(([href, label]) => <li key={href}><Link href={href} className="hover:underline">{label}</Link></li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-primary-foreground/15">
        <p className="mx-auto max-w-6xl px-4 py-5 text-xs leading-relaxed opacity-70 sm:px-6">
          <strong className="font-semibold">Disclaimer:</strong> {DISCLAIMER}
        </p>
      </div>
      <div className="border-t border-primary-foreground/15">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-2 px-4 py-4 text-xs opacity-70 sm:px-6">
          <span>© {new Date().getFullYear()} BuildSoftTech · Publisher of {IJEPA.fullName} ({IJEPA.name}), ISSN {IJEPA.issn}</span>
          <Link href="/login" className="hover:underline">Student login</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
