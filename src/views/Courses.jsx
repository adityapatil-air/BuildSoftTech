import React from 'react';
import { ButtonLink, CheckList, CtaBand, PageHero, Panel, PaperCard, Pill, Section, TextLink } from '../components/ui';
import { SITE } from '../data/site';

const HOW = [
  'Hands-on sessions — every concept is practised in the development environment, not just explained',
  'Project-based learning — mini and capstone projects build a portfolio you can show',
  'Customisable batches for students, faculty members, professionals and institutions',
  'Online, offline or hybrid, depending on the batch',
];

const Courses = ({ settings }) => {
  const courses = settings?.courses || [];
  const email = settings?.contact?.email || SITE.email;
  const ask = (t) => `mailto:${email}?subject=${encodeURIComponent(`Course enquiry — ${t}`)}`;

  return (
    <div>
      <PageHero
        eyebrow="Software Classes"
        title="Software classes that end with real projects"
        intro="Learn Technology. Build Projects. Develop Your Career. Practical software training programs for students, faculty members, working professionals and researchers — hands-on learning, project development and real-world applications rather than theory alone."
        actions={<ButtonLink href={ask('Upcoming batches')} variant="accent">Ask about upcoming batches</ButtonLink>}
      />

      <Section>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((c) => (
            <PaperCard key={c.title} className="flex flex-col">
              {(c.duration || c.fee) && <Pill className="self-start">{[c.duration, c.fee].filter(Boolean).join(' · ')}</Pill>}
              <h2 className="mt-3 font-display text-xl font-semibold tracking-tight">{c.title}</h2>
              <div className="mt-4 flex-1"><CheckList items={c.items || []} /></div>
              <a href={ask(c.title)} className="mt-5 text-sm font-semibold text-primary hover:underline">Ask about this course →</a>
            </PaperCard>
          ))}
        </div>

        <Panel className="mt-14">
          <h2 className="font-display text-2xl font-semibold tracking-tight">How classes run</h2>
          <div className="mt-5"><CheckList items={HOW} cols={2} /></div>
          <p className="mt-6 text-sm text-muted-foreground">
            Ready to join? Email <TextLink href={`mailto:${email}`}>{email}</TextLink> or call <TextLink href={`tel:${settings?.contact?.phoneLink || SITE.phoneLink}`}>{settings?.contact?.phoneDisplay || SITE.phoneDisplay}</TextLink> for batch schedules and fees. Looking for a program for a whole department? See <TextLink href="/for-institutions">institutional programs</TextLink>.
          </p>
        </Panel>
      </Section>

      <CtaBand
        title="Ready to build a new skill?"
        text="Tell us which technology you want to learn and we will suggest the right program and batch."
        actions={<><ButtonLink href="/contact" variant="accent">Contact us</ButtonLink><ButtonLink href="/internships" variant="outline-light">45-day internship</ButtonLink></>}
      />
    </div>
  );
};

export default Courses;
