import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon';
import { Cta, PageBanner } from '../components/shared';
import { COURSES } from '../data/content';

const Courses = () => (
  <div>
    <PageBanner
      eyebrow="Service 04 · Software Training"
      title="Software Training & Technology Courses"
      intro="Learn Technology. Build Projects. Develop Your Career. Practical software training programs for students, faculty members, working professionals and researchers."
      actions={<><Link to="/enquire?service=training" className="button button-primary">Join a Training Program</Link><Link to="/internships" className="button button-outline">45-Day Internship</Link></>}
    />
    <div className="page-body site-container">
      <p className="lead">Our courses emphasise hands-on learning, project development and real-world applications rather than theory alone.</p>

      <h2>Popular Training Programs</h2>
      <div className="domain-grid">
        {COURSES.map((c) => (
          <div className="domain-card" key={c.title}>
            <div className="domain-head"><span className="feature-icon"><Icon name={c.icon} size={20} /></span><h3>{c.title}</h3></div>
            <ul className="checklist is-flush">{c.items.map((i) => <li key={i}>{i}</li>)}</ul>
            <div className="row-actions" style={{ marginTop: 16 }}><Link to={`/enquire?service=training&topic=${encodeURIComponent(c.title)}`} className="button button-light button-small">Enquire about this course →</Link></div>
          </div>
        ))}
      </div>

      <h2>How the training works</h2>
      <div className="feature-grid">
        <div className="feature-item"><span className="feature-icon"><Icon name="code" size={20} /></span><div><h3>Hands-on sessions</h3><p>Every concept is practised in the development environment, not just explained.</p></div></div>
        <div className="feature-item"><span className="feature-icon"><Icon name="briefcase" size={20} /></span><div><h3>Project-based learning</h3><p>Mini and capstone projects build the portfolio you can show to employers or reviewers.</p></div></div>
        <div className="feature-item"><span className="feature-icon"><Icon name="users" size={20} /></span><div><h3>Customisable batches</h3><p>Programs can be tailored for students, faculty members, professionals and institutions.</p></div></div>
      </div>

      <div className="page-card is-note" style={{ marginTop: 20 }}><p>Looking for a program for your whole department or college? See our <Link to="/for-institutions">Institutional Programs</Link> — FDPs, bootcamps, value-added courses and workshops.</p></div>
    </div>
    <Cta title="Ready to build a new skill?" text="Tell us which technology you want to learn and we will suggest the right program and batch." actions={<><Link to="/enquire?service=training" className="button button-primary">Join Training</Link><Link to="/contact" className="button button-outline">Contact Us</Link></>} />
  </div>
);

export default Courses;
