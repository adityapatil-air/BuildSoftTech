import React from 'react';
import EnquiryForm from '../components/EnquiryForm';
import { IconTile, PageHero, PaperCard, Section, waLink } from '../components/ui';

const SERVICES = ['Training', 'Internship', 'Journal publication', 'Conference publication', 'Book', 'Book chapter', 'Patent'];

const Item = ({ icon, label, children }) => (
  <PaperCard className="flex gap-4 p-5">
    <IconTile name={icon} />
    <div className="min-w-0">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
      <div className="mt-1 break-words text-sm leading-relaxed text-foreground">{children}</div>
    </div>
  </PaperCard>
);

const A = (props) => <a className="font-semibold text-primary hover:underline" {...props} />;

const Contact = ({ settings, service }) => {
  const c = settings.contact;
  const wa = waLink(c.whatsapp);
  const mapQuery = c.mapQuery || c.address;
  return (
    <div>
      <PageHero crumbs={[{ label: 'Contact' }]} eyebrow="Contact" title="Get in touch" intro="Questions about courses, internships or research support? We reply within 24 hours." />
      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="grid content-start gap-4">
            {c.address && <Item icon="pin" label="Office">BuildSoftTech, {c.address}</Item>}
            {c.phoneDisplay && (
              <Item icon="phone" label={wa ? 'Phone / WhatsApp' : 'Phone'}>
                <A href={`tel:${c.phoneLink}`}>{c.phoneDisplay}</A>
                {wa && <> · <A href={wa} target="_blank" rel="noreferrer">Chat on WhatsApp</A></>}
              </Item>
            )}
            <Item icon="mail" label="Email">
              <A href={`mailto:${c.email}`}>{c.email}</A>
              {c.researchEmail && <> · <A href={`mailto:${c.researchEmail}`}>{c.researchEmail}</A></>}
            </Item>
            {c.hours && <Item icon="clock" label="Office hours">{c.hours}</Item>}
            {mapQuery && (
              <div className="paper-card h-64 overflow-hidden rounded-xl">
                <iframe title="BuildSoftTech office on Google Maps" src={`https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="block h-full w-full border-0" />
              </div>
            )}
          </div>
          <div>
            <EnquiryForm key={service || 'none'} variant="contact" title="Send us a message" options={SERVICES} defaultTopic={service} />
            <p className="mt-4 text-sm text-muted-foreground">To share a manuscript or invention document, email it to {c.researchEmail || c.email} after sending this form. We sign an NDA on request.</p>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Contact;
