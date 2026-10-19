import React from 'react';
import { ButtonLink, CheckList, CtaBand, FeatureCards, PageHero, Panel, PaperCard, Section, SectionHead, Table, TextLink } from '../components/ui';
import { IJEPA, SITE } from '../data/site';
import { INTEGRITY_NO, INTEGRITY_YES, MISSION, WHY_US } from '../data/content';

const About = () => (
  <div>
    <PageHero
      eyebrow="About BuildSoftTech"
      title="Building research. Developing skills. Creating opportunities."
      intro="BuildSoftTech was established with the vision of providing a professional platform where academic research and technology education come together."
    />

    <Section>
      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
          <p>We understand the challenges faced by faculty members, researchers and students in preparing quality manuscripts, identifying suitable journals, responding to reviewers, developing research prototypes and acquiring practical technology skills.</p>
          <p>Our team provides structured support throughout the research and learning journey — from research idea development and manuscript preparation to journal selection, technical implementation, publication support and skill development.</p>
        </div>
        <Panel className="self-start">
          <dl className="space-y-3 text-sm">
            <div><dt className="text-xs uppercase tracking-wider text-muted-foreground">Organisation</dt><dd className="mt-0.5 font-semibold">BuildSoftTech</dd></div>
            <div><dt className="text-xs uppercase tracking-wider text-muted-foreground">Focus</dt><dd className="mt-0.5 font-semibold">{SITE.tagline}</dd></div>
            <div><dt className="text-xs uppercase tracking-wider text-muted-foreground">Journal</dt><dd className="mt-0.5"><TextLink href={IJEPA.url}>{IJEPA.name} · ISSN {IJEPA.issn} ↗</TextLink></dd></div>
            <div><dt className="text-xs uppercase tracking-wider text-muted-foreground">Location</dt><dd className="mt-0.5 font-semibold">{SITE.addressShort}</dd></div>
          </dl>
        </Panel>
      </div>
    </Section>

    <Section tone="secondary" id="mission">
      <div className="grid gap-5 lg:grid-cols-2">
        <PaperCard>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Our vision</p>
          <p className="mt-3 font-display text-2xl font-semibold leading-snug tracking-tight">
            To become a trusted research and technology partner for academicians, researchers and students by providing ethical, transparent and quality-driven academic and technical services.
          </p>
        </PaperCard>
        <PaperCard>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Our mission</p>
          <div className="mt-4"><CheckList items={MISSION} /></div>
        </PaperCard>
      </div>
    </Section>

    <Section>
      <SectionHead title="Our four verticals" />
      <div className="mt-8">
        <Table
          head={['Vertical', 'Who it serves', '']}
          rows={[
            ['Research Publication Services', 'Faculty, scholars, researchers', <TextLink key="1" href="/services/research-publication">Publication through IJEPA →</TextLink>],
            ['Research Collaboration', 'Faculty, researchers, institutions', <TextLink key="2" href="/services/research-collaboration">SCI / Scopus collaboration →</TextLink>],
            ['Internships & Projects', 'UG / PG students', <TextLink key="3" href="/internships">45-day internship →</TextLink>],
            ['Technology Training', 'Students, faculty, professionals', <TextLink key="4" href="/courses">Software classes →</TextLink>],
          ].map(([a, b, c]) => [<strong key="a" className="font-semibold">{a}</strong>, b, c])}
        />
      </div>
    </Section>

    <Section tone="secondary">
      <SectionHead title="Why researchers & students choose us" />
      <div className="mt-10"><FeatureCards items={WHY_US} /></div>
    </Section>

    <Section id="integrity">
      <SectionHead title="Quality & research integrity" text="BuildSoftTech believes that sustainable academic success must be based on originality, integrity and genuine scholarly contribution." />
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <PaperCard><h3 className="font-display text-lg font-semibold">We encourage</h3><div className="mt-4"><CheckList items={INTEGRITY_YES} /></div></PaperCard>
        <PaperCard>
          <h3 className="font-display text-lg font-semibold">We do not support</h3>
          <ul className="mt-4 grid gap-2.5">
            {INTEGRITY_NO.map((t) => <li key={t} className="flex gap-2 text-sm text-muted-foreground"><span className="text-destructive">✕</span>{t}</li>)}
          </ul>
        </PaperCard>
      </div>
    </Section>

    <CtaBand title="Work with a research partner that puts integrity first" text="Tell us about your research goals or the skills you want to build." actions={<><ButtonLink href="/contact" variant="accent">Contact us</ButtonLink><ButtonLink href="/services" variant="outline-light">Explore services</ButtonLink></>} />
  </div>
);

export default About;
