import React from 'react';
import Link from 'next/link';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';

// Shared building blocks for the public pages, in the editorial style of the Lovable design.

export const Container = ({ className, children }) => (
  <div className={cn('mx-auto max-w-6xl px-4 sm:px-6', className)}>{children}</div>
);

export const Eyebrow = ({ children, tone = 'muted', className }) => (
  <p className={cn('text-xs font-semibold uppercase tracking-[0.18em]', tone === 'accent' ? 'text-accent' : 'text-muted-foreground', className)}>
    {children}
  </p>
);

export const H2 = ({ children, className, id }) => (
  <h2 id={id} className={cn('font-display text-3xl font-semibold tracking-tight sm:text-4xl', className)}>{children}</h2>
);

export const H3 = ({ children, className }) => (
  <h3 className={cn('font-display text-xl font-semibold tracking-tight text-foreground', className)}>{children}</h3>
);

const isExternal = (href = '') => /^(https?:|mailto:|tel:)/.test(href);

// variant: accent | primary | outline-light (on navy) | outline
export const ButtonLink = ({ href, children, variant = 'primary', className, newTab }) => {
  const cls = cn(
    'inline-flex items-center justify-center gap-1.5 rounded-md px-5 py-2.5 text-sm font-semibold transition-opacity hover:opacity-90',
    variant === 'accent' && 'bg-accent text-accent-foreground',
    variant === 'primary' && 'bg-primary text-primary-foreground',
    variant === 'outline-light' && 'border border-primary-foreground/30 hover:bg-primary-foreground/10 hover:opacity-100',
    variant === 'outline' && 'border border-border bg-card text-foreground hover:bg-secondary hover:opacity-100',
    className,
  );
  if (isExternal(href)) {
    const ext = href.startsWith('http');
    return <a href={href} className={cls} target={ext || newTab ? '_blank' : undefined} rel={ext ? 'noreferrer' : undefined}>{children}</a>;
  }
  return <Link href={href} className={cls}>{children}</Link>;
};

export const TextLink = ({ href, children, className }) =>
  isExternal(href)
    ? <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className={cn('text-primary hover:underline', className)}>{children}</a>
    : <Link href={href} className={cn('text-primary hover:underline', className)}>{children}</Link>;

// Navy hero with the faint grid, used at the top of every inner page.
export const PageHero = ({ eyebrow, title, intro, actions, children, crumbs }) => (
  <section className="border-b border-border bg-primary text-primary-foreground">
    <div className="hero-grid-bg">
      <Container className="py-16 lg:py-20">
        {crumbs && (
          <p className="mb-4 text-xs opacity-60">
            <Link href="/" className="hover:underline">Home</Link>
            {crumbs.map((c) => <React.Fragment key={c.label}> / {c.href ? <Link href={c.href} className="hover:underline">{c.label}</Link> : c.label}</React.Fragment>)}
          </p>
        )}
        {eyebrow && <Eyebrow tone="accent">{eyebrow}</Eyebrow>}
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">{title}</h1>
        {intro && <p className="mt-5 max-w-2xl text-base leading-relaxed opacity-85">{intro}</p>}
        {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
        {children}
      </Container>
    </div>
  </section>
);

export const Section = ({ children, className, id, tone }) => (
  <section id={id} className={cn(tone === 'secondary' && 'border-y border-border bg-secondary', 'scroll-mt-24')}>
    <Container className={cn('py-16 lg:py-20', className)}>{children}</Container>
  </section>
);

export const SectionHead = ({ eyebrow, title, text, id }) => (
  <div className="max-w-3xl">
    {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
    <H2 id={id} className={eyebrow ? 'mt-2' : ''}>{title}</H2>
    {text && <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">{text}</p>}
  </div>
);

export const PaperCard = ({ children, className, as: As = 'div', ...rest }) => (
  <As className={cn('paper-card rounded-xl p-6', className)} {...rest}>{children}</As>
);

export const Panel = ({ children, className }) => (
  <div className={cn('rounded-xl border border-border bg-secondary p-8', className)}>{children}</div>
);

export const Pill = ({ children, className }) => (
  <span className={cn('inline-block rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-wider text-secondary-foreground', className)}>{children}</span>
);

export const CheckList = ({ items, cols = 1, className }) => (
  <ul className={cn('grid gap-2.5', cols === 2 && 'sm:grid-cols-2', cols === 3 && 'sm:grid-cols-2 lg:grid-cols-3', className)}>
    {items.map((t) => (
      <li key={t} className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground">
        <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
        <span>{t}</span>
      </li>
    ))}
  </ul>
);

export const DotList = ({ items, className }) => (
  <ul className={cn('space-y-2 text-sm text-muted-foreground', className)}>
    {items.map((t) => <li key={t}>• {t}</li>)}
  </ul>
);

export const Chips = ({ items }) => (
  <ul className="flex flex-wrap gap-2">
    {items.map((t) => <li key={t} className="rounded-full border border-border bg-card px-3 py-1.5 text-sm text-foreground">{t}</li>)}
  </ul>
);

// Numbered step cards (01, 02 …) in the Lovable style.
export const StepCards = ({ items, cols = 4, pad = true }) => (
  <div className={cn('grid gap-5 sm:grid-cols-2', cols === 4 && 'lg:grid-cols-4', cols === 3 && 'lg:grid-cols-3')}>
    {items.map((s, i) => (
      <PaperCard key={s.title}>
        <span className="font-display text-2xl font-semibold text-accent">{pad ? String(i + 1).padStart(2, '0') : i + 1}</span>
        {s.label && <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{s.label}</p>}
        <h3 className="mt-2 font-display text-lg font-semibold tracking-tight">{s.title}</h3>
        {s.text && <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>}
      </PaperCard>
    ))}
  </div>
);

// Vertical timeline (internship phases, workflow).
export const Timeline = ({ items }) => (
  <ol className="relative space-y-6 border-l border-border pl-8">
    {items.map((s, i) => (
      <li key={s.title} className="relative">
        <span className="absolute -left-[45px] grid h-7 w-7 place-items-center rounded-full bg-primary font-display text-xs font-semibold text-primary-foreground">{i + 1}</span>
        {s.label && <p className="text-xs font-semibold uppercase tracking-wider text-accent">{s.label}</p>}
        <h3 className="font-display text-lg font-semibold tracking-tight">{s.title}</h3>
        {s.text && <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.text}</p>}
      </li>
    ))}
  </ol>
);

export const FeatureCards = ({ items, cols = 3 }) => (
  <div className={cn('grid gap-5 sm:grid-cols-2', cols === 3 && 'lg:grid-cols-3')}>
    {items.map((f) => (
      <PaperCard key={f.title}>
        <h3 className="font-display text-lg font-semibold tracking-tight">{f.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.text}</p>
      </PaperCard>
    ))}
  </div>
);

export const Faq = ({ items }) => (
  <div className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
    {items.map((q) => (
      <details key={q.q} className="group">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 font-display text-lg font-semibold [&::-webkit-details-marker]:hidden">
          {q.q}
          <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" aria-hidden="true" />
        </summary>
        <p className="px-6 pb-5 text-sm leading-relaxed text-muted-foreground">{q.a}</p>
      </details>
    ))}
  </div>
);

// Closing call to action: a navy band.
export const CtaBand = ({ title, text, actions }) => (
  <section className="bg-primary text-primary-foreground">
    <div className="hero-grid-bg">
      <Container className="flex flex-col gap-6 py-14 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-semibold tracking-tight">{title}</h2>
          {text && <p className="mt-3 text-sm leading-relaxed opacity-85 sm:text-base">{text}</p>}
        </div>
        {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
      </Container>
    </div>
  </section>
);

// Plain bordered notice for disclaimers and notes.
export const Note = ({ children, tone = 'default', className }) => (
  <div className={cn('rounded-lg border px-5 py-4 text-sm leading-relaxed', tone === 'warn' ? 'border-accent/40 bg-accent/10 text-foreground' : 'border-border bg-card text-muted-foreground', className)}>
    {children}
  </div>
);

// Simple data table in the paper style.
export const Table = ({ head, rows, minWidth = 640 }) => (
  <div className="paper-card overflow-x-auto rounded-xl">
    <table className="w-full border-collapse text-sm" style={{ minWidth }}>
      <thead>
        <tr className="bg-secondary text-left text-xs font-semibold uppercase tracking-wider text-secondary-foreground">
          {head.map((h) => <th key={h} className="px-4 py-3">{h}</th>)}
        </tr>
      </thead>
      <tbody className="divide-y divide-border">
        {rows.map((r, i) => <tr key={i} className="align-top">{r.map((c, j) => <td key={j} className="px-4 py-3">{c}</td>)}</tr>)}
      </tbody>
    </table>
  </div>
);
