import React from 'react';
import EnquiryForm from '../components/EnquiryForm';
import { Amount, ButtonLink, CheckList, Eyebrow, H2, IconTile, PageHero, PaperCard, Section, SectionHead, StepCards } from '../components/ui';
import { INTERNSHIP_DOMAINS, INTERNSHIP_HIGHLIGHTS, INTERNSHIP_STEPS } from '../data/content';
import { cn } from '../lib/utils';

const DURATIONS = ['45 days', '2 months', '3 months', '6 months'];

const Internship = ({ settings, batches, plan }) => {
  const plans = settings.internshipPlans;
  const durationFor = (p) => DURATIONS.find((d) => String(p?.duration || '').startsWith(d.split(' ')[0])) || DURATIONS[0];
  return (
    <div>
      <PageHero
        crumbs={[{ label: 'Internship' }]}
        eyebrow="Paid internship program"
        title={<>Industry internship program <span className="text-accent">(minimum 45 days)</span></>}
        intro="Gain real work experience by building live projects under mentor guidance. Ideal for engineering, CS and IT students who need a curriculum internship."
        actions={<ButtonLink href="#apply" variant="accent">Apply for internship</ButtonLink>}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <Eyebrow>Program highlights</Eyebrow>
            <H2 className="mt-2">Real projects. Real certificate.</H2>
            <div className="mt-6"><CheckList items={INTERNSHIP_HIGHLIGHTS} /></div>
          </div>
          <div>
            <Eyebrow>Domains</Eyebrow>
            <H2 className="mt-2">Pick your track</H2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {INTERNSHIP_DOMAINS.map((d) => (
                <PaperCard key={d.title} className="flex items-center gap-3 p-4">
                  <IconTile name={d.icon} className="h-10 w-10" />
                  <h3 className="font-display text-base font-semibold tracking-tight">{d.title}</h3>
                </PaperCard>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section tone="secondary">
        <SectionHead eyebrow="Plans" title="Choose your internship plan" />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {plans.map((p, i) => (
            <PaperCard key={`${p.name}-${i}`} className={cn('relative flex flex-col gap-4', p.featured && 'border-2 border-accent')}>
              {p.featured && <span className="absolute -top-3 right-5 rounded-full bg-accent px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent-foreground">Most popular</span>}
              <div>
                <h3 className="font-display text-xl font-semibold tracking-tight">{p.name}</h3>
                {p.duration && <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{p.duration}</p>}
              </div>
              <Amount fee={p.fee} suffix="/ intern" />
              <div className="flex-1"><CheckList items={p.features || []} /></div>
              <ButtonLink href={`/internship?plan=${encodeURIComponent(p.name)}#apply`} variant={p.featured ? 'primary' : 'outline'}>Choose {p.name}</ButtonLink>
            </PaperCard>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHead eyebrow="How it works" title="From application to certificate" />
        <div className="mt-10"><StepCards items={INTERNSHIP_STEPS} cols={3} /></div>
        <p className="mt-8 text-sm text-muted-foreground"><strong className="text-foreground">Eligibility:</strong> B.E./B.Tech, BCA, MCA, B.Sc/M.Sc (CS/IT), diploma students and recent graduates.</p>
      </Section>

      {batches}

      <Section id="apply" tone="secondary">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <Eyebrow>Apply</Eyebrow>
            <H2 className="mt-2">Apply for internship</H2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">Seats are limited per batch so every intern gets mentor time.</p>
          </div>
          <EnquiryForm
            key={plan || 'none'}
            variant="internship"
            options={INTERNSHIP_DOMAINS.map((d) => d.title)}
            durations={DURATIONS}
            defaultDuration={durationFor(plans.find((p) => p.name === plan))}
          />
        </div>
      </Section>
    </div>
  );
};

export default Internship;
