import React from 'react';
import { Amount, ButtonLink, CheckList, ConsultCta, EnquireLinks, Eyebrow, H2, IconTile, Note, PageHero, PaperCard, Section, SectionHead, StatusBadge, StepCards, Table } from '../components/ui';
import { PATENT_SERVICES, PATENT_STEPS } from '../data/content';
import { cn } from '../lib/utils';

const POINTS = [
  { icon: 'search', title: 'Search first', text: 'A patentability search tells you early whether your idea is new enough to file.' },
  { icon: 'pen', title: 'Strong drafting', text: 'Clear claims and drawings make examination smoother.' },
  { icon: 'lock', title: 'Confidential', text: 'We sign an NDA before you share any details.' },
];

const PatentTable = ({ rows, contact }) => (
  <Section id="listed" tone="secondary">
    <SectionHead eyebrow="Patents" title="Our patents" text="Contact us by phone, email or WhatsApp about any patent listed below." />
    <div className="mt-8">
      <Table
        minWidth={860}
        head={['#', 'Patent title', 'Application no.', 'Date', 'Field', 'Price', 'Status', 'Enquire']}
        rows={rows.map((p, i) => {
          const sold = p.status === 'sold';
          return [
            <span key="n" className="text-muted-foreground">{i + 1}</span>,
            <strong key="t" className="font-semibold text-foreground">{p.title}</strong>,
            <span key="a" className="whitespace-nowrap">{p.applicationNo || '—'}</span>,
            <span key="d" className="whitespace-nowrap">{p.date || '—'}</span>,
            <span key="f" className="text-muted-foreground">{p.field || '—'}</span>,
            <span key="p" className="whitespace-nowrap font-display font-semibold text-primary">{String(p.price || '').trim() || 'On request'}</span>,
            <StatusBadge key="s" sold={sold} />,
            sold ? <span key="e" className="text-xs text-muted-foreground">—</span> : <EnquireLinks key="e" contact={contact} about={p.title} />,
          ];
        })}
      />
    </div>
  </Section>
);

const Patents = ({ settings }) => {
  const listed = (settings.patentListings || []).filter((p) => String(p.title || '').trim());
  return (
  <div>
    <PageHero
      crumbs={[{ label: 'Patents' }]}
      eyebrow="Patent services"
      title="Patent filing, publication & grant support"
      intro="Protect your innovation. We help students, faculty, startups and institutions file patents in India, working with registered patent agents for every legal filing."
      actions={<>{listed.length > 0 && <ButtonLink href="#listed" variant="accent">See our patents</ButtonLink>}<ButtonLink href="/contact?service=Patent" variant={listed.length ? 'outline-light' : 'accent'}>Discuss your invention, free</ButtonLink></>}
    />

    {listed.length > 0 && <PatentTable rows={listed} contact={settings.contact} />}

    <Section>
      <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <Eyebrow>Services</Eyebrow>
          <H2 className="mt-2">Idea to grant, handled carefully</H2>
          <div className="mt-6"><CheckList items={PATENT_SERVICES} /></div>
        </div>
        <div className="grid content-start gap-4">
          {POINTS.map((p) => (
            <PaperCard key={p.title} className="flex gap-4 p-5">
              <IconTile name={p.icon} />
              <div>
                <h3 className="font-display text-lg font-semibold tracking-tight">{p.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
              </div>
            </PaperCard>
          ))}
        </div>
      </div>
    </Section>

    <Section tone="secondary">
      <SectionHead eyebrow="Process in India" title="Seven steps to a granted patent" />
      <div className="mt-10"><StepCards items={PATENT_STEPS} cols={4} /></div>
      <Note className="mt-8">Publication usually takes about 18 months from filing, or about 1 month with early publication. Grant is decided solely by the Patent Office; no service provider can guarantee it.</Note>
    </Section>

    <Section>
      <SectionHead eyebrow="Packages" title="Professional fee plans" text="Government fees are charged at actuals." />
      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {settings.patentPlans.map((p, i) => (
          <PaperCard key={`${p.name}-${i}`} className={cn('relative flex flex-col gap-4', p.featured && 'border-2 border-accent')}>
            {p.featured && <span className="absolute -top-3 right-5 rounded-full bg-accent px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent-foreground">Recommended</span>}
            <h3 className="font-display text-xl font-semibold tracking-tight">{p.name}</h3>
            <Amount fee={p.fee} suffix="+ govt. fee" />
            <CheckList items={p.features || []} />
          </PaperCard>
        ))}
      </div>
    </Section>

    <ConsultCta contact={settings.contact} />
  </div>
  );
};

export default Patents;
