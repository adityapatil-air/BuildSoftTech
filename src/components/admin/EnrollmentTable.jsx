import React from 'react';
import Link from 'next/link';
import ConfirmButton from '../ConfirmButton';
import { addStudentByEmail, issueCertificate, removeEnrollment, revokeCertificate, setEnrollmentStatus } from '../../app/admin/actions';
import { fmtDate } from '../../lib/forms';

const TAG = { active: 'is-success', completed: 'is-dark', pending: 'is-warning', rejected: 'is-danger' };

const StatusButton = ({ kind, id, status, back, label, primary }) => (
  <form action={setEnrollmentStatus}>
    <input type="hidden" name="kind" value={kind} />
    <input type="hidden" name="id" value={id} />
    <input type="hidden" name="status" value={status} />
    <input type="hidden" name="back" value={back} />
    <button type="submit" className={`button button-small ${primary ? 'button-primary' : 'button-light'}`}>{label}</button>
  </form>
);

// Enrolments for one course or internship: approve / reject / complete, certificates, add by email.
// rows: [{ id, status, enrolled_at, student: {full_name,email,phone,institution}, certificate }]
const EnrollmentTable = ({ kind, rows, parentId, back, manageHref }) => {
  const pending = rows.filter((r) => r.status === 'pending').length;
  return (
    <section id="students" className="admin-card">
      <div className="admin-card-head">
        <strong>Students {pending > 0 && <span className="tag is-warning" style={{ marginLeft: 8 }}>{pending} awaiting approval</span>}</strong>
      </div>

      {!rows.length ? (
        <p className="form-hint" style={{ marginBottom: 16 }}>No enrolments yet. Students enrol from the website, or add one below by email.</p>
      ) : (
        <div className="table-wrap" style={{ marginBottom: 18 }}>
          <table className="data-table">
            <thead><tr><th>Student</th><th>Contact</th><th>Status</th><th>Certificate</th><th>Actions</th></tr></thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td>
                    <strong>{r.student?.full_name || '—'}</strong>
                    {r.student?.institution && <><br /><small className="form-hint">{r.student.institution}</small></>}
                    <br /><small className="form-hint">Applied {fmtDate(r.enrolled_at)}</small>
                  </td>
                  <td><a href={`mailto:${r.student?.email}`}>{r.student?.email}</a>{r.student?.phone && <><br /><small>{r.student.phone}</small></>}</td>
                  <td><span className={`tag ${TAG[r.status] || ''}`}>{r.status}</span></td>
                  <td>
                    {r.certificate ? (
                      <>
                        <Link href={`/certificates/${r.certificate.certificate_no}`} target="_blank">{r.certificate.certificate_no}</Link>
                        <br /><small className="form-hint">{fmtDate(r.certificate.issued_at)}</small>
                      </>
                    ) : r.status === 'completed' ? (
                      <form action={issueCertificate}>
                        <input type="hidden" name="kind" value={kind} />
                        <input type="hidden" name="enrollment_id" value={r.id} />
                        <input type="hidden" name="back" value={back} />
                        <button type="submit" className="button button-primary button-small">Issue certificate</button>
                      </form>
                    ) : <small className="form-hint">After completion</small>}
                  </td>
                  <td>
                    <div className="row-actions">
                      {manageHref && r.status !== 'rejected' && <Link href={manageHref(r)} className="button button-primary button-small">Manage</Link>}
                      {r.status === 'pending' && <StatusButton kind={kind} id={r.id} status="active" back={back} label="Approve" primary={!manageHref} />}
                      {r.status === 'pending' && <StatusButton kind={kind} id={r.id} status="rejected" back={back} label="Reject" />}
                      {r.status === 'active' && <StatusButton kind={kind} id={r.id} status="completed" back={back} label="Mark completed" />}
                      {r.status === 'completed' && !r.certificate && <StatusButton kind={kind} id={r.id} status="active" back={back} label="Reopen" />}
                      {r.status === 'rejected' && <StatusButton kind={kind} id={r.id} status="pending" back={back} label="Undo reject" />}
                      {r.certificate && (
                        <form action={revokeCertificate}>
                          <input type="hidden" name="id" value={r.certificate.id} />
                          <input type="hidden" name="back" value={back} />
                          <ConfirmButton message={`Revoke certificate ${r.certificate.certificate_no}? It will stop verifying.`}>Revoke cert.</ConfirmButton>
                        </form>
                      )}
                      {!r.certificate && (
                        <form action={removeEnrollment}>
                          <input type="hidden" name="kind" value={kind} />
                          <input type="hidden" name="id" value={r.id} />
                          <input type="hidden" name="back" value={back} />
                          <ConfirmButton message="Remove this enrolment? The student loses access.">Remove</ConfirmButton>
                        </form>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <form key={`add-${rows.length}`} action={addStudentByEmail} className="row-actions">
        <input type="hidden" name="kind" value={kind} />
        <input type="hidden" name="parent_id" value={parentId} />
        <input type="hidden" name="back" value={back} />
        <input name="email" type="email" required className="form-input" style={{ maxWidth: 320 }} placeholder="student@example.com" aria-label="Student email" />
        <button type="submit" className="button button-light button-small">Add registered student</button>
      </form>
      <p className="form-hint" style={{ marginTop: 8 }}>
        Students added here are approved straight away. {kind === 'course' ? 'Remember to add them to the Teams group too.' : ''}
      </p>
    </section>
  );
};

export default EnrollmentTable;
