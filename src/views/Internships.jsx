import React from 'react';
import { ButtonLink, CheckList, Container, CtaBand, Eyebrow, FeatureCards, PageHero, PaperCard, Section, SectionHead, StepCards, Table } from '../components/ui';
import { SITE } from '../data/site';
import { INTERNSHIP_DOMAINS, INTERNSHIP_ELIGIBLE, INTERNSHIP_GAINS, INTERNSHIP_HIGHLIGHTS, INTERNSHIP_INCLUDES, INTERNSHIP_TIMELINE } from '../data/content';

const Internships = ({ settings }) => {
  const it = settings?.internship || { fee: '₹3,000/-', duration: '45 Days', mode: 'Online / Offline / Hybrid*' };
  const email = settings?.contact?.email || SITE.email;
  const applyHref = `mailto:${email}?subject=${encodeURIComponent('45-Day Internship Program — application')}`;
  const highlights = INTERNSHIP_HIGHLIGHTS.map(([k, v]) => [k, k === 'Fee' ? it.fee : k === 'Duration' ? it.duration : k === 'Mode' ? it.mode : v]);

  return (
    <div>
      <PageHero
        eyebrow="Internship & Training"
        title="45-day internships where you actually build things"
        intro="Learn → Practice → Build → Get Certified. A structured, paid internship for students who want practical experience in software technologies, real-world projects and a stronger technical profile."
        actions={<><ButtonLink href={applyHref} variant="accent">Apply for an internship</ButtonLink><ButtonLink href="#domains" variant="outline-light">View internship domains</ButtonLink></>}
      >
        <div className="mt-10 grid max-w-2xl grid-cols-3 gap-4">
          {[['Fee', it.fee], ['Duration', it.duration], ['Outcome', 'Certificate']].map(([k, v]) => (
            <div key={k} className="rounded-lg border border-primary-foreground/15 bg-primary-foreground/5 p-4">
              <p className="text-[11px] uppercase tracking-[0.14em] opacity-70">{k}</p>
              <p className="mt-1 font-display text-xl font-semibold">{v}</p>
            </div>
          ))}
        </div>
        {(it.nextBatch || it.note) && (
          <p className="mt-5 max-w-2xl text-sm opacity-85">{it.nextBatch && <strong className="font-semibold">Next batch: {it.nextBatch}. </strong>}{it.note}</p>
        )}
      </PageHero>

      <Section>
        <SectionHead title="Program structure" text="The program combines guided technical training, hands-on practice, project development, mentor support and internship certification." />
        <div className="mt-10"><StepCards items={INTERNSHIP_TIMELINE} cols={3} /></div>
      </Section>

      <Section tone="secondary">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight">What's included</h2>
            <div className="mt-6"><CheckList items={INTERNSHIP_INCLUDES} /></div>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight">Program highlights</h2>
            <div className="mt-6"><Table minWidth={0} head={['Feature', 'Details']} rows={highlights.map(([k, v]) => [<span key="k" className="font-semibold">{k}</span>, v])} /></div>
            <p className="mt-3 text-xs text-muted-foreground">*Availability of online, offline or hybrid mode is specified according to the actual batch.</p>
          </div>
        </div>
      </Section>

      <Section id="domains">
        <SectionHead title="Available internship domains" />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {INTERNSHIP_DOMAINS.map((d) => (
            <PaperCard key={d.title}>
              <h3 className="font-display text-xl font-semibold tracking-tight">{d.title}</h3>
              <div className="mt-4"><CheckList items={d.items} /></div>
            </PaperCard>
          ))}
        </div>
      </Section>

      <Section tone="secondary">
        <SectionHead title="What students will gain" />
        <div className="mt-10"><FeatureCards items={INTERNSHIP_GAINS} /></div>
      </Section>

      <section id="apply" className="scroll-mt-24">
        <Container className="grid gap-5 py-16 sm:grid-cols-3">
          <PaperCard>
            <h3 className="font-display text-lg font-semibold tracking-tight">Who can apply</h3>
            <div className="mt-3"><CheckList items={INTERNSHIP_ELIGIBLE} /></div>
          </PaperCard>
          <PaperCard>
            <h3 className="font-display text-lg font-semibold tracking-tight">What you get</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Technology training, a guided project, mentor support, performance evaluation and an Internship Completion Certificate on successful completion.</p>
          </PaperCard>
          <PaperCard>
            <Eyebrow>How to apply</Eyebrow>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Email us your name, degree, year, institution and preferred domain, or call the office. Registered students can track their internship, weekly reviews and certificate from their dashboard.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <ButtonLink href={applyHref} variant="primary" className="px-4 py-2">Apply by email</ButtonLink>
              <ButtonLink href="/register" variant="outline" className="px-4 py-2">Register</ButtonLink>
            </div>
          </PaperCard>
        </Container>
      </section>

      <CtaBand
        title="Start your 45-day practical learning journey"
        text={`Gain technical skills. Build a project. Get practical experience. Earn your internship certificate. Internship fee: ${it.fee}`}
        actions={<><ButtonLink href={applyHref} variant="accent">Apply for internship</ButtonLink><ButtonLink href="#domains" variant="outline-light">View domains</ButtonLink></>}
      />
    </div>
  );
};

export default Internships;
