// Building blocks for the public pages (client reference design). Server-safe: no hooks.
import React from 'react';
import Link from 'next/link';
import {
  Award, BarChart3, Blocks, BookMarked, BookOpen, Brain, Briefcase, Building2, CalendarDays, Cloud, Code2,
  Database, FileSearch, FlaskConical, Globe, GraduationCap, Heart, Infinity as InfinityIcon, Laptop, Lightbulb, Lock, Mail,
  MapPin, Monitor, PenLine, Phone, Presentation, School, ShieldCheck, Sparkles, Target, Terminal, Clock, Users, Zap,
} from 'lucide-react';
import { cn } from '../lib/utils';

const ICONS = {
  award: Award, chart: BarChart3, blocks: Blocks, bookmark: BookMarked, book: BookOpen, brain: Brain, briefcase: Briefcase,
  building: Building2, calendar: CalendarDays, cloud: Cloud, code: Code2, database: Database, search: FileSearch,
  flask: FlaskConical, globe: Globe, cap: GraduationCap, heart: Heart, infinity: InfinityIcon, laptop: Laptop, bulb: Lightbulb,
  lock: Lock, mail: Mail, pin: MapPin, monitor: Monitor, pen: PenLine, phone: Phone, presentation: Presentation,
  school: School, shield: ShieldCheck, sparkles: Sparkles, target: Target, terminal: Terminal, clock: Clock,
  users: Users, zap: Zap,
};

export const Ico = ({ name, size = 24, className }) => {
  const C = ICONS[name] || Sparkles;
  return <C width={size} height={size} strokeWidth={2} className={className} aria-hidden="true" />;
};

export const LogoMark = ({ className = 'logo-mark' }) => (
  <svg className={className} viewBox="0 0 40 40" aria-hidden="true">
    <rect x="2" y="22" width="16" height="16" rx="4" fill="#2547d0" />
    <rect x="22" y="22" width="16" height="16" rx="4" fill="#0b9d9a" />
    <rect x="12" y="2" width="16" height="16" rx="4" fill="#f2711c" />
  </svg>
);

export const Logo = ({ href = '/', sub = 'Skills · Research · Innovation' }) => (
  <Link className="logo" href={href} aria-label="BuildSoftTech home">
    <LogoMark />
    <span>
      <span className="logo-text">Build<span className="s">Soft</span><span className="t">Tech</span></span>
      {sub && <span className="logo-sub">{sub}</span>}
    </span>
  </Link>
);

export const Container = ({ className, children }) => <div className={cn('wrap', className)}>{children}</div>;

export const PageHero = ({ crumb, title, lead, children }) => (
  <section className="hero page-hero">
    <div className="glow3" />
    <div className="wrap">
      <div className="crumbs"><Link href="/">Home</Link> / {crumb}</div>
      <h1>{title}</h1>
      {lead && <p className="lead">{lead}</p>}
      {children && <div className="btn-row">{children}</div>}
    </div>
  </section>
);

export const SectionHead = ({ eyebrow, title, lead, center }) => (
  <div className={cn('section-head', center && 'center')}>
    {eyebrow && <span className="eyebrow">{eyebrow}</span>}
    <h2>{title}</h2>
    {lead && <p className="lead">{lead}</p>}
  </div>
);

export const CheckList = ({ items, cols2, className }) => (
  <ul className={cn('check-list', cols2 && 'cols-2', className)}>
    {items.filter((it) => (typeof it === 'string' ? it.trim() : it)).map((it, i) => <li key={typeof it === 'string' ? `${i}-${it}` : it.key}>{it}</li>)}
  </ul>
);

export const Steps = ({ items, color = 'var(--brand)', cols2 }) => (
  <ol className={cn('steps', cols2 && 'cols-2')}>
    {items.map((it) => {
      const [title, text] = Array.isArray(it) ? it : [it];
      return (
        <li key={title} style={{ '--c': color }}>
          <h3>{title}</h3>
          {text && <p>{text}</p>}
        </li>
      );
    })}
  </ol>
);

// Plan / package price. An empty fee shows "Fee on request" rather than a made-up number.
export const Amount = ({ fee, suffix }) => (
  String(fee || '').trim()
    ? <div className="amount">{fee} {suffix && <small>{suffix}</small>}</div>
    : <div className="amount on-request">Fee on request</div>
);

export const waLink = (number, text) => {
  const digits = String(number || '').replace(/\D/g, '');
  if (!digits) return '';
  return `https://wa.me/${digits}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
};

export const CtaBand = ({ contact, title = 'Ready to start your journey?', text = 'Book a free 20-minute counselling session for training, internship or research guidance.' }) => {
  const wa = waLink(contact?.whatsapp);
  return (
    <section className="section">
      <div className="wrap">
        <div className="cta-band">
          <div>
            <h2>{title}</h2>
            <p>{text}</p>
          </div>
          <div className="btn-row">
            <Link className="btn btn-primary" href="/contact">Book Free Consultation</Link>
            {wa
              ? <a className="btn btn-ghost" href={wa} target="_blank" rel="noreferrer">WhatsApp Us</a>
              : contact?.phoneLink && <a className="btn btn-ghost" href={`tel:${contact.phoneLink}`}>Call {contact.phoneDisplay}</a>}
          </div>
        </div>
      </div>
    </section>
  );
};

export const JournalBanner = ({ title, text, cta, href, id }) => (
  <div className="journal" id={id}>
    <div className="journal-badge">IJEPA</div>
    <div>
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
    <a className="btn" href={href} target="_blank" rel="noreferrer">{cta} &rarr;</a>
  </div>
);
