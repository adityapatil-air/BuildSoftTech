import React from 'react';
import Link from 'next/link';
import { ButtonLink, CtaBand, Note, PageHero, Section, SectionHead, StepCards } from '../components/ui';
import { WORKFLOW } from '../data/content';

const ALL = [
  { href: '/services/research-publication', title: 'Research Paper Publication Support — IJEPA', text: 'Submission guidance, formatting, quality checks, peer-review coordination and publication-process assistance through our own peer-reviewed journal.', cta: 'About the journal' },
  { href: '/services/research-collaboration', title: 'SCI / Scopus Research Collaboration', text: 'Contribution-based collaboration on research articles targeted toward suitable SCI/SCIE or Scopus-indexed journals, with transparent authorship policy.', cta: 'Collaborate' },
  { href: '/services/research-support', title: 'Research Support Services', text: 'Research idea development, literature review, methodology, implementation support and results analysis across the research lifecycle.', cta: 'Research support' },
  { href: '/internships', title: 'Internship Programs', text: '45-day paid, industry-oriented internship combining training, hands-on practice, project development, mentoring and certification.', cta: 'Internship details' },
  { href: '/courses', title: 'Software Training & Technology Courses', text: 'Practical programs in Python, Data Science, AI/ML, Full Stack, Cloud & DevOps and Cybersecurity for students, faculty and professionals.', cta: 'View classes' },
  { href: '/for-institutions', title: 'Institutional Programs', text: 'Faculty development programs, student bootcamps, research-development workshops and department-level programs for colleges and universities.', cta: 'For institutions' },
];

const Services = () => (
  <div>
    <PageHero eyebrow="What we do" title="Our services" intro="Structured, transparent and quality-focused research and technology services for researchers, faculty, students and institutions." />
    <Section>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {ALL.map((s, i) => (
          <Link key={s.href} href={s.href} className="paper-card group flex flex-col rounded-xl p-6 transition-transform hover:-translate-y-0.5">
            <span className="font-display text-sm font-semibold text-accent">{String(i + 1).padStart(2, '0')}</span>
            <h2 className="mt-2 font-display text-xl font-semibold tracking-tight">{s.title}</h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
            <span className="mt-4 text-sm font-semibold text-primary group-hover:underline">{s.cta} →</span>
          </Link>
        ))}
      </div>
      <Note tone="warn" className="mt-10">
        <strong className="font-semibold">Two different offerings:</strong> publication through IJEPA (our own journal) and SCI/Scopus research collaboration (contribution-based work on articles targeted toward third-party indexed journals) are separate services. Journal acceptance, indexing and authorship are never guaranteed.
      </Note>
    </Section>
    <Section tone="secondary">
      <SectionHead title="Our research publication workflow" text="Every research engagement follows the same nine-step path." />
      <div className="mt-10"><StepCards items={WORKFLOW} cols={3} /></div>
    </Section>
    <CtaBand title="Not sure which service fits?" text="Tell us about your goals and our coordinator will suggest the right path." actions={<><ButtonLink href="/contact" variant="accent">Contact us</ButtonLink><ButtonLink href="/faq" variant="outline-light">Read the FAQ</ButtonLink></>} />
  </div>
);

export default Services;
