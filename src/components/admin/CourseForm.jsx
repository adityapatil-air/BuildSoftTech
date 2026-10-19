import React from 'react';
import { saveCourse } from '../../app/admin/actions';

const STATUSES = [
  ['draft', 'Draft — hidden from the website'],
  ['open', 'Open — students can enrol'],
  ['running', 'Running — classes in progress, still accepting enrolments'],
  ['completed', 'Completed'],
  ['closed', 'Closed — visible, not accepting enrolments'],
];

const CourseForm = ({ course = {}, title, note }) => (
  <form action={saveCourse} className="admin-card">
    {title && <div className="admin-card-head"><strong>{title}</strong>{note && <small className="form-hint">{note}</small>}</div>}
    {course.id && <input type="hidden" name="id" value={course.id} />}
    <div className="form-grid">
      <div className="form-group is-full"><label htmlFor="c-title">Course title</label><input id="c-title" name="title" className="form-input" required defaultValue={course.title || ''} placeholder="e.g. Python Programming — January batch" /></div>
      <div className="form-group is-full"><label htmlFor="c-desc">Description</label><textarea id="c-desc" name="description" className="form-textarea" defaultValue={course.description || ''} /></div>
      <div className="form-group is-full"><label htmlFor="c-topics">Topics (one per line)</label><textarea id="c-topics" name="topics" className="form-textarea" defaultValue={(course.topics || []).join('\n')} /></div>
      <div className="form-group"><label htmlFor="c-fee">Fee</label><input id="c-fee" name="fee" className="form-input" defaultValue={course.fee || ''} placeholder="₹4,500/-" /></div>
      <div className="form-group"><label htmlFor="c-dur">Duration</label><input id="c-dur" name="duration" className="form-input" defaultValue={course.duration || ''} placeholder="6 weeks" /></div>
      <div className="form-group"><label htmlFor="c-mode">Mode</label><input id="c-mode" name="mode" className="form-input" defaultValue={course.mode || 'Online'} /></div>
      <div className="form-group"><label htmlFor="c-start">Start date</label><input id="c-start" name="start_date" type="date" className="form-input" defaultValue={course.start_date || ''} /></div>
      <div className="form-group is-full">
        <label htmlFor="c-status">Status</label>
        <select id="c-status" name="status" className="form-select" defaultValue={course.status || 'draft'}>
          {STATUSES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>
      </div>
      <div className="form-group"><label htmlFor="c-teams">Microsoft Teams link</label><input id="c-teams" name="teams_link" type="url" className="form-input" defaultValue={course.teams_link || ''} placeholder="https://teams.microsoft.com/…" /><div className="form-hint">Shown only to approved students.</div></div>
      <div className="form-group"><label htmlFor="c-drive">Google Drive folder (recordings)</label><input id="c-drive" name="drive_folder" type="url" className="form-input" defaultValue={course.drive_folder || ''} placeholder="https://drive.google.com/…" /><div className="form-hint">For your reference; students get per-class links.</div></div>
    </div>
    <div className="row-actions"><button type="submit" className="button button-primary">{course.id ? 'Save course' : 'Create course'}</button></div>
  </form>
);

export default CourseForm;
