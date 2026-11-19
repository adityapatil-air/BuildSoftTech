import React from 'react';
import Link from 'next/link';
import EnquiryForm from '../components/EnquiryForm';
import { CheckList, Ico, PageHero, SectionHead, Steps } from '../components/ui';
import { COLORS, COURSES, DS_SYLLABUS, TRAINING_INCLUDES, TRAINING_MODES } from '../data/content';

const Training = ({ settings, batches, course }) => {
  const courses = settings.courses;
  return (
    <div className="pub">
      <PageHero
        crumb="Training"
        title="Job-ready software training programs"
        lead="Learn from experienced trainers through live classes, real projects and personal mentoring. Choose the mode and schedule that fits you."
      >
        <a className="btn btn-primary" href="#enquiry">Book a free demo class</a>
        <a className="btn btn-ghost" href="#courses">See all courses</a>
      </PageHero>

      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Training modes" title="Learn your way" />
          <div className="modes">
            {TRAINING_MODES.map((m) => (
              <div key={m.title} className={`mode ${m.color}`}>
                <div className="icon-box"><Ico name={m.icon} /></div>
                <h3>{m.title}</h3>
                <p>{m.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt" id="courses" style={{ scrollMarginTop: 80 }}>
        <div className="wrap">
          <SectionHead eyebrow="Course catalogue" title={`${courses.length} programs, one goal: get you job-ready`} lead="EMI and instalment options available on most courses." />
          <div className="grid grid-3">
            {courses.map((c, i) => (
              <article key={`${c.title}-${i}`} className="card course" style={{ '--c': COLORS[i % COLORS.length] }}>
                <div className="course-top">
                  <div className="row"><Ico name={c.icon || COURSES[i]?.icon || 'code'} size={28} />{c.duration && <span className="meta">{c.duration}</span>}</div>
                  <h3>{c.title}</h3>
                </div>
                <div className="course-body">
                  {c.summary && <p>{c.summary}</p>}
                  {c.tags?.some((t) => t.trim()) && <div className="tags">{c.tags.map((t) => t.trim()).filter(Boolean).map((t) => <span key={t} className="tag">{t}</span>)}</div>}
                  <div className="row">
                    {String(c.fee || '').trim() ? <span className="price">{c.fee}</span> : <span className="price muted">Fee on request</span>}
                    <a className="btn btn-outline btn-sm" href={`/training?course=${encodeURIComponent(c.title)}#enquiry`}>Enroll</a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {batches}

      <section className="section">
        <div className="wrap two-col">
          <div>
            <span className="eyebrow">What you get</span>
            <h2>More than classes</h2>
            <CheckList items={TRAINING_INCLUDES} />
          </div>
          <div>
            <span className="eyebrow">Sample syllabus</span>
            <h2>Data Science in 10 modules</h2>
            <Steps items={DS_SYLLABUS} cols2 />
          </div>
        </div>
      </section>

      <section className="section alt" id="enquiry" style={{ scrollMarginTop: 80 }}>
        <div className="wrap two-col">
          <div>
            <span className="eyebrow">Enquire now</span>
            <h2>Book a free demo class</h2>
            <p className="lead">Tell us what you want to learn. A counsellor will call you within 24 hours with batch dates and fees.</p>
            <CheckList items={['No-obligation demo session', 'Instalment options', 'Weekend and evening batches']} />
          </div>
          <EnquiryForm key={course || 'none'} variant="demo" options={courses.map((c) => c.title)} defaultTopic={course} />
        </div>
      </section>
    </div>
  );
};

export default Training;
