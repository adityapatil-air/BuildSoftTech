import React from 'react';
import Link from 'next/link';
import { CtaBand, Ico, JournalBanner, SectionHead } from '../components/ui';
import { WHY_US } from '../data/content';
import { IJEPA } from '../data/site';

const WHAT_WE_DO = [
  { title: 'Software Training', text: 'job-ready courses', icon: 'code', color: '#2547d0', href: '/training' },
  { title: 'Paid Internship', text: '45 days to 6 months', icon: 'briefcase', color: '#0b9d9a', href: '/internship' },
  { title: 'Research Publication', text: 'Journals, conferences, books', icon: 'book', color: '#6d3be6', href: '/research' },
  { title: 'Patent Support', text: 'Search, filing, grant', icon: 'bulb', color: '#f2711c', href: '/patents' },
];

const SERVICES = [
  { title: 'Software Training', text: 'Data Science, Data Engineering, Data Analytics, DevOps, Python and Django. Online, offline and weekend batches.', icon: 'code', color: 'c-blue', href: '/training', more: 'View courses' },
  { title: 'Paid Internship', text: '45+ day hands-on internships on live projects with a verifiable completion certificate.', icon: 'briefcase', color: 'c-teal', href: '/internship', more: 'Apply now' },
  { title: 'Journal Publication Support', text: 'Guidance for SCI / Scopus-indexed journals, from manuscript preparation to journal selection and revisions.', icon: 'book', color: 'c-violet', href: '/research#journal', more: 'Learn more' },
  { title: 'Conference Publication Support', text: 'IEEE and Springer conference papers: formatting, plagiarism check and submission support.', icon: 'presentation', color: 'c-sun', href: '/research#conference', more: 'Learn more' },
  { title: 'Books & Book Chapters', text: 'Books with ISBN and book chapter support for reputed international publishers.', icon: 'bookmark', color: 'c-pink', href: '/research#book', more: 'Learn more' },
  { title: 'Patent Services', text: 'Patent drafting, filing, publication and examination-response support with registered patent agents.', icon: 'bulb', color: 'c-orange', href: '/patents', more: 'Learn more' },
];

const AVATAR_COLORS = ['#2547d0', '#0b9d9a', '#d61f6f'];
const initials = (name) => String(name || '').split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join('') || '•';

const Home = ({ settings, upcoming }) => {
  const { stats, courses, contact, testimonials } = settings;
  const shownStats = (stats || []).filter((s) => s.value && s.label).slice(0, 4);
  const reviews = (testimonials || []).filter((t) => t.quote && t.name);
  return (
    <div className="pub">
      <section className="hero">
        <div className="glow3" />
        <div className="wrap hero-grid">
          <div>
            <span className="eyebrow">Training &middot; Internship &middot; Research &middot; Patents</span>
            <h1>Learn industry skills. Publish quality research. <span className="hl">Protect your innovation.</span></h1>
            <p className="lead">Job-oriented software training, certified paid internships, and end-to-end research publication and patent support, all under one roof in Pune.</p>
            <div className="btn-row">
              <Link className="btn btn-primary" href="/training">Explore Courses</Link>
              <Link className="btn btn-ghost" href="/research">Research Services</Link>
            </div>
          </div>
          <div className="hero-card">
            <h3>What we do</h3>
            <ul className="hero-list">
              {WHAT_WE_DO.map((w, i) => (
                <li key={w.title}>
                  <Link href={w.href}>
                    <div className="ic" style={{ background: w.color }}><Ico name={w.icon} size={20} /></div>
                    <div><strong>{w.title}</strong><span>{i === 0 ? `${courses.length} ${w.text}` : w.text}</span></div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {shownStats.length === 4 && (
        <section className="stats">
          <div className="wrap">
            <div className="stats-grid">
              {shownStats.map((s) => <div key={s.label} className="stat"><b>{s.value}</b><span>{s.label}</span></div>)}
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="wrap">
          <SectionHead center eyebrow="Our services" title="Everything you need to grow your career and research" lead="Six services, one trusted team." />
          <div className="grid grid-3">
            {SERVICES.map((s) => (
              <article key={s.title} className={`card ${s.color}`}>
                <div className="icon-box"><Ico name={s.icon} /></div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <Link className="more" href={s.href}>{s.more} &rarr;</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="wrap two-col">
          <div>
            <span className="eyebrow">Why BuildSoftTech</span>
            <h2>Practical learning, honest guidance</h2>
            <p className="lead">We keep batches small, projects real and our research process transparent, so you get results you can stand behind.</p>
            <Link className="btn btn-blue" href="/about">About us</Link>
          </div>
          <div className="grid grid-2">
            {WHY_US.map((f) => (
              <div key={f.title} className={`feature ${f.color}`}>
                <div className="icon-box"><Ico name={f.icon} /></div>
                <div><h3>{f.title}</h3><p>{f.text}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <JournalBanner
            title="Publish in our journal, IJEPA"
            text="Open-access, peer-reviewed international journal with double-blind review and a DOI for every article. Editorial decisions are made independently of BuildSoftTech services."
            cta={`Visit ${IJEPA.label}`}
            href={IJEPA.url}
          />
        </div>
      </section>

      {upcoming}

      {reviews.length > 0 && (
        <section className="section">
          <div className="wrap">
            <SectionHead center eyebrow="Testimonials" title="What our learners say" />
            <div className="grid grid-3">
              {reviews.map((t, i) => (
                <figure key={`${t.name}-${i}`} className="quote">
                  <div className="stars" aria-label="5 stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                  <p>&ldquo;{t.quote}&rdquo;</p>
                  <figcaption className="who">
                    <div className="avatar" style={{ background: AVATAR_COLORS[i % AVATAR_COLORS.length] }}>{initials(t.name)}</div>
                    <div><b>{t.name}</b>{t.role && <span>{t.role}</span>}</div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand contact={contact} />
    </div>
  );
};

export default Home;
