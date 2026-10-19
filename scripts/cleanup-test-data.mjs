// Removes everything the test scripts and test runs created: [TEST] rows, their uploaded PDFs,
// the certificate number counter, and the two test users.
// Usage: node scripts/cleanup-test-data.mjs
import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import { clientOpts, ACCOUNTS_FILE, DATA_DIR, TEST_PREFIX, loadEnv } from './_env.mjs';

const { url, service } = loadEnv();
const db = createClient(url, service, clientOpts());
const TEST_EMAILS = ['bst-test-admin@example.com', 'bst-test-student@example.com'];

async function main() {
  // Uploaded PDFs of test courses (files live under <course_id>/ in the bucket).
  const { data: courses } = await db.from('courses').select('id').like('title', `${TEST_PREFIX}%`);
  for (const c of courses || []) {
    const { data: files } = await db.storage.from('course-resources').list(c.id, { limit: 1000 });
    const paths = (files || []).map((f) => `${c.id}/${f.name}`);
    if (paths.length) await db.storage.from('course-resources').remove(paths);
  }

  await db.from('certificates').delete().like('title', `${TEST_PREFIX}%`);
  await db.from('courses').delete().like('title', `${TEST_PREFIX}%`);
  await db.from('internships').delete().like('title', `${TEST_PREFIX}%`);
  // Test runs advance the certificate counter; reset it so real numbering starts at 0001.
  await db.from('site_settings').delete().eq('key', 'certificate_counters');
  await db.from('site_settings').delete().eq('key', 'probe');

  const { data } = await db.auth.admin.listUsers({ perPage: 200 });
  for (const u of data?.users || []) {
    if (TEST_EMAILS.includes(u.email)) await db.auth.admin.deleteUser(u.id); // profile and enrolments cascade
  }
  for (const f of [ACCOUNTS_FILE, path.join(DATA_DIR, 'test-cookies.json')]) if (fs.existsSync(f)) fs.unlinkSync(f);
  console.log('Test data, test files and test users removed.');
}

main().catch((e) => { console.error('CLEANUP FAILED:', e.message); process.exit(1); });
