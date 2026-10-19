'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSupabaseBrowser } from '../../lib/supabase/client';
import { addPdfResource } from '../../app/admin/actions';

const MAX_MB = 25;

// Uploads a PDF straight from the browser to the private course-resources bucket (admin
// session, storage RLS applies), then records it as a course resource.
const PdfUpload = ({ courseId }) => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setMsg(null);
    if (!file) return setMsg({ error: true, text: 'Choose a PDF file.' });
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) return setMsg({ error: true, text: 'Only PDF files can be uploaded.' });
    if (file.size > MAX_MB * 1024 * 1024) return setMsg({ error: true, text: `PDF is larger than ${MAX_MB} MB.` });
    const supabase = getSupabaseBrowser();
    if (!supabase) return setMsg({ error: true, text: 'Supabase is not configured.' });
    setBusy(true);
    try {
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]+/g, '-').replace(/-+/g, '-').slice(-80);
      const path = `${courseId}/${Date.now()}-${safeName}`;
      const { error } = await supabase.storage.from('course-resources').upload(path, file, { contentType: 'application/pdf', upsert: false });
      if (error) throw error;
      const fd = new FormData();
      fd.set('course_id', courseId);
      fd.set('title', title.trim() || file.name.replace(/\.pdf$/i, ''));
      fd.set('storage_path', path);
      const res = await addPdfResource(fd);
      if (res?.error) throw new Error(res.error);
      setTitle(''); setFile(null); e.target.reset();
      setMsg({ text: 'PDF uploaded. Enrolled students can open it now.' });
      router.refresh();
    } catch (err) {
      setMsg({ error: true, text: err.message || 'Upload failed.' });
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} className="form-grid">
      <div className="form-group"><label htmlFor="pdf-title">Title</label><input id="pdf-title" className="form-input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Week 1 notes" /></div>
      <div className="form-group"><label htmlFor="pdf-file">PDF file (max {MAX_MB} MB)</label><input id="pdf-file" className="form-input" type="file" accept="application/pdf,.pdf" onChange={(e) => setFile(e.target.files?.[0] || null)} /></div>
      <div className="is-full row-actions">
        <button type="submit" className="button button-primary button-small" disabled={busy}>{busy ? 'Uploading…' : 'Upload PDF'}</button>
        {msg && <span className={msg.error ? 'text-sm text-destructive' : 'text-sm text-success'}>{msg.text}</span>}
      </div>
    </form>
  );
};

export default PdfUpload;
