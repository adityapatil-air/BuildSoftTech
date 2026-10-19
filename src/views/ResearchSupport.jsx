import React from 'react';
import Link from 'next/link';
import Icon from '../components/Icon';
import { Cta, Features, PageBanner, Steps } from '../components/shared';
import { RESEARCH_SUPPORT, WHY_US, WORKFLOW } from '../data/content';

const ResearchSupport = () => (
  <div>
    <PageBanner
      eyebrow="Service 03 · Research Support"
      title="Research Support Services"
      crumbs={[{ href: '/services', label: 'Services' }]}
      intro="BuildSoftTech provides research assistance across different stages of the research lifecycle — from the first idea to results and analysis."
      actions={<Link href="/contact" className="button button-primary">Discuss Your Research</Link>}
    />
    <div className="page-body site-container">
      <h2>Research Assistance</h2>
      <div className="domain-grid">
        {RESEARCH_SUPPORT.map((s) => (
          <div className="domain-card" key={s.title}>
            <div className="domain-head"><span className="feature-icon"><Icon name={s.icon} size={20} /></span><h3>{s.title}</h3></div>
            {s.text && <p style={{ margin: '0 0 8px', fontSize: 13 }}>{s.text}</p>}
            {s.items.length > 0 && <ul className="checklist is-flush">{s.items.map((i) => <li key={i}>{i}</li>)}</ul>}
          </div>
        ))}
      </div>

      <h2>Our Research Publication Workflow</h2>
      <Steps items={WORKFLOW} timeline />

      <h2>Why Researchers Choose Us</h2>
      <Features items={WHY_US} />
    </div>
    <Cta title="Start with a free consultation" text="Discuss your research topic, objectives and requirements with our research coordinator." actions={<><Link href="/contact" className="button button-primary">Discuss Your Research</Link><Link href="/services/research-collaboration" className="button button-outline">Explore Collaboration</Link></>} />
  </div>
);

export default ResearchSupport;
