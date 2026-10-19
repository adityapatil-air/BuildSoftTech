// Creates (or updates) a confirmed account in the connected Supabase project.
// Usage:
//   node scripts/create-user.mjs --id admin  --password <pw> --role admin   --name "Admin"
//   node scripts/create-user.mjs --id aditya --password <pw> --role student --name "Aditya"
// --id can be a full email or a username; a username becomes <username>@buildsofttech.local,
// which the login form also accepts as just the username.
import { createClient } from '@supabase/supabase-js';
import { clientOpts, loadEnv } from './_env.mjs';
// Keep in sync with USERNAME_DOMAIN in src/data/accounts.js (plain Node cannot import that file).
const USERNAME_DOMAIN = 'buildsofttech.local';

const args = Object.fromEntries(process.argv.slice(2).reduce((acc, a, i, all) => (a.startsWith('--') ? [...acc, [a.slice(2), all[i + 1]]] : acc), []));
const id = String(args.id || '').trim().toLowerCase();
const password = String(args.password || '');
const role = args.role === 'admin' ? 'admin' : 'student';
const name = String(args.name || id);
if (!id || !password) { console.error('Usage: --id <username|email> --password <password> [--role admin|student] [--name "Full name"]'); process.exit(1); }
if (password.length < 8) { console.error('Password must be at least 8 characters.'); process.exit(1); }
const email = id.includes('@') ? id : `${id}@${USERNAME_DOMAIN}`;

const { url, service } = loadEnv();
const db = createClient(url, service, clientOpts());

const { data: list, error: listErr } = await db.auth.admin.listUsers({ perPage: 1000 });
if (listErr) { console.error(listErr.message); process.exit(1); }
const existing = list.users.find((u) => u.email === email);
const meta = { full_name: name };
const res = existing
  ? await db.auth.admin.updateUserById(existing.id, { password, email_confirm: true, user_metadata: meta })
  : await db.auth.admin.createUser({ email, password, email_confirm: true, user_metadata: meta });
if (res.error) { console.error(res.error.message); process.exit(1); }
const user = res.data.user;
const { error: pErr } = await db.from('profiles').upsert({ id: user.id, email, full_name: name, role });
if (pErr) { console.error(pErr.message); process.exit(1); }
console.log(`${existing ? 'Updated' : 'Created'} ${role} account: ${email} (sign in with "${id.includes('@') ? email : id}")`);
