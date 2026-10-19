'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import Icon from '../Icon';
import { getSupabaseBrowser } from '../../lib/supabase/client';

const DEGREES = ['B.E. / B.Tech', 'M.E. / M.Tech', 'BCA / MCA', 'B.Sc. / M.Sc.', 'Diploma', 'Ph.D. / Research Scholar', 'Faculty', 'Working Professional', 'Other'];

const Field = ({ label, children, hint }) => (
  <div className="form-group">
    <label>{label}</label>
    {children}
    {hint && <div className="form-hint">{hint}</div>}
  </div>
);

// mode: 'login' | 'register'
const AuthForm = ({ mode }) => {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get('next') || '/dashboard';
  const supabase = getSupabaseBrowser();
  const [form, setForm] = useState({ full_name: '', email: '', phone: '', institution: '', degree: '', password: '' });
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!supabase) { setError('Sign-in is not configured yet. Add the Supabase keys to .env.local.'); return; }
    setBusy(true); setError(''); setInfo('');
    try {
      if (mode === 'register') {
        const { data, error: err } = await supabase.auth.signUp({
          email: form.email.trim(),
          password: form.password,
          options: { data: { full_name: form.full_name.trim(), phone: form.phone.trim(), institution: form.institution.trim(), degree: form.degree } },
        });
        if (err) throw err;
        if (!data.session) {
          // Email confirmation is on in the Supabase project.
          setInfo('Account created. Check your inbox for a confirmation link, then sign in.');
          return;
        }
      } else {
        const { error: err } = await supabase.auth.signInWithPassword({ email: form.email.trim(), password: form.password });
        if (err) throw err;
      }
      router.replace(next);
      router.refresh();
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setBusy(false);
    }
  };

  const isRegister = mode === 'register';
  return (
    <div className="auth-page">
      <div className="auth-shell">
        <aside className="auth-visual">
          <div className="auth-visual-brand"><img src="/logo.png" alt="" width="46" height="46" /><strong>BuildSoftTech</strong></div>
          <div>
            <h2>{isRegister ? 'Create your student account' : 'Welcome back'}</h2>
            <ul className="auth-visual-points">
              <li><span className="dot" /> Enrol in courses and watch class recordings</li>
              <li><span className="dot" /> Follow your internship problem statement and weekly reviews</li>
              <li><span className="dot" /> Download your certificates when you finish</li>
            </ul>
          </div>
          <small className="auth-visual-foot">Research · Publication · Training · Technology</small>
        </aside>
        <div className="auth-panel">
          <h1>{isRegister ? 'Register' : 'Sign in'}</h1>
          <p className="auth-subtitle">
            {isRegister ? <>Already have an account? <Link href={`/login?next=${encodeURIComponent(next)}`}>Sign in</Link></> : <>New here? <Link href={`/register?next=${encodeURIComponent(next)}`}>Create an account</Link></>}
          </p>
          <form onSubmit={submit}>
            {isRegister && (
              <>
                <Field label="Full name"><input className="form-input" required value={form.full_name} onChange={set('full_name')} autoComplete="name" /></Field>
                <div className="form-grid">
                  <Field label="Mobile"><input className="form-input" type="tel" value={form.phone} onChange={set('phone')} autoComplete="tel" /></Field>
                  <Field label="Degree">
                    <select className="form-select" value={form.degree} onChange={set('degree')}><option value="">Select…</option>{DEGREES.map((d) => <option key={d}>{d}</option>)}</select>
                  </Field>
                </div>
                <Field label="College / Institution"><input className="form-input" value={form.institution} onChange={set('institution')} autoComplete="organization" /></Field>
              </>
            )}
            <Field label="Email"><input className="form-input" type="email" required value={form.email} onChange={set('email')} autoComplete="email" /></Field>
            <Field label="Password" hint={isRegister ? 'At least 8 characters.' : undefined}>
              <div className="admin-password">
                <input className="form-input" type={show ? 'text' : 'password'} required minLength={isRegister ? 8 : undefined} value={form.password} onChange={set('password')} autoComplete={isRegister ? 'new-password' : 'current-password'} />
                <button type="button" className="admin-eye" onClick={() => setShow(!show)} aria-label={show ? 'Hide password' : 'Show password'}><Icon name="eye" size={16} /></button>
              </div>
            </Field>
            {error && <div className="admin-alert is-error">{error}</div>}
            {info && <div className="admin-alert is-ok">{info}</div>}
            <button type="submit" className="button button-primary" disabled={busy} style={{ width: '100%' }}>{busy ? 'Please wait…' : isRegister ? 'Create account' : 'Sign in'}</button>
          </form>
          {isRegister && <p className="form-hint" style={{ marginTop: 14 }}>By registering you agree to our <Link href="/terms">Terms</Link> and <Link href="/privacy-policy">Privacy Policy</Link>.</p>}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
