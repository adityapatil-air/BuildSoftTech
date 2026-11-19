import React from 'react';
import { CheckList, CtaBand, Ico, PageHero, SectionHead } from '../components/ui';
import { AUDIENCES, CORE_VALUES } from '../data/content';

const About = ({ settings }) => (
  <div className="pub">
    <PageHero
      crumb="About"
      title="About BuildSoftTech"
      lead="A Pune-based training and research support organisation helping learners and researchers build skills, gain project experience and publish ethically."
    />

    <section className="section">
      <div className="wrap two-col">
        <div>
          <span className="eyebrow">Who we are</span>
          <h2>Bridging academia and industry</h2>
          <p>BuildSoftTech helps students, working professionals, research scholars and faculty members build practical software skills, gain real project experience, and publish their research ethically in reputed venues.</p>
          <p>Our team combines more than two decades of industry, teaching and research experience.</p>
        </div>
        <div className="grid grid-2">
          <article className="card c-blue">
            <div className="icon-box"><Ico name="target" /></div>
            <h3>Our mission</h3>
            <p>To make quality technical education and research guidance accessible, affordable and outcome-driven for every learner.</p>
          </article>
          <article className="card c-orange">
            <div className="icon-box"><Ico name="sparkles" /></div>
            <h3>Our vision</h3>
            <p>To become a trusted name in India for skill development and ethical research support.</p>
          </article>
        </div>
      </div>
    </section>

    <section className="section alt">
      <div className="wrap">
        <SectionHead eyebrow="Core values" title="What we stand for" />
        <div className="grid grid-3">
          {CORE_VALUES.map((v) => (
            <article key={v.title} className={`card ${v.color}`}>
              <div className="icon-box"><Ico name={v.icon} /></div>
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="section">
      <div className="wrap two-col">
        <article className="card c-violet static founder">
          <div className="founder-head">
            <div className="avatar">SS</div>
            <div><h3>Prof. Sandeep Shiravale</h3><span className="tag">Founder</span></div>
          </div>
          <p>M.E. (Information Technology), Ph.D. research scholar. Assistant Professor since 2012, with 10 years of prior industry experience in networking. CCNA, Palo Alto Networks trainer and Fortinet certified. Research interests: blockchain, additive manufacturing and machine learning.</p>
          <blockquote>&ldquo;I started BuildSoftTech to give learners and researchers the practical guidance I wished I had: real skills, real projects and honest research mentoring.&rdquo;</blockquote>
        </article>
        <div>
          <span className="eyebrow">Who we serve</span>
          <h2>Built for learners at every stage</h2>
          <CheckList items={AUDIENCES} />
        </div>
      </div>
    </section>

    <CtaBand contact={settings.contact} />
  </div>
);

export default About;
