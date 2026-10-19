import React from 'react';
import Link from 'next/link';
import Icon from '../components/Icon';
import HeroVisual from '../components/HeroVisual';
import { Features, SectionHeading, Steps } from '../components/shared';
import AudienceCard from '../components/AudienceCard';
import { IJEPA } from '../data/site';
import { CORE_SERVICES, MISSION, WHY_US, WORKFLOW } from '../data/content';

const Fact = ({ icon, title, text }) => (
  <div className="fact">
    <span className="fact-icon" aria-hidden="true"><Icon name={icon} size={22} /></span>
    <div><strong>{title}</strong><small>{text}</small></div>
  </div>
);

// Photos: Unsplash (free licence), hot-linked. Swap for the client's own photos in /public when available.
const UNSPLASH = (id) => `https://images.unsplash.com/${id}?w=900&q=70&auto=format&fit=crop`;
const AUDIENCES = [
  { to: '/for-faculty', icon: 'graduation', photo: UNSPLASH('photo-1524178232363-1fb2b075b655'), alt: 'A lecturer presenting to a seminar room', title: 'Faculty Members', sub: 'Research & professional growth', text: 'Publication support, collaboration, research profile development.' },
  { to: '/for-students', icon: 'user', photo: UNSPLASH('photo-1523240795612-9a054b0db644'), alt: 'Students laughing together over a laptop in a library', title: 'Students', sub: 'Learn · Build · Showcase', text: 'Software training, internships, final-year and mini projects.' },
  { to: '/for-research-scholars', icon: 'bookOpen', photo: UNSPLASH('photo-1434030216411-0b793f4b4173'), alt: 'A researcher taking handwritten notes at a desk', title: 'Research Scholars', sub: 'Problem to publication', text: 'Literature survey, methodology, implementation, research writing.' },
  { to: '/for-institutions', icon: 'building', photo: UNSPLASH('photo-1562774053-701939374585'), alt: 'A university building behind a lawn', title: 'Institutions', sub: 'Colleges & universities', text: 'FDPs, bootcamps, research-development and department programs.' },
];

// '45 Days' -> '45-Day' for use as an adjective in headings.
const dayLabel = (d = '') => d.replace(/^(\d+)\s*days?$/i, '$1-Day');

const Home = ({ settings }) => {
  const intern = settings?.internship || { fee: '₹3,000/-', duration: '45 Days' };
  return (
  <div className="landing-page">
    <section className="site-hero">
      <div className="site-container hero-grid">
        <div className="hero-copy">
          <span className="hero-badge"><span className="dot-live" /> Publisher of {IJEPA.name} · Peer-reviewed · ISSN {IJEPA.issn}</span>
          <p className="eyebrow">BuildSoftTech</p>
          <h1>Research. Publish.<br /><em>Learn. Innovate.</em></h1>
          <p className="hero-sub">Professional Research Publication, Research Collaboration, Internship &amp; Technology Training Services</p>
          <p className="hero-description">BuildSoftTech empowers researchers, academicians and students with ethical research support, publication assistance, collaborative research opportunities, practical internships and industry-oriented technology training.</p>
          <div className="hero-actions">
            <Link href="/services" className="button button-primary">Explore Our Services <span>→</span></Link>
            <Link href="/contact" className="button button-outline">Contact Us</Link>
          </div>
        </div>
        <HeroVisual />
      </div>
    </section>

    <section className="site-facts">
      <div className="site-container facts-grid">
        <Fact icon="shieldCheck" title="Ethical Research Support" text="Originality, integrity, transparency" />
        <Fact icon="fileText" title="Peer-Reviewed Publishing" text={`Through ${IJEPA.name} · ISSN ${IJEPA.issn}`} />
        <Fact icon="users" title="SCI / Scopus Collaboration" text="Contribution-based authorship" />
        <Fact icon="briefcase" title={`${dayLabel(intern.duration)} Internships`} text={`Project-based, certified, ${intern.fee}`} />
        <Fact icon="code" title="Hands-on Training" text="Python, AI/ML, Full Stack, Cloud" />
      </div>
    </section>

    <div className="site-container">
      <section className="content-section" aria-labelledby="home-services">
        <SectionHeading eyebrow="What we do" title="Our Core Services" id="home-services" text="Four verticals, one objective: bridge the gap between research, academic requirements and industry-oriented technology skills." link="/services" linkLabel="View all services" />
        <div className="card-grid cols-4">
          {CORE_SERVICES.map((s, i) => (
            <Link href={s.to} className="service-card" key={s.to}>
              <span className="service-num" aria-hidden="true">0{i + 1}</span>
              <span className="service-icon"><Icon name={s.icon} size={24} /></span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <span className="section-link">Learn More →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="content-section about-scope">
        <div className="about-copy about-panel">
          <p className="eyebrow accent">About BuildSoftTech</p>
          <h2>Building Research. Developing Skills. Creating Opportunities.</h2>
          <p><strong>BuildSoftTech</strong> is a professional research and technology services organization dedicated to supporting researchers, faculty members, Ph.D. scholars, postgraduate and undergraduate students and academic institutions through ethical research publication support, collaborative research opportunities, software training, internships and technology skill development.</p>
          <p>Our objective is to bridge the gap between research, academic requirements and industry-oriented technology skills through structured, transparent and quality-focused services.</p>
          <Link href="/about" className="button button-primary button-small">Learn More&nbsp; →</Link>
        </div>
        <div className="scope-panel">
          <p className="eyebrow accent">Our Mission</p>
          <h2>What we stand for</h2>
          <ul>{MISSION.slice(0, 5).map((m) => { const t = m.replace(/^To /, ''); return <li key={m}>{t[0].toUpperCase() + t.slice(1)}</li>; })}</ul>
          <Link href="/about#mission" className="button button-light button-small">Vision &amp; Mission&nbsp; →</Link>
        </div>
      </section>

      <section className="content-section" aria-labelledby="home-audiences">
        <SectionHeading eyebrow="Who we serve" title="Built for the Academic Community" id="home-audiences" text="Services designed around the needs of each group we work with." />
        <div className="audience-grid">
          {AUDIENCES.map((a) => <AudienceCard key={a.to} href={a.to} {...a} />)}
        </div>
      </section>
    </div>

    <section className="callout">
      <div className="site-container callout-inner">
        <div className="callout-icon"><img src="/logo.png" alt="" /></div>
        <div>
          <h2>Research Paper Publication — {IJEPA.name}</h2>
          <p>Publish your original research through {IJEPA.name}, a dedicated platform for engineering, technology and interdisciplinary research. BuildSoftTech provides manuscript formatting, submission guidance, peer-review coordination and publication-process support.</p>
        </div>
        <div className="callout-actions">
          <a href={IJEPA.url} target="_blank" rel="noreferrer" className="button button-outline">Visit {IJEPA.name} ↗</a>
          <a href={IJEPA.submitUrl} target="_blank" rel="noreferrer" className="button button-primary">Submit Your Paper</a>
        </div>
      </div>
    </section>

    <div className="site-container">
      <section className="content-section" aria-labelledby="home-workflow">
        <SectionHeading eyebrow="How we work" title="Our Research Publication Workflow" id="home-workflow" text="A structured, transparent path from the first conversation to publication." link="/services/research-support" linkLabel="Research support services" />
        <Steps items={WORKFLOW} cols={3} />
      </section>

      <section className="content-section" aria-labelledby="home-internship">
        <div className="promo-panel">
          <div>
            <p className="eyebrow accent">Paid Internship Program</p>
            <h2 id="home-internship" className="promo-title">{dayLabel(intern.duration)} Internship <span className="promo-price">{intern.fee}</span></h2>
            {intern.nextBatch && <p className="promo-batch">Next batch: {intern.nextBatch}</p>}
            <p>Get {intern.duration.toLowerCase()} of practical technology training, hands-on project experience, mentor guidance and an Internship Completion Certificate. Choose from AI/ML, Data Science, Python, Web Development, Full Stack, Cybersecurity, Cloud, IoT and other emerging technologies.</p>
          </div>
          <div className="hero-actions">
            <Link href="/internships" className="button button-primary">Program Details →</Link>
            <Link href="/contact" className="button button-light">Apply Now</Link>
          </div>
        </div>
      </section>

      <section className="content-section is-last" aria-labelledby="home-why">
        <SectionHeading eyebrow="Why choose BuildSoftTech" title="Why Researchers &amp; Students Choose Us" id="home-why" />
        <Features items={WHY_US.slice(0, 6)} />
      </section>
    </div>

    <section className="callout is-centered is-flush">
      <div className="site-container callout-inner">
        <div>
          <h2>Have a Research Idea or Want to Develop a New Skill?</h2>
          <p>Let's turn your research idea into meaningful research and your learning goals into practical skills.</p>
        </div>
        <div className="callout-actions">
          <Link href="/contact" className="button button-primary">Contact Us</Link>
          <Link href="/services" className="button button-outline">Explore Our Services</Link>
        </div>
      </div>
    </section>

    <section className="strip site-container">
      <div><h2>Verify before you publish</h2><p>We encourage researchers to verify a journal's current indexing and coverage status directly with the indexing service (for example, Scopus source lists) rather than relying on claims made by any service provider.</p></div>
      <Link href="/research-ethics" className="strip-note">Our research-integrity commitment →</Link>
    </section>
  </div>
  );
};

export default Home;
