import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon';
import { Cta, PageBanner, Steps } from '../components/shared';
import { WORKFLOW } from '../data/content';

const ALL_SERVICES = [
  { to: '/services/research-publication', icon: 'fileText', title: 'Research Paper Publication Support — IJEPA', text: 'Submission guidance, formatting, quality checks, peer-review coordination and publication-process assistance through our own peer-reviewed journal.' },
  { to: '/services/research-collaboration', icon: 'users', title: 'SCI / Scopus Research Collaboration', text: 'Contribution-based collaboration on research articles targeted toward suitable SCI/SCIE or Scopus-indexed journals, with transparent authorship policy.' },
  { to: '/services/research-support', icon: 'flask', title: 'Research Support Services', text: 'Research idea development, literature review, methodology, implementation support and results analysis across the research lifecycle.' },
  { to: '/internships', icon: 'briefcase', title: 'Internship Programs', text: '45-day paid, industry-oriented internship combining training, hands-on practice, project development, mentoring and certification.' },
  { to: '/courses', icon: 'code', title: 'Software Training & Technology Courses', text: 'Practical programs in Python, Data Science, AI/ML, Full Stack, Cloud & DevOps and Cybersecurity for students, faculty and professionals.' },
  { to: '/for-institutions', icon: 'building', title: 'Institutional Programs', text: 'Faculty development programs, student bootcamps, research-development workshops and department-level programs for colleges and universities.' },
];

const Services = () => (
  <div>
    <PageBanner eyebrow="What we do" title="Our Services" intro="Structured, transparent and quality-focused research and technology services for researchers, faculty, students and institutions." />
    <div className="page-body site-container">
      <div className="card-grid">
        {ALL_SERVICES.map((s, i) => (
          <Link to={s.to} className="service-card" key={s.to}>
            <span className="service-num" aria-hidden="true">0{i + 1}</span>
            <span className="service-icon"><Icon name={s.icon} size={24} /></span>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
            <span className="section-link">Learn More →</span>
          </Link>
        ))}
      </div>

      <h2 style={{ marginTop: 44 }}>Our Research Publication Workflow</h2>
      <p>Every research engagement follows the same nine-step path, so you always know where your work stands.</p>
      <Steps items={WORKFLOW} cols={3} />

      <div className="page-card is-note" style={{ marginTop: 24 }}>
        <p><strong>Two different offerings:</strong> publication through IJEPA (our own journal) and SCI/Scopus research collaboration (contribution-based work on articles targeted toward third-party indexed journals) are separate services. Journal acceptance, indexing and authorship are never guaranteed.</p>
      </div>
    </div>
    <Cta title="Not sure which service fits?" text="Tell us about your goals and our coordinator will suggest the right path." actions={<><Link to="/enquire" className="button button-primary">Register / Enquire</Link><Link to="/faq" className="button button-outline">Read the FAQ</Link></>} />
  </div>
);

export default Services;
