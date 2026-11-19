import React from 'react';
import Link from 'next/link';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { Logo, waLink } from './ui';
import { IJEPA } from '../data/site';

const SOCIAL = {
  linkedin: ['LinkedIn', <path key="p" d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9V21H9z" />],
  youtube: ['YouTube', <path key="p" d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8zM9.8 15.1V8.9L15.5 12z" />],
  instagram: ['Instagram', <path key="p" d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm0 2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm5 3a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm5.5-3.3a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />],
  facebook: ['Facebook', <path key="p" d="M14 8V6c0-.9.6-1 1-1h3V1h-4c-3.3 0-4 2.4-4 4v3H7v4h3v11h4V12h3.5l.5-4z" />],
};

const WA_ICON = 'M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.2-.2-.5-.3z';

const Footer = ({ contact, social }) => {
  const links = Object.entries(SOCIAL).filter(([k]) => String(social?.[k] || '').startsWith('http'));
  const wa = waLink(contact.whatsapp);
  return (
    <>
      <footer className="site-footer">
        <div className="wrap">
          <div className="footer-grid">
            <div>
              <Logo />
              <p>Pune-based training and research support organisation helping students, professionals and academicians grow through industry-ready software training, internships and ethical publication guidance.</p>
              {links.length > 0 && (
                <div className="social">
                  {links.map(([k, [label, path]]) => (
                    <a key={k} href={social[k]} target="_blank" rel="noreferrer" aria-label={label}><svg viewBox="0 0 24 24" fill="currentColor">{path}</svg></a>
                  ))}
                </div>
              )}
            </div>
            <div>
              <h4>Training</h4>
              <ul>
                <li><Link href="/training#courses">Data Science</Link></li>
                <li><Link href="/training#courses">Data Engineering</Link></li>
                <li><Link href="/training#courses">Data Analytics</Link></li>
                <li><Link href="/training#courses">DevOps</Link></li>
                <li><Link href="/training#courses">Python &amp; Django</Link></li>
                <li><Link href="/internship">Internship</Link></li>
              </ul>
            </div>
            <div>
              <h4>Research</h4>
              <ul>
                <li><Link href="/research#journal">SCI / Scopus Journals</Link></li>
                <li><Link href="/research#conference">IEEE / Springer Conferences</Link></li>
                <li><Link href="/research#chapter">Book Chapters</Link></li>
                <li><Link href="/research#book">Books with ISBN</Link></li>
                <li><Link href="/patents">Patents</Link></li>
                <li><a href={IJEPA.url} target="_blank" rel="noreferrer">IJEPA Journal</a></li>
              </ul>
            </div>
            <div>
              <h4>Contact</h4>
              <ul>
                {contact.address && <li><MapPin width={15} height={15} aria-hidden="true" /> <span>{contact.address}</span></li>}
                {contact.phoneDisplay && <li><Phone width={15} height={15} aria-hidden="true" /> <a href={`tel:${contact.phoneLink}`}>{contact.phoneDisplay}</a></li>}
                {contact.email && <li><Mail width={15} height={15} aria-hidden="true" /> <a href={`mailto:${contact.email}`}>{contact.email}</a></li>}
                {contact.hours && <li><Clock width={15} height={15} aria-hidden="true" /> <span>{contact.hours}</span></li>}
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>&copy; {new Date().getFullYear()} BuildSoftTech. All rights reserved.</span>
            <span>
              <Link href="/policies#ethics">Publication Ethics</Link> &middot; <Link href="/policies#disclaimer">Disclaimer</Link> &middot;{' '}
              <Link href="/policies#privacy">Privacy</Link> &middot; <Link href="/policies#refund">Refund</Link> &middot;{' '}
              <Link href="/policies#terms">Terms</Link> &middot; <Link href="/certificates">Verify a certificate</Link>
            </span>
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
