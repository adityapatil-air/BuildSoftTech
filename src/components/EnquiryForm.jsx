'use client';

import React, { useEffect, useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { submitEnquiry } from '../app/actions/enquiry';

const Field = ({ label, id, full, children }) => (
  <div className={`form-group${full ? ' full' : ''}`}>
    <label htmlFor={id}>{label}</label>
    {children}
  </div>
);

const Submit = ({ label }) => {
  const { pending } = useFormStatus();
  return <button className="button button-primary" type="submit" disabled={pending}>{pending ? 'Sending…' : label}</button>;
};

// variant: 'demo' (training), 'internship', 'contact'
const EnquiryForm = ({ variant, title, options = [], defaultTopic = '', durations = [], defaultDuration }) => {
  const [state, action] = useFormState(submitEnquiry, null);
  const ref = useRef(null);
  useEffect(() => { if (state?.ok) ref.current?.reset(); }, [state]);
  const p = variant.slice(0, 1);
  const topicLabel = { demo: 'Course', internship: 'Domain', contact: 'Service' }[variant];
  const submitLabel = { demo: 'Book free demo', internship: 'Submit application', contact: 'Send message' }[variant];

  return (
    <form ref={ref} action={action} className="paper-card relative rounded-xl p-6 sm:p-8">
      {title && <h2 className="mb-5 font-display text-2xl font-semibold tracking-tight">{title}</h2>}
      <input type="hidden" name="kind" value={variant} />
      <div className="hp-field" aria-hidden="true"><label htmlFor={`${p}-website`}>Website</label><input id={`${p}-website`} name="company_website" tabIndex={-1} autoComplete="off" /></div>
      <div className="form-grid">
        <Field label="Full name" id={`${p}-name`}><input className="form-input" id={`${p}-name`} name="full_name" required autoComplete="name" /></Field>
        <Field label="Mobile" id={`${p}-mobile`}><input className="form-input" id={`${p}-mobile`} name="mobile" type="tel" required autoComplete="tel" /></Field>
        <Field label="Email" id={`${p}-email`}><input className="form-input" id={`${p}-email`} name="email" type="email" required autoComplete="email" /></Field>
        {variant === 'internship' && (
          <Field label="College" id={`${p}-college`}><input className="form-input" id={`${p}-college`} name="college" autoComplete="organization" /></Field>
        )}
        <Field label={topicLabel} id={`${p}-topic`}>
          <select className="form-select" id={`${p}-topic`} name="topic" defaultValue={options.includes(defaultTopic) ? defaultTopic : options[0]}>
            {options.map((o) => <option key={o}>{o}</option>)}
          </select>
        </Field>
        {variant === 'demo' && (
          <>
            <Field label="Preferred mode" id={`${p}-mode`}>
              <select className="form-select" id={`${p}-mode`} name="mode"><option>Online</option><option>Offline</option><option>Weekend</option></select>
            </Field>
            <Field label="Qualification" id={`${p}-qual`}><input className="form-input" id={`${p}-qual`} name="qualification" /></Field>
          </>
        )}
        {variant === 'internship' && (
          <Field label="Duration" id={`${p}-duration`}>
            <select className="form-select" id={`${p}-duration`} name="duration" defaultValue={defaultDuration}>{durations.map((d) => <option key={d}>{d}</option>)}</select>
          </Field>
        )}
        {variant !== 'internship' && (
          <Field label="Message" id={`${p}-msg`} full>
            <textarea className="form-textarea" id={`${p}-msg`} name="message" required={variant === 'contact'} />
          </Field>
        )}
        <div className="full">
          <Submit label={submitLabel} />
          {state?.message && <div className={`form-msg ${state.ok ? 'ok' : 'error'}`} role="status">{state.message}</div>}
        </div>
      </div>
    </form>
  );
};

export default EnquiryForm;
