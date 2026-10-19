import React from 'react';
import Link from 'next/link';
import Icon from '../components/Icon';
import { Cta, PageBanner } from '../components/shared';
import { FACULTY_OUTPUT, FACULTY_SERVICES, INSTITUTIONAL_PROGRAMS, SCHOLAR_SERVICES, STUDENT_SERVICES } from '../data/content';

const GridList = ({ items }) => (
  <div className="page-card"><ul className="checklist is-flush" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', columnGap: 24 }}>{items.map((i) => <li key={i}>{i}</li>)}</ul></div>
);

export const ForFaculty = () => (
  <div>
    <PageBanner eyebrow="For Faculty Members" title="Supporting Academic Research & Professional Growth" intro="BuildSoftTech provides research and technology services specifically designed for faculty members and academic professionals." actions={<Link href="/contact" className="button button-primary">Discuss Your Research</Link>} />
    <div className="page-body site-container">
      <h2>Services for Faculty</h2>
      <GridList items={FACULTY_SERVICES} />
      <h2>Research Output for Academic Documentation</h2>
      <p>Research publications and legitimate scholarly contributions may be relevant to:</p>
      <ul className="chip-list">{FACULTY_OUTPUT.map((o) => <li key={o}>{o}</li>)}</ul>
      <div className="page-card is-note"><p><strong>Note:</strong> BuildSoftTech does not claim that any publication automatically qualifies for promotion, appraisal, NBA, NAAC or NIRF. Eligibility depends on the applicable rules and the institution/regulatory authority.</p></div>
      <div className="card-grid" style={{ marginTop: 28 }}>
        <Link href="/services/research-publication" className="service-card"><span className="service-icon"><Icon name="fileText" size={24} /></span><h3>Publish through IJEPA</h3><p>Peer-reviewed publication support through our own journal.</p><span className="section-link">Learn More →</span></Link>
        <Link href="/services/research-collaboration" className="service-card"><span className="service-icon"><Icon name="users" size={24} /></span><h3>SCI / Scopus Collaboration</h3><p>Contribution-based research collaboration toward indexed journals.</p><span className="section-link">Learn More →</span></Link>
        <Link href="/for-institutions" className="service-card"><span className="service-icon"><Icon name="graduation" size={24} /></span><h3>Faculty Development Programs</h3><p>AI/ML, Data Science, Generative AI, research methodology and academic writing.</p><span className="section-link">Learn More →</span></Link>
      </div>
    </div>
    <Cta title="Plan your next publication with us" text="Research topic consultation is the first step. Tell us what you are working on." actions={<><Link href="/contact" className="button button-primary">Discuss Your Research</Link><Link href="/services/research-collaboration" className="button button-outline">Explore Collaboration</Link></>} />
  </div>
);

export const ForStudents = () => (
  <div>
    <PageBanner eyebrow="For Students" title="Learn. Build. Implement. Showcase." intro="BuildSoftTech helps students develop practical skills beyond classroom learning." actions={<><Link href="/contact" className="button button-primary">Apply for Internship</Link><Link href="/courses" className="button button-outline">Browse Courses</Link></>} />
    <div className="page-body site-container">
      <h2>Student Services</h2>
      <GridList items={STUDENT_SERVICES} />
      <div className="card-grid" style={{ marginTop: 28 }}>
        <Link href="/internships" className="service-card"><span className="service-icon"><Icon name="briefcase" size={24} /></span><h3>45-Day Paid Internship</h3><p>₹3,000/- · training, guided project, mentoring and completion certificate.</p><span className="section-link">Learn More →</span></Link>
        <Link href="/courses" className="service-card"><span className="service-icon"><Icon name="code" size={24} /></span><h3>Software Training</h3><p>Python, Data Science, AI/ML, Full Stack, Cloud &amp; DevOps, Cybersecurity.</p><span className="section-link">Learn More →</span></Link>
        <Link href="/services/research-publication" className="service-card"><span className="service-icon"><Icon name="fileText" size={24} /></span><h3>Publish your project research</h3><p>Turn a strong final-year project into a peer-reviewed paper through IJEPA.</p><span className="section-link">Learn More →</span></Link>
      </div>
    </div>
    <Cta title="Start your practical learning journey" text="Choose an internship domain or a training program and apply in two minutes." actions={<><Link href="/contact" className="button button-primary">Apply for Internship</Link><Link href="/contact" className="button button-outline">Join Training</Link></>} />
  </div>
);

export const ForScholars = () => (
  <div>
    <PageBanner eyebrow="For Research Scholars" title="From Research Problem to Research Publication" intro="Our research-support ecosystem helps Ph.D. and research scholars at every stage of the research lifecycle." actions={<Link href="/contact" className="button button-primary">Discuss Your Research</Link>} />
    <div className="page-body site-container">
      <h2>How we help research scholars</h2>
      <GridList items={SCHOLAR_SERVICES} />
      <div className="card-grid" style={{ marginTop: 28 }}>
        <Link href="/services/research-support" className="service-card"><span className="service-icon"><Icon name="flask" size={24} /></span><h3>Research Support Services</h3><p>Idea development, literature review, methodology, implementation, results analysis.</p><span className="section-link">Learn More →</span></Link>
        <Link href="/services/research-collaboration" className="service-card"><span className="service-icon"><Icon name="users" size={24} /></span><h3>SCI / Scopus Collaboration</h3><p>Join an ongoing research project with contribution-based authorship.</p><span className="section-link">Learn More →</span></Link>
        <Link href="/services/research-publication" className="service-card"><span className="service-icon"><Icon name="fileText" size={24} /></span><h3>Publish through IJEPA</h3><p>Peer-reviewed engineering and technology journal published by BuildSoftTech.</p><span className="section-link">Learn More →</span></Link>
      </div>
    </div>
    <Cta title="Stuck at a stage of your research?" text="Tell us where you are — problem identification, implementation, writing or reviewer response — and we will help you move forward." actions={<><Link href="/contact" className="button button-primary">Discuss Your Research</Link><Link href="/faq" className="button button-outline">Read the FAQ</Link></>} />
  </div>
);

export const ForInstitutions = () => (
  <div>
    <PageBanner eyebrow="Institutional Services" title="Services for Colleges & Universities" intro="BuildSoftTech provides customised institutional programs — faculty development, student training, research development and department-level programs." actions={<Link href="/contact" className="button button-primary">Request a Program Proposal</Link>} />
    <div className="page-body site-container">
      <div className="domain-grid" style={{ gridTemplateColumns: 'repeat(2,1fr)' }}>
        {INSTITUTIONAL_PROGRAMS.map((p) => (
          <div className="domain-card" key={p.title}>
            <div className="domain-head"><span className="feature-icon"><Icon name={p.icon} size={20} /></span><h3>{p.title}</h3></div>
            <ul className="checklist is-flush">{p.items.map((i) => <li key={i}>{i}</li>)}</ul>
          </div>
        ))}
      </div>
      <div className="page-card is-note" style={{ marginTop: 24 }}><p>Programs can be delivered online, offline or in hybrid mode and tailored to your department's curriculum, accreditation goals and research priorities.</p></div>
    </div>
    <Cta title="Bring BuildSoftTech to your campus" text="Share your requirements and we will prepare a customised program proposal for your institution." actions={<><Link href="/contact" className="button button-primary">Request a Proposal</Link><Link href="/contact" className="button button-outline">Contact Us</Link></>} />
  </div>
);
