import React from 'react';
import Link from 'next/link';
import { Cta, Features, PageBanner } from '../components/shared';
import { IJEPA, SITE } from '../data/site';
import { INTEGRITY_NO, INTEGRITY_YES, MISSION, WHY_US } from '../data/content';

const About = () => (
  <div className="about-page">
    <PageBanner eyebrow="About BuildSoftTech" title="About Us" intro="Building Research. Developing Skills. Creating Opportunities." />

    <div className="page-body site-container">
      <p className="lead">BuildSoftTech was established with the vision of providing a professional platform where academic research and technology education come together.</p>
      <p>We understand the challenges faced by faculty members, researchers and students in preparing quality manuscripts, identifying suitable journals, responding to reviewers, developing research prototypes and acquiring practical technology skills.</p>
      <p>Our team provides structured support throughout the research and learning journey — from research idea development and manuscript preparation to journal selection, technical implementation, publication support and skill development.</p>

      <h2>Organisation</h2>
      <div className="info-grid">
        <div className="info-tile"><strong>Name:</strong> BuildSoftTech</div>
        <div className="info-tile"><strong>Focus:</strong> Research · Publication · Training · Technology</div>
        <div className="info-tile"><strong>Journal:</strong> <a href={IJEPA.url} target="_blank" rel="noreferrer">{IJEPA.name} (ISSN {IJEPA.issn})</a></div>
        <div className="info-tile"><strong>Location:</strong> {SITE.addressShort}</div>
      </div>

      <div className="two-col">
        <div className="page-card is-beige" id="vision">
          <h3>Our Vision</h3>
          <p>To become a trusted research and technology partner for academicians, researchers and students by providing ethical, transparent and quality-driven academic and technical services.</p>
        </div>
        <div className="page-card" id="mission">
          <h3>Our Mission</h3>
          <ul className="checklist is-flush">{MISSION.map((m) => <li key={m}>{m}</li>)}</ul>
        </div>
      </div>

      <h2>Our Four Verticals</h2>
      <div className="table-wrap">
        <table className="data-table">
          <thead><tr><th>Vertical</th><th>Who it serves</th><th>Learn more</th></tr></thead>
          <tbody>
            <tr><td><strong>Research Publication Services</strong></td><td>Faculty, scholars, researchers</td><td><Link href="/services/research-publication">Publication through {IJEPA.name} →</Link></td></tr>
            <tr><td><strong>Research Collaboration</strong></td><td>Faculty, researchers, institutions</td><td><Link href="/services/research-collaboration">SCI / Scopus collaboration →</Link></td></tr>
            <tr><td><strong>Internships &amp; Projects</strong></td><td>UG / PG students</td><td><Link href="/internships">45-day internship →</Link></td></tr>
            <tr><td><strong>Technology Training</strong></td><td>Students, faculty, professionals</td><td><Link href="/courses">Software training →</Link></td></tr>
          </tbody>
        </table>
      </div>

      <h2>Why Researchers &amp; Students Choose Us</h2>
      <Features items={WHY_US} />

      <h2 id="integrity" className="anchor-target">Quality &amp; Research Integrity</h2>
      <p>BuildSoftTech believes that sustainable academic success must be based on originality, integrity and genuine scholarly contribution.</p>
      <div className="two-col">
        <div className="page-card"><h3>We encourage</h3><ul className="checklist is-flush">{INTEGRITY_YES.map((i) => <li key={i}>{i}</li>)}</ul></div>
        <div className="page-card"><h3>We do not support</h3><ul className="checklist is-negative is-flush">{INTEGRITY_NO.map((i) => <li key={i}>{i}</li>)}</ul></div>
      </div>
      <p className="row-actions"><Link href="/research-ethics" className="button button-light button-small">Read our Research &amp; Publication Ethics policy →</Link></p>
    </div>

    <Cta title="Work with a research partner that puts integrity first" text="Tell us about your research goals or the skills you want to build." actions={<><Link href="/contact" className="button button-primary">Contact Us</Link><Link href="/services" className="button button-outline">Explore Services</Link></>} />
  </div>
);

export default About;
