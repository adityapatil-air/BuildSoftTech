import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon';
import { PageBanner, WhatsAppButton } from '../components/shared';
import { IJEPA, SITE, whatsappLink } from '../data/site';

const Contact = () => (
  <div className="contact-page">
    <PageBanner eyebrow="Get in touch" title="Contact Us" intro="We're here to help with research publication, collaboration, internships, training and institutional programs." />

    <div className="page-body site-container">
      <p>BuildSoftTech values communication with researchers, faculty members, students and institutions. Reach out for any query related to our services, fees, batches or collaboration opportunities.</p>

      <div className="contact-cards">
        <a className="contact-card" href={`mailto:${SITE.email}`}>
          <span className="contact-card-icon" aria-hidden="true"><Icon name="mail" size={22} /></span>
          <span className="contact-card-label">Email</span>
          <strong>{SITE.email}</strong>
          <span className="contact-card-hint">Write to our team</span>
        </a>
        <a className="contact-card" href={`tel:${SITE.phoneLink}`}>
          <span className="contact-card-icon" aria-hidden="true"><Icon name="phone" size={22} /></span>
          <span className="contact-card-label">Phone</span>
          <strong>{SITE.phoneDisplay}</strong>
          <span className="contact-card-hint">Call our office</span>
        </a>
        <a className="contact-card" href={whatsappLink('Hello BuildSoftTech, I have a query.')} target="_blank" rel="noreferrer">
          <span className="contact-card-icon" aria-hidden="true"><Icon name="whatsapp" size={22} /></span>
          <span className="contact-card-label">WhatsApp</span>
          <strong>{SITE.phoneDisplay}</strong>
          <span className="contact-card-hint">Chat with us</span>
        </a>
      </div>

      <div className="two-col">
        <div className="page-card">
          <h3>Office</h3>
          <p style={{ margin: '0 0 4px' }}><strong>BuildSoftTech</strong></p>
          <p style={{ margin: '0 0 4px' }}><Icon name="pin" size={14} /> {SITE.address}</p>
          <p style={{ margin: '0 0 4px' }}>Email: <a href={`mailto:${SITE.email}`}>{SITE.email}</a></p>
          <p style={{ margin: '0 0 4px' }}>Phone: <a href={`tel:${SITE.phoneLink}`}>{SITE.phoneDisplay}</a></p>
          <p style={{ margin: 0 }}>Journal: <a href={IJEPA.url} target="_blank" rel="noreferrer">{IJEPA.name} — {IJEPA.fullName}</a></p>
        </div>
        <div className="page-card">
          <h3>How we can help</h3>
          <h4><span className="dot" />Researchers &amp; Faculty</h4>
          <ul><li>Publication support through {IJEPA.name}</li><li>SCI/Scopus research collaboration</li><li>Research implementation and analysis</li></ul>
          <h4><span className="dot" />Students</h4>
          <ul><li>45-day internship batches and fees</li><li>Software training programs</li><li>Final-year and mini projects</li></ul>
          <h4><span className="dot" />Institutions</h4>
          <ul style={{ marginBottom: 0 }}><li>FDPs, bootcamps, workshops</li><li>Customised training proposals</li></ul>
        </div>
      </div>

      <div className="contact-note">We aim to respond to all enquiries within <strong>2–3 business days</strong>. For a faster response, use the <Link to="/enquire">enquiry form</Link> or WhatsApp.</div>
      <div className="row-actions" style={{ marginTop: 22 }}>
        <Link to="/enquire" className="button button-primary">Register / Enquire</Link>
        <WhatsAppButton text="Hello BuildSoftTech, I have a query." />
      </div>
    </div>
  </div>
);

export default Contact;
