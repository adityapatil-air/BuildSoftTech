import React from 'react';
import { ButtonLink, CheckList, CtaBand, Note, PageHero, Panel, PaperCard, Section, SectionHead, Table, TextLink } from '../components/ui';
import { SITE } from '../data/site';
import { COLLAB_DISCLAIMER, COLLAB_FLOW, COLLAB_INCLUDES, PACKAGES } from '../data/content';
import { cn } from '../lib/utils';

const STATUS_CLS = { Available: 'bg-success/10 text-success', Reserved: 'bg-accent/15 text-accent-foreground', Closed: 'bg-destructive/10 text-destructive' };

const ResearchCollaboration = ({ settings }) => {
  const topics = settings?.topics || [];
  const packages = PACKAGES.map((p) => ({ ...p, ...(settings?.packages || []).find((x) => x.letter === p.letter) }));
  const email = settings?.contact?.email || SITE.email;
  const applyHref = (title) => `mailto:${email}?subject=${encodeURIComponent(`Research collaboration interest — ${title}`)}`;

  return (
    <div>
      <PageHero
        eyebrow="SCI / Scopus Research Collaboration"
        title="From first idea to an indexed-journal submission"
        intro="Collaborative research opportunities for faculty members, research scholars, academicians and professionals interested in contributing to research articles targeted toward suitable SCI/SCIE or Scopus-indexed journals."
        actions={<><ButtonLink href="#topics" variant="accent">Browse available topics</ButtonLink><ButtonLink href="/contact" variant="outline-light">Submit your interest</ButtonLink></>}
      />

      <Section>
        <SectionHead title="How the collaboration works" text="Researchers can explore our available research topics/titles and select a project based on their research interests, technical background and preferred area of contribution." />
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {COLLAB_FLOW.map((s, i) => (
            <li key={s} className="paper-card flex items-start gap-3 rounded-xl p-5">
              <span className="font-display text-2xl font-semibold leading-none text-accent">{String(i + 1).padStart(2, '0')}</span>
              <span className="text-sm font-medium leading-snug text-foreground">{s}</span>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="topics" tone="secondary">
        <SectionHead title="Available research collaboration opportunities" text="Researchers interested in joining an ongoing research project can select from the available research topics listed below." />
        <div className="mt-8">
          <Table
            minWidth={820}
            head={['Sr.', 'Research paper / proposed topic', 'Area', 'Target index', 'Duration', 'Professional fee', 'Status', '']}
            rows={topics.map((t, i) => [
              i + 1,
              <strong key="t" className="font-semibold">{t.title}</strong>,
              t.area,
              t.index,
              t.duration,
              t.fee,
              <span key="s" className={cn('rounded-full px-2.5 py-1 text-xs font-semibold', STATUS_CLS[t.status])}>{t.status}</span>,
              t.status === 'Available' ? <a key="a" href={applyHref(t.title)} className="whitespace-nowrap font-semibold text-primary hover:underline">Apply →</a> : <span key="a" className="text-xs text-muted-foreground">Not open</span>,
            ])}
          />
        </div>
        <p className="mt-5 text-sm text-muted-foreground">
          <strong className="font-semibold text-foreground">Note:</strong> The research titles, target journals, timelines and fees displayed on this page are indicative and may change depending on the research scope, implementation requirements, journal requirements and collaboration structure.
        </p>
        <Note tone="warn" className="mt-4">{COLLAB_DISCLAIMER}</Note>
      </Section>

      <Section>
        <SectionHead title="What the collaboration may include" text="Depending on the selected research project and the agreed scope of contribution, the collaboration may involve:" />
        <div className="mt-8"><CheckList items={COLLAB_INCLUDES} cols={3} /></div>
      </Section>

      <Section tone="secondary">
        <SectionHead title="Collaboration packages" />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {packages.map((p) => (
            <PaperCard key={p.letter} className={cn('flex flex-col', p.featured && 'ring-2 ring-accent')}>
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">{p.letter}</span>
                {p.featured && <span className="rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-semibold text-accent-foreground">Most chosen</span>}
              </div>
              <h3 className="mt-2 font-display text-xl font-semibold tracking-tight">{p.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{p.forWho}</p>
              <div className="mt-5 flex-1"><CheckList items={p.includes} /></div>
              <dl className="mt-6 grid grid-cols-2 gap-3 border-t border-border pt-4 text-sm">
                <div><dt className="text-xs uppercase tracking-wider text-muted-foreground">Duration</dt><dd className="mt-1 font-semibold">{p.duration}</dd></div>
                <div><dt className="text-xs uppercase tracking-wider text-muted-foreground">Fee</dt><dd className="mt-1 font-semibold">{p.fee}</dd></div>
              </dl>
              <ButtonLink href={p.to?.startsWith('/services') ? '#topics' : '/contact'} variant={p.featured ? 'primary' : 'outline'} className="mt-5">{p.cta} →</ButtonLink>
            </PaperCard>
          ))}
        </div>
      </Section>

      <Section>
        <Panel>
          <h2 className="font-display text-2xl font-semibold tracking-tight">Integrity first: authorship follows contribution</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            BuildSoftTech follows an ethical and contribution-based authorship approach. Researchers who join a collaborative research project are expected to make a meaningful scholarly contribution to the research work. Depending on the nature and extent of the contribution, eligible collaborators may be considered for authorship in accordance with the authorship requirements of the target journal/publisher.
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            The final author list, author order, corresponding-author designation, research contribution and acknowledgment will be determined based on actual scholarly contributions and applicable journal policies.
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-foreground">
            <strong className="font-semibold">Important:</strong> Author positions are not sold independently of research contribution. The collaboration fee covers the agreed research, technical, publication-support and related professional services. It does not constitute a guarantee of authorship, acceptance or publication.
          </p>
          <p className="mt-4 text-sm"><TextLink href="/authorship-policy">Read the full authorship policy →</TextLink></p>
        </Panel>
      </Section>

      <CtaBand
        title="Interested in a research collaboration?"
        text="Browse available research topics, select a topic, submit your interest — our research coordinator will contact you."
        actions={<><ButtonLink href="#topics" variant="accent">Browse topics</ButtonLink><ButtonLink href="/contact" variant="outline-light">Submit your interest</ButtonLink></>}
      />
    </div>
  );
};

export default ResearchCollaboration;
