import React from 'react';
import Link from 'next/link';
import Icon from '../components/Icon';
import { Cta, PageBanner } from '../components/shared';
import { IJEPA } from '../data/site';
import { RESEARCH_AREAS } from '../data/content';

const ResearchAreas = () => (
  <div>
    <PageBanner eyebrow="Scope" title="Research Areas" intro="Engineering, technology and interdisciplinary research domains we support across publication, collaboration, research assistance and training." />
    <div className="page-body site-container">
      <div className="feature-grid">
        {RESEARCH_AREAS.map((a) => (
          <div className="feature-item" key={a.title}>
            <span className="feature-icon"><Icon name={a.icon} size={20} /></span>
            <div><h3>{a.title}</h3><p>Publication via {IJEPA.name} · research collaboration · implementation support</p></div>
          </div>
        ))}
        <div className="feature-item">
          <span className="feature-icon"><Icon name="plus" size={20} /></span>
          <div><h3>Other related domains</h3><p>Other engineering and technology domains are considered on a case-by-case basis.</p></div>
        </div>
      </div>
      <div className="page-card is-note" style={{ marginTop: 24 }}><p>Working in one of these areas? Publish through <a href={IJEPA.url} target="_blank" rel="noreferrer">{IJEPA.name}</a>, join a <Link href="/services/research-collaboration">research collaboration</Link>, or get <Link href="/services/research-support">implementation and analysis support</Link>.</p></div>
    </div>
    <Cta title="Tell us about your research area" text="Our coordinator will map your topic to the right publication, collaboration or support option." actions={<><Link href="/contact" className="button button-primary">Discuss Your Research</Link><a href={IJEPA.url} target="_blank" rel="noreferrer" className="button button-outline">Visit {IJEPA.name} ↗</a></>} />
  </div>
);

export default ResearchAreas;
