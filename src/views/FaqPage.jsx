import React from 'react';
import { ButtonLink, CtaBand, Faq, PageHero, Section } from '../components/ui';
import { FAQS } from '../data/content';

const FaqPage = () => (
  <div>
    <PageHero eyebrow="Help" title="Frequently asked questions" intro="Straight answers about what we do — and what we never promise." />
    <Section className="max-w-4xl">
      <Faq items={FAQS} />
    </Section>
    <CtaBand title="Still have a question?" text="Write to us or call the office and we will get back to you within 2–3 business days." actions={<><ButtonLink href="/contact" variant="accent">Contact us</ButtonLink><ButtonLink href="/services" variant="outline-light">Explore services</ButtonLink></>} />
  </div>
);

export default FaqPage;
