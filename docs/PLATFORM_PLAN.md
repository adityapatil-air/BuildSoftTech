# BuildSoftTech learning platform — plan

Branch: `dev`. Backend: Supabase (Postgres, Auth, Storage). Frontend: the existing Next.js site.

## What the client described

**Courses**

1. Admin creates a course and opens it for enrolment.
2. Students register on the site and enrol in a course.
3. Admin adds enrolled students to the Microsoft Teams group and takes live classes.
4. Classes are recorded; recordings sit on Google Drive as view-only links.
5. Admin adds each recording to the course; only enrolled students can see it.
6. Admin can attach notes (PDF upload) and helpful links (YouTube, GitHub, articles) to a course.
7. When the course is done, admin issues a certificate to each student.

**Internships**

1. Admin creates an internship and assigns a problem statement to each enrolled student.
2. Admin sets how many weeks that student's internship runs.
3. Every week admin reviews the work: ticks the week as reviewed and writes notes / suggestions. Both admin and student see this.
4. Admin shares the student's repository link during the internship.
5. On successful completion admin issues a certificate.

Admin does all of this from one dashboard.

## Roles and login

One login system for everyone: Supabase Auth (email + password). A `profiles` row is created
for each user with `role = 'student'`. The admin account is any profile with `role = 'admin'`
(set once in the Supabase table editor or via SQL — see `supabase/schema.sql`).

The existing `/admin` site-settings panel moves behind the same login (admin role) so the old
`ADMIN_PASSWORD` cookie is no longer needed.

## Data model (see `supabase/schema.sql`)

| Table | Purpose |
| --- | --- |
| `profiles` | one per auth user: name, phone, institution, degree, role |
| `courses` | title, description, fee, duration, mode, status, Teams link, Drive folder |
| `course_enrollments` | student ↔ course, status pending → active → completed |
| `course_sessions` | one per class: date, title, Drive recording link, notes |
| `course_resources` | PDFs (Supabase Storage) and links (YouTube / GitHub / other) |
| `internships` | title, domain, description, fee, status |
| `internship_enrollments` | student ↔ internship, problem statement, weeks, repo link, status |
| `internship_reviews` | one row per week: reviewed flag, notes, suggestions |
| `certificates` | issued certificate: number, kind (course / internship), student, reference |
| `site_settings` | the existing admin-editable settings (fees, topics, contact) |

Row-level security: students read and write only their own rows and see sessions/resources
only for courses they are actively enrolled in. Admins (profiles.role = 'admin') have full
access. Recording and Drive links are never exposed to anonymous visitors.

## Routes

Public (unchanged): `/`, `/courses`, `/internships`, …

Student portal

- `/login`, `/register`
- `/dashboard` — my courses, my internships, my certificates
- `/dashboard/courses/[id]` — sessions and recordings, notes, links, certificate
- `/dashboard/internships/[id]` — problem statement, weekly review timeline, repo link, certificate
- `/certificates/[number]` — public verification page (name, course/internship, date)

Admin (role = admin)

- `/admin` — overview + site settings (existing)
- `/admin/courses`, `/admin/courses/[id]` — details, sessions, resources, enrolments, certificates
- `/admin/internships`, `/admin/internships/[id]` — enrolments; per student: weeks, reviews, repo, certificate
- `/admin/students` — all registered students

## Status (19 Oct 2026)

Built and tested end to end on `dev` against the live Supabase project: admin course create/edit/delete, classes with Drive recording links, PDF upload and links, enrolment approve/reject/complete/remove and add-by-email; internship create/edit/delete, per-student problem statement, weeks, start date, repo link and weekly reviews; certificate issue/revoke with numbers that are never reused; public verification and printable certificate at `/certificates/[number]`; student course and internship pages; Enrol / Apply buttons on `/courses` and `/internships`; admin overview counts. Not built: payment collection, emails to students on approval or review, public listing of completed programs.

## Delivery order

1. Schema + Supabase clients + auth (register / login / logout), student dashboard shell.
2. Admin: courses CRUD, sessions, resources (PDF upload to Storage), enrolment approval, certificates.
3. Student: course page with recordings and resources.
4. Admin + student: internships, weekly reviews, repo link, certificates.
5. Public certificate verification page; public course / internship listings read from the DB.
