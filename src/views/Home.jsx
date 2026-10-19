import React from 'react';
import Link from 'next/link';
import { ButtonLink, Container, Eyebrow, H2, PaperCard, Section, SectionHead, StepCards, TextLink } from '../components/ui';
import { IJEPA, SITE } from '../data/site';
import { CORE_SERVICES, MISSION, WHY_US, WORKFLOW } from '../data/content';

// Photos: Unsplash (free licence), hot-linked. Replace with the client's own photos when available.
const UNSPLASH = (id) => `https://images.unsplash.com/${id}?w=900&q=70&auto=format&fit=crop`;
const AUDIENCES = [
  { href: '/for-faculty', photo: UNSPLASH('photo-1524178232363-1fb2b075b655'), alt: 'A lecturer presenting to a seminar room', title: 'Faculty Members', sub: 'Research & professional growth', text: 'Publication support, collaboration, research profile development.' },
  { href: '/for-students', photo: UNSPLASH('photo-1523240795612-9a054b0db644'), alt: 'Students working together over a laptop in a library', title: 'Students', sub: 'Learn · Build · Showcase', text: 'Software training, internships, final-year and mini projects.' },
  { href: '/for-research-scholars', photo: UNSPLASH('photo-1434030216411-0b793f4b4173'), alt: 'A researcher taking handwritten notes at a desk', title: 'Research Scholars', sub: 'Problem to publication', text: 'Literature survey, methodology, implementation, research writing.' },
  { href: '/for-institutions', photo: UNSPLASH('photo-1562774053-701939374585'), alt: 'A university building behind a lawn', title: 'Institutions', sub: 'Colleges & universities', text: 'FDPs, bootcamps, research-development and department programs.' },
];

const CTA_BY_SERVICE = {
  '/services/research-publication': 'About publication',
  '/services/research-collaboration': 'Collaborate',
  '/courses': 'View classes',
  '/internships': 'Internship details',
};

const dayLabel = (d = '') => d.replace(/^(\d+)\s*days?$/i, '$1-Day');

const Home = ({ settings }) => {
  const intern = settings?.internship || { fee: '₹3,000/-', duration: '45 Days' };
  const contact = { ...SITE, ...(settings?.contact || {}) };

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-border bg-primary text-primary-foreground">
        <div className="hero-grid-bg">
          <Container className="grid items-center gap-10 py-16 lg:grid-cols-2 lg:py-24">
            <div>
              <Eyebrow tone="accent">BuildSoftTech · Publisher of IJEPA</Eyebrow>
              <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
                Research. Publish. Learn. Innovate.
              </h1>
              <p className="mt-4 text-base font-medium opacity-90">
                Professional Research Publication, Research Collaboration, Internship &amp; Technology Training Services
              </p>
              <p className="mt-4 max-w-lg text-base leading-relaxed opacity-85">
                BuildSoftTech empowers researchers, academicians and students with ethical research support, publication assistance, collaborative research opportunities, practical internships and industry-oriented technology training.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/services" variant="accent">Explore our services</ButtonLink>
                <ButtonLink href={IJEPA.url} variant="outline-light">Visit the IJEPA journal ↗</ButtonLink>
              </div>
              <p className="mt-6 text-sm opacity-70">
                Questions?{' '}
                <a href={`mailto:${contact.email}`} className="underline underline-offset-2">{contact.email}</a>
                {' · '}
                <a href={`tel:${contact.phoneLink}`} className="underline underline-offset-2">{contact.phoneDisplay}</a>
              </p>
            </div>
            <div className="overflow-hidden rounded-xl border border-primary-foreground/15 shadow-lg">
              <img src="/hero.jpg" alt="Students and researchers working together over a laptop and printed journals" width={1536} height={1024} className="h-full w-full object-cover" />
            </div>
          </Container>
        </div>
      </section>

      {/* Services */}
      <Section>
        <Eyebrow>What we do</Eyebrow>
        <H2 className="mt-2">Our core services</H2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Four verticals, one objective: bridge the gap between research, academic requirements and industry-oriented technology skills.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {CORE_SERVICES.map((s, i) => (
            <Link key={s.to} href={s.to} className="paper-card group rounded-xl p-6 transition-transform hover:-translate-y-0.5">
              <span className="font-display text-sm font-semibold text-accent">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-foreground">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
              <span className="mt-4 inline-block text-sm font-semibold text-primary group-hover:underline">{CTA_BY_SERVICE[s.to] || 'Learn more'} →</span>
            </Link>
          ))}
        </div>
      </Section>

      {/* About strip */}
      <section className="border-y border-border bg-secondary">
        <Container className="py-14">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h2 className="font-display text-3xl font-semibold tracking-tight">About BuildSoftTech</h2>
              <p className="mt-2 font-display text-lg text-primary">Building Research. Developing Skills. Creating Opportunities.</p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                BuildSoftTech is a professional research and technology services organization dedicated to supporting researchers, faculty members, Ph.D. scholars, postgraduate and undergraduate students and academic institutions through ethical research publication support, collaborative research opportunities, software training, internships and technology skill development.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Our objective is to bridge the gap between research, academic requirements and industry-oriented technology skills through structured, transparent and quality-focused services.
              </p>
              <TextLink href="/about" className="mt-4 inline-block text-sm font-semibold">More about us →</TextLink>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Our mission</p>
              <ul className="mt-4 space-y-3">
                {MISSION.slice(0, 5).map((m) => (
                  <li key={m} className="flex gap-3 text-sm leading-relaxed text-foreground">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {m}
                  </li>
                ))}
              </ul>
              <TextLink href="/about#mission" className="mt-4 inline-block text-sm font-semibold">Vision &amp; full mission →</TextLink>
            </div>
          </div>
        </Container>
      </section>

      {/* Who we serve */}
      <Section>
        <SectionHead eyebrow="Who we serve" title="Built for the academic community" text="Services designed around the needs of each group we work with." />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {AUDIENCES.map((a) => (
            <Link key={a.href} href={a.href} className="paper-card group overflow-hidden rounded-xl transition-transform hover:-translate-y-0.5">
              <div className="aspect-[16/10] overflow-hidden bg-secondary">
                <img src={a.photo} alt={a.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-semibold tracking-tight">{a.title}</h3>
                <p className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-accent">{a.sub}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.text}</p>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* IJEPA */}
      <section className="border-y border-border bg-primary text-primary-foreground">
        <div className="hero-grid-bg">
          <Container className="grid items-center gap-8 py-14 md:grid-cols-[auto_1fr_auto]">
            <img src="/logo.png" alt="" width="64" height="64" className="h-16 w-16 rounded-full bg-white" />
            <div>
              <Eyebrow tone="accent">Our journal</Eyebrow>
              <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight">Research Paper Publication — IJEPA</h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed opacity-85">
                Publish your original research through IJEPA, a dedicated platform for engineering, technology and interdisciplinary research. BuildSoftTech provides manuscript formatting, submission guidance, peer-review coordination and publication-process support.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={IJEPA.url} variant="outline-light">Visit IJEPA ↗</ButtonLink>
              <ButtonLink href={IJEPA.submitUrl} variant="accent">Submit your paper</ButtonLink>
            </div>
          </Container>
        </div>
      </section>

      {/* Workflow */}
      <Section>
        <SectionHead eyebrow="How we work" title="Our research publication workflow" text="A structured, transparent path from the first conversation to publication." />
        <div className="mt-10"><StepCards items={WORKFLOW} cols={3} /></div>
      </Section>

      {/* Internship */}
      <section className="border-y border-border bg-secondary">
        <Container className="grid items-center gap-8 py-14 md:grid-cols-[1fr_auto]">
          <div>
            <Eyebrow>Paid internship program</Eyebrow>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight">
              {dayLabel(intern.duration)} Internship <span className="text-accent">· {intern.fee}</span>
            </h2>
            {intern.nextBatch && <p className="mt-2 text-sm font-semibold text-primary">Next batch: {intern.nextBatch}</p>}
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Get 45 days of practical technology training, hands-on project experience, mentor guidance and an Internship Completion Certificate. Choose from AI/ML, Data Science, Python, Web Development, Full Stack, Cybersecurity, Cloud, IoT and other emerging technologies.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/internships" variant="primary">Program details</ButtonLink>
            <ButtonLink href="/internships#apply" variant="outline">Apply now</ButtonLink>
          </div>
        </Container>
      </section>

      {/* Why us */}
      <Section>
        <SectionHead eyebrow="Why BuildSoftTech" title="Why researchers & students choose us" />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_US.slice(0, 6).map((w) => (
            <PaperCard key={w.title}>
              <h3 className="font-display text-lg font-semibold tracking-tight">{w.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{w.text}</p>
            </PaperCard>
          ))}
        </div>
      </Section>

      {/* Contact */}
      <section id="contact" className="border-t border-border bg-secondary">
        <Container className="grid gap-10 py-16 md:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-semibold tracking-tight">Have a research idea or want to develop a new skill?</h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
              Let's turn your research idea into meaningful research and your learning goals into practical skills. Write to us or call the office.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href="/contact" variant="primary">Contact us</ButtonLink>
              <ButtonLink href="/services" variant="outline">Explore our services</ButtonLink>
            </div>
          </div>
          <PaperCard>
            <ul className="space-y-3 text-sm">
              <li><span className="font-semibold text-foreground">Email: </span><a href={`mailto:${contact.email}`} className="text-primary hover:underline">{contact.email}</a></li>
              <li><span className="font-semibold text-foreground">Phone: </span><a href={`tel:${contact.phoneLink}`} className="text-primary hover:underline">{contact.phoneDisplay}</a></li>
              <li><span className="font-semibold text-foreground">Office: </span><span className="text-muted-foreground">{contact.address}</span></li>
              <li><span className="font-semibold text-foreground">Journal portal: </span><a href={IJEPA.url} target="_blank" rel="noreferrer" className="text-primary hover:underline">ijepa.vercel.app ↗</a></li>
            </ul>
            <p className="mt-5 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
              Verify before you publish: we encourage researchers to check a journal's current indexing and coverage status directly with the indexing service (for example, Scopus source lists) rather than relying on claims made by any service provider. <Link href="/research-ethics" className="text-primary hover:underline">Our integrity commitment</Link>.
            </p>
          </PaperCard>
        </Container>
      </section>
    </div>
  );
};

export default Home;
