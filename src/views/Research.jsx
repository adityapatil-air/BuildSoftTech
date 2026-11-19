import React from 'react';
import Link from 'next/link';
import { CheckList, CtaBand, Ico, JournalBanner, PageHero } from '../components/ui';
import { BOOK_PACKAGES, BOOK_SERVICES, CHAPTER_SERVICES, COLLABORATION, CONFERENCE_SERVICES, JOURNAL_SERVICES } from '../data/content';
import { IJEPA } from '../data/site';

const Research = ({ settings }) => (
  <div className="pub">
    <PageHero
      crumb="Research"
      title="Research & publication support"
      lead="From idea to publication, we guide scholars, faculty and students through writing, editing, formatting, journal selection, submission and reviewer responses."
    >
      <Link className="btn btn-primary" href="/contact?service=Journal%20publication">Get a free manuscript evaluation</Link>
    </PageHero>

    <section className="section">
      <div className="wrap">
        <nav className="subnav" aria-label="Research services">
          <a href="#journal">SCI / Scopus journals</a>
          <a href="#conference">IEEE / Springer conferences</a>
          <a href="#chapter">Book chapters</a>
          <a href="#book">Books with ISBN</a>
          <a href="#ijepa">IJEPA journal</a>
        </nav>
        <p className="note info" style={{ marginBottom: 26 }}>Final acceptance is always decided by the journal’s or publisher’s independent peer review. We help you give your work its best chance.</p>

        <div className="service-block c-violet" id="journal">
          <div className="head"><div className="icon-box"><Ico name="book" /></div><h2>SCI / Scopus-indexed journal publication support</h2></div>
          <div className="two-col">
            <div>
              <h3>Services</h3>
              <CheckList items={JOURNAL_SERVICES} />
            </div>
            <div>
              <h3>Research collaboration program</h3>
              <CheckList items={COLLABORATION} />
              <h3 style={{ marginTop: 24 }}>Packages</h3>
              <div className="table-wrap">
                <table>
                  <thead><tr><th>Package</th><th>Includes</th><th>Fee</th></tr></thead>
                  <tbody>
                    {settings.researchPackages.map((p) => (
                      <tr key={p.name}><td><b>{p.name}</b></td><td>{p.includes}</td><td className="num">{String(p.fee || '').trim() || 'On request'}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="service-block c-sun" id="conference">
          <div className="head"><div className="icon-box"><Ico name="presentation" /></div><h2>IEEE conference / Springer proceedings support</h2></div>
          <CheckList items={CONFERENCE_SERVICES} cols2 />
        </div>

        <div className="service-block c-pink" id="chapter">
          <div className="head"><div className="icon-box"><Ico name="bookmark" /></div><h2>Scopus-indexed book chapter support</h2></div>
          <CheckList items={CHAPTER_SERVICES} />
          <p className="note" style={{ marginTop: 16 }}>BuildSoftTech is not affiliated with these publishers. Chapters are selected by each book’s editors.</p>
        </div>

        <div className="service-block c-teal" id="book">
          <div className="head"><div className="icon-box"><Ico name="book" /></div><h2>Book publication with ISBN</h2></div>
          <div className="two-col">
            <CheckList items={BOOK_SERVICES} />
            <div className="grid gap-sm">
              {BOOK_PACKAGES.map((b) => (
                <div key={b.name} className={`card compact static ${b.color}`}>
                  <h3>{b.name}</h3>
                  <p>{b.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <JournalBanner
          id="ijepa"
          title="Our journal: IJEPA"
          text="Open-access, peer-reviewed international journal. Submissions are handled by an independent editorial board through double-blind review. Using BuildSoftTech services does not influence editorial decisions."
          cta={`Submit at ${IJEPA.label}`}
          href={IJEPA.url}
        />
      </div>
    </section>

    <CtaBand contact={settings.contact} />
  </div>
);

export default Research;
