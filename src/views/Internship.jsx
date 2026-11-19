import React from 'react';
import EnquiryForm from '../components/EnquiryForm';
import { Amount, CheckList, Ico, PageHero, SectionHead, Steps } from '../components/ui';
import { INTERNSHIP_DOMAINS, INTERNSHIP_HIGHLIGHTS, INTERNSHIP_STEPS } from '../data/content';

const PLAN_COLORS = ['c-teal', 'c-blue', 'c-orange'];
const DURATIONS = ['45 days', '2 months', '3 months', '6 months'];

const Internship = ({ settings, batches, plan }) => {
  const plans = settings.internshipPlans;
  const durationFor = (p) => DURATIONS.find((d) => String(p?.duration || '').startsWith(d.split(' ')[0])) || DURATIONS[0];
  return (
    <div className="pub">
      <PageHero
        crumb="Internship"
        title={<>Industry internship program <span className="hl" style={{ color: 'var(--sun)' }}>(minimum 45 days)</span></>}
        lead="Gain real work experience by building live projects under mentor guidance. Ideal for engineering, CS and IT students who need a curriculum internship."
      >
        <a className="btn btn-primary" href="#apply">Apply for internship</a>
      </PageHero>

      <section className="section">
        <div className="wrap two-col">
          <div>
            <span className="eyebrow">Program highlights</span>
            <h2>Real projects. Real certificate.</h2>
            <CheckList items={INTERNSHIP_HIGHLIGHTS} />
          </div>
          <div>
            <span className="eyebrow">Domains</span>
            <h2>Pick your track</h2>
            <div className="grid grid-2 gap-sm">
              {INTERNSHIP_DOMAINS.map((d) => (
                <div key={d.title} className={`feature track ${d.color}`}>
                  <div className="icon-box"><Ico name={d.icon} /></div>
                  <h3>{d.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="wrap">
          <SectionHead center eyebrow="Plans" title="Choose your internship plan" />
          <div className="grid grid-3">
            {plans.map((p, i) => (
              <article key={`${p.name}-${i}`} className={`card plan ${PLAN_COLORS[i % PLAN_COLORS.length]}${p.featured ? ' featured' : ''}`}>
                {p.featured && <span className="badge">Most popular</span>}
                <h3>{p.name}</h3>
                {p.duration && <span className="tag" style={{ alignSelf: 'flex-start' }}>{p.duration}</span>}
                <Amount fee={p.fee} suffix="/ intern" />
                <CheckList items={p.features || []} />
                <a className={`btn ${p.featured ? 'btn-primary' : 'btn-outline'}`} href={`/internship?plan=${encodeURIComponent(p.name)}#apply`}>Choose {p.name}</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="How it works" title="From application to certificate" />
          <Steps items={INTERNSHIP_STEPS} color="var(--teal)" />
          <p style={{ marginTop: 22 }}><b>Eligibility:</b> B.E./B.Tech, BCA, MCA, B.Sc/M.Sc (CS/IT), diploma students and recent graduates.</p>
        </div>
      </section>

      {batches}

      <section className="section alt" id="apply" style={{ scrollMarginTop: 80 }}>
        <div className="wrap two-col">
          <div>
            <span className="eyebrow">Apply</span>
            <h2>Apply for internship</h2>
            <p className="lead">Seats are limited per batch so every intern gets mentor time.</p>
          </div>
          <EnquiryForm
            key={plan || 'none'}
            variant="internship"
            options={INTERNSHIP_DOMAINS.map((d) => d.title)}
            durations={DURATIONS}
            defaultDuration={durationFor(plans.find((p) => p.name === plan))}
          />
        </div>
      </section>
    </div>
  );
};

export default Internship;
