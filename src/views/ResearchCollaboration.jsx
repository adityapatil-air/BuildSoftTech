import React from 'react';
import Link from 'next/link';
import { Cta, Flow, PageBanner } from '../components/shared';
import { COLLAB_DISCLAIMER, COLLAB_FLOW, COLLAB_INCLUDES, COLLAB_TOPICS, PACKAGES } from '../data/content';

const statusTag = (s) => (s === 'Available' ? 'is-success' : s === 'Reserved' ? 'is-warning' : 'is-danger');

const ResearchCollaboration = () => (
  <div>
    <PageBanner
      eyebrow="Service 02 · SCI / Scopus Research"
      title="SCI / Scopus Research Collaboration & Publication Support"
      crumbs={[{ href: '/services', label: 'Services' }]}
      intro="Collaborative research opportunities for researchers and academicians interested in contributing to research articles targeted toward suitable SCI/SCIE or Scopus-indexed journals."
      actions={<><a href="#topics" className="button button-primary">Browse Available Topics</a><Link href="/contact" className="button button-outline">Submit Your Interest</Link></>}
    />

    <div className="page-body site-container">
      <p className="lead">BuildSoftTech provides research collaboration and publication-support opportunities for faculty members, research scholars, academicians and professionals interested in contributing to research articles targeted toward suitable SCI/SCIE or Scopus-indexed journals.</p>
      <p>Researchers can explore our available research topics/titles and select a project based on their research interests, technical background and preferred area of contribution.</p>

      <h2>How the Research Collaboration Works</h2>
      <Flow items={COLLAB_FLOW} />

      <h2 id="topics" className="anchor-target">Available Research Collaboration Opportunities</h2>
      <p>Researchers interested in joining an ongoing research project can select from the available research topics listed below.</p>
      <div className="table-wrap">
        <table className="data-table">
          <thead><tr><th>Sr. No.</th><th>Research Paper / Proposed Topic</th><th>Research Area</th><th>Target Index</th><th>Collaboration Duration</th><th>Professional Fee</th><th>Status</th><th></th></tr></thead>
          <tbody>
            {COLLAB_TOPICS.map((t) => (
              <tr key={t.id}>
                <td>{t.id}</td>
                <td><strong>{t.title}</strong></td>
                <td>{t.area}</td>
                <td><span className="tag">{t.index}</span></td>
                <td>{t.duration}</td>
                <td>{t.fee}</td>
                <td><span className={`tag ${statusTag(t.status)}`}>{t.status}</span></td>
                <td><Link href="/contact" className="button button-primary button-small">Apply Now</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="page-card is-note"><p><strong>Note:</strong> The research titles, target journals, timelines and fees displayed on this page are indicative and may change depending on the research scope, implementation requirements, journal requirements and collaboration structure.</p></div>
      <div className="page-card is-danger-note"><p>{COLLAB_DISCLAIMER}</p></div>

      <h2>What the Collaboration May Include</h2>
      <p>Depending on the selected research project and the agreed scope of contribution, the collaboration may involve:</p>
      <div className="page-card"><ul className="checklist is-flush" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', columnGap: 24 }}>{COLLAB_INCLUDES.map((i) => <li key={i}>{i}</li>)}</ul></div>

      <h2>Collaboration Packages</h2>
      <div className="package-grid">
        {PACKAGES.map((p) => (
          <div className={`package ${p.featured ? 'is-featured' : ''}`} key={p.letter}>
            {p.featured && <span className="package-ribbon">Most chosen</span>}
            <span className="package-letter">{p.letter}</span>
            <h3>{p.title}</h3>
            <p className="package-for">{p.forWho}</p>
            <ul className="checklist">{p.includes.map((i) => <li key={i}>{i}</li>)}</ul>
            <div className="package-meta">
              <div><small>Duration</small><strong>{p.duration}</strong></div>
              <div><small>Fee</small><strong>{p.fee}</strong></div>
            </div>
            <Link href={p.to} className={`button ${p.featured ? 'button-primary' : 'button-light'}`}>{p.cta} →</Link>
          </div>
        ))}
      </div>

      <h2>Author Contribution &amp; Authorship Policy</h2>
      <div className="page-card">
        <h3>Genuine Research Collaboration</h3>
        <p>BuildSoftTech follows an ethical and contribution-based authorship approach. Researchers who join a collaborative research project are expected to make a meaningful scholarly contribution to the research work. Depending on the nature and extent of the contribution, eligible collaborators may be considered for authorship in accordance with the authorship requirements of the target journal/publisher.</p>
        <p>The final <strong>author list, author order, corresponding-author designation, research contribution and acknowledgment</strong> will be determined based on actual scholarly contributions and applicable journal policies.</p>
        <h4><span className="dot" />Important</h4>
        <p style={{ margin: 0 }}>Author positions are not sold independently of research contribution. The collaboration fee covers the agreed research, technical, publication-support and related professional services. It does not constitute a guarantee of authorship, acceptance or publication.</p>
      </div>
      <p><Link href="/authorship-policy">Read the full Authorship Policy →</Link></p>
    </div>

    <Cta title="Interested in a Research Collaboration?" text="Browse available research topics → select a topic → submit your interest → our research coordinator will contact you." actions={<><Link href="/contact" className="button button-primary">Submit Your Interest</Link><a href="#topics" className="button button-outline">Browse Topics</a></>} />
  </div>
);

export default ResearchCollaboration;
