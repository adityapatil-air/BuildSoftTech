import React from 'react';
import { ButtonLink, CtaBand, PageHero, PaperCard, Section } from '../components/ui';
import { IJEPA } from '../data/site';
import { RESEARCH_AREAS } from '../data/content';

const ResearchAreas = () => (
  <div>
    <PageHero eyebrow="Scope" title="Research areas" intro="Engineering, technology and interdisciplinary research domains we support across publication, collaboration, research assistance and training." />
    <Section>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[...RESEARCH_AREAS.map((a) => a.title), 'Other related domains'].map((t, i) => (
          <PaperCard key={t} className="p-5">
            <span className="font-display text-sm font-semibold text-accent">{String(i + 1).padStart(2, '0')}</span>
            <h2 className="mt-1 font-display text-lg font-semibold leading-snug tracking-tight">{t}</h2>
            <p className="mt-1 text-xs text-muted-foreground">{i < RESEARCH_AREAS.length ? 'Publication via IJEPA · collaboration · implementation support' : 'Considered on a case-by-case basis'}</p>
          </PaperCard>
        ))}
      </div>
    </Section>
    <CtaBand title="Tell us about your research area" text="Our coordinator will map your topic to the right publication, collaboration or support option." actions={<><ButtonLink href="/contact" variant="accent">Contact us</ButtonLink><ButtonLink href={IJEPA.url} variant="outline-light">Visit IJEPA ↗</ButtonLink></>} />
  </div>
);

export default ResearchAreas;
