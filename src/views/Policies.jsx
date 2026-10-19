import React from 'react';
import Link from 'next/link';
import { PageBanner } from '../components/shared';
import { DISCLAIMER, IJEPA, SITE } from '../data/site';
import { INTEGRITY_NO, INTEGRITY_YES } from '../data/content';

// Policy pages. Privacy, Terms and Refund texts are standard drafts for client review;
// Ethics, Authorship and Disclaimer come straight from the client's brief.

const Policy = ({ title, eyebrow = 'Important Policies', intro, children }) => (
  <div>
    <PageBanner eyebrow={eyebrow} title={title} intro={intro} />
    <div className="page-body site-container" style={{ maxWidth: 'min(900px, 90%)' }}>
      {children}
      <p style={{ fontSize: 12, marginTop: 28 }}>Last updated: October 2026. Questions about this policy: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p>
    </div>
  </div>
);

export const PrivacyPolicy = () => (
  <Policy title="Privacy Policy" intro="How BuildSoftTech collects, uses and protects the personal information you share with us.">
    <h2>Information we collect</h2>
    <p>When you submit an enquiry, register for a program or contact us, we may collect your name, designation, institution, email address, mobile number, research area and the details you include in your message.</p>
    <h2>How we use it</h2>
    <ul className="content-list"><li>To respond to your enquiry and provide the services you request.</li><li>To communicate about batches, schedules, fees, documentation and certificates.</li><li>To coordinate manuscript, research-collaboration or training work you have engaged us for.</li><li>To meet legal and accounting obligations.</li></ul>
    <h2>Sharing</h2>
    <p>We do not sell personal data. Information is shared only with people involved in delivering your service (for example mentors, research coordinators or, for publication, the editorial team of {IJEPA.name}) and with service providers who process data on our behalf under confidentiality.</p>
    <h2>Research data and manuscripts</h2>
    <p>Manuscripts, datasets and code shared with us are treated as confidential, used only for the agreed engagement, and are not reused or redistributed.</p>
    <h2>Retention and your rights</h2>
    <p>We keep enquiry data for as long as needed to respond and to fulfil any engagement, and records of paid services as required by law. You may ask us to correct or delete your personal data by writing to <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p>
    <h2>Cookies</h2>
    <p>This website does not set tracking cookies. Links to third-party sites (including {IJEPA.name}) are governed by those sites' own policies.</p>
  </Policy>
);

export const Terms = () => (
  <Policy title="Terms & Conditions" intro="The terms under which BuildSoftTech provides research, publication-support, training and internship services.">
    <h2>Nature of services</h2>
    <p>BuildSoftTech provides professional research, technical, training, internship and publication-support services. We do not sell authorship, publications, grades, certificates or accreditation outcomes.</p>
    <h2>No guarantee of outcomes</h2>
    <p>Journal acceptance, indexing status, publication timelines, authorship decisions, promotion eligibility and institutional recognition are controlled by the respective journal, publisher, indexing service, university, employer or regulatory authority. Payment of a professional fee does not guarantee any such outcome.</p>
    <h2>Your responsibilities</h2>
    <ul className="content-list"><li>Provide accurate information and original work.</li><li>Comply with the policies of your institution and of any target journal.</li><li>Make genuine scholarly contributions in any collaborative research you join.</li><li>Attend program sessions and complete evaluations to be eligible for certificates.</li></ul>
    <h2>Fees and payment</h2>
    <p>Fees are communicated before an engagement begins and may be revised for changes in scope. Payment terms, invoices and refund conditions are set out in the <Link href="/refund-policy">Refund &amp; Cancellation Policy</Link>.</p>
    <h2>Intellectual property</h2>
    <p>You retain ownership of your original research and manuscripts. Training materials and program content remain the property of BuildSoftTech and may not be redistributed.</p>
    <h2>Limitation of liability</h2>
    <p>To the extent permitted by law, BuildSoftTech's liability for any claim arising from a service is limited to the fee paid for that service.</p>
    <h2>Governing law</h2>
    <p>These terms are governed by the laws of India, with courts at Pune, Maharashtra having jurisdiction.</p>
  </Policy>
);

export const RefundPolicy = () => (
  <Policy title="Refund & Cancellation Policy" intro="When fees can be refunded for training, internship, research-support and collaboration services.">
    <h2>Training and internship programs</h2>
    <ul className="content-list"><li>Cancellation before the batch starts: full refund less any payment-gateway charges.</li><li>Within the first 5 days of a batch: 50% refund.</li><li>After 5 days of the batch, or after project allocation: no refund.</li><li>If BuildSoftTech cancels or reschedules a batch and the new schedule does not suit you: full refund.</li></ul>
    <h2>Research support and collaboration services</h2>
    <ul className="content-list"><li>Fees cover professional time and work performed. Work already completed (consultation, literature review, implementation, drafting) is non-refundable.</li><li>If you withdraw before work begins: full refund less gateway charges.</li><li>Journal decisions (rejection, revision requests) are not grounds for refund, since they are outside our control.</li></ul>
    <h2>Publication charges</h2>
    <p>Any article-processing or publication charges of {IJEPA.name} are governed by the journal's own policies published on its website.</p>
    <h2>How to request</h2>
    <p>Email <a href={`mailto:${SITE.email}`}>{SITE.email}</a> with your name, service, payment reference and reason. Approved refunds are processed to the original payment method within 7–10 business days.</p>
  </Policy>
);

export const ResearchEthics = () => (
  <Policy title="Research & Publication Ethics" eyebrow="Quality & Research Integrity" intro="Our commitment to responsible research.">
    <p className="lead">BuildSoftTech believes that sustainable academic success must be based on originality, integrity and genuine scholarly contribution.</p>
    <div className="two-col">
      <div className="page-card"><h3>We encourage</h3><ul className="checklist is-flush">{INTEGRITY_YES.map((i) => <li key={i}>{i}</li>)}</ul></div>
      <div className="page-card"><h3>We do not support</h3><ul className="checklist is-negative is-flush">{INTEGRITY_NO.map((i) => <li key={i}>{i}</li>)}</ul></div>
    </div>
    <h2>Publication ethics statement</h2>
    <p>At BuildSoftTech and {IJEPA.name}, we encourage original, ethical and responsible research publication. Authors are responsible for the originality, accuracy and integrity of their submitted work. Manuscripts should not contain plagiarism, fabricated data, manipulated results, duplicate publication or inappropriate authorship.</p>
    <p>Publication is subject to the journal's editorial and peer-review process. BuildSoftTech/{IJEPA.name} does not guarantee acceptance of any manuscript.</p>
    <h2>Verify journals yourself</h2>
    <p>Researchers should verify a journal's current indexing and coverage status directly with the indexing service rather than relying on claims made by any service provider. Indexing services such as Scopus continuously monitor and re-evaluate indexed titles and may discontinue sources where publication-standard concerns arise.</p>
    <h2>Academic integrity framework</h2>
    <p>Our approach is aligned with the UGC academic-integrity framework, which emphasises originality and addresses plagiarism in academic and research publications.</p>
  </Policy>
);

export const AuthorshipPolicy = () => (
  <Policy title="Authorship Policy" intro="Contribution-based authorship for all collaborative research facilitated by BuildSoftTech.">
    <h2>Genuine research collaboration</h2>
    <p>BuildSoftTech follows an ethical and contribution-based authorship approach. Researchers who join a collaborative research project are expected to make a meaningful scholarly contribution to the research work. Depending on the nature and extent of the contribution, eligible collaborators may be considered for authorship in accordance with the authorship requirements of the target journal/publisher.</p>
    <h2>What is decided by contribution</h2>
    <p>The final:</p>
    <ul className="content-list"><li>Author list</li><li>Author order</li><li>Corresponding-author designation</li><li>Research contribution</li><li>Acknowledgment</li></ul>
    <p>will be determined based on actual scholarly contributions and applicable journal policies.</p>
    <div className="page-card is-danger-note"><p><strong>Important:</strong> Author positions are not sold independently of research contribution. The collaboration fee covers the agreed research, technical, publication-support and related professional services. It does not constitute a guarantee of authorship, acceptance or publication.</p></div>
  </Policy>
);

export const Disclaimer = () => (
  <Policy title="Disclaimer" intro="Please read before engaging any BuildSoftTech service.">
    <div className="page-card is-note"><p>{DISCLAIMER}</p></div>
    <h2>Research collaboration</h2>
    <p>BuildSoftTech provides research collaboration, technical research and publication-support services. Journal acceptance, indexing status, publication timelines and editorial decisions are controlled by the respective journals and publishers. Authorship is based on genuine scholarly contribution and the policies of the target journal. Payment of a professional service fee does not guarantee authorship, a specific author position, manuscript acceptance, publication or indexing.</p>
    <h2>Academic documentation</h2>
    <p>BuildSoftTech does not claim that any publication automatically qualifies for promotion, appraisal, NBA, NAAC or NIRF. Eligibility depends on the applicable rules and the institution/regulatory authority.</p>
    <h2>Indicative information</h2>
    <p>Research titles, target journals, timelines and fees displayed on this website are indicative and may change depending on research scope, implementation requirements, journal requirements and collaboration structure.</p>
  </Policy>
);
