'use server';

// Admin server actions. Every write runs through the signed-in admin's Supabase session, so the
// database row-level-security rules apply on top of the requireAdmin() check.
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { requireAdmin } from '../../lib/session';
import { back, date, int, isUuid, lines, localPath, oneOf, str, url } from '../../lib/forms';

const COURSE_STATUS = ['draft', 'open', 'running', 'completed', 'closed'];
const INTERNSHIP_STATUS = ['draft', 'open', 'closed'];
const ENROLL_STATUS = ['pending', 'active', 'completed', 'rejected'];
const LINK_KINDS = ['youtube', 'github', 'link'];

const fail = (path, error) => back(path, error?.message || String(error), 'error');

// ---------------------------------------------------------------- courses

export async function saveCourse(fd) {
  const { supabase } = await requireAdmin();
  const id = str(fd, 'id', 40);
  const row = {
    title: str(fd, 'title', 200),
    description: str(fd, 'description', 5000),
    topics: lines(fd, 'topics'),
    fee: str(fd, 'fee', 60),
    duration: str(fd, 'duration', 60),
    mode: str(fd, 'mode', 60) || 'Online',
    status: oneOf(fd, 'status', COURSE_STATUS, 'draft'),
    teams_link: url(fd, 'teams_link'),
    drive_folder: url(fd, 'drive_folder'),
    start_date: date(fd, 'start_date'),
  };
  const where = id ? `/admin/courses/${id}` : '/admin/courses/new';
  if (!row.title) fail(where, 'Title is required.');
  if (str(fd, 'teams_link') && !row.teams_link) fail(where, 'Teams link must start with https://');
  if (str(fd, 'drive_folder') && !row.drive_folder) fail(where, 'Drive folder link must start with https://');

  if (id) {
    if (!isUuid(id)) fail('/admin/courses', 'Unknown course.');
    const { error } = await supabase.from('courses').update(row).eq('id', id);
    if (error) fail(where, error);
    revalidatePath(`/admin/courses/${id}`);
    back(`/admin/courses/${id}`, 'Course saved.');
  }
  const { data, error } = await supabase.from('courses').insert(row).select('id').single();
  if (error) fail(where, error);
  revalidatePath('/admin/courses');
  back(`/admin/courses/${data.id}`, row.status === 'draft'
    ? 'Course created as a draft. Add classes and resources, then set the status to Open when students can enrol.'
    : 'Course created and visible on the website. Add classes and resources below.');
}

export async function deleteCourse(fd) {
  const { supabase } = await requireAdmin();
  const id = str(fd, 'id', 40);
  if (!isUuid(id)) fail('/admin/courses', 'Unknown course.');
  // Remove uploaded PDFs first; rows cascade with the course.
  const { data: files } = await supabase.from('course_resources').select('storage_path').eq('course_id', id).neq('storage_path', '');
  const paths = (files || []).map((f) => f.storage_path).filter(Boolean);
  if (paths.length) await supabase.storage.from('course-resources').remove(paths);
  const { error } = await supabase.from('courses').delete().eq('id', id);
  if (error) fail(`/admin/courses/${id}`, error);
  revalidatePath('/admin/courses');
  back('/admin/courses', 'Course deleted.');
}

// ---------------------------------------------------------------- sessions (classes)

export async function saveSession(fd) {
  const { supabase } = await requireAdmin();
  const courseId = str(fd, 'course_id', 40);
  const id = str(fd, 'id', 40);
  const page = `/admin/courses/${courseId}`;
  if (!isUuid(courseId)) fail('/admin/courses', 'Unknown course.');
  const row = {
    title: str(fd, 'title', 200),
    session_date: date(fd, 'session_date'),
    recording_url: url(fd, 'recording_url'),
    notes: str(fd, 'notes', 2000),
  };
  if (!row.title) fail(page, 'Class title is required.');
  if (str(fd, 'recording_url') && !row.recording_url) fail(page, 'Recording link must start with https:// (use the Google Drive share link).');
  if (id) {
    const { error } = await supabase.from('course_sessions').update(row).eq('id', id).eq('course_id', courseId);
    if (error) fail(page, error);
  } else {
    const { data: last } = await supabase.from('course_sessions').select('position').eq('course_id', courseId).order('position', { ascending: false }).limit(1);
    const { error } = await supabase.from('course_sessions').insert({ ...row, course_id: courseId, position: (last?.[0]?.position ?? 0) + 1 });
    if (error) fail(page, error);
  }
  revalidatePath(page);
  back(`${page}#classes`, id ? 'Class updated.' : 'Class added.');
}

export async function deleteSession(fd) {
  const { supabase } = await requireAdmin();
  const courseId = str(fd, 'course_id', 40);
  const { error } = await supabase.from('course_sessions').delete().eq('id', str(fd, 'id', 40)).eq('course_id', courseId);
  if (error) fail(`/admin/courses/${courseId}`, error);
  revalidatePath(`/admin/courses/${courseId}`);
  back(`/admin/courses/${courseId}#classes`, 'Class removed.');
}

// ---------------------------------------------------------------- resources

export async function addLinkResource(fd) {
  const { supabase } = await requireAdmin();
  const courseId = str(fd, 'course_id', 40);
  const page = `/admin/courses/${courseId}`;
  const row = { course_id: courseId, kind: oneOf(fd, 'kind', LINK_KINDS, 'link'), title: str(fd, 'title', 200), url: url(fd, 'url') };
  if (!row.title) fail(page, 'Resource title is required.');
  if (!row.url) fail(page, 'Resource link must be a full https:// address.');
  const { error } = await supabase.from('course_resources').insert(row);
  if (error) fail(page, error);
  revalidatePath(page);
  back(`${page}#resources`, 'Link added.');
}

// Called from the PDF upload component after the file is in storage. Returns instead of
// redirecting because it is invoked from client code.
export async function addPdfResource(fd) {
  const { supabase } = await requireAdmin();
  const courseId = str(fd, 'course_id', 40);
  const path = str(fd, 'storage_path', 300);
  if (!isUuid(courseId) || !path.startsWith(`${courseId}/`) || !path.toLowerCase().endsWith('.pdf')) return { error: 'Invalid file path.' };
  const { error } = await supabase.from('course_resources').insert({ course_id: courseId, kind: 'pdf', title: str(fd, 'title', 200) || 'Notes', storage_path: path });
  if (error) {
    await supabase.storage.from('course-resources').remove([path]);
    return { error: error.message };
  }
  revalidatePath(`/admin/courses/${courseId}`);
  return { ok: true };
}

export async function deleteResource(fd) {
  const { supabase } = await requireAdmin();
  const courseId = str(fd, 'course_id', 40);
  const id = str(fd, 'id', 40);
  const { data: res } = await supabase.from('course_resources').select('storage_path').eq('id', id).eq('course_id', courseId).maybeSingle();
  if (res?.storage_path) await supabase.storage.from('course-resources').remove([res.storage_path]);
  const { error } = await supabase.from('course_resources').delete().eq('id', id).eq('course_id', courseId);
  if (error) fail(`/admin/courses/${courseId}`, error);
  revalidatePath(`/admin/courses/${courseId}`);
  back(`/admin/courses/${courseId}#resources`, 'Resource removed.');
}

// ---------------------------------------------------------------- enrolments (both kinds)

const ENROLL_TABLE = { course: 'course_enrollments', internship: 'internship_enrollments' };

export async function setEnrollmentStatus(fd) {
  const { supabase } = await requireAdmin();
  const kind = oneOf(fd, 'kind', ['course', 'internship'], 'course');
  const id = str(fd, 'id', 40);
  const status = oneOf(fd, 'status', ENROLL_STATUS, 'pending');
  const page = localPath(fd, 'back', '/admin');
  const patch = { status, completed_at: status === 'completed' ? new Date().toISOString() : null };
  const { error } = await supabase.from(ENROLL_TABLE[kind]).update(patch).eq('id', id);
  if (error) fail(page, error);
  revalidatePath(page);
  const label = { active: 'Enrolment approved.', rejected: 'Enrolment rejected.', completed: 'Marked as completed.', pending: 'Moved back to pending.' }[status];
  back(`${page}#students`, label);
}

export async function addStudentByEmail(fd) {
  const { supabase } = await requireAdmin();
  const kind = oneOf(fd, 'kind', ['course', 'internship'], 'course');
  const parentId = str(fd, 'parent_id', 40);
  const email = str(fd, 'email', 200).toLowerCase();
  const page = localPath(fd, 'back', '/admin');
  if (!email) fail(page, 'Enter the student’s email.');
  const { data: profile } = await supabase.from('profiles').select('id, full_name').ilike('email', email).maybeSingle();
  if (!profile) fail(page, `No registered account for ${email}. Ask the student to register first.`);
  const row = kind === 'course'
    ? { course_id: parentId, student_id: profile.id, status: 'active' }
    : { internship_id: parentId, student_id: profile.id, status: 'active' };
  const { error } = await supabase.from(ENROLL_TABLE[kind]).insert(row);
  if (error) fail(page, error.code === '23505' ? `${email} is already enrolled.` : error);
  revalidatePath(page);
  back(`${page}#students`, `${profile.full_name || email} added and approved.`);
}

export async function removeEnrollment(fd) {
  const { supabase } = await requireAdmin();
  const kind = oneOf(fd, 'kind', ['course', 'internship'], 'course');
  const page = localPath(fd, 'back', '/admin');
  const { error } = await supabase.from(ENROLL_TABLE[kind]).delete().eq('id', str(fd, 'id', 40));
  if (error) fail(page, error);
  revalidatePath(page);
  back(`${page}#students`, 'Enrolment removed.');
}

// ---------------------------------------------------------------- certificates

// Numbers are never reused, even after a certificate is revoked (revoking deletes the row), so a
// running high-water mark per prefix is kept in site_settings under 'certificate_counters'.
const COUNTER_KEY = 'certificate_counters';

async function nextCertificateNo(supabase, kind) {
  const prefix = `${kind === 'course' ? 'BST-C' : 'BST-I'}-${new Date().getFullYear()}-`;
  const [{ data: rows }, { data: counter }] = await Promise.all([
    supabase.from('certificates').select('certificate_no').like('certificate_no', `${prefix}%`),
    supabase.from('site_settings').select('value').eq('key', COUNTER_KEY).maybeSingle(),
  ]);
  const maxIssued = (rows || []).reduce((m, r) => Math.max(m, Number.parseInt(r.certificate_no.slice(prefix.length), 10) || 0), 0);
  const highWater = Number(counter?.value?.[prefix]) || 0;
  return { prefix, next: Math.max(maxIssued, highWater) + 1, counters: counter?.value || {} };
}

async function recordCertificateNo(supabase, counters, prefix, n) {
  if ((Number(counters[prefix]) || 0) >= n) return;
  await supabase.from('site_settings').upsert({ key: COUNTER_KEY, value: { ...counters, [prefix]: n } });
}

export async function issueCertificate(fd) {
  const { supabase, user } = await requireAdmin();
  const kind = oneOf(fd, 'kind', ['course', 'internship'], 'course');
  const enrollmentId = str(fd, 'enrollment_id', 40);
  const page = localPath(fd, 'back', '/admin');
  const sel = kind === 'course' ? 'id, status, student_id, parent:courses(title)' : 'id, status, student_id, parent:internships(title)';
  const { data: enr } = await supabase.from(ENROLL_TABLE[kind]).select(sel).eq('id', enrollmentId).maybeSingle();
  if (!enr) fail(page, 'Enrolment not found.');
  if (enr.status !== 'completed') fail(page, 'Mark the enrolment as completed before issuing a certificate.');
  const numbering = await nextCertificateNo(supabase, kind);
  const { prefix, counters } = numbering;
  let { next } = numbering;
  for (let attempt = 0; attempt < 5; attempt += 1) {
    const certificate_no = `${prefix}${String(next).padStart(4, '0')}`;
    const { error } = await supabase.from('certificates').insert({ certificate_no, kind, student_id: enr.student_id, enrollment_id: enr.id, title: enr.parent?.title || 'BuildSoftTech program', issued_by: user.id });
    if (!error) {
      await recordCertificateNo(supabase, counters, prefix, next);
      revalidatePath(page);
      back(`${page}#students`, `Certificate ${certificate_no} issued.`);
    }
    if (error.code === '23505' && /kind_enrollment|enrollment_id/.test(error.message + (error.details || ''))) fail(page, 'A certificate was already issued for this enrolment.');
    if (error.code !== '23505') fail(page, error);
    next += 1; // number taken by a parallel issue; try the next one
  }
  fail(page, 'Could not allocate a certificate number. Try again.');
}

export async function revokeCertificate(fd) {
  const { supabase } = await requireAdmin();
  const page = localPath(fd, 'back', '/admin');
  const { error } = await supabase.from('certificates').delete().eq('id', str(fd, 'id', 40));
  if (error) fail(page, error);
  revalidatePath(page);
  back(`${page}#students`, 'Certificate revoked. Its number no longer verifies.');
}

// ---------------------------------------------------------------- internships

export async function saveInternship(fd) {
  const { supabase } = await requireAdmin();
  const id = str(fd, 'id', 40);
  const row = {
    title: str(fd, 'title', 200),
    domain: str(fd, 'domain', 120),
    description: str(fd, 'description', 5000),
    fee: str(fd, 'fee', 60),
    duration: str(fd, 'duration', 60) || '45 Days',
    status: oneOf(fd, 'status', INTERNSHIP_STATUS, 'draft'),
  };
  const where = id ? `/admin/internships/${id}` : '/admin/internships/new';
  if (!row.title) fail(where, 'Title is required.');
  if (id) {
    if (!isUuid(id)) fail('/admin/internships', 'Unknown internship.');
    const { error } = await supabase.from('internships').update(row).eq('id', id);
    if (error) fail(where, error);
    revalidatePath(where);
    back(where, 'Internship saved.');
  }
  const { data, error } = await supabase.from('internships').insert(row).select('id').single();
  if (error) fail(where, error);
  revalidatePath('/admin/internships');
  back(`/admin/internships/${data.id}`, row.status === 'draft' ? 'Internship created as a draft. Set the status to Open when students can apply.' : 'Internship created and open for applications.');
}

export async function deleteInternship(fd) {
  const { supabase } = await requireAdmin();
  const id = str(fd, 'id', 40);
  const { error } = await supabase.from('internships').delete().eq('id', id);
  if (error) fail(`/admin/internships/${id}`, error);
  revalidatePath('/admin/internships');
  back('/admin/internships', 'Internship deleted.');
}

export async function saveInternshipStudent(fd) {
  const { supabase } = await requireAdmin();
  const id = str(fd, 'id', 40);
  const page = localPath(fd, 'back', '/admin/internships');
  const row = {
    problem_statement: str(fd, 'problem_statement', 10000),
    weeks_total: int(fd, 'weeks_total', { def: 6, min: 1, max: 52 }),
    start_date: date(fd, 'start_date'),
    repo_url: url(fd, 'repo_url'),
  };
  if (str(fd, 'repo_url') && !row.repo_url) fail(page, 'Repository link must start with https://');
  const { error } = await supabase.from('internship_enrollments').update(row).eq('id', id);
  if (error) fail(page, error);
  revalidatePath(page);
  back(page, 'Saved. The student sees the update on their dashboard.');
}

export async function saveReview(fd) {
  const { supabase } = await requireAdmin();
  const enrollmentId = str(fd, 'enrollment_id', 40);
  const week = int(fd, 'week_no', { def: 0, min: 1, max: 52 });
  const page = localPath(fd, 'back', '/admin/internships');
  if (!week) fail(page, 'Invalid week.');
  const reviewed = fd.get('reviewed') === 'on';
  const { error } = await supabase.from('internship_reviews').upsert({
    enrollment_id: enrollmentId,
    week_no: week,
    reviewed,
    notes: str(fd, 'notes', 5000),
    suggestions: str(fd, 'suggestions', 5000),
    reviewed_at: reviewed ? new Date().toISOString() : null,
  }, { onConflict: 'enrollment_id,week_no' });
  if (error) fail(page, error);
  revalidatePath(page);
  back(`${page}#week-${week}`, `Week ${week} saved.`);
}

export async function goTo(fd) {
  redirect(localPath(fd, 'to', '/admin'));
}
