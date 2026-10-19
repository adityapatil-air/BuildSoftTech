import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Icon from '../components/Icon';
import { PageBanner } from '../components/shared';
import { SITE, whatsappLink } from '../data/site';
import { COLLAB_TOPICS, COURSES, INTERNSHIP_DOMAINS, RESEARCH_AREAS } from '../data/content';

const SERVICES = [
  { value: 'publication', label: 'Research Paper Publication (IJEPA)' },
  { value: 'collaboration', label: 'SCI / Scopus Research Collaboration' },
  { value: 'research', label: 'Research Support / Consultation' },
  { value: 'internship', label: '45-Day Internship Program' },
  { value: 'training', label: 'Software Training Course' },
  { value: 'institutional', label: 'Institutional Program (FDP / Workshop / Bootcamp)' },
  { value: 'other', label: 'Other' },
];

const DESIGNATIONS = ['Faculty Member', 'Ph.D. Scholar', 'Research Scholar', 'M.Tech./M.E. Student', 'UG Student', 'Diploma Student', 'Industry Professional', 'Institution / Department Head', 'Other'];
const CONTRIBUTIONS = ['First Author', 'Co-Author', 'Corresponding Author', 'Technical Contributor', 'To be discussed'];
const EXPERIENCE = ['No prior publications', '1–2 publications', '3–5 publications', '5+ publications'];

const Field = ({ label, required, children, hint, full }) => (
  <div className={`form-group ${full ? 'is-full' : ''}`}>
    <label>{label}{required && <span className="req"> *</span>}</label>
    {children}
    {hint && <div className="form-hint">{hint}</div>}
  </div>
);

const Enquire = () => {
  const [params] = useSearchParams();
  const [form, setForm] = useState({
    name: '', designation: '', institution: '', email: '', mobile: '',
    service: SERVICES.some((s) => s.value === params.get('service')) ? params.get('service') : '',
    area: '', topic: params.get('topic') || '', contribution: '', experience: '', message: '',
  });
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const topicOptions = form.service === 'collaboration' ? COLLAB_TOPICS.map((t) => t.title)
    : form.service === 'training' ? COURSES.map((c) => c.title)
      : form.service === 'internship' ? INTERNSHIP_DOMAINS.flatMap((d) => d.items)
        : null;
  const serviceLabel = SERVICES.find((s) => s.value === form.service)?.label || '';

  const buildMessage = () => [
    `New enquiry — BuildSoftTech website`,
    `Name: ${form.name}`, `Designation: ${form.designation}`, `Institution: ${form.institution}`,
    `Email: ${form.email}`, `WhatsApp/Mobile: ${form.mobile}`, `Service: ${serviceLabel}`,
    form.area && `Research Area: ${form.area}`, form.topic && `Selected Topic / Course: ${form.topic}`,
    form.contribution && `Preferred Author Contribution: ${form.contribution}`, form.experience && `Research Experience: ${form.experience}`,
    form.message && `Message: ${form.message}`,
  ].filter(Boolean).join('\n');

  const submit = (e) => {
    e.preventDefault();
    // No backend yet: the enquiry is handed to the user's mail client, with WhatsApp as a second route.
    const subject = `Enquiry: ${serviceLabel || 'BuildSoftTech services'} — ${form.name}`;
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildMessage())}`;
    setSent(true);
  };

  return (
    <div>
      <PageBanner eyebrow="Register / Enquire" title="Tell us how we can help" intro="Fill in the form and our coordinator will contact you within 2–3 business days. Fields marked * are required." />
      <div className="page-body site-container">
        <div className="two-col is-wide-left">
          <div className="page-card">
            {sent ? (
              <div className="form-success">
                <strong>Thank you, {form.name || 'researcher'}!</strong>
                Your email client should have opened with the enquiry pre-filled. If it did not, send the same details to <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or on WhatsApp:
                <div className="row-actions" style={{ marginTop: 12 }}>
                  <a className="button button-whatsapp button-small" href={whatsappLink(buildMessage())} target="_blank" rel="noreferrer"><Icon name="whatsapp" size={15} /> Send on WhatsApp</a>
                  <button type="button" className="button button-light button-small" onClick={() => setSent(false)}>Edit enquiry</button>
                </div>
              </div>
            ) : (
              <form onSubmit={submit} className="form-grid" noValidate={false}>
                <Field label="Full name" required><input className="form-input" required value={form.name} onChange={set('name')} placeholder="Dr. / Mr. / Ms. Full Name" /></Field>
                <Field label="Designation" required>
                  <select className="form-select" required value={form.designation} onChange={set('designation')}>
                    <option value="">Select…</option>{DESIGNATIONS.map((d) => <option key={d}>{d}</option>)}
                  </select>
                </Field>
                <Field label="Institution / Organisation" required full><input className="form-input" required value={form.institution} onChange={set('institution')} placeholder="College / University / Company" /></Field>
                <Field label="Email" required><input className="form-input" type="email" required value={form.email} onChange={set('email')} placeholder="you@example.com" /></Field>
                <Field label="WhatsApp / Mobile" required><input className="form-input" type="tel" required value={form.mobile} onChange={set('mobile')} placeholder="+91 …" /></Field>
                <Field label="I am interested in" required full>
                  <select className="form-select" required value={form.service} onChange={(e) => setForm((f) => ({ ...f, service: e.target.value, topic: '' }))}>
                    <option value="">Select a service…</option>{SERVICES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                  </select>
                </Field>
                {['publication', 'collaboration', 'research'].includes(form.service) && (
                  <Field label="Research area" full>
                    <select className="form-select" value={form.area} onChange={set('area')}>
                      <option value="">Select…</option>{RESEARCH_AREAS.map((a) => <option key={a.title}>{a.title}</option>)}<option>Other</option>
                    </select>
                  </Field>
                )}
                {topicOptions && (
                  <Field label={form.service === 'collaboration' ? 'Selected research title' : form.service === 'training' ? 'Course' : 'Internship domain'} full>
                    <select className="form-select" value={form.topic} onChange={set('topic')}>
                      <option value="">Select…</option>{topicOptions.map((t) => <option key={t}>{t}</option>)}<option>Not decided yet</option>
                    </select>
                  </Field>
                )}
                {form.service === 'collaboration' && (
                  <>
                    <Field label="Preferred author contribution" hint="Authorship is decided on actual scholarly contribution and journal policy.">
                      <select className="form-select" value={form.contribution} onChange={set('contribution')}><option value="">Select…</option>{CONTRIBUTIONS.map((c) => <option key={c}>{c}</option>)}</select>
                    </Field>
                    <Field label="Research experience">
                      <select className="form-select" value={form.experience} onChange={set('experience')}><option value="">Select…</option>{EXPERIENCE.map((c) => <option key={c}>{c}</option>)}</select>
                    </Field>
                  </>
                )}
                <Field label="Message" full><textarea className="form-textarea" value={form.message} onChange={set('message')} placeholder="Tell us about your research topic, preferred batch, timeline or any question." /></Field>
                <div className="is-full row-actions">
                  <button type="submit" className="button button-primary">Submit Enquiry <Icon name="send" size={15} /></button>
                  <a className="button button-whatsapp" href={whatsappLink(buildMessage())} target="_blank" rel="noreferrer"><Icon name="whatsapp" size={15} /> Send on WhatsApp instead</a>
                </div>
                <p className="is-full" style={{ fontSize: 12, margin: 0 }}>By submitting you agree to our <Link to="/privacy-policy">Privacy Policy</Link> and <Link to="/terms">Terms &amp; Conditions</Link>. We never guarantee publication, authorship or indexing outcomes.</p>
              </form>
            )}
          </div>
          <div>
            <div className="page-card is-beige">
              <h3>What happens next?</h3>
              <ol className="content-list is-ordered is-flush">
                <li>We review your enquiry and match it to the right service.</li>
                <li>Our coordinator contacts you on WhatsApp or email.</li>
                <li>We discuss scope, timeline and fees transparently.</li>
                <li>You decide — no obligation.</li>
              </ol>
            </div>
            <div className="page-card">
              <h3>Prefer to talk?</h3>
              <p style={{ margin: '0 0 6px' }}><Icon name="phone" size={14} /> <a href={`tel:${SITE.phoneLink}`}>{SITE.phoneDisplay}</a></p>
              <p style={{ margin: 0 }}><Icon name="mail" size={14} /> <a href={`mailto:${SITE.email}`}>{SITE.email}</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Enquire;
