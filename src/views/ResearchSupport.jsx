import React from 'react';
import { ButtonLink, CheckList, CtaBand, FeatureCards, PageHero, PaperCard, Section, SectionHead, Timeline } from '../components/ui';
import { RESEARCH_SUPPORT, WHY_US, WORKFLOW } from '../data/content';

const ResearchSupport = () => (
  <div>
    <PageHero
      eyebrow="Research Support"
      title="Help at every stage of the research lifecycle"
      intro="BuildSoftTech provides research assistance across different stages of the research lifecycle — from the first idea to results and analysis."
      crumbs={[{ href: '/services', label: 'Services' }, { label: 'Research support' }]}
      actions={<ButtonLink href="/contact" variant="accent">Discuss your research</ButtonLink>}
    />

    <Section>
      <SectionHead title="What we support" />
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {RESEARCH_SUPPORT.map((s) => (
          <PaperCard key={s.title}>
            <h3 className="font-display text-xl font-semibold tracking-tight">{s.title}</h3>
            {s.text && <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>}
            {s.items.length > 0 && <div className="mt-4"><CheckList items={s.items} /></div>}
          </PaperCard>
        ))}
      </div>
    </Section>

    <Section tone="secondary">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
        <SectionHead title="Our research publication workflow" text="Every engagement follows the same nine steps, so you always know where your work stands." />
        <Timeline items={WORKFLOW} />
      </div>
    </Section>

    <Section>
      <SectionHead title="Why researchers choose us" />
      <div className="mt-10"><FeatureCards items={WHY_US} /></div>
    </Section>

    <CtaBand
      title="Start with a consultation"
      text="Discuss your research topic, objectives and requirements with our research coordinator."
      actions={<><ButtonLink href="/contact" variant="accent">Contact us</ButtonLink><ButtonLink href="/services/research-collaboration" variant="outline-light">Explore collaboration</ButtonLink></>}
    />
  </div>
);

export default ResearchSupport;
