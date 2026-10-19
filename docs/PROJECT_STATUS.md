# BuildSoftTech — project status (as of 19 Oct 2026)

Repository: github.com/adityapatil-air/BuildSoftTech · Live: https://buildsofttechin.vercel.app (branch `main`) · Active work: branch `dev`.

## 1. What the project is

BuildSoftTech is the parent / publisher website of the IJEPA journal (https://ijepa.vercel.app). It presents four service verticals and, on the `dev` branch, is growing into a learning platform where students register, enrol in courses and internships, and receive certificates, all managed by one admin.

Stack: Next.js 14 (App Router), React 18, plain CSS, Supabase (Postgres, Auth, Storage). Deployed on Vercel.

## 2. Website content (from the client brief)

**Organisation**: BuildSoftTech, Shop No 2, Snehankit Colony, Karve Nagar, Pune-411052. Phone +91 8149844901. Email currently a placeholder (`info@buildsofttech.com`) pending the client's real address. Tagline: Research · Publication · Training · Technology.

**Pages and what they say**

| Route | Content |
| --- | --- |
| `/` | Hero (Research. Publish. Learn. Innovate.), facts strip, four core services, About + Mission, Who we serve (faculty, students, scholars, institutions), IJEPA publication band, internship promo, nine-step research workflow, why choose us, final CTA, journal-verification note |
| `/about` | Vision, seven-point mission, four verticals table, why choose us, quality & research-integrity lists (what we encourage / do not support) |
| `/services` | Overview of six services + workflow + note that IJEPA publication and SCI/Scopus collaboration are separate offerings |
| `/services/research-publication` | Publishing through IJEPA (ISSN 3139-5961): 12 support items, 16 research areas, 8-step publication process, who can submit, why publish, publication ethics statement, links to IJEPA site / submit / guidelines / issues |
| `/services/research-collaboration` | SCI/Scopus collaboration: 8-step flow, topic table (6 placeholder rows: title, area, index, duration, fee, status), 16 "may include" items, Packages A/B/C (durations, fees as placeholders), authorship policy, mandatory disclaimer |
| `/services/research-support` | Research idea development, literature review, methodology, implementation support, results & analysis; workflow timeline |
| `/internships` | 45-Day Paid Internship, ₹3,000/-: what's included (12 items), day-wise learning process (5 phases), 3 domain groups (17 technologies), what students gain, highlights table, who can apply |
| `/courses` | Six training programs with topic lists: Python, Data Science, AI & ML, Full Stack, Cloud & DevOps, Cybersecurity |
| `/research-areas` | 16 engineering/technology domains |
| `/for-faculty`, `/for-students`, `/for-research-scholars`, `/for-institutions` | Audience-specific service lists; faculty page carries the NBA/NAAC/NIRF non-guarantee note; institutions page lists FDP, student, research-development and department programs |
| `/faq` | Eight Q&As from the brief (no guarantees of publication/Scopus, implementation help, internships, courses, plagiarism screening) |
| `/contact` | Email and phone only; office address; what to include in an email; quick mailto links. No form, no WhatsApp (removed at the client's request) |
| Policies | Privacy, Terms & Conditions, Refund & Cancellation (drafted, need client review); Research & Publication Ethics, Authorship Policy, Disclaimer (verbatim from the brief) |

Not built: "Research Blog" (no content supplied).

## 3. How it works today (branch `main`, live)

- Every page is server-rendered on request. Shared layout loads site settings and renders header/footer with the current contact details.
- **Admin site settings** (`/admin`): editable from a dashboard and read live by the public pages:
  - Internship: fee, duration, mode, next batch text, note.
  - Courses: list with title, topics, optional fee and duration; add/remove/reorder.
  - Research topics table: title, area, index, duration, fee, status (Available / Reserved / Closed; only Available rows show an Apply button).
  - Packages A/B/C: duration and fee.
  - Contact: email, phone, dial link, hours, address.
- Settings storage: `site_settings` table in Supabase when the service key is configured; otherwise a local JSON file (dev only — not persistent on Vercel).
- API: `GET /api/settings` (public read), `PUT /api/settings` (admin only).
- On `main` the admin login is still the old single password (`ADMIN_PASSWORD` env var). On `dev` this has been replaced by Supabase Auth (see below).

## 4. Learning platform (branch `dev`, in progress)

**Client's requirement**

Courses: admin opens a course → students register and enrol → admin adds them to Teams → classes recorded, recordings on Google Drive (view-only) → admin attaches recording links, PDF notes and helpful links (YouTube, GitHub) to the course, visible only to enrolled students → admin issues a certificate on completion.

Internships: admin assigns a problem statement to each enrolled student → sets the number of weeks for that student → reviews weekly, ticking the week and writing notes/suggestions visible to both → shares the repository link → issues a certificate on successful completion.

**Done so far**

- Database schema (`supabase/schema.sql`): `profiles`, `courses`, `course_enrollments`, `course_sessions` (recording link per class), `course_resources` (PDF in private storage bucket, or link), `internships`, `internship_enrollments` (problem statement, weeks_total, repo_url), `internship_reviews` (one row per week: reviewed flag, notes, suggestions), `certificates` (unique certificate number), `site_settings`. Row-level security: students see only their own rows and only sessions/resources of courses they are actively enrolled in; admins (profiles.role = 'admin') have full access. A trigger creates a profile on sign-up.
- Authentication: Supabase Auth email + password. `/register` (name, mobile, degree, institution, email, password), `/login`, sign-out. Middleware refreshes sessions and redirects signed-out visitors away from `/dashboard` and `/admin`. Header shows Login/Register or the user's name with a dashboard link.
- Student dashboard (`/dashboard`): lists my course enrolments (with status), my internship enrolments, my certificates (reads from the DB).
- Admin area behind the admin role with sections: Site settings (as before), Courses list (with enrolment counts), Internships list, Students list (all registered users with their course/internship counts).
- Plan document: `docs/PLATFORM_PLAN.md`.

**Not yet built**

- Admin create/edit forms for courses and internships; adding sessions (recording links), uploading PDFs, adding links.
- Enrolment flow (student "Enrol" button; admin approve/reject) and course detail page for students (recordings, notes, links).
- Internship detail pages: problem statement, weeks, weekly review ticks and notes, repo link.
- Certificate issue and public verification page (`/certificates/[number]`).
- Public `/courses` and `/internships` pages reading from the database instead of the settings list.

**Blocked on**: a Supabase project. The client needs to run `supabase/schema.sql`, put `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` and `SUPABASE_SERVICE_ROLE_KEY` in `.env.local` (and later in Vercel), register once on the site, then mark that profile as admin with one SQL update. Nothing on `dev` has been tested against a real database yet.

## 5. Configuration and deployment

- `.env.example` lists every variable. `.env.local` is gitignored.
- Vercel deploys `main`; `vercel.json` pins the Next.js preset (the first deployment 404'd because the project was created from a README-only repo).
- Vercel needs the Supabase variables set before the admin panel can save anything in production.
- Commits are authored as `Claude <noreply@anthropic.com>` on `dev`; merging `dev` into `main` is the client's decision.

## 6. Open items for the client

1. Real email address and confirmation of phone/address.
2. Real research collaboration titles, durations and fees (6 placeholder rows) and package fees.
3. Review of the drafted Privacy, Terms and Refund texts.
4. Own photos for the "Who we serve" cards (currently Unsplash, free licence).
5. Supabase project and keys (see section 4).
6. Decide whether course enrolment needs admin approval (currently designed as pending → approved) and how fees are collected (not in scope yet; no payment integration).
