import React from 'react';
import Link from 'next/link';
import { Logo, waLink } from './ui';
import { IJEPA } from '../data/site';

const SOCIAL = {
  linkedin: ['LinkedIn', <path key="p" d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9V21H9z" />],
  youtube: ['YouTube', <path key="p" d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8zM9.8 15.1V8.9L15.5 12z" />],
  instagram: ['Instagram', <path key="p" d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm0 2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm5 3a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm5.5-3.3a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />],
  facebook: ['Facebook', <path key="p" d="M14 8V6c0-.9.6-1 1-1h3V1h-4c-3.3 0-4 2.4-4 4v3H7v4h3v11h4V12h3.5l.5-4z" />],
};

const WA_ICON = 'M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.2-.2-.5-.3z';

const COLS = [
  {
    title: 'Training',
    links: [
      ['/training#courses', 'Data Science'],
      ['/training#courses', 'Data Engineering'],
      ['/training#courses', 'Data Analytics'],
      ['/training#courses', 'DevOps'],
      ['/training#courses', 'Python & Django'],
      ['/internship', 'Internship'],
    ],
  },
  {
    title: 'Research',
    links: [
      ['/research#journal', 'SCI / Scopus Journals'],
      ['/research#conference', 'IEEE / Springer Conferences'],
      ['/research#chapter', 'Book Chapters'],
      ['/research#book', 'Books with ISBN'],
      ['/books', 'Become an author'],
      ['/patents', 'Patents'],
      [IJEPA.url, 'IJEPA Journal ↗'],
    ],
  },
  {
    title: 'Policies',
    links: [
      ['/policies#ethics', 'Publication Ethics'],
      ['/policies#disclaimer', 'Disclaimer'],
      ['/policies#privacy', 'Privacy Policy'],
      ['/policies#refund', 'Refund & Cancellation'],
      ['/policies#terms', 'Terms & Conditions'],
      ['/certificates', 'Verify a certificate'],
    ],
  },
];

const Footer = ({ contact, social }) => {
  const links = Object.entries(SOCIAL).filter(([k]) => String(social?.[k] || '').startsWith('http'));
  const wa = waLink(contact.whatsapp);
  return (
    <>
      <footer className="border-t border-border bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Logo onDark />
            <p className="mt-4 max-w-xs text-sm leading-relaxed opacity-80">
              Pune-based training and research support organisation helping students, professionals and academicians grow through industry-ready software training, internships and ethical publication guidance.
            </p>
            <ul className="mt-5 space-y-2 text-sm opacity-90">
              {contact.email && <li><a href={`mailto:${contact.email}`} className="hover:underline">{contact.email}</a></li>}
              {contact.phoneDisplay && <li><a href={`tel:${contact.phoneLink}`} className="hover:underline">{contact.phoneDisplay}</a></li>}
              {contact.address && <li className="opacity-80">{contact.address}</li>}
              {contact.hours && <li className="opacity-80">{contact.hours}</li>}
            </ul>
            {links.length > 0 && (
              <div className="mt-5 flex gap-2">
                {links.map(([k, [label, path]]) => (
                  <a key={k} href={social[k]} target="_blank" rel="noreferrer" aria-label={label} className="grid h-9 w-9 place-items-center rounded-md border border-primary-foreground/25 hover:bg-primary-foreground/10">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true">{path}</svg>
                  </a>
                ))}
              </div>
            )}
          </div>
          {COLS.map((col) => (
            <div key={col.title}>
              <p className="text-sm font-semibold uppercase tracking-wider opacity-90">{col.title}</p>
              <ul className="mt-4 space-y-2 text-sm opacity-90">
                {col.links.map(([href, label]) => (
                  <li key={label}>
                    {href.startsWith('http')
                      ? <a href={href} target="_blank" rel="noreferrer" className="hover:underline">{label}</a>
                      : <Link href={href} className="hover:underline">{label}</Link>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-primary-foreground/15">
          <p className="mx-auto max-w-6xl px-4 py-5 text-xs leading-relaxed opacity-70 sm:px-6">
            <strong className="font-semibold">Disclaimer:</strong> BuildSoftTech provides guidance, training and editorial support. Acceptance is decided by journals, conferences and publishers, and patent grants by the Patent Office. Placement assistance does not guarantee employment.
          </p>
        </div>
        <div className="border-t border-primary-foreground/15">
          <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-2 px-4 py-4 text-xs opacity-70 sm:px-6">
            <span>© {new Date().getFullYear()} BuildSoftTech. All rights reserved.</span>
            <Link href="/login" className="hover:underline">Student login</Link>
          </div>
        </div>
      </footer>
      {wa && (
        <a className="float-wa" href={wa} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={WA_ICON} /></svg>
        </a>
      )}
    </>
  );
};

export default Footer;
