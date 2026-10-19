import React from 'react';
import { saveInternship } from '../../app/admin/actions';

const InternshipForm = ({ internship = {}, title, note }) => (
  <form action={saveInternship} className="admin-card">
    {title && <div className="admin-card-head"><strong>{title}</strong>{note && <small className="form-hint">{note}</small>}</div>}
    {internship.id && <input type="hidden" name="id" value={internship.id} />}
    <div className="form-grid">
      <div className="form-group is-full"><label htmlFor="i-title">Internship title</label><input id="i-title" name="title" className="form-input" required defaultValue={internship.title || ''} placeholder="e.g. Web Development Internship — January batch" /></div>
      <div className="form-group"><label htmlFor="i-domain">Domain</label><input id="i-domain" name="domain" className="form-input" defaultValue={internship.domain || ''} placeholder="Full Stack Development" /></div>
      <div className="form-group"><label htmlFor="i-status">Status</label>
        <select id="i-status" name="status" className="form-select" defaultValue={internship.status || 'draft'}>
          <option value="draft">Draft — hidden from the website</option>
          <option value="open">Open — students can apply</option>
          <option value="closed">Closed — not accepting applications</option>
        </select>
      </div>
      <div className="form-group"><label htmlFor="i-fee">Fee</label><input id="i-fee" name="fee" className="form-input" defaultValue={internship.fee || ''} placeholder="₹3,000/-" /></div>
      <div className="form-group"><label htmlFor="i-dur">Duration</label><input id="i-dur" name="duration" className="form-input" defaultValue={internship.duration || '45 Days'} /></div>
      <div className="form-group is-full"><label htmlFor="i-desc">Description</label><textarea id="i-desc" name="description" className="form-textarea" defaultValue={internship.description || ''} /></div>
    </div>
    <div className="row-actions"><button type="submit" className="button button-primary">{internship.id ? 'Save internship' : 'Create internship'}</button></div>
  </form>
);

export default InternshipForm;
