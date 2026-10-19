import React from 'react';
import Link from 'next/link';
import { DISCLAIMER, IJEPA, SITE } from '../data/site';

const Footer = ({ contact }) => {
  const c = { ...SITE, ...(contact || {}) };
  return (
  <footer className="site-footer">
    <div className="footer-grid site-container">
      <div className="footer-about">
        <div className="footer-brand"><img src="/logo.png" alt="" width="44" height="44" /><strong>BuildSoftTech</strong></div>
        <p className="footer-tagline">{SITE.tagline}</p>
        <p>Professional research publication support, research collaboration, internships and technology training services for researchers, academicians, students and institutions.</p>
      </div>
      <div>
        <h3>Quick Links</h3>
        <Link href="/about">About Us</Link>
        <Link href="/services">Services</Link>
        <Link href="/services/research-publication">Research Publication</Link>
        <Link href="/services/research-collaboration">SCI/Scopus Research</Link>
        <Link href="/internships">Internship</Link>
        <Link href="/courses">Training Courses</Link>
      </div>
      <div>
        <h3>Who We Serve</h3>
        <Link href="/for-faculty">Faculty Services</Link>
        <Link href="/for-students">Student Services</Link>
        <Link href="/for-research-scholars">Research Scholars</Link>
        <Link href="/for-institutions">Institutional Services</Link>
        <Link href="/research-areas">Research Areas</Link>
        <Link href="/contact">Contact Us</Link>
      </div>
      <div>
        <h3>Important Policies</h3>
        <Link href="/privacy-policy">Privacy Policy</Link>
        <Link href="/terms">Terms &amp; Conditions</Link>
        <Link href="/refund-policy">Refund &amp; Cancellation</Link>
        <Link href="/research-ethics">Research &amp; Publication Ethics</Link>
        <Link href="/authorship-policy">Authorship Policy</Link>
        <Link href="/disclaimer">Disclaimer</Link>
      </div>
      <div>
        <h3>Contact</h3>
        <a href={`mailto:${c.email}`}>{c.email}</a>
        <a href={`tel:${c.phoneLink}`}>{c.phoneDisplay}</a>
        <span>{c.address}</span>
        <a href={IJEPA.url} target="_blank" rel="noreferrer">{IJEPA.name} — {IJEPA.fullName} ↗</a>
      </div>
    </div>
    <div className="footer-disclaimer site-container"><strong>Disclaimer:</strong> {DISCLAIMER}</div>
    <div className="copyright site-container">
      <span>© {new Date().getFullYear()} BuildSoftTech. All rights reserved. Publisher of {IJEPA.name} (ISSN {IJEPA.issn}).</span>
      <span><Link href="/privacy-policy">Privacy Policy</Link> &nbsp; | &nbsp; <Link href="/terms">Terms &amp; Conditions</Link> &nbsp; | &nbsp; <Link href="/disclaimer">Disclaimer</Link> &nbsp; | &nbsp; <Link href="/login">Student login</Link></span>
    </div>
  </footer>
  );
};

export default Footer;
