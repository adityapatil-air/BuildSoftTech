'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '../Icon';

const AdminLogin = ({ configured }) => {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const res = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Login failed.');
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="admin-login">
      <div className="admin-login-card">
        <img src="/logo.png" alt="" width="52" height="52" />
        <h1>Admin sign in</h1>
        <p>Update fees, batches, courses and contact details shown on the website.</p>
        {!configured && (
          <div className="admin-alert">Login is not configured yet. Add <code>ADMIN_PASSWORD</code> (and ideally <code>ADMIN_SECRET</code>) to <code>.env.local</code> and restart the server.</div>
        )}
        <form onSubmit={submit}>
          <div className="form-group">
            <label htmlFor="admin-password">Password</label>
            <div className="admin-password">
              <input id="admin-password" className="form-input" type={show ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required disabled={!configured} />
              <button type="button" className="admin-eye" onClick={() => setShow(!show)} aria-label={show ? 'Hide password' : 'Show password'}><Icon name="eye" size={16} /></button>
            </div>
          </div>
          {error && <div className="admin-alert is-error">{error}</div>}
          <button type="submit" className="button button-primary" disabled={busy || !configured} style={{ width: '100%' }}>{busy ? 'Signing in…' : 'Sign in'}</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
