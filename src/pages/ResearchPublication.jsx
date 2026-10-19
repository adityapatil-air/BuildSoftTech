import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon';
import { Cta, Features, PageBanner, Steps } from '../components/shared';
import logo from '../assets/logo.png';
import { IJEPA } from '../data/site';
import { PUBLICATION_PROCESS, PUBLICATION_SUPPORT, RESEARCH_AREAS, WHO_CAN_SUBMIT, WHY_IJEPA } from '../data/content';

const ResearchPublication = () => (
  <div>
    <PageBanner
      eyebrow="Service 01 · Research Publication"
      title={`Publish Your Research with ${IJEPA.name}`}
      crumbs={[{ to: '/services', label: 'Services' }]}
      intro={`BuildSoftTech provides professional research publication support through the ${IJEPA.fullName} (${IJEPA.name}).`}
      actions={<><a href={IJEPA.url} target="_blank" rel="noreferrer" className="button button-primary">Visit {IJEPA.name} ↗</a><a href={IJEPA.submitUrl} target="_blank" rel="noreferrer" className="button button-outline">Submit Your Paper</a></>}
    />

    <div className="page-body site-container">
      <div className="two-col is-wide-left">
        <div>
          <p className="lead">{IJEPA.name} provides a platform for researchers, academicians, faculty members, research scholars and students to disseminate original research and innovative developments across engineering, technology and interdisciplinary research domains.</p>
          <p>{IJEPA.name} is published by BuildSoftTech. The journal runs its own editorial workflow, peer review, issues and author guidelines on its dedicated website; this page explains the support BuildSoftTech provides around that process.</p>
        </div>
        <div className="page-card is-beige">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}><img src={logo} alt="" width="44" height="44" style={{ borderRadius: '50%' }} /><h3 style={{ margin: 0 }}>{IJEPA.name} at a glance</h3></div>
          <div className="info-grid" style={{ marginBottom: 12 }}>
            <div className="info-tile"><strong>ISSN:</strong> {IJEPA.issn}</div>
            <div className="info-tile"><strong>Access:</strong> Open access</div>
            <div className="info-tile"><strong>Review:</strong> Peer reviewed</div>
            <div className="info-tile"><strong>Frequency:</strong> Monthly</div>
          </div>
          <div className="row-actions">
            <a href={IJEPA.guidelinesUrl} target="_blank" rel="noreferrer" className="button button-light button-small">Author Guidelines ↗</a>
            <a href={IJEPA.issuesUrl} target="_blank" rel="noreferrer" className="button button-light button-small">Journal Issues ↗</a>
          </div>
        </div>
      </div>

      <h2>Publication Support Through {IJEPA.name}</h2>
      <p>Through our dedicated journal platform, BuildSoftTech supports authors with:</p>
      <div className="page-card"><ul className="checklist cols-2 is-flush" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', columnGap: 24 }}>{PUBLICATION_SUPPORT.map((s) => <li key={s}>{s}</li>)}</ul></div>

      <h2>Research Areas Covered</h2>
      <p>{IJEPA.name} welcomes suitable research contributions from areas including:</p>
      <ul className="chip-list">{RESEARCH_AREAS.map((a) => <li key={a.title}>{a.title}</li>)}<li>Other related engineering and technology domains</li></ul>
      <p><Link to="/research-areas">See all research areas →</Link></p>

      <h2>Publication Process</h2>
      <Steps items={PUBLICATION_PROCESS.map((t) => ({ title: t }))} cols={4} />

      <h2>Who Can Submit?</h2>
      <p>{IJEPA.name} publication services are suitable for:</p>
      <ul className="chip-list">{WHO_CAN_SUBMIT.map((w) => <li key={w}>{w}</li>)}</ul>

      <h2>Why Publish Through {IJEPA.name}?</h2>
      <Features items={WHY_IJEPA} />

      <h2>Important Publication Ethics Statement</h2>
      <div className="page-card is-note">
        <p><Icon name="shieldCheck" size={16} /> At BuildSoftTech and {IJEPA.name}, we encourage original, ethical and responsible research publication. Authors are responsible for the originality, accuracy and integrity of their submitted work. Manuscripts should not contain plagiarism, fabricated data, manipulated results, duplicate publication or inappropriate authorship.</p>
        <p style={{ marginTop: 8 }}>Publication is subject to the journal's editorial and peer-review process. BuildSoftTech/{IJEPA.name} does not guarantee acceptance of any manuscript.</p>
      </div>
    </div>

    <Cta title={`Ready to publish with ${IJEPA.name}?`} text="Submit your manuscript on the IJEPA website, or ask us for formatting and submission guidance first." actions={<><a href={IJEPA.submitUrl} target="_blank" rel="noreferrer" className="button button-primary">Submit Your Paper ↗</a><Link to="/enquire?service=publication" className="button button-outline">Ask for Publication Support</Link></>} />
  </div>
);

export default ResearchPublication;
