import React from 'react';
import { PageHero, PaperCard, Section } from '../components/ui';
import { POLICIES } from '../data/content';

const Policies = ({ settings }) => (
  <div>
    <PageHero crumbs={[{ label: 'Policies' }]} eyebrow="Policies" title="Policies" intro="Our commitments on ethics, privacy, refunds and terms of service." />
    <Section className="max-w-4xl">
      <nav aria-label="Policies" className="flex flex-wrap gap-2">
        {POLICIES.map((p) => (
          <a key={p.id} href={`#${p.id}`} className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary">{p.title}</a>
        ))}
      </nav>
      <div className="mt-10 space-y-6">
        {POLICIES.map((p, i) => (
          <PaperCard key={p.id} as="article" id={p.id} className="scroll-mt-24 p-6 sm:p-8">
            <span className="font-display text-sm font-semibold text-accent">{String(i + 1).padStart(2, '0')}</span>
            <h2 className="mt-1 font-display text-2xl font-semibold tracking-tight">{p.title}</h2>
            <div className="policy-prose mt-4">
              <ul>{p.items.map((it) => <li key={it}>{it.replace('{email}', settings.contact.email)}</li>)}</ul>
            </div>
          </PaperCard>
        ))}
      </div>
    </Section>
  </div>
);

export default Policies;
