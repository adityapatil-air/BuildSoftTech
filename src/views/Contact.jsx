import React from 'react';
import EnquiryForm from '../components/EnquiryForm';
import { Ico, PageHero, waLink } from '../components/ui';

const SERVICES = ['Training', 'Internship', 'Journal publication', 'Conference publication', 'Book', 'Book chapter', 'Patent'];

const Contact = ({ settings, service }) => {
  const c = settings.contact;
  const wa = waLink(c.whatsapp);
  const mapQuery = c.mapQuery || c.address;
  return (
    <div className="pub">
      <PageHero crumb="Contact" title="Get in touch" lead="Questions about courses, internships or research support? We reply within 24 hours." />
      <section className="section">
        <div className="wrap two-col">
          <div className="grid" style={{ gap: 14 }}>
            {c.address && (
              <div className="contact-card c-blue">
                <div className="icon-box"><Ico name="pin" /></div>
                <div><b>Office</b><span>BuildSoftTech, {c.address}</span></div>
              </div>
            )}
            {c.phoneDisplay && (
              <div className="contact-card c-teal">
                <div className="icon-box"><Ico name="phone" /></div>
                <div>
                  <b>{wa ? 'Phone / WhatsApp' : 'Phone'}</b>
                  <a href={`tel:${c.phoneLink}`}>{c.phoneDisplay}</a>
                  {wa && <> &middot; <a href={wa} target="_blank" rel="noreferrer">Chat on WhatsApp</a></>}
                </div>
              </div>
            )}
            <div className="contact-card c-orange">
              <div className="icon-box"><Ico name="mail" /></div>
              <div>
                <b>Email</b>
                <a href={`mailto:${c.email}`}>{c.email}</a>
                {c.researchEmail && <> &middot; <a href={`mailto:${c.researchEmail}`}>{c.researchEmail}</a></>}
              </div>
            </div>
            {c.hours && (
              <div className="contact-card c-violet">
                <div className="icon-box"><Ico name="clock" /></div>
                <div><b>Office hours</b><span>{c.hours}</span></div>
              </div>
            )}
            {mapQuery && (
              <div className="map-box">
                <iframe title="BuildSoftTech office on Google Maps" src={`https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>
            )}
          </div>
          <div>
            <EnquiryForm key={service || 'none'} variant="contact" title="Send us a message" options={SERVICES} defaultTopic={service} />
            <p style={{ marginTop: 14, fontSize: '.95rem', color: 'var(--muted)' }}>To share a manuscript or invention document, email it to {c.researchEmail || c.email} after sending this form. We sign an NDA on request.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
