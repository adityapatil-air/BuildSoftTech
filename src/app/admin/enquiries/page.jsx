import { requireAdmin } from '../../../lib/session';
import { deleteEnquiry, setEnquiryStatus } from '../actions';
import ConfirmButton from '../../../components/ConfirmButton';
import Flash from '../../../components/Flash';

export const metadata = { title: 'Admin · Enquiries', robots: { index: false } };
export const dynamic = 'force-dynamic';

const KIND = { demo: 'Demo class', internship: 'Internship', contact: 'Contact' };
const STATUS_TAG = { new: 'is-warning', contacted: 'is-brand', closed: '' };
const FILTERS = ['new', 'contacted', 'closed', 'all'];

const when = (d) => new Date(d).toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit' });

export default async function AdminEnquiries({ searchParams }) {
  const { supabase } = await requireAdmin('/admin/enquiries');
  const filter = FILTERS.includes(searchParams?.status) ? searchParams.status : 'new';
  let q = supabase.from('enquiries').select('*').order('created_at', { ascending: false }).limit(300);
  if (filter !== 'all') q = q.eq('status', filter);
  const { data: rows, error } = await q;
  const here = `/admin/enquiries?status=${filter}`;
  const missing = error && /enquiries/i.test(error.message);

  return (
    <>
      <div className="admin-toolbar">
        <h1>Enquiries</h1>
        <div className="admin-tabs" style={{ margin: 0 }}>
          {FILTERS.map((f) => (
            <a key={f} href={`/admin/enquiries?status=${f}`} className={`button button-small ${f === filter ? 'button-blue' : 'button-light'}`}>{f[0].toUpperCase() + f.slice(1)}</a>
          ))}
        </div>
      </div>
      <Flash searchParams={searchParams} />
      <p className="form-hint" style={{ marginTop: -6, marginBottom: 16 }}>Messages from the demo-class form (Training), the application form (Internship) and the Contact page.</p>
      {missing && <div className="admin-alert is-error">The enquiries table does not exist yet. Run <code>supabase/003_enquiries.sql</code> once in the Supabase SQL editor; until then the website forms show your email and phone instead.</div>}
      {error && !missing && <div className="admin-alert is-error">Could not load enquiries: {error.message}.</div>}
      {!error && !rows?.length && <div className="portal-empty"><p>No {filter === 'all' ? '' : `${filter} `}enquiries.</p></div>}
      {!!rows?.length && (
        <div className="table-wrap">
          <table className="data-table">
            <thead><tr><th>Received</th><th>From</th><th>About</th><th>Message</th><th>Status</th><th /></tr></thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td style={{ whiteSpace: 'nowrap' }}>{when(r.created_at)}<br /><span className="tag">{KIND[r.kind] || r.kind}</span></td>
                  <td>
                    <strong>{r.full_name}</strong><br />
                    {r.mobile && <><a href={`tel:${r.mobile.replace(/[^+\d]/g, '')}`}>{r.mobile}</a><br /></>}
                    {r.email && <a href={`mailto:${r.email}`}>{r.email}</a>}
                  </td>
                  <td>
                    {r.topic || '—'}
                    {Object.entries(r.details || {}).map(([k, v]) => <div key={k} className="form-hint">{k}: {String(v)}</div>)}
                  </td>
                  <td style={{ maxWidth: 320, whiteSpace: 'pre-line' }}>{r.message || '—'}</td>
                  <td>
                    <form action={setEnquiryStatus} className="row-actions">
                      <input type="hidden" name="id" value={r.id} />
                      <input type="hidden" name="back" value={here} />
                      <select name="status" defaultValue={r.status} className="form-select" style={{ width: 'auto', padding: '6px 8px', fontSize: 13 }}>
                        <option value="new">New</option><option value="contacted">Contacted</option><option value="closed">Closed</option>
                      </select>
                      <button type="submit" className="button button-light button-small">Save</button>
                    </form>
                    <span className={`tag ${STATUS_TAG[r.status] || ''}`} style={{ marginTop: 6 }}>{r.status}</span>
                  </td>
                  <td>
                    <form action={deleteEnquiry}>
                      <input type="hidden" name="id" value={r.id} />
                      <input type="hidden" name="back" value={here} />
                      <ConfirmButton message={`Delete the enquiry from ${r.full_name}? This cannot be undone.`}>Delete</ConfirmButton>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
