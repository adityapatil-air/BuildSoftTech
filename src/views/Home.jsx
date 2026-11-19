import React from 'react';
import Link from 'next/link';
import { ButtonLink, ConsultCta, Container, Eyebrow, H2, Ico, IconTile, PaperCard, Section, SectionHead } from '../components/ui';
import { WHY_US } from '../data/content';
import { IJEPA } from '../data/site';

const WHAT_WE_DO = [
  { title: 'Software Training', text: 'job-ready courses', icon: 'code', href: '/training' },
  { title: 'Paid Internship', text: '45 days to 6 months', icon: 'briefcase', href: '/internship' },
  { title: 'Research Publication', text: 'Journals, conferences, books', icon: 'book', href: '/research' },
  { title: 'Patent Support', text: 'Search, filing, grant', icon: 'bulb', href: '/patents' },
];

const SERVICES = [
  { title: 'Software Training', text: 'Data Science, Data Engineering, Data Analytics, DevOps, Python and Django. Online, offline and weekend batches.', icon: 'code', href: '/training', more: 'View courses' },
  { title: 'Paid Internship', text: '45+ day hands-on internships on live projects with a verifiable completion certificate.', icon: 'briefcase', href: '/internship', more: 'Apply now' },
  { title: 'Journal Publication Support', text: 'Guidance for SCI / Scopus-indexed journals, from manuscript preparation to journal selection and revisions.', icon: 'book', href: '/research#journal', more: 'Learn more' },
  { title: 'Conference Publication Support', text: 'IEEE and Springer conference papers: formatting, plagiarism check and submission support.', icon: 'presentation', href: '/research#conference', more: 'Learn more' },
  { title: 'Books & Book Chapters', text: 'Books with ISBN and book chapter support for reputed international publishers.', icon: 'bookmark', href: '/research#book', more: 'Learn more' },
  { title: 'Patent Services', text: 'Patent drafting, filing, publication and examination-response support with registered patent agents.', icon: 'bulb', href: '/patents', more: 'Learn more' },
];

const initials = (name) => String(name || '').split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join('') || '•';

const Home = ({ settings, upcoming }) => {
  const { stats, courses, contact, testimonials } = settings;
  const shownStats = (stats || []).filter((s) => s.value && s.label).slice(0, 4);
  const reviews = (testimonials || []).filter((t) => t.quote && t.name);

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-border bg-primary text-primary-foreground">
        <div className="hero-grid-bg">
          <Container className="grid items-center gap-10 py-16 lg:grid-cols-[1.15fr_1fr] lg:py-24">
            <div>
              <Eyebrow tone="accent">Training · Internship · Research · Patents</Eyebrow>
              <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
                Learn industry skills. Publish quality research. <span className="text-accent">Protect your innovation.</span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed opacity-85">
                Job-oriented software training, certified paid internships, and end-to-end research publication and patent support, all under one roof in Pune.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/training" variant="accent">Explore courses</ButtonLink>
                <ButtonLink href="/research" variant="outline-light">Research services</ButtonLink>
              </div>
              {(contact.email || contact.phoneDisplay) && (
                <p className="mt-6 text-sm opacity-70">
                  Questions?{' '}
                  {contact.email && <a href={`mailto:${contact.email}`} className="underline underline-offset-2">{contact.email}</a>}
                  {contact.email && contact.phoneDisplay && ' · '}
                  {contact.phoneDisplay && <a href={`tel:${contact.phoneLink}`} className="underline underline-offset-2">{contact.phoneDisplay}</a>}
                </p>
              )}
            </div>
            <div className="rounded-xl border border-primary-foreground/15 bg-primary-foreground/5 p-6 backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] opacity-70">What we do</p>
              <ul className="mt-4 divide-y divide-primary-foreground/10">
                {WHAT_WE_DO.map((w, i) => (
                  <li key={w.title}>
                    <Link href={w.href} className="group flex items-center gap-4 py-3.5">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent text-accent-foreground"><Ico name={w.icon} size={20} /></span>
                      <span className="flex-1">
                        <span className="block font-display text-lg font-semibold group-hover:underline">{w.title}</span>
                        <span className="block text-sm opacity-75">{i === 0 ? `${courses.length} ${w.text}` : w.text}</span>
                      </span>
                      <span aria-hidden="true" className="opacity-60 transition-transform group-hover:translate-x-0.5">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </div>
      </section>

      {shownStats.length === 4 && (
        <section className="border-b border-border bg-card">
          <Container className="grid grid-cols-2 gap-6 py-10 md:grid-cols-4">
            {shownStats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-display text-4xl font-semibold tracking-tight text-primary">{s.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </Container>
        </section>
      )}

      {/* Services */}
      <Section>
        <SectionHead eyebrow="Our services" title="Everything you need to grow your career and research" text="Six services, one trusted team." />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Link key={s.title} href={s.href} className="paper-card group flex flex-col rounded-xl p-6 transition-transform hover:-translate-y-0.5">
              <div className="flex items-center justify-between">
                <IconTile name={s.icon} />
                <span className="font-display text-sm font-semibold text-accent">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="mt-4 font-display text-xl font-semibold tracking-tight text-foreground">{s.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
              <span className="mt-4 inline-block text-sm font-semibold text-primary group-hover:underline">{s.more} →</span>
            </Link>
          ))}
        </div>
      </Section>

      {/* Why us */}
      <section className="border-y border-border bg-secondary">
        <Container className="grid gap-10 py-16 lg:grid-cols-[1fr_1.4fr] lg:py-20">
          <div>
            <Eyebrow>Why BuildSoftTech</Eyebrow>
            <H2 className="mt-2">Practical learning, honest guidance</H2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              We keep batches small, projects real and our research process transparent, so you get results you can stand behind.
            </p>
            <ButtonLink href="/about" variant="primary" className="mt-6">About us</ButtonLink>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {WHY_US.map((f) => (
              <PaperCard key={f.title} className="flex gap-4 p-5">
                <IconTile name={f.icon} className="h-10 w-10" />
                <div>
                  <h3 className="font-display text-lg font-semibold tracking-tight">{f.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{f.text}</p>
                </div>
              </PaperCard>
            ))}
          </div>
        </Container>
      </section>

      {/* IJEPA */}
      <section className="border-b border-border bg-primary text-primary-foreground">
        <div className="hero-grid-bg">
          <Container className="grid items-center gap-8 py-14 md:grid-cols-[auto_1fr_auto]">
            <span className="grid h-16 w-16 place-items-center rounded-xl bg-accent font-display text-lg font-semibold text-accent-foreground">IJEPA</span>
            <div>
              <Eyebrow tone="accent">Our journal</Eyebrow>
              <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight">Publish in our journal, IJEPA</h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed opacity-85">
                Open-access, peer-reviewed international journal with double-blind review and a DOI for every article. Editorial decisions are made independently of BuildSoftTech services.
              </p>
            </div>
            <ButtonLink href={IJEPA.url} variant="accent">Visit {IJEPA.label} ↗</ButtonLink>
          </Container>
        </div>
      </section>

      {upcoming}

      {reviews.length > 0 && (
        <Section>
          <SectionHead eyebrow="Testimonials" title="What our learners say" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((t, i) => (
              <PaperCard key={`${t.name}-${i}`} as="figure" className="flex flex-col">
                <blockquote className="flex-1 font-display text-lg leading-relaxed text-foreground">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">{initials(t.name)}</span>
                  <span>
                    <span className="block text-sm font-semibold text-foreground">{t.name}</span>
                    {t.role && <span className="block text-xs text-muted-foreground">{t.role}</span>}
                  </span>
                </figcaption>
              </PaperCard>
            ))}
          </div>
        </Section>
      )}

      <ConsultCta contact={contact} />
    </div>
  );
};

export default Home;
