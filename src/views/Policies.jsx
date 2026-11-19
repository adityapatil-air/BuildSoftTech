import React from 'react';
import { PageHero } from '../components/ui';
import { POLICIES } from '../data/content';

const Policies = ({ settings }) => (
  <div className="pub">
    <PageHero crumb="Policies" title="Policies" lead="Our commitments on ethics, privacy, refunds and terms of service." />
    <section className="section">
      <div className="wrap" style={{ maxWidth: 900 }}>
        <nav className="subnav" aria-label="Policies">
          {POLICIES.map((p) => <a key={p.id} href={`#${p.id}`}>{p.title}</a>)}
        </nav>
        {POLICIES.map((p) => (
          <article key={p.id} className="policy" id={p.id}>
            <h2>{p.title}</h2>
            <ul>{p.items.map((it) => <li key={it}>{it.replace('{email}', settings.contact.email)}</li>)}</ul>
          </article>
        ))}
      </div>
    </section>
  </div>
);

export default Policies;
