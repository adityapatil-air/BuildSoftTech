import React from 'react';
import Link from 'next/link';
import { Faq, PageHero, Section } from '../components/ui';
import { FAQS } from '../data/content';

const Faqs = () => (
  <div>
    <PageHero crumbs={[{ label: 'FAQs' }]} eyebrow="FAQs" title="Frequently asked questions" intro="Quick answers about courses, internships, publication support and patents." />
    <Section className="max-w-4xl">
      <div className="space-y-12">
        {FAQS.map((g, i) => (
          <div key={g.group}>
            <p className="font-display text-sm font-semibold text-accent">{String(i + 1).padStart(2, '0')}</p>
            <h2 className="mt-1 font-display text-2xl font-semibold tracking-tight">{g.group}</h2>
            <div className="mt-5"><Faq items={g.items} /></div>
          </div>
        ))}
      </div>
      <p className="mt-12 text-sm text-muted-foreground sm:text-base">
        Still have a question? <Link href="/contact" className="font-semibold text-primary hover:underline">Contact us</Link> and we will reply within 24 hours.
      </p>
    </Section>
  </div>
);

export default Faqs;
