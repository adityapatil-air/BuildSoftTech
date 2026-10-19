import React from 'react';
import Link from 'next/link';
import Icon from '../components/Icon';
import { Cta, Features, PageBanner, Steps } from '../components/shared';
import { INTERNSHIP_DOMAINS, INTERNSHIP_ELIGIBLE, INTERNSHIP_GAINS, INTERNSHIP_HIGHLIGHTS, INTERNSHIP_INCLUDES, INTERNSHIP_TIMELINE } from '../data/content';

const Internships = ({ settings }) => {
  const it = settings?.internship || {};
  const highlights = INTERNSHIP_HIGHLIGHTS.map(([k, v]) => [k, k === 'Fee' ? it.fee : k === 'Duration' ? it.duration : k === 'Mode' ? it.mode : v]);
  return (
  <div>
    <PageBanner
      eyebrow="Paid Internship & Project Experience Program"
      title="45-Day Industry-Oriented Internship Program"
      intro="Learn → Practice → Build → Get Certified. A structured, paid internship for students who want practical experience in software technologies, real-world projects and a stronger technical profile."
      actions={<><Link href="/contact" className="button button-primary">Apply for Internship</Link><a href="#domains" className="button button-outline">View Internship Domains</a></>}
    />

    <div className="page-body site-container">
      <div className="price-hero">
        <div>
          <p className="eyebrow accent">Internship Fee</p>
          <div className="price">{it.fee} <small>Duration: {it.duration}</small></div>
          <p>The program combines guided technical training + hands-on practice + project development + mentor support + internship certification.</p>
          {it.nextBatch && <p><strong style={{ color: 'var(--brown)' }}>Next batch:</strong> {it.nextBatch}</p>}
          {it.note && <p>{it.note}</p>}
        </div>
        <div className="price-items">
          <div><strong>{it.duration}</strong><span>Duration</span></div>
          <div><strong>1</strong><span>Guided project</span></div>
          <div><strong>Certificate</strong><span>On completion</span></div>
        </div>
        <div className="hero-actions"><Link href="/contact" className="button button-primary">Apply Now →</Link></div>
      </div>

      <h2>What's Included?</h2>
      <div className="page-card"><ul className="checklist is-flush" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', columnGap: 24 }}>{INTERNSHIP_INCLUDES.map((i) => <li key={i}>{i}</li>)}</ul></div>

      <h2>Internship Learning Process</h2>
      <Steps items={INTERNSHIP_TIMELINE} timeline />

      <h2 id="domains" className="anchor-target">Available Internship Domains</h2>
      <div className="domain-grid">
        {INTERNSHIP_DOMAINS.map((d) => (
          <div className="domain-card" key={d.title}>
            <div className="domain-head"><span className="feature-icon"><Icon name={d.icon} size={20} /></span><h3>{d.title}</h3></div>
            <ul className="checklist is-flush">{d.items.map((i) => <li key={i}>{i}</li>)}</ul>
          </div>
        ))}
      </div>

      <h2>What Students Will Gain</h2>
      <Features items={INTERNSHIP_GAINS} />

      <h2>Internship Program Highlights</h2>
      <div className="two-col is-wide-left">
        <div className="table-wrap">
          <table className="data-table is-compact">
            <thead><tr><th>Feature</th><th>Details</th></tr></thead>
            <tbody>{highlights.map(([f, d]) => <tr key={f}><td><strong>{f}</strong></td><td>{d}</td></tr>)}</tbody>
          </table>
        </div>
        <div>
          <div className="page-card">
            <h3>Who Can Apply?</h3>
            <p>The internship is suitable for:</p>
            <ul className="checklist is-flush">{INTERNSHIP_ELIGIBLE.map((e) => <li key={e}>{e}</li>)}</ul>
          </div>
          <p style={{ fontSize: 12 }}>*Availability of online, offline or hybrid mode is specified according to the actual batch.</p>
        </div>
      </div>
    </div>

    <Cta
      title="Start Your 45-Day Practical Learning Journey"
      text={`Gain technical skills. Build a project. Get practical experience. Earn your internship certificate. Internship Fee: ${it.fee}`}
      actions={<><Link href="/contact" className="button button-primary">Apply for Internship</Link><a href="#domains" className="button button-outline">View Internship Domains</a></>}
    />
  </div>
  );
};

export default Internships;
