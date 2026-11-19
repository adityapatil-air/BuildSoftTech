import React from 'react';
import Link from 'next/link';
import { PageHero } from '../components/ui';
import { FAQS } from '../data/content';

const Faqs = () => (
  <div className="pub">
    <PageHero crumb="FAQs" title="Frequently asked questions" lead="Quick answers about courses, internships, publication support and patents." />
    <section className="section">
      <div className="wrap" style={{ maxWidth: 860 }}>
        {FAQS.map((g) => (
          <div key={g.group} className="faq-group" style={{ '--c': g.color }}>
            <h2><span className="dot" />{g.group}</h2>
            {g.items.map(([q, a]) => (
              <details key={q} className="faq">
                <summary>{q}</summary>
                <div className="ans">{a}</div>
              </details>
            ))}
          </div>
        ))}
        <p className="lead">Still have a question? <Link href="/contact">Contact us</Link> and we will reply within 24 hours.</p>
      </div>
    </section>
  </div>
);

export default Faqs;
