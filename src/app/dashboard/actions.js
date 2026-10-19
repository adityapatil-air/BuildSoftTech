'use server';

// Student actions: request a place on a course or internship. The database only accepts
// 'pending' rows for the signed-in student; an admin approves them.
import { revalidatePath } from 'next/cache';
import { requireUser } from '../../lib/session';
import { back, isUuid, localPath, str } from '../../lib/forms';

async function enrol(fd, kind) {
  const table = kind === 'course' ? 'course_enrollments' : 'internship_enrollments';
  const parentKey = kind === 'course' ? 'course_id' : 'internship_id';
  const parentTable = kind === 'course' ? 'courses' : 'internships';
  const id = str(fd, 'id', 40);
  const from = localPath(fd, 'back', kind === 'course' ? '/courses' : '/internships');
  const { supabase, user } = await requireUser(from);
  if (!isUuid(id)) back(from, 'Unknown program.', 'error');

  const { data: parent } = await supabase.from(parentTable).select('id, title, status').eq('id', id).maybeSingle();
  if (!parent) back(from, 'This program is not available.', 'error');
  const openStates = kind === 'course' ? ['open', 'running'] : ['open'];
  if (!openStates.includes(parent.status)) back(from, `${parent.title} is not taking enrolments right now.`, 'error');

  const { error } = await supabase.from(table).insert({ [parentKey]: id, student_id: user.id, status: 'pending' });
  if (error && error.code === '23505') back('/dashboard', `You have already applied for ${parent.title}.`);
  if (error) back(from, error.message, 'error');
  revalidatePath('/dashboard');
  back('/dashboard', `Request sent for ${parent.title}. We will confirm once your place is approved.`);
}

export async function enrolCourse(fd) { return enrol(fd, 'course'); }
export async function enrolInternship(fd) { return enrol(fd, 'internship'); }
