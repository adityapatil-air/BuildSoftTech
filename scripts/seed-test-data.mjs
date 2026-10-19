// Creates a test admin, a test student and sample [TEST] data in the connected Supabase project.
// Usage: node scripts/seed-test-data.mjs   (re-runnable; replaces previous [TEST] data)
// Credentials are written to .data/test-accounts.json (gitignored). Remove everything with
// node scripts/cleanup-test-data.mjs
import fs from 'fs';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';
import { clientOpts, ACCOUNTS_FILE, DATA_DIR, TEST_PREFIX, loadEnv } from './_env.mjs';

const { url, service } = loadEnv();
const db = createClient(url, service, clientOpts());

const ACCOUNTS = {
  admin: { email: 'bst-test-admin@example.com', full_name: 'Test Admin', role: 'admin' },
  student: { email: 'bst-test-student@example.com', full_name: 'Test Student', role: 'student', phone: '9000000000', institution: 'Test Engineering College', degree: 'B.E. / B.Tech' },
};

const must = (label, { data, error }) => {
  if (error) throw new Error(`${label}: ${error.message}`);
  return data;
};

async function ensureUser(acc) {
  const password = `Bst-${crypto.randomBytes(9).toString('base64url')}`;
  const list = must('list users', await db.auth.admin.listUsers({ perPage: 200 }));
  const existing = list.users.find((u) => u.email === acc.email);
  const meta = { full_name: acc.full_name, phone: acc.phone || '', institution: acc.institution || '', degree: acc.degree || '' };
  let user;
  if (existing) {
    user = must('update user', await db.auth.admin.updateUserById(existing.id, { password, email_confirm: true, user_metadata: meta })).user;
  } else {
    user = must('create user', await db.auth.admin.createUser({ email: acc.email, password, email_confirm: true, user_metadata: meta })).user;
  }
  // The on_auth_user_created trigger makes the profile; make sure it exists and has the right role.
  must('upsert profile', await db.from('profiles').upsert({ id: user.id, email: acc.email, full_name: acc.full_name, phone: meta.phone, institution: meta.institution, degree: meta.degree, role: acc.role }));
  return { id: user.id, email: acc.email, password };
}

async function wipeTestData() {
  // Children cascade from courses / internships.
  must('delete test certificates', await db.from('certificates').delete().like('title', `${TEST_PREFIX}%`));
  must('delete test courses', await db.from('courses').delete().like('title', `${TEST_PREFIX}%`));
  must('delete test internships', await db.from('internships').delete().like('title', `${TEST_PREFIX}%`));
  // Test runs advance the certificate counter; start each run from a clean slate.
  await db.from('site_settings').delete().eq('key', 'certificate_counters');
}

async function main() {
  const admin = await ensureUser(ACCOUNTS.admin);
  const student = await ensureUser(ACCOUNTS.student);
  await wipeTestData();

  const [openCourse, doneCourse, draftCourse, otherCourse] = must('insert courses', await db.from('courses').insert([
    { title: `${TEST_PREFIX} Python Programming — Nov batch`, description: 'Seeded test course (student enrolled, active).', topics: ['Python Fundamentals', 'OOP', 'Mini Projects'], fee: '₹4,500/-', duration: '6 weeks', mode: 'Online', status: 'running', teams_link: 'https://teams.microsoft.com/l/meetup-join/test', drive_folder: 'https://drive.google.com/drive/folders/test' },
    { title: `${TEST_PREFIX} Data Science — Sep batch`, description: 'Seeded test course (student completed, certificate issued).', topics: ['Pandas', 'Statistics'], fee: '₹6,000/-', duration: '8 weeks', mode: 'Hybrid', status: 'completed' },
    { title: `${TEST_PREFIX} Draft course`, description: 'Seeded draft — must be hidden from the public.', status: 'draft' },
    { title: `${TEST_PREFIX} Cloud & DevOps — open`, description: 'Seeded open course the student is NOT enrolled in.', status: 'open', fee: '₹5,000/-', duration: '6 weeks' },
  ]).select());

  const [activeEnr, doneEnr] = must('insert course enrolments', await db.from('course_enrollments').insert([
    { course_id: openCourse.id, student_id: student.id, status: 'active' },
    { course_id: doneCourse.id, student_id: student.id, status: 'completed', completed_at: new Date().toISOString() },
  ]).select());

  must('insert sessions', await db.from('course_sessions').insert([
    { course_id: openCourse.id, position: 1, title: 'Class 1 — Setup and basics', session_date: '2026-11-03', recording_url: 'https://drive.google.com/file/d/test-recording-1/view', notes: 'Install Python 3.12 before class.' },
    { course_id: openCourse.id, position: 2, title: 'Class 2 — Functions', session_date: '2026-11-05', recording_url: 'https://drive.google.com/file/d/test-recording-2/view' },
    { course_id: otherCourse.id, position: 1, title: 'Class 1 — Linux (not enrolled)', recording_url: 'https://drive.google.com/file/d/test-private/view' },
  ]));

  must('insert resources', await db.from('course_resources').insert([
    { course_id: openCourse.id, kind: 'youtube', title: 'Python crash course', url: 'https://www.youtube.com/watch?v=test' },
    { course_id: openCourse.id, kind: 'github', title: 'Class exercises repo', url: 'https://github.com/example/python-exercises' },
    { course_id: otherCourse.id, kind: 'link', title: 'Hidden resource', url: 'https://example.com/private' },
  ]));

  const [internship] = must('insert internship', await db.from('internships').insert([
    { title: `${TEST_PREFIX} Web Development Internship`, domain: 'Full Stack Development', description: 'Seeded test internship.', fee: '₹3,000/-', duration: '45 Days', status: 'open' },
  ]).select());

  const [intEnr] = must('insert internship enrolment', await db.from('internship_enrollments').insert([
    { internship_id: internship.id, student_id: student.id, status: 'active', problem_statement: 'Build a library management web app with login, book search and issue/return tracking.', weeks_total: 4, repo_url: 'https://github.com/example/library-app', start_date: '2026-11-01' },
  ]).select());

  must('insert reviews', await db.from('internship_reviews').insert([
    { enrollment_id: intEnr.id, week_no: 1, reviewed: true, notes: 'Good database schema. Login works.', suggestions: 'Add input validation on the sign-up form.', reviewed_at: new Date().toISOString() },
    { enrollment_id: intEnr.id, week_no: 2, reviewed: false },
  ]));

  must('insert certificate', await db.from('certificates').insert([
    { certificate_no: 'BST-C-2026-9001', kind: 'course', student_id: student.id, enrollment_id: doneEnr.id, title: `${TEST_PREFIX} Data Science — Sep batch`, issued_by: admin.id },
  ]));

  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(ACCOUNTS_FILE, JSON.stringify({
    note: 'Test accounts for local testing only. Delete with: node scripts/cleanup-test-data.mjs',
    admin: { id: admin.id, email: admin.email, password: admin.password },
    student: { id: student.id, email: student.email, password: student.password },
    ids: { openCourse: openCourse.id, doneCourse: doneCourse.id, draftCourse: draftCourse.id, otherCourse: otherCourse.id, internship: internship.id, activeEnrollment: activeEnr.id, internshipEnrollment: intEnr.id },
  }, null, 2));

  console.log('Seeded:', { admin: admin.email, student: student.email, courses: 4, internships: 1, certificate: 'BST-C-2026-9001' });
  console.log(`Credentials saved to ${ACCOUNTS_FILE}`);
}

main().catch((e) => { console.error('SEED FAILED:', e.message); process.exit(1); });
