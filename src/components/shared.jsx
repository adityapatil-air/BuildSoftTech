import React from 'react';
import Link from 'next/link';
import Icon from './Icon';

// Server-safe building blocks (no hooks). Interactive pieces live in their own client files.

// ---- Page banner used by every inner page (mirrors IJEPA's .page-banner) ----
export const PageBanner = ({ eyebrow, title, intro, crumbs = [], actions }) => (
  <section className="page-banner">
    <div className="site-container">
      <p className="breadcrumb">
        <Link href="/">Home</Link>
        {crumbs.map((c, i) => (
          <React.Fragment key={i}> / {c.href ? <Link href={c.href}>{c.label}</Link> : c.label}</React.Fragment>
        ))}
        {' / '}{title}
      </p>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h1>{title}</h1>
      {intro && <p>{intro}</p>}
      {actions && <div className="hero-actions">{actions}</div>}
    </div>
  </section>
);

// ---- Section heading with eyebrow ----
export const SectionHeading = ({ eyebrow, title, text, link, linkLabel, id }) => (
  <div className="section-heading">
    <div>
      {eyebrow && <p className="eyebrow accent">{eyebrow}</p>}
      <h2 id={id}>{title}</h2>
      {text && <p>{text}</p>}
    </div>
    {link && <Link href={link} className="section-link">{linkLabel || 'Learn more'} →</Link>}
  </div>
);

// ---- Numbered steps grid / timeline ----
export const Steps = ({ items, cols = 3, timeline = false }) => (
  <ol className={`steps ${timeline ? 'is-timeline' : ''} ${cols === 4 ? 'cols-4' : ''}`}>
    {items.map((s, i) => (
      <li key={i}>
        <span className="step-num" aria-hidden="true">{i + 1}</span>
        {s.label && <span className="step-label">{s.label}</span>}
        <strong>{s.title}</strong>
        {s.text && <p>{s.text}</p>}
      </li>
    ))}
  </ol>
);

// ---- Arrow flow (A → B → C) ----
export const Flow = ({ items }) => (
  <ol className="flow" aria-label="Process">
    {items.map((t, i) => <li key={i}><span>{t}</span></li>)}
  </ol>
);

// ---- Feature grid ----
export const Features = ({ items, cols = 3 }) => (
  <div className={`feature-grid ${cols === 2 ? 'cols-2' : ''}`}>
    {items.map((f, i) => (
      <div className="feature-item" key={i}>
        <span className="feature-icon" aria-hidden="true"><Icon name={f.icon || 'check'} size={20} /></span>
        <div><h3>{f.title}</h3><p>{f.text}</p></div>
      </div>
    ))}
  </div>
);

// ---- FAQ accordion (native <details>, no JS needed) ----
export const Faq = ({ items }) => (
  <div className="faq-list">
    {items.map((q, i) => (
      <details className="faq-item" key={i}>
        <summary>{q.q}<span className="faq-chevron" aria-hidden="true"><Icon name="chevronDown" size={16} /></span></summary>
        <div className="faq-answer"><p>{q.a}</p></div>
      </details>
    ))}
  </div>
);

// ---- Big gradient call-to-action band ----
export const Cta = ({ title, text, actions, centered = true, flush = false }) => (
  <section className={`callout ${centered ? 'is-centered' : ''} ${flush ? 'is-flush' : ''}`}>
    <div className="site-container callout-inner">
      <div><h2>{title}</h2>{text && <p>{text}</p>}</div>
      <div className="callout-actions">{actions}</div>
    </div>
  </section>
);
