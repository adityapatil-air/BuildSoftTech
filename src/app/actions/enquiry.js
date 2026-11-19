'use server';

// Public enquiry forms → public.enquiries (supabase/003_enquiries.sql).
// Written with the service role on the server; visitors have no table access.
import { createSupabaseAdmin } from '../../lib/supabase/server';
import { getSettings } from '../../lib/store';
import { str } from '../../lib/forms';

const KINDS = ['demo', 'internship', 'contact'];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const DETAIL_KEYS = { demo: ['mode', 'qualification'], internship: ['college', 'duration'], contact: [] };

export async function submitEnquiry(_prev, fd) {
  // Bots fill the hidden field; pretend it worked so they move on.
  if (str(fd, 'company_website')) return { ok: true, message: 'Thank you. We will get back to you within 24 hours.' };

  const kind = KINDS.includes(str(fd, 'kind')) ? str(fd, 'kind') : 'contact';
  const row = {
    kind,
    full_name: str(fd, 'full_name', 120),
    mobile: str(fd, 'mobile', 20),
    email: str(fd, 'email', 160).toLowerCase(),
    topic: str(fd, 'topic', 120),
    message: str(fd, 'message', 3000),
    details: Object.fromEntries(DETAIL_KEYS[kind].map((k) => [k, str(fd, k, 160)]).filter(([, v]) => v)),
  };

  if (!row.full_name) return { ok: false, message: 'Please enter your name.' };
  if (row.mobile.replace(/\D/g, '').length < 10) return { ok: false, message: 'Please enter a valid mobile number.' };
  if (!EMAIL_RE.test(row.email)) return { ok: false, message: 'Please enter a valid email address.' };
  if (kind === 'contact' && !row.message) return { ok: false, message: 'Please write a short message.' };

  const db = createSupabaseAdmin();
  const { error } = db ? await db.from('enquiries').insert(row) : { error: { message: 'Supabase is not configured.' } };
  if (error) {
    console.error('[enquiry] save failed:', error.message);
    const { contact } = await getSettings();
    return { ok: false, message: `Sorry, we could not send this right now. Please email ${contact.email}${contact.phoneDisplay ? ` or call ${contact.phoneDisplay}` : ''}.` };
  }
  const reply = { demo: 'A counsellor will call you within 24 hours with batch dates and fees.', internship: 'We will call you for a short orientation chat.', contact: 'We reply within 24 hours.' }[kind];
  return { ok: true, message: `Thank you, ${row.full_name.split(' ')[0]}. Your enquiry has reached us. ${reply}` };
}
