import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Container, PageHero, Panel, PaperCard } from '../components/ui';
import { IJEPA, SITE } from '../data/site';

const Contact = ({ settings }) => {
  const c = { ...SITE, hours: 'Mon–Sat, 10:00 AM – 6:00 PM IST', ...(settings?.contact || {}) };
  const mailto = (subject) => `mailto:${c.email}?subject=${encodeURIComponent(subject)}`;
  const QUICK = [
    ['Research enquiry', 'Research publication / collaboration enquiry'],
    ['Apply for internship', '45-Day Internship Program — application'],
    ['Join a training program', 'Software training course enquiry'],
    ['Institutional proposal', 'Institutional program proposal request'],
  ];

  return (
    <div>
      <PageHero
        eyebrow="Contact"
        title="Get in touch"
        intro="Write to us or call the office about journal publication, research collaboration, internships, software classes and institutional programs."
      />
      <Container className="py-16">
        <div className="grid gap-5 md:grid-cols-3">
          <a href={mailto('Enquiry — BuildSoftTech services')} className="paper-card group rounded-xl p-6 transition-transform hover:-translate-y-0.5">
            <Mail className="h-5 w-5 text-accent" />
            <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</p>
            <p className="mt-1 break-words font-display text-xl font-semibold text-primary group-hover:underline">{c.email}</p>
            <p className="mt-1 text-sm text-muted-foreground">Best for research, publication and institutional enquiries</p>
          </a>
          <a href={`tel:${c.phoneLink}`} className="paper-card group rounded-xl p-6 transition-transform hover:-translate-y-0.5">
            <Phone className="h-5 w-5 text-accent" />
            <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Phone</p>
            <p className="mt-1 font-display text-xl font-semibold text-primary group-hover:underline">{c.phoneDisplay}</p>
            <p className="mt-1 text-sm text-muted-foreground">{c.hours}</p>
          </a>
          <PaperCard>
            <MapPin className="h-5 w-5 text-accent" />
            <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Office</p>
            <p className="mt-1 text-sm font-semibold text-foreground">BuildSoftTech</p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{c.address}</p>
            <a href={IJEPA.url} target="_blank" rel="noreferrer" className="mt-2 inline-block text-sm text-primary hover:underline">IJEPA journal portal ↗</a>
          </PaperCard>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <Panel>
            <h2 className="font-display text-2xl font-semibold tracking-tight">What to include in your email</h2>
            <dl className="mt-5 space-y-4 text-sm">
              <div><dt className="font-semibold text-foreground">Researchers &amp; faculty</dt><dd className="mt-1 text-muted-foreground">Your research area and a short description of the topic, and whether you need publication support through IJEPA, SCI/Scopus collaboration or implementation help.</dd></div>
              <div><dt className="font-semibold text-foreground">Students</dt><dd className="mt-1 text-muted-foreground">Course or internship domain of interest and preferred batch timing; your degree, year and institution.</dd></div>
              <div><dt className="font-semibold text-foreground">Institutions</dt><dd className="mt-1 text-muted-foreground">Program type (FDP, bootcamp, workshop), audience size and tentative dates.</dd></div>
            </dl>
          </Panel>
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight">Quick email links</h2>
            <p className="mt-2 text-sm text-muted-foreground">Each opens your email app with the subject filled in.</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {QUICK.map(([label, subject]) => (
                <a key={label} href={mailto(subject)} className="rounded-md border border-border bg-card px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary">{label} →</a>
              ))}
            </div>
            <p className="mt-6 text-sm text-muted-foreground">We aim to respond to all enquiries within <strong className="text-foreground">2–3 business days</strong>. Please mention your name, institution and the service you are interested in.</p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Contact;
