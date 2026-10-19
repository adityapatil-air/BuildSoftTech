// Removes everything seed-test-data.mjs created: [TEST] rows and the two test users.
// Usage: node scripts/cleanup-test-data.mjs
import fs from 'fs';
import { createClient } from '@supabase/supabase-js';
import { clientOpts, ACCOUNTS_FILE, TEST_PREFIX, loadEnv } from './_env.mjs';

const { url, service } = loadEnv();
const db = createClient(url, service, clientOpts());
const TEST_EMAILS = ['bst-test-admin@example.com', 'bst-test-student@example.com'];

async function main() {
  await db.from('certificates').delete().like('title', `${TEST_PREFIX}%`);
  await db.from('courses').delete().like('title', `${TEST_PREFIX}%`);
  await db.from('internships').delete().like('title', `${TEST_PREFIX}%`);
  const { data } = await db.auth.admin.listUsers({ perPage: 200 });
  for (const u of data?.users || []) {
    if (TEST_EMAILS.includes(u.email)) await db.auth.admin.deleteUser(u.id); // profile cascades
  }
  if (fs.existsSync(ACCOUNTS_FILE)) fs.unlinkSync(ACCOUNTS_FILE);
  console.log('Test data and test users removed.');
}

main().catch((e) => { console.error('CLEANUP FAILED:', e.message); process.exit(1); });
