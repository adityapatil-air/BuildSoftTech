'use client';

import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '../Icon';

const SECTIONS = [
  { id: 'courses', label: 'Courses & fees', icon: 'code' },
  { id: 'internshipPlans', label: 'Internship plans', icon: 'briefcase' },
  { id: 'researchPackages', label: 'Research packages', icon: 'book' },
  { id: 'patentPlans', label: 'Patent plans', icon: 'lightbulb' },
  { id: 'home', label: 'Top bar & stats', icon: 'trending' },
  { id: 'testimonials', label: 'Testimonials', icon: 'star' },
  { id: 'contact', label: 'Contact & social', icon: 'mail' },
];

const ICON_CHOICES = ['brain', 'database', 'chart', 'infinity', 'flask', 'terminal', 'globe', 'code', 'cloud', 'sparkles', 'blocks', 'laptop'];

const Field = ({ label, value, onChange, hint, type = 'text', textarea, full, placeholder }) => (
  <div className={`form-group${full ? ' is-full' : ''}`}>
    <label>{label}</label>
    {textarea
      ? <textarea className="form-textarea" value={value || ''} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
      : <input className="form-input" type={type} value={value || ''} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />}
    {hint && <div className="form-hint">{hint}</div>}
  </div>
);

// Kept raw while typing (so Enter and commas work); the website trims and skips blanks.
const toLines = (v) => v.split('\n');
const toTags = (v) => v.split(',');

const AdminDashboard = ({ initial }) => {
  const router = useRouter();
  const [settings, setSettings] = useState(initial);
  const [section, setSection] = useState('courses');
  const [status, setStatus] = useState(null);
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
      setStatus({ kind: 'ok', text: 'Saved. The website now shows the new values.' });
      router.refresh();
    } catch (err) {
      setStatus({ kind: 'error', text: err.message });
    } finally {
      setSaving(false);
    }
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

  // Called as functions (not <Components/>) so inputs keep focus while typing.
  const rowHead = (list, i, title, min = 0) => (
    <div className="admin-card-head">
      <strong>{title}</strong>
      <div className="row-actions">
        <button type="button" className="admin-icon-btn" onClick={() => moveRow(list, i, -1)} aria-label="Move up">↑</button>
        <button type="button" className="admin-icon-btn" onClick={() => moveRow(list, i, 1)} aria-label="Move down">↓</button>
        {settings[list].length > min && <button type="button" className="admin-icon-btn is-danger" onClick={() => removeRow(list, i)} aria-label="Remove"><Icon name="x" size={14} /></button>}
      </div>
    </div>
  );

  const plans = (list, suffix, addLabel) => (
    <>
      <p className="form-hint" style={{ marginBottom: 14 }}>Leave a fee empty to show “Fee on request”. Tick one plan as featured to highlight it.</p>
      <div className="card-grid">
        {settings[list].map((p, i) => (
          <div className="admin-card" key={i} style={{ marginBottom: 0 }}>
            {rowHead(list, i, p.name || `Plan ${i + 1}`, 1)}
            <Field label="Name" value={p.name} onChange={(v) => set([list, i, 'name'], v)} />
            {'duration' in p && <Field label="Duration" value={p.duration} onChange={(v) => set([list, i, 'duration'], v)} />}
            <Field label="Fee" value={p.fee} onChange={(v) => set([list, i, 'fee'], v)} placeholder="₹ 4,999" hint={`Shown with “${suffix}”.`} />
            <Field label="Includes (one per line)" value={(p.features || []).join('\n')} onChange={(v) => set([list, i, 'features'], toLines(v))} textarea />
            <label style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 14 }}>
              <input type="checkbox" checked={!!p.featured} onChange={(e) => set([list], settings[list].map((x, j) => ({ ...x, featured: j === i ? e.target.checked : false })))} /> Featured
            </label>
          </div>
        ))}
      </div>
      <button type="button" className="button button-light" style={{ marginTop: 16 }} onClick={() => addRow(list, list === 'internshipPlans' ? { name: '', duration: '', fee: '', features: [], featured: false } : { name: '', fee: '', features: [], featured: false })}><Icon name="plus" size={14} /> {addLabel}</button>
    </>
  );

  return (
    <>
      <div className="admin-tabs" role="tablist">
        {SECTIONS.map((s) => (
          <button key={s.id} type="button" role="tab" aria-selected={section === s.id} className={section === s.id ? 'is-active' : ''} onClick={() => setSection(s.id)}>
            <Icon name={s.icon} size={15} /> {s.label}
          </button>
        ))}
      </div>
      <section>
        <div className="admin-toolbar">
          <h1>Site settings · {SECTIONS.find((s) => s.id === section)?.label}</h1>
          <div className="row-actions">
            {dirty && <span className="tag is-warning">Unsaved changes</span>}
            <button type="button" className="button button-primary" onClick={save} disabled={saving || !dirty}>{saving ? 'Saving…' : 'Save changes'}</button>
          </div>
        </div>
        {status && <div className={`admin-alert ${status.kind === 'error' ? 'is-error' : 'is-ok'}`}>{status.text}</div>}

        {section === 'courses' && (
          <>
            <p className="form-hint" style={{ marginBottom: 14 }}>The course catalogue on the Training page. These are catalogue cards; to run a batch students can enrol in, create it under Courses in the menu.</p>
            {settings.courses.map((c, i) => (
              <div className="admin-card" key={i}>
                {rowHead('courses', i, c.title || `Course ${i + 1}`, 1)}
                <div className="form-grid">
                  <Field label="Title" value={c.title} onChange={(v) => set(['courses', i, 'title'], v)} />
                  <Field label="Fee" value={c.fee} onChange={(v) => set(['courses', i, 'fee'], v)} placeholder="₹ 24,999" hint="Leave empty to show “Fee on request”." />
                  <Field label="Duration" value={c.duration} onChange={(v) => set(['courses', i, 'duration'], v)} placeholder="3 months" />
                  <div className="form-group">
                    <label>Icon</label>
                    <select className="form-select" value={c.icon || 'code'} onChange={(e) => set(['courses', i, 'icon'], e.target.value)}>
                      {ICON_CHOICES.map((n) => <option key={n}>{n}</option>)}
                    </select>
                  </div>
                  <Field full label="What it covers" value={c.summary} onChange={(v) => set(['courses', i, 'summary'], v)} textarea />
                  <Field full label="Tools (comma separated)" value={(c.tags || []).join(',')} onChange={(v) => set(['courses', i, 'tags'], toTags(v))} />
                </div>
              </div>
            ))}
            <button type="button" className="button button-light" onClick={() => addRow('courses', { title: '', duration: '', summary: '', tags: [], icon: 'code', fee: '' })}><Icon name="plus" size={14} /> Add course</button>
          </>
        )}

        {section === 'internshipPlans' && plans('internshipPlans', '/ intern', 'Add plan')}
        {section === 'patentPlans' && plans('patentPlans', '+ govt. fee', 'Add plan')}

        {section === 'researchPackages' && (
          <div className="admin-card">
            <p className="form-hint" style={{ marginBottom: 14 }}>The packages table in the journal section of the Research page. Empty fee shows “On request”.</p>
            <div className="table-wrap">
              <table className="data-table admin-table">
                <thead><tr><th>Package</th><th>Includes</th><th>Fee</th><th /></tr></thead>
                <tbody>
                  {settings.researchPackages.map((p, i) => (
                    <tr key={i}>
                      <td><input className="form-input" value={p.name} onChange={(e) => set(['researchPackages', i, 'name'], e.target.value)} /></td>
                      <td><input className="form-input" style={{ minWidth: 300 }} value={p.includes} onChange={(e) => set(['researchPackages', i, 'includes'], e.target.value)} /></td>
                      <td><input className="form-input" value={p.fee} placeholder="₹ 9,999" onChange={(e) => set(['researchPackages', i, 'fee'], e.target.value)} /></td>
                      <td>{settings.researchPackages.length > 1 && <button type="button" className="admin-icon-btn is-danger" onClick={() => removeRow('researchPackages', i)} aria-label="Remove row"><Icon name="x" size={14} /></button>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button type="button" className="button button-light" style={{ marginTop: 14 }} onClick={() => addRow('researchPackages', { name: '', includes: '', fee: '' })}><Icon name="plus" size={14} /> Add package</button>
          </div>
        )}

        {section === 'home' && (
          <>
            <div className="admin-card">
              <div className="admin-card-head"><strong>Top bar announcement</strong></div>
              <div className="form-grid">
                <Field label="Badge" value={settings.topbar.pill} onChange={(v) => set(['topbar', 'pill'], v)} placeholder="New" />
                <Field label="Text" value={settings.topbar.text} onChange={(v) => set(['topbar', 'text'], v)} hint="Leave empty to hide the announcement." />
                <Field label="Link label" value={settings.topbar.linkLabel} onChange={(v) => set(['topbar', 'linkLabel'], v)} />
                <Field label="Link to" value={settings.topbar.link} onChange={(v) => set(['topbar', 'link'], v.startsWith('/') ? v : `/${v}`)} hint="A page on this site, e.g. /training" />
              </div>
            </div>
            <div className="admin-card">
              <div className="admin-card-head"><strong>Numbers under the home page hero</strong></div>
              <p className="form-hint" style={{ marginBottom: 14 }}>Use real figures only. All four need a number and a label, otherwise the strip is hidden.</p>
              <div className="form-grid">
                {settings.stats.map((s, i) => (
                  <React.Fragment key={i}>
                    <Field label={`Number ${i + 1}`} value={s.value} onChange={(v) => set(['stats', i, 'value'], v)} placeholder="500+" />
                    <Field label={`Label ${i + 1}`} value={s.label} onChange={(v) => set(['stats', i, 'label'], v)} placeholder="Students trained" />
                  </React.Fragment>
                ))}
              </div>
            </div>
          </>
        )}

        {section === 'testimonials' && (
          <>
            <p className="form-hint" style={{ marginBottom: 14 }}>Shown on the home page. Add only real reviews, with the learner’s permission. With none added, the section is hidden.</p>
            {settings.testimonials.map((t, i) => (
              <div className="admin-card" key={i}>
                {rowHead('testimonials', i, t.name || `Review ${i + 1}`)}
                <div className="form-grid">
                  <Field label="Name" value={t.name} onChange={(v) => set(['testimonials', i, 'name'], v)} />
                  <Field label="Course or program" value={t.role} onChange={(v) => set(['testimonials', i, 'role'], v)} placeholder="Data Science, Batch 2026" />
                  <Field full label="Review" value={t.quote} onChange={(v) => set(['testimonials', i, 'quote'], v)} textarea />
                </div>
              </div>
            ))}
            <button type="button" className="button button-light" onClick={() => addRow('testimonials', { name: '', role: '', quote: '' })}><Icon name="plus" size={14} /> Add review</button>
          </>
        )}

        {section === 'contact' && (
          <>
            <div className="admin-card">
              <div className="form-grid">
                <Field label="Email" type="email" value={settings.contact.email} onChange={(v) => set(['contact', 'email'], v)} />
                <Field label="Research email" type="email" value={settings.contact.researchEmail} onChange={(v) => set(['contact', 'researchEmail'], v)} hint="Optional. Shown on the Contact page." />
                <Field label="Phone (as displayed)" value={settings.contact.phoneDisplay} onChange={(v) => set(['contact', 'phoneDisplay'], v)} />
                <Field label="Phone (dial link)" value={settings.contact.phoneLink} onChange={(v) => set(['contact', 'phoneLink'], v.replace(/[^+\d]/g, ''))} hint="Digits with country code, e.g. +918149844901" />
                <Field label="WhatsApp number" value={settings.contact.whatsapp} onChange={(v) => set(['contact', 'whatsapp'], v.replace(/[^+\d]/g, ''))} hint="With country code. Leave empty to hide the WhatsApp button." />
                <Field label="Office hours" value={settings.contact.hours} onChange={(v) => set(['contact', 'hours'], v)} />
                <Field full label="Address" value={settings.contact.address} onChange={(v) => set(['contact', 'address'], v)} textarea />
                <Field full label="Map search (optional)" value={settings.contact.mapQuery} onChange={(v) => set(['contact', 'mapQuery'], v)} hint="What to search on Google Maps for the Contact page map, if the address alone does not find the office." />
              </div>
            </div>
            <div className="admin-card">
              <div className="admin-card-head"><strong>Social links (footer)</strong></div>
              <div className="form-grid">
                {['linkedin', 'youtube', 'instagram', 'facebook'].map((k) => (
                  <Field key={k} label={k[0].toUpperCase() + k.slice(1)} value={settings.social[k]} onChange={(v) => set(['social', k], v.trim())} placeholder="https://" hint={k === 'linkedin' ? 'Full page addresses. Empty ones are not shown.' : undefined} />
                ))}
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default AdminDashboard;
