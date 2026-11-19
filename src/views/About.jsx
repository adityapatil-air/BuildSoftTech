import React from 'react';
import { CheckList, ConsultCta, Eyebrow, H2, IconTile, PageHero, PaperCard, Section, SectionHead } from '../components/ui';
import { AUDIENCES, CORE_VALUES } from '../data/content';

const About = ({ settings }) => (
  <div>
    <PageHero
      crumbs={[{ label: 'About' }]}
      eyebrow="About us"
      title="About BuildSoftTech"
      intro="A Pune-based training and research support organisation helping learners and researchers build skills, gain project experience and publish ethically."
    />

    <Section>
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <Eyebrow>Who we are</Eyebrow>
          <H2 className="mt-2">Bridging academia and industry</H2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">BuildSoftTech helps students, working professionals, research scholars and faculty members build practical software skills, gain real project experience, and publish their research ethically in reputed venues.</p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">Our team combines more than two decades of industry, teaching and research experience.</p>
        </div>
        <div id="mission" className="grid scroll-mt-24 gap-5 sm:grid-cols-2">
          <PaperCard>
            <IconTile name="target" />
            <h3 className="mt-4 font-display text-xl font-semibold tracking-tight">Our mission</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">To make quality technical education and research guidance accessible, affordable and outcome-driven for every learner.</p>
          </PaperCard>
          <PaperCard>
            <IconTile name="sparkles" />
            <h3 className="mt-4 font-display text-xl font-semibold tracking-tight">Our vision</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">To become a trusted name in India for skill development and ethical research support.</p>
          </PaperCard>
        </div>
      </div>
    </Section>

    <Section tone="secondary">
      <SectionHead eyebrow="Core values" title="What we stand for" />
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {CORE_VALUES.map((v, i) => (
          <PaperCard key={v.title}>
            <div className="flex items-center justify-between">
              <IconTile name={v.icon} />
              <span className="font-display text-sm font-semibold text-accent">{String(i + 1).padStart(2, '0')}</span>
            </div>
            <h3 className="mt-4 font-display text-lg font-semibold tracking-tight">{v.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
          </PaperCard>
        ))}
      </div>
    </Section>

    <Section>
      <div className="grid gap-12 lg:grid-cols-2">
        <PaperCard className="p-8">
          <div className="flex items-center gap-4">
            <span className="grid h-20 w-20 shrink-0 place-items-center rounded-full bg-primary font-display text-2xl font-semibold text-primary-foreground">SS</span>
            <div>
              <h3 className="font-display text-2xl font-semibold tracking-tight">Prof. Sandeep Shiravale</h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-accent">Founder</p>
            </div>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">M.E. (Information Technology), Ph.D. research scholar. Assistant Professor since 2012, with 10 years of prior industry experience in networking. CCNA, Palo Alto Networks trainer and Fortinet certified. Research interests: blockchain, additive manufacturing and machine learning.</p>
          <blockquote className="mt-5 border-l-2 border-accent pl-4 font-display text-lg italic leading-relaxed text-foreground">&ldquo;I started BuildSoftTech to give learners and researchers the practical guidance I wished I had: real skills, real projects and honest research mentoring.&rdquo;</blockquote>
        </PaperCard>
        <div>
          <Eyebrow>Who we serve</Eyebrow>
          <H2 className="mt-2">Built for learners at every stage</H2>
          <div className="mt-6"><CheckList items={AUDIENCES} /></div>
        </div>
      </div>
    </Section>

    <ConsultCta contact={settings.contact} />
  </div>
);

export default About;
