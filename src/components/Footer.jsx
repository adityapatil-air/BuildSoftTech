import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { DISCLAIMER, IJEPA, SITE } from '../data/site';

const Footer = () => (
  <footer className="site-footer">
    <div className="footer-grid site-container">
      <div className="footer-about">
        <div className="footer-brand"><img src={logo} alt="" width="44" height="44" /><strong>BuildSoftTech</strong></div>
        <p className="footer-tagline">{SITE.tagline}</p>
        <p>Professional research publication support, research collaboration, internships and technology training services for researchers, academicians, students and institutions.</p>
      </div>
      <div>
        <h3>Quick Links</h3>
        <Link to="/about">About Us</Link>
        <Link to="/services">Services</Link>
        <Link to="/services/research-publication">Research Publication</Link>
        <Link to="/services/research-collaboration">SCI/Scopus Research</Link>
        <Link to="/internships">Internship</Link>
        <Link to="/courses">Training Courses</Link>
      </div>
      <div>
        <h3>Who We Serve</h3>
        <Link to="/for-faculty">Faculty Services</Link>
        <Link to="/for-students">Student Services</Link>
        <Link to="/for-research-scholars">Research Scholars</Link>
        <Link to="/for-institutions">Institutional Services</Link>
        <Link to="/research-areas">Research Areas</Link>
        <Link to="/contact">Contact Us</Link>
      </div>
      <div>
        <h3>Important Policies</h3>
        <Link to="/privacy-policy">Privacy Policy</Link>
        <Link to="/terms">Terms &amp; Conditions</Link>
        <Link to="/refund-policy">Refund &amp; Cancellation</Link>
        <Link to="/research-ethics">Research &amp; Publication Ethics</Link>
        <Link to="/authorship-policy">Authorship Policy</Link>
        <Link to="/disclaimer">Disclaimer</Link>
      </div>
      <div>
        <h3>Contact</h3>
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
        <a href={`tel:${SITE.phoneLink}`}>{SITE.phoneDisplay}</a>
        <span>Shop No 2, Snehankit Colony,<br />Karve Nagar, Pune-411052, India</span>
        <a href={IJEPA.url} target="_blank" rel="noreferrer">{IJEPA.name} — {IJEPA.fullName} ↗</a>
      </div>
    </div>
    <div className="footer-disclaimer site-container"><strong>Disclaimer:</strong> {DISCLAIMER}</div>
    <div className="copyright site-container">
      <span>© {new Date().getFullYear()} BuildSoftTech. All rights reserved. Publisher of {IJEPA.name} (ISSN {IJEPA.issn}).</span>
      <span><Link to="/privacy-policy">Privacy Policy</Link> &nbsp; | &nbsp; <Link to="/terms">Terms &amp; Conditions</Link> &nbsp; | &nbsp; <Link to="/disclaimer">Disclaimer</Link></span>
    </div>
  </footer>
);

export default Footer;
