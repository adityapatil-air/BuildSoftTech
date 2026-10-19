// Checks the row-level security rules against the live Supabase project as a visitor, the test
// student and the test admin. Run seed-test-data.mjs first.
// Usage: node scripts/test-permissions.mjs
// Also writes .data/test-cookies.json (session cookies for the two test users, for page tests).
import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import { createServerClient } from '@supabase/ssr';
import { ACCOUNTS_FILE, DATA_DIR, TEST_PREFIX, clientOpts, loadEnv } from './_env.mjs';

const { url, anon, service } = loadEnv();
const acc = JSON.parse(fs.readFileSync(ACCOUNTS_FILE, 'utf8'));
const ids = acc.ids;
const results = [];
const check = (who, name, pass, detail = '') => results.push({ who, name, pass: Boolean(pass), detail });

const signIn = async ({ email, password }) => {
  const c = createClient(url, anon, clientOpts());
  const { error } = await c.auth.signInWithPassword({ email, password });
  if (error) throw new Error(`sign-in ${email}: ${error.message}`);
  return c;
};

// Produce the cookie header the Next.js app expects, using @supabase/ssr itself.
const sessionCookies = async ({ email, password }) => {
  const jar = new Map();
  const c = createServerClient(url, anon, {
    ...clientOpts(),
    cookies: { getAll: () => [...jar].map(([name, value]) => ({ name, value })), setAll: (list) => list.forEach(({ name, value }) => jar.set(name, value)) },
  });
  const { error } = await c.auth.signInWithPassword({ email, password });
  if (error) throw new Error(`cookie sign-in ${email}: ${error.message}`);
  return [...jar].map(([n, v]) => `${n}=${v}`).join('; ');
};

const rows = (r) => r.data || [];

async function main() {
  const pub = createClient(url, anon, clientOpts());
  const svc = createClient(url, service, clientOpts());
  const student = await signIn(acc.student);
  const admin = await signIn(acc.admin);

  // ---------------- visitor ----------------
  const vCourses = rows(await pub.from('courses').select('id,status,title').like('title', `${TEST_PREFIX}%`));
  check('visitor', 'sees open/running/completed courses', vCourses.length === 3, `${vCourses.length} visible`);
  check('visitor', 'cannot see draft course', !vCourses.some((c) => c.status === 'draft'));
  check('visitor', 'cannot read class recordings', rows(await pub.from('course_sessions').select('id')).length === 0);
  check('visitor', 'cannot read course resources', rows(await pub.from('course_resources').select('id')).length === 0);
  check('visitor', 'cannot read student profiles', rows(await pub.from('profiles').select('id')).length === 0);
  check('visitor', 'cannot read reviews or certificates', rows(await pub.from('internship_reviews').select('id')).length === 0 && rows(await pub.from('certificates').select('id')).length === 0);
  const vIns = await pub.from('courses').insert({ title: `${TEST_PREFIX} visitor insert` });
  check('visitor', 'cannot create a course', Boolean(vIns.error), vIns.error?.message);
  const vSet = await pub.from('site_settings').upsert({ key: 'probe', value: {} });
  check('visitor', 'cannot change site settings', Boolean(vSet.error), vSet.error?.message);
  const vCert = await pub.rpc('verify_certificate', { p_no: 'BST-C-2026-9001' });
  check('visitor', 'certificate check finds a real certificate', vCert.data?.[0]?.student_name === 'Test Student', JSON.stringify(vCert.data?.[0] || vCert.error?.message));
  const vFake = await pub.rpc('verify_certificate', { p_no: 'BST-C-0000-0000' });
  check('visitor', 'certificate check rejects an unknown number', Array.isArray(vFake.data) && vFake.data.length === 0);
  check('visitor', 'certificate check reveals no email or phone', vCert.data?.[0] && !('email' in vCert.data[0]) && !('phone' in vCert.data[0]));

  // ---------------- student ----------------
  const sProfiles = rows(await student.from('profiles').select('id,role'));
  check('student', 'sees only own profile', sProfiles.length === 1 && sProfiles[0].id === acc.student.id, `${sProfiles.length} rows`);
  const sRole = await student.from('profiles').update({ role: 'admin' }).eq('id', acc.student.id).select();
  const roleNow = rows(await svc.from('profiles').select('role').eq('id', acc.student.id))[0]?.role;
  check('student', 'cannot make themself admin', roleNow === 'student', sRole.error?.message || `role is ${roleNow}`);
  const sName = await student.from('profiles').update({ phone: '9000000001' }).eq('id', acc.student.id).select();
  check('student', 'can update own profile details', rows(sName).length === 1, sName.error?.message);
  await svc.from('profiles').update({ phone: '9000000000' }).eq('id', acc.student.id);

  check('student', 'sees recordings of enrolled course', rows(await student.from('course_sessions').select('id').eq('course_id', ids.openCourse)).length === 2);
  check('student', 'cannot see recordings of other course', rows(await student.from('course_sessions').select('id').eq('course_id', ids.otherCourse)).length === 0);
  check('student', 'sees resources of enrolled course', rows(await student.from('course_resources').select('id').eq('course_id', ids.openCourse)).length >= 2);
  check('student', 'cannot see resources of other course', rows(await student.from('course_resources').select('id').eq('course_id', ids.otherCourse)).length === 0);
  check('student', 'sees own course enrolments', rows(await student.from('course_enrollments').select('id')).length === 2);
  check('student', 'sees own internship, problem statement and repo', rows(await student.from('internship_enrollments').select('problem_statement,repo_url,weeks_total'))[0]?.weeks_total === 4);
  check('student', 'sees own weekly reviews', rows(await student.from('internship_reviews').select('week_no,notes')).length === 2);
  check('student', 'sees own certificate', rows(await student.from('certificates').select('certificate_no'))[0]?.certificate_no === 'BST-C-2026-9001');
  check('student', 'cannot see draft course', rows(await student.from('courses').select('id').eq('id', ids.draftCourse)).length === 0);

  const sUpd = await student.from('course_enrollments').update({ status: 'completed' }).eq('id', ids.activeEnrollment).select();
  const enrNow = rows(await svc.from('course_enrollments').select('status').eq('id', ids.activeEnrollment))[0]?.status;
  check('student', 'cannot change own enrolment status', enrNow === 'active', sUpd.error?.message || `status is ${enrNow}`);
  const sActive = await student.from('course_enrollments').insert({ course_id: ids.otherCourse, student_id: acc.student.id, status: 'active' });
  check('student', 'cannot self-approve an enrolment', Boolean(sActive.error), sActive.error?.message);
  const sPending = await student.from('course_enrollments').insert({ course_id: ids.otherCourse, student_id: acc.student.id, status: 'pending' }).select();
  check('student', 'can request enrolment (pending)', rows(sPending).length === 1, sPending.error?.message);
  const sOther = await student.from('course_enrollments').insert({ course_id: ids.otherCourse, student_id: acc.admin.id, status: 'pending' });
  check('student', 'cannot enrol someone else', Boolean(sOther.error), sOther.error?.message);
  const sRev = await student.from('internship_reviews').update({ notes: 'self-reviewed' }).eq('week_no', 2).select();
  check('student', 'cannot write weekly reviews', rows(sRev).length === 0, sRev.error?.message);
  const sCert = await student.from('certificates').insert({ certificate_no: 'BST-C-2026-9999', kind: 'course', student_id: acc.student.id, enrollment_id: ids.activeEnrollment, title: `${TEST_PREFIX} fake` });
  check('student', 'cannot issue a certificate', Boolean(sCert.error), sCert.error?.message);
  const sSet = await student.from('site_settings').upsert({ key: 'probe', value: {} });
  check('student', 'cannot change site settings', Boolean(sSet.error), sSet.error?.message);
  check('student', 'is_admin() is false', (await student.rpc('is_admin')).data === false);

  // ---------------- admin ----------------
  check('admin', 'is_admin() is true', (await admin.rpc('is_admin')).data === true);
  check('admin', 'sees all profiles', rows(await admin.from('profiles').select('id')).length >= 2);
  check('admin', 'sees draft course', rows(await admin.from('courses').select('id').eq('id', ids.draftCourse)).length === 1);
  const pendingId = rows(sPending)[0]?.id;
  const aApprove = await admin.from('course_enrollments').update({ status: 'active' }).eq('id', pendingId).select();
  check('admin', 'can approve an enrolment', rows(aApprove)[0]?.status === 'active', aApprove.error?.message);
  const aRev = await admin.from('internship_reviews').update({ reviewed: true, notes: 'Week 2 reviewed by admin.', reviewed_at: new Date().toISOString() }).eq('enrollment_id', ids.internshipEnrollment).eq('week_no', 2).select();
  check('admin', 'can write a weekly review', rows(aRev)[0]?.reviewed === true, aRev.error?.message);
  const aWeeks = await admin.from('internship_enrollments').update({ weeks_total: 6 }).eq('id', ids.internshipEnrollment).select();
  check('admin', 'can change weeks for a student', rows(aWeeks)[0]?.weeks_total === 6, aWeeks.error?.message);
  const aSet = await admin.from('site_settings').upsert({ key: 'probe', value: { ok: true } }).select();
  check('admin', 'can write site settings', rows(aSet).length === 1, aSet.error?.message);
  await admin.from('site_settings').delete().eq('key', 'probe');
  const aCourse = await admin.from('courses').insert({ title: `${TEST_PREFIX} admin-created`, status: 'draft' }).select();
  check('admin', 'can create a course', rows(aCourse).length === 1, aCourse.error?.message);

  // ---------------- storage: course PDFs ----------------
  const pdf = new Blob(['%PDF-1.4\n% test file\n'], { type: 'application/pdf' });
  const okPath = `${ids.openCourse}/test-notes.pdf`;
  const hiddenPath = `${ids.otherCourse}/hidden-notes.pdf`;
  const up1 = await admin.storage.from('course-resources').upload(okPath, pdf, { upsert: true, contentType: 'application/pdf' });
  const up2 = await admin.storage.from('course-resources').upload(hiddenPath, pdf, { upsert: true, contentType: 'application/pdf' });
  check('admin', 'can upload a course PDF', !up1.error && !up2.error, up1.error?.message || up2.error?.message);
  await admin.from('course_resources').insert([
    { course_id: ids.openCourse, kind: 'pdf', title: 'Class notes (PDF)', storage_path: okPath },
    { course_id: ids.otherCourse, kind: 'pdf', title: 'Hidden notes (PDF)', storage_path: hiddenPath },
  ]);
  const sOk = await student.storage.from('course-resources').createSignedUrl(okPath, 60);
  check('student', 'can open PDF of enrolled course', Boolean(sOk.data?.signedUrl), sOk.error?.message);
  const sNo = await student.storage.from('course-resources').createSignedUrl(hiddenPath, 60);
  // Student was just approved into otherCourse above, so revoke that first for a clean check.
  await admin.from('course_enrollments').delete().eq('id', pendingId);
  const sNo2 = await student.storage.from('course-resources').createSignedUrl(hiddenPath, 60);
  check('student', 'cannot open PDF of other course', !sNo2.data?.signedUrl, sNo2.error?.message || 'signed URL issued');
  const vPdf = await pub.storage.from('course-resources').createSignedUrl(okPath, 60);
  check('visitor', 'cannot open course PDFs', !vPdf.data?.signedUrl, vPdf.error?.message);
  void sNo;

  // ---------------- cookies for page tests ----------------
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(path.join(DATA_DIR, 'test-cookies.json'), JSON.stringify({ admin: await sessionCookies(acc.admin), student: await sessionCookies(acc.student) }));

  // ---------------- report ----------------
  const pad = (s, n) => (s + ' '.repeat(n)).slice(0, n);
  for (const r of results) console.log(`${r.pass ? 'PASS' : 'FAIL'}  ${pad(r.who, 8)} ${pad(r.name, 48)} ${r.pass ? '' : r.detail}`);
  const failed = results.filter((r) => !r.pass).length;
  console.log(`\n${results.length - failed}/${results.length} passed`);
  process.exit(failed ? 1 : 0);
}

main().catch((e) => { console.error('TEST RUN FAILED:', e.message); process.exit(2); });
