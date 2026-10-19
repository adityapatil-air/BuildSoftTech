import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from './Icon';
import { SITE, whatsappLink } from '../data/site';

// ---- Page banner used by every inner page (mirrors IJEPA's .page-banner) ----
export const PageBanner = ({ eyebrow, title, intro, crumbs = [], actions }) => (
  <section className="page-banner">
    <div className="site-container">
      <p className="breadcrumb">
        <Link to="/">Home</Link>
        {crumbs.map((c, i) => (
          <React.Fragment key={i}> / {c.to ? <Link to={c.to}>{c.label}</Link> : c.label}</React.Fragment>
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
    {link && <Link to={link} className="section-link">{linkLabel || 'Learn more'} →</Link>}
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

// ---- FAQ accordion ----
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

export const WhatsAppButton = ({ text, label = 'Contact Us on WhatsApp', className = '' }) => (
  <a className={`button button-whatsapp ${className}`} href={whatsappLink(text)} target="_blank" rel="noreferrer">
    <Icon name="whatsapp" size={16} /> {label}
  </a>
);

export const WhatsAppFab = () => (
  <a className="whatsapp-fab" href={whatsappLink(`Hello BuildSoftTech, I would like to know more about your services.`)} target="_blank" rel="noreferrer" aria-label={`Chat on WhatsApp: ${SITE.phoneDisplay}`}>
    <Icon name="whatsapp" size={20} /> <span>WhatsApp</span>
  </a>
);

// ---- Scroll to top on route change ----
export const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) { el.scrollIntoView({ block: 'start' }); return; }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname, hash]);
  return null;
};

// ---- Back to top button ----
export const BackToTop = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  if (!visible) return null;
  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="back-to-top-btn" aria-label="Back to top">
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none"><path d="M7 14l5-5 5 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </button>
  );
};

// ---- Per-route document title ----
const SITE_TITLE = 'BuildSoftTech — Research · Publication · Training · Technology';
const TITLES = {
  '/about': 'About Us',
  '/services': 'Our Services',
  '/services/research-publication': 'Research Paper Publication Support (IJEPA)',
  '/services/research-collaboration': 'SCI / Scopus Research Collaboration',
  '/services/research-support': 'Research Support Services',
  '/internships': '45-Day Paid Internship Program',
  '/courses': 'Software Training & Technology Courses',
  '/research-areas': 'Research Areas',
  '/for-faculty': 'For Faculty Members',
  '/for-students': 'For Students',
  '/for-research-scholars': 'For Research Scholars',
  '/for-institutions': 'Institutional Services',
  '/faq': 'Frequently Asked Questions',
  '/contact': 'Contact Us',
  '/enquire': 'Register / Enquire',
  '/privacy-policy': 'Privacy Policy',
  '/terms': 'Terms & Conditions',
  '/refund-policy': 'Refund & Cancellation Policy',
  '/research-ethics': 'Research & Publication Ethics',
  '/authorship-policy': 'Authorship Policy',
  '/disclaimer': 'Disclaimer',
};
export const RouteTitle = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    const path = pathname.toLowerCase().replace(/\/+$/, '') || '/';
    document.title = path === '/' ? SITE_TITLE : TITLES[path] ? `${TITLES[path]} | BuildSoftTech` : SITE_TITLE;
  }, [pathname]);
  return null;
};
