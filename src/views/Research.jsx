import React from 'react';
import { ButtonLink, CheckList, ConsultCta, Container, Eyebrow, IconTile, Note, PageHero, PaperCard, Section, Table } from '../components/ui';
import { BOOK_PACKAGES, BOOK_SERVICES, CHAPTER_SERVICES, COLLABORATION, CONFERENCE_SERVICES, JOURNAL_SERVICES } from '../data/content';
import { IJEPA } from '../data/site';

const SUBNAV = [
  ['#journal', 'SCI / Scopus journals'],
  ['#conference', 'IEEE / Springer conferences'],
  ['#chapter', 'Book chapters'],
  ['#book', 'Books with ISBN'],
  ['#ijepa', 'IJEPA journal'],
];

const Block = ({ id, icon, num, title, children }) => (
  <PaperCard as="section" id={id} className="scroll-mt-24 p-6 sm:p-8">
    <div className="flex items-center gap-4">
      <IconTile name={icon} />
      <div>
        <span className="font-display text-sm font-semibold text-accent">{num}</span>
        <h2 className="font-display text-2xl font-semibold tracking-tight">{title}</h2>
      </div>
    </div>
    <div className="mt-6">{children}</div>
  </PaperCard>
);

const Sub = ({ children, className = '' }) => <h3 className={`mb-4 font-display text-lg font-semibold tracking-tight ${className}`}>{children}</h3>;

const Research = ({ settings }) => (
  <div>
    <PageHero
      crumbs={[{ label: 'Research' }]}
      eyebrow="Research & publication"
      title="Research & publication support"
      intro="From idea to publication, we guide scholars, faculty and students through writing, editing, formatting, journal selection, submission and reviewer responses."
      actions={<ButtonLink href="/contact?service=Journal%20publication" variant="accent">Get a free manuscript evaluation</ButtonLink>}
    />

    <Section>
      <nav aria-label="Research services" className="flex flex-wrap gap-2">
        {SUBNAV.map(([href, label]) => (
          <a key={href} href={href} className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary">{label}</a>
        ))}
      </nav>
      <Note tone="warn" className="mt-6">Final acceptance is always decided by the journal’s or publisher’s independent peer review. We help you give your work its best chance.</Note>

      <div className="mt-10 space-y-8">
        <Block id="journal" icon="book" num="01" title="SCI / Scopus-indexed journal publication support">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <Sub>Services</Sub>
              <CheckList items={JOURNAL_SERVICES} />
            </div>
            <div>
              <Sub>Research collaboration program</Sub>
              <CheckList items={COLLABORATION} />
              <Sub className="mt-8">Packages</Sub>
              <Table
                minWidth={420}
                head={['Package', 'Includes', 'Fee']}
                rows={settings.researchPackages.map((p) => [
                  <strong key="n" className="font-semibold text-foreground">{p.name}</strong>,
                  <span key="i" className="text-muted-foreground">{p.includes}</span>,
                  <span key="f" className="whitespace-nowrap">{String(p.fee || '').trim() || 'On request'}</span>,
                ])}
              />
            </div>
          </div>
        </Block>

        <Block id="conference" icon="presentation" num="02" title="IEEE conference / Springer proceedings support">
          <CheckList items={CONFERENCE_SERVICES} cols={2} />
        </Block>

        <Block id="chapter" icon="bookmark" num="03" title="Scopus-indexed book chapter support">
          <CheckList items={CHAPTER_SERVICES} />
          <Note className="mt-6">BuildSoftTech is not affiliated with these publishers. Chapters are selected by each book’s editors.</Note>
        </Block>

        <Block id="book" icon="book" num="04" title="Book publication with ISBN">
          <div className="grid gap-8 lg:grid-cols-2">
            <CheckList items={BOOK_SERVICES} />
            <div className="grid gap-3">
              {BOOK_PACKAGES.map((b) => (
                <div key={b.name} className="rounded-lg border border-border bg-secondary px-5 py-4">
                  <h4 className="font-display text-lg font-semibold tracking-tight">{b.name}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">{b.text}</p>
                </div>
              ))}
            </div>
          </div>
        </Block>
      </div>
    </Section>

    <section id="ijepa" className="scroll-mt-24 border-y border-border bg-primary text-primary-foreground">
      <div className="hero-grid-bg">
        <Container className="grid items-center gap-8 py-14 md:grid-cols-[auto_1fr_auto]">
          <span className="grid h-16 w-16 place-items-center rounded-xl bg-accent font-display text-lg font-semibold text-accent-foreground">IJEPA</span>
          <div>
            <Eyebrow tone="accent">Our journal</Eyebrow>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight">Our journal: IJEPA</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed opacity-85">Open-access, peer-reviewed international journal. Submissions are handled by an independent editorial board through double-blind review. Using BuildSoftTech services does not influence editorial decisions.</p>
          </div>
          <ButtonLink href={IJEPA.url} variant="accent">Submit at {IJEPA.label} ↗</ButtonLink>
        </Container>
      </div>
    </section>

    <ConsultCta contact={settings.contact} />
  </div>
);

export default Research;
