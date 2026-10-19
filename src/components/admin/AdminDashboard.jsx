'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Icon from '../Icon';

const SECTIONS = [
  { id: 'internship', label: 'Internship', icon: 'briefcase' },
  { id: 'courses', label: 'Courses', icon: 'code' },
  { id: 'topics', label: 'Research topics', icon: 'users' },
  { id: 'packages', label: 'Packages', icon: 'layers' },
  { id: 'contact', label: 'Contact details', icon: 'mail' },
];

const STATUS = ['Available', 'Reserved', 'Closed'];

const Field = ({ label, value, onChange, hint, type = 'text', textarea }) => (
  <div className="form-group">
    <label>{label}</label>
    {textarea
      ? <textarea className="form-textarea" value={value || ''} onChange={(e) => onChange(e.target.value)} />
      : <input className="form-input" type={type} value={value || ''} onChange={(e) => onChange(e.target.value)} />}
    {hint && <div className="form-hint">{hint}</div>}
  </div>
);

const AdminDashboard = ({ initial, backend }) => {
  const router = useRouter();
  const [settings, setSettings] = useState(initial);
  const [section, setSection] = useState('internship');
  const [status, setStatus] = useState(null); // { kind: 'ok' | 'error', text }
  const [saving, setSaving] = useState(false);
  const dirty = useMemo(() => JSON.stringify(settings) !== JSON.stringify(initial), [settings, initial]);

  const set = (path, value) => setSettings((s) => {
    const next = structuredClone(s);
    let cur = next;
    for (let i = 0; i < path.length - 1; i += 1) cur = cur[path[i]];
    cur[path[path.length - 1]] = value;
    return next;
  });

  const save = async () => {
    setSaving(true);
    setStatus(null);
    try {
      const res = await fetch('/api/settings', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(settings) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Save failed.');
      if (data.settings) setSettings(data.settings);
      setStatus({ kind: 'ok', text: `Saved. The website now shows the new values (${data.backend === 'supabase' ? 'stored in Supabase' : 'stored in .data/settings.json'}).` });
      router.refresh();
    } catch (err) {
      setStatus({ kind: 'error', text: err.message });
    } finally {
      setSaving(false);
    }
  };

  const logout = async () => {
    await fetch('/api/admin/login', { method: 'DELETE' });
    router.refresh();
  };

  const addRow = (key, row) => set([key], [...settings[key], row]);
  const removeRow = (key, i) => set([key], settings[key].filter((_, idx) => idx !== i));
  const moveRow = (key, i, dir) => {
    const arr = [...settings[key]];
    const j = i + dir;
    if (j < 0 || j >= arr.length) return;
    [arr[i], arr[j]] = [arr[j], arr[i]];
    set([key], arr);
  };

  return (
    <div className="admin-shell site-container">
      <aside className="admin-side">
        <div className="admin-side-head">
          <img src="/logo.png" alt="" width="36" height="36" />
          <div><strong>BuildSoftTech</strong><small>Admin</small></div>
        </div>
        <nav>
          {SECTIONS.map((s) => (
            <button key={s.id} type="button" className={section === s.id ? 'is-active' : ''} onClick={() => setSection(s.id)}>
              <Icon name={s.icon} size={16} /> {s.label}
            </button>
          ))}
        </nav>
        <div className="admin-side-foot">
          <small>Storage: {backend === 'supabase' ? 'Supabase' : 'local file (.data/settings.json)'}</small>
          {settings.updatedAt && <small>Last saved {new Date(settings.updatedAt).toLocaleString()}</small>}
          <Link href="/" className="button button-light button-small">View website</Link>
          <button type="button" className="button button-light button-small" onClick={logout}>Sign out</button>
        </div>
      </aside>

      <section className="admin-main">
        <div className="admin-toolbar">
          <h1>{SECTIONS.find((s) => s.id === section)?.label}</h1>
          <div className="row-actions">
            {dirty && <span className="tag is-warning">Unsaved changes</span>}
            <button type="button" className="button button-primary" onClick={save} disabled={saving || !dirty}>{saving ? 'Saving…' : 'Save changes'}</button>
          </div>
        </div>
        {status && <div className={`admin-alert ${status.kind === 'error' ? 'is-error' : 'is-ok'}`}>{status.text}</div>}

        {section === 'internship' && (
          <div className="admin-card">
            <div className="form-grid">
              <Field label="Fee" value={settings.internship.fee} onChange={(v) => set(['internship', 'fee'], v)} hint="Shown on the home page, internship page and highlights table." />
              <Field label="Duration" value={settings.internship.duration} onChange={(v) => set(['internship', 'duration'], v)} />
              <Field label="Mode" value={settings.internship.mode} onChange={(v) => set(['internship', 'mode'], v)} />
              <Field label="Next batch" value={settings.internship.nextBatch} onChange={(v) => set(['internship', 'nextBatch'], v)} hint="Optional, e.g. 'Starts 1 December 2026'. Leave empty to hide." />
              <div className="is-full"><Field label="Note for applicants" value={settings.internship.note} onChange={(v) => set(['internship', 'note'], v)} textarea hint="Optional short note shown under the fee on the internship page." /></div>
            </div>
          </div>
        )}

        {section === 'courses' && (
          <>
            {settings.courses.map((c, i) => (
              <div className="admin-card" key={i}>
                <div className="admin-card-head">
                  <strong>{c.title || `Course ${i + 1}`}</strong>
                  <div className="row-actions">
                    <button type="button" className="admin-icon-btn" onClick={() => moveRow('courses', i, -1)} aria-label="Move up">↑</button>
                    <button type="button" className="admin-icon-btn" onClick={() => moveRow('courses', i, 1)} aria-label="Move down">↓</button>
                    <button type="button" className="admin-icon-btn is-danger" onClick={() => removeRow('courses', i)} aria-label="Remove course"><Icon name="x" size={14} /></button>
                  </div>
                </div>
                <div className="form-grid">
                  <Field label="Title" value={c.title} onChange={(v) => set(['courses', i, 'title'], v)} />
                  <Field label="Fee" value={c.fee} onChange={(v) => set(['courses', i, 'fee'], v)} hint="Optional, e.g. ₹4,500/-" />
                  <Field label="Duration" value={c.duration} onChange={(v) => set(['courses', i, 'duration'], v)} hint="Optional, e.g. 6 weeks" />
                  <div className="is-full"><Field label="Topics covered (one per line)" value={(c.items || []).join('\n')} onChange={(v) => set(['courses', i, 'items'], v.split('\n').map((t) => t.trim()).filter(Boolean))} textarea /></div>
                </div>
              </div>
            ))}
            <button type="button" className="button button-light" onClick={() => addRow('courses', { title: '', icon: 'code', items: [], fee: '', duration: '' })}><Icon name="plus" size={14} /> Add course</button>
          </>
        )}

        {section === 'topics' && (
          <div className="admin-card">
            <p className="form-hint" style={{ marginBottom: 14 }}>These rows appear in the “Available Research Collaboration Opportunities” table.</p>
            <div className="table-wrap">
              <table className="data-table admin-table">
                <thead><tr><th>#</th><th>Research title</th><th>Area</th><th>Index</th><th>Duration</th><th>Fee</th><th>Status</th><th></th></tr></thead>
                <tbody>
                  {settings.topics.map((t, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td><input className="form-input" value={t.title} onChange={(e) => set(['topics', i, 'title'], e.target.value)} /></td>
                      <td><input className="form-input" value={t.area} onChange={(e) => set(['topics', i, 'area'], e.target.value)} /></td>
                      <td><input className="form-input" value={t.index} onChange={(e) => set(['topics', i, 'index'], e.target.value)} /></td>
                      <td><input className="form-input" value={t.duration} onChange={(e) => set(['topics', i, 'duration'], e.target.value)} /></td>
                      <td><input className="form-input" value={t.fee} onChange={(e) => set(['topics', i, 'fee'], e.target.value)} /></td>
                      <td>
                        <select className="form-select" value={t.status} onChange={(e) => set(['topics', i, 'status'], e.target.value)}>
                          {STATUS.map((s) => <option key={s}>{s}</option>)}
                        </select>
                      </td>
                      <td><button type="button" className="admin-icon-btn is-danger" onClick={() => removeRow('topics', i)} aria-label="Remove row"><Icon name="x" size={14} /></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button type="button" className="button button-light" onClick={() => addRow('topics', { id: settings.topics.length + 1, title: '', area: '', index: 'Scopus', duration: '', fee: '', status: 'Available' })}><Icon name="plus" size={14} /> Add topic</button>
          </div>
        )}

        {section === 'packages' && (
          <div className="card-grid">
            {settings.packages.map((p, i) => (
              <div className="admin-card" key={p.letter}>
                <span className="tag">{p.letter}</span>
                <h3 style={{ margin: '10px 0 14px', color: 'var(--brown)', fontSize: 16 }}>{p.title}</h3>
                <Field label="Duration" value={p.duration} onChange={(v) => set(['packages', i, 'duration'], v)} />
                <Field label="Fee" value={p.fee} onChange={(v) => set(['packages', i, 'fee'], v)} hint="e.g. Starting from ₹25,000 or Based on research scope" />
              </div>
            ))}
          </div>
        )}

        {section === 'contact' && (
          <div className="admin-card">
            <div className="form-grid">
              <Field label="Email" type="email" value={settings.contact.email} onChange={(v) => set(['contact', 'email'], v)} />
              <Field label="Phone (as displayed)" value={settings.contact.phoneDisplay} onChange={(v) => set(['contact', 'phoneDisplay'], v)} />
              <Field label="Phone (dial link, digits only)" value={settings.contact.phoneLink} onChange={(v) => set(['contact', 'phoneLink'], v.replace(/[^+\d]/g, ''))} hint="Used for tel: links, e.g. +918149844901" />
              <Field label="Office hours" value={settings.contact.hours} onChange={(v) => set(['contact', 'hours'], v)} />
              <div className="is-full"><Field label="Address" value={settings.contact.address} onChange={(v) => set(['contact', 'address'], v)} textarea /></div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminDashboard;
