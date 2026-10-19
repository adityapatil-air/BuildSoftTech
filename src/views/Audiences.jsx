import React from 'react';
import Link from 'next/link';
import { ButtonLink, CheckList, Chips, CtaBand, Note, PageHero, PaperCard, Section, SectionHead } from '../components/ui';
import { FACULTY_OUTPUT, FACULTY_SERVICES, INSTITUTIONAL_PROGRAMS, SCHOLAR_SERVICES, STUDENT_SERVICES } from '../data/content';

const LinkCards = ({ items }) => (
  <div className="mt-12 grid gap-5 md:grid-cols-3">
    {items.map((c) => (
      <Link key={c.href} href={c.href} className="paper-card group rounded-xl p-6 transition-transform hover:-translate-y-0.5">
        <h3 className="font-display text-lg font-semibold tracking-tight">{c.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.text}</p>
        <span className="mt-3 inline-block text-sm font-semibold text-primary group-hover:underline">Learn more →</span>
      </Link>
    ))}
  </div>
);

export const ForFaculty = () => (
  <div>
    <PageHero eyebrow="For faculty members" title="Supporting academic research & professional growth" intro="BuildSoftTech provides research and technology services specifically designed for faculty members and academic professionals." actions={<ButtonLink href="/contact" variant="accent">Discuss your research</ButtonLink>} />
    <Section>
      <SectionHead title="Services for faculty" />
      <div className="mt-8"><CheckList items={FACULTY_SERVICES} cols={3} /></div>
      <div className="mt-14 grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl font-semibold tracking-tight">Research output for academic documentation</h2>
          <p className="mt-2 text-sm text-muted-foreground">Research publications and legitimate scholarly contributions may be relevant to:</p>
          <div className="mt-5"><Chips items={FACULTY_OUTPUT} /></div>
        </div>
        <Note tone="warn" className="self-start">
          <strong className="font-semibold">Note:</strong> BuildSoftTech does not claim that any publication automatically qualifies for promotion, appraisal, NBA, NAAC or NIRF. Eligibility depends on the applicable rules and the institution/regulatory authority.
        </Note>
      </div>
      <LinkCards items={[
        { href: '/services/research-publication', title: 'Publish through IJEPA', text: 'Peer-reviewed publication support through our own journal.' },
        { href: '/services/research-collaboration', title: 'SCI / Scopus collaboration', text: 'Contribution-based research collaboration toward indexed journals.' },
        { href: '/for-institutions', title: 'Faculty development programs', text: 'AI/ML, Data Science, Generative AI, research methodology and academic writing.' },
      ]} />
    </Section>
    <CtaBand title="Plan your next publication with us" text="Research topic consultation is the first step. Tell us what you are working on." actions={<ButtonLink href="/contact" variant="accent">Contact us</ButtonLink>} />
  </div>
);

export const ForStudents = () => (
  <div>
    <PageHero eyebrow="For students" title="Learn. Build. Implement. Showcase." intro="BuildSoftTech helps students develop practical skills beyond classroom learning." actions={<><ButtonLink href="/internships" variant="accent">45-day internship</ButtonLink><ButtonLink href="/courses" variant="outline-light">Software classes</ButtonLink></>} />
    <Section>
      <SectionHead title="Student services" />
      <div className="mt-8"><CheckList items={STUDENT_SERVICES} cols={3} /></div>
      <LinkCards items={[
        { href: '/internships', title: '45-day paid internship', text: 'Training, a guided project, mentoring and a completion certificate.' },
        { href: '/courses', title: 'Software classes', text: 'Python, Data Science, AI/ML, Full Stack, Cloud & DevOps, Cybersecurity.' },
        { href: '/services/research-publication', title: 'Publish your project research', text: 'Turn a strong final-year project into a peer-reviewed paper through IJEPA.' },
      ]} />
    </Section>
    <CtaBand title="Start your practical learning journey" text="Choose an internship domain or a training program." actions={<><ButtonLink href="/register" variant="accent">Create a student account</ButtonLink><ButtonLink href="/contact" variant="outline-light">Contact us</ButtonLink></>} />
  </div>
);

export const ForScholars = () => (
  <div>
    <PageHero eyebrow="For research scholars" title="From research problem to research publication" intro="Our research-support ecosystem helps Ph.D. and research scholars at every stage of the research lifecycle." actions={<ButtonLink href="/contact" variant="accent">Discuss your research</ButtonLink>} />
    <Section>
      <SectionHead title="How we help research scholars" />
      <div className="mt-8"><CheckList items={SCHOLAR_SERVICES} cols={3} /></div>
      <LinkCards items={[
        { href: '/services/research-support', title: 'Research support services', text: 'Idea development, literature review, methodology, implementation, results analysis.' },
        { href: '/services/research-collaboration', title: 'SCI / Scopus collaboration', text: 'Join an ongoing research project with contribution-based authorship.' },
        { href: '/services/research-publication', title: 'Publish through IJEPA', text: 'Peer-reviewed engineering and technology journal published by BuildSoftTech.' },
      ]} />
    </Section>
    <CtaBand title="Stuck at a stage of your research?" text="Tell us where you are — problem identification, implementation, writing or reviewer response." actions={<ButtonLink href="/contact" variant="accent">Contact us</ButtonLink>} />
  </div>
);

export const ForInstitutions = () => (
  <div>
    <PageHero eyebrow="Institutional services" title="Programs for colleges & universities" intro="BuildSoftTech provides customised institutional programs — faculty development, student training, research development and department-level programs." actions={<ButtonLink href="/contact" variant="accent">Request a program proposal</ButtonLink>} />
    <Section>
      <div className="grid gap-5 md:grid-cols-2">
        {INSTITUTIONAL_PROGRAMS.map((p) => (
          <PaperCard key={p.title}>
            <h2 className="font-display text-xl font-semibold tracking-tight">{p.title}</h2>
            <div className="mt-4"><CheckList items={p.items} cols={2} /></div>
          </PaperCard>
        ))}
      </div>
      <p className="mt-8 text-sm text-muted-foreground">Programs can be delivered online, offline or in hybrid mode and tailored to your department's curriculum, accreditation goals and research priorities.</p>
    </Section>
    <CtaBand title="Bring BuildSoftTech to your campus" text="Share your requirements and we will prepare a customised program proposal for your institution." actions={<ButtonLink href="/contact" variant="accent">Contact us</ButtonLink>} />
  </div>
);
