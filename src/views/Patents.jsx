import React from 'react';
import Link from 'next/link';
import { Amount, CheckList, CtaBand, Ico, PageHero, SectionHead, Steps } from '../components/ui';
import { PATENT_SERVICES, PATENT_STEPS } from '../data/content';

const PLAN_COLORS = ['c-teal', 'c-orange', 'c-violet'];

const Patents = ({ settings }) => (
  <div className="pub">
    <PageHero
      crumb="Patents"
      title="Patent filing, publication & grant support"
      lead="Protect your innovation. We help students, faculty, startups and institutions file patents in India, working with registered patent agents for every legal filing."
    >
      <Link className="btn btn-primary" href="/contact?service=Patent">Discuss your invention, free</Link>
    </PageHero>

    <section className="section">
      <div className="wrap two-col">
        <div>
          <span className="eyebrow">Services</span>
          <h2>Idea to grant, handled carefully</h2>
          <CheckList items={PATENT_SERVICES} />
        </div>
        <div className="grid" style={{ gap: 16 }}>
          <div className="card c-orange">
            <div className="icon-box"><Ico name="search" /></div>
            <h3>Search first</h3>
            <p>A patentability search tells you early whether your idea is new enough to file.</p>
          </div>
          <div className="card c-violet">
            <div className="icon-box"><Ico name="pen" /></div>
            <h3>Strong drafting</h3>
            <p>Clear claims and drawings make examination smoother.</p>
          </div>
          <div className="card c-teal">
            <div className="icon-box"><Ico name="lock" /></div>
            <h3>Confidential</h3>
            <p>We sign an NDA before you share any details.</p>
          </div>
        </div>
      </div>
    </section>

    <section className="section alt">
      <div className="wrap">
        <SectionHead eyebrow="Process in India" title="Seven steps to a granted patent" />
        <Steps items={PATENT_STEPS} color="var(--orange)" />
        <p className="note" style={{ marginTop: 22 }}>Publication usually takes about 18 months from filing, or about 1 month with early publication. Grant is decided solely by the Patent Office; no service provider can guarantee it.</p>
      </div>
    </section>

    <section className="section">
      <div className="wrap">
        <SectionHead center eyebrow="Packages" title="Professional fee plans" lead="Government fees are charged at actuals." />
        <div className="grid grid-3">
          {settings.patentPlans.map((p, i) => (
            <article key={`${p.name}-${i}`} className={`card plan ${PLAN_COLORS[i % PLAN_COLORS.length]}${p.featured ? ' featured' : ''}`}>
              {p.featured && <span className="badge">Recommended</span>}
              <h3>{p.name}</h3>
              <Amount fee={p.fee} suffix="+ govt. fee" />
              <CheckList items={p.features || []} />
            </article>
          ))}
        </div>
      </div>
    </section>

    <CtaBand contact={settings.contact} />
  </div>
);

export default Patents;
