import React from 'react';
import Icon from '../components/Icon';
import { PageBanner } from '../components/shared';
import { IJEPA, SITE } from '../data/site';

const Contact = ({ settings }) => {
  const c = { ...SITE, hours: 'Mon–Sat, 10:00 AM – 6:00 PM IST', ...(settings?.contact || {}) };
  const mailto = (subject) => `mailto:${c.email}?subject=${encodeURIComponent(subject)}`;
  return (
  <div className="contact-page">
    <PageBanner eyebrow="Get in touch" title="Contact Us" intro="Write to us or call our office for research publication, collaboration, internships, training and institutional programs." />

    <div className="page-body site-container">
      <p>BuildSoftTech values communication with researchers, faculty members, students and institutions. Reach out for any query related to our services, fees, batches or collaboration opportunities, and our coordinator will get back to you.</p>

      <div className="contact-cards cols-2">
        <a className="contact-card" href={mailto('Enquiry — BuildSoftTech services')}>
          <span className="contact-card-icon" aria-hidden="true"><Icon name="mail" size={22} /></span>
          <span className="contact-card-label">Email</span>
          <strong>{c.email}</strong>
          <span className="contact-card-hint">Best for research, publication and institutional enquiries</span>
        </a>
        <a className="contact-card" href={`tel:${c.phoneLink}`}>
          <span className="contact-card-icon" aria-hidden="true"><Icon name="phone" size={22} /></span>
          <span className="contact-card-label">Phone</span>
          <strong>{c.phoneDisplay}</strong>
          <span className="contact-card-hint">{c.hours}</span>
        </a>
      </div>

      <div className="two-col">
        <div className="page-card">
          <h3>Office</h3>
          <p style={{ margin: '0 0 4px' }}><strong>BuildSoftTech</strong></p>
          <p style={{ margin: '0 0 4px' }}><Icon name="pin" size={14} /> {c.address}</p>
          <p style={{ margin: '0 0 4px' }}>Email: <a href={`mailto:${c.email}`}>{c.email}</a></p>
          <p style={{ margin: '0 0 4px' }}>Phone: <a href={`tel:${c.phoneLink}`}>{c.phoneDisplay}</a></p>
          <p style={{ margin: 0 }}>Journal: <a href={IJEPA.url} target="_blank" rel="noreferrer">{IJEPA.name} — {IJEPA.fullName}</a></p>
        </div>
        <div className="page-card">
          <h3>What to include in your email</h3>
          <h4><span className="dot" />Researchers &amp; Faculty</h4>
          <ul><li>Your research area and a short description of the topic</li><li>Whether you need publication support through {IJEPA.name}, SCI/Scopus collaboration or implementation help</li></ul>
          <h4><span className="dot" />Students</h4>
          <ul><li>Course or internship domain of interest and preferred batch timing</li><li>Your degree, year and institution</li></ul>
          <h4><span className="dot" />Institutions</h4>
          <ul style={{ marginBottom: 0 }}><li>Program type (FDP, bootcamp, workshop), audience size and tentative dates</li></ul>
        </div>
      </div>

      <h2>Quick email links</h2>
      <div className="row-actions">
        <a className="button button-primary" href={mailto('Research publication / collaboration enquiry')}>Research Enquiry <Icon name="mail" size={15} /></a>
        <a className="button button-light" href={mailto('45-Day Internship Program — application')}>Apply for Internship</a>
        <a className="button button-light" href={mailto('Software training course enquiry')}>Join a Training Program</a>
        <a className="button button-light" href={mailto('Institutional program proposal request')}>Institutional Proposal</a>
      </div>

      <div className="contact-note">We aim to respond to all enquiries within <strong>2–3 business days</strong>. Please mention your name, institution and the service you are interested in.</div>
    </div>
  </div>
  );
};

export default Contact;
