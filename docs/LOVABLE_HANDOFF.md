# BuildSoftTech — complete product specification (handoff for a new UI build)

Prepared 19 October 2026. This document contains everything needed to rebuild the BuildSoftTech website and learning platform with a new user interface: all page content, user roles, functional flows, the database schema, permission rules, integrations and open items. It deliberately says nothing about visual design, layout or styling; the new UI is to be designed fresh.

Source repository (current implementation, for reference only): https://github.com/adityapatil-air/BuildSoftTech — branch `dev` has the latest, branch `main` is deployed at https://buildsofttechin.vercel.app.

---

## 1. What BuildSoftTech is

BuildSoftTech is a research and technology services organisation in Pune, India. It is the publisher of the IJEPA journal (International Journal of Engineering Practices and Applications, ISSN 3139-5961, https://ijepa.vercel.app). The BuildSoftTech website is the **parent** site; IJEPA is the **child** site, linked from BuildSoftTech's navigation and content.

The business has four verticals:

| Vertical | Target customers |
| --- | --- |
| Research Publication Services (through IJEPA) | Faculty, scholars, researchers |
| SCI / Scopus Research Collaboration | Faculty, researchers, institutions |
| Internships & Projects (45-day paid internship) | UG / PG students |
| Technology Training (software courses) | Students, faculty, professionals |

Plus: Research Support Services and Institutional Programs (FDPs, bootcamps, workshops for colleges).

The website has two parts:

1. **Public marketing site** — the pages listed in section 4, with content in section 5 and Appendix A.
2. **Learning platform** — students register and log in; the admin manages courses (with class recordings, PDF notes, links), internships (problem statement, weekly reviews, repository link) and issues certificates. One admin manages everything from a dashboard. Specified in section 6.

### Organisation facts

- Name: BuildSoftTech
- Tagline: Research · Publication · Training · Technology
- Address: Shop No 2, Snehankit Colony, Karve Nagar, Pune-411052, Maharashtra, India
- Phone: +91 8149844901
- Email: **placeholder** `info@buildsofttech.com` — the client must confirm the real address
- Office hours shown on contact page: Mon–Sat, 10:00 AM – 6:00 PM IST
- Logo: `public/logo.png` in the repository (round badge, "BUILD SOFTECH" with a leaf motif). Reuse this logo.
- Journal: IJEPA — site https://ijepa.vercel.app · submit a paper https://ijepa.vercel.app/submitform · author guidelines https://ijepa.vercel.app/author-guidelines · issues https://ijepa.vercel.app/journal-issues

### Content rules the client insists on

- Never promise or imply guaranteed publication, acceptance, indexing, authorship, promotion or accreditation. The disclaimers in section 5.9 must appear where stated.
- Authorship is contribution-based; author positions are never "sold".
- IJEPA publication and SCI/Scopus collaboration are **two different services** and must be presented as such.
- Contact is by **email and phone only**. No contact form, no WhatsApp buttons or links anywhere.
- Copy should read as written by a person: plain wording, no exaggerated claims, no filler.

---

## 2. Users and roles

| Role | Who | Can do |
| --- | --- | --- |
| Visitor | Anyone | Read all public pages; see course and internship listings; register |
| Student | Registered user (default role on sign-up) | Log in; enrol in courses and internships; see own enrolments; see recordings, notes and links of courses they are **actively** enrolled in; see own internship problem statement, weekly reviews and repo link; see and open own certificates |
| Admin | A profile whose `role = 'admin'` (set once in the database) | Everything a student can, plus: edit site settings; create/edit courses and internships; approve/reject enrolments; add sessions (recording links), upload PDFs, add links; assign problem statements, set weeks, write weekly reviews, add repo links; issue certificates; view all students |

There is exactly one login system (Supabase Auth, email + password). Registration captures: full name, mobile, degree (one of: B.E. / B.Tech, M.E. / M.Tech, BCA / MCA, B.Sc. / M.Sc., Diploma, Ph.D. / Research Scholar, Faculty, Working Professional, Other), college / institution, email, password (min 8 characters). A profile row is created automatically on sign-up. Email confirmation may be on or off in Supabase; the register screen must handle both ("check your inbox" vs. immediate sign-in).

Signed-out users who open any student or admin page are sent to login and returned to the requested page afterwards. A student who opens an admin page is sent to their dashboard with an "administrators only" message.

---

## 3. Navigation (information architecture)

Primary navigation: Home · About Us · Services (dropdown: Research Publication (IJEPA), SCI / Scopus Research Collaboration, Research Support Services, Internship Programs, Software Training, Institutional Programs, Research Areas) · IJEPA Journal (external, opens https://ijepa.vercel.app) · Internships · Courses · Who We Serve (dropdown: For Faculty Members, For Students, For Research Scholars, For Institutions) · FAQ · Contact · Login / Register (or, when signed in: the user's first name, "My dashboard" or "Admin", Sign out).

Top information bar: "Research · Publication · Training · Technology | Publisher of IJEPA · ISSN 3139-5961", the contact email, and an "IJEPA Journal ↗" link.

Footer columns: Quick Links (About Us, Services, Research Publication, SCI/Scopus Research, Internship, Training Courses) · Who We Serve (Faculty Services, Student Services, Research Scholars, Institutional Services, Research Areas, Contact Us) · Important Policies (Privacy Policy, Terms & Conditions, Refund & Cancellation, Research & Publication Ethics, Authorship Policy, Disclaimer) · Contact (email, phone, address, link to IJEPA with full name). Below: the global disclaimer (section 5.9) and the copyright line "© {year} BuildSoftTech. All rights reserved. Publisher of IJEPA (ISSN 3139-5961)." with links Privacy Policy | Terms & Conditions | Disclaimer | Student login.

---

## 4. Site map

### Public

| Route | Page |
| --- | --- |
| `/` | Home |
| `/about` | About Us |
| `/services` | Services overview |
| `/services/research-publication` | Research Paper Publication Support — IJEPA |
| `/services/research-collaboration` | SCI / Scopus Research Collaboration & Publication Support |
| `/services/research-support` | Research Support Services |
| `/internships` | 45-Day Paid Internship Program |
| `/courses` | Software Training & Technology Courses |
| `/research-areas` | Research Areas |
| `/for-faculty` | For Faculty Members |
| `/for-students` | For Students |
| `/for-research-scholars` | For Research Scholars |
| `/for-institutions` | Institutional Services |
| `/faq` | Frequently Asked Questions |
| `/contact` | Contact Us |
| `/privacy-policy`, `/terms`, `/refund-policy`, `/research-ethics`, `/authorship-policy`, `/disclaimer` | Policy pages |
| `/certificates/[number]` | Public certificate verification (planned) |
| `/login`, `/register` | Authentication |

### Student (signed in)

| Route | Page |
| --- | --- |
| `/dashboard` | My courses, my internships, my certificates |
| `/dashboard/courses/[id]` | Course detail: sessions with recordings, notes (PDF), links, certificate |
| `/dashboard/internships/[id]` | Internship detail: problem statement, weekly review timeline, repo link, certificate |

### Admin (role = admin)

| Route | Page |
| --- | --- |
| `/admin` | Site settings (fees, courses list, research topics, packages, contact) |
| `/admin/courses`, `/admin/courses/new`, `/admin/courses/[id]` | Courses: list, create, manage (details, sessions, resources, enrolments, certificates) |
| `/admin/internships`, `/admin/internships/new`, `/admin/internships/[id]` | Internships: list, create, manage; per student: problem statement, weeks, weekly reviews, repo, certificate |
| `/admin/students` | All registered users |

Page titles follow "Page name | BuildSoftTech". Student and admin pages are `noindex`.

---

## 5. Public page content

Everything below is the client-approved copy. Appendix A holds the full lists verbatim (generated from the current data files); this section gives each page's structure and the sentences not covered by the lists.

### 5.1 Home

- Badge line: "Publisher of IJEPA · Peer-reviewed · ISSN 3139-5961"
- Heading: **Research. Publish. Learn. Innovate.**
- Subheading: Professional Research Publication, Research Collaboration, Internship & Technology Training Services
- Supporting text: BuildSoftTech empowers researchers, academicians and students with ethical research support, publication assistance, collaborative research opportunities, practical internships and industry-oriented technology training.
- Buttons: Explore Our Services (→ /services) · Contact Us (→ /contact)
- Facts strip (five short facts): Ethical Research Support — Originality, integrity, transparency · Peer-Reviewed Publishing — Through IJEPA · ISSN 3139-5961 · SCI / Scopus Collaboration — Contribution-based authorship · {duration} Internships — Project-based, certified, {fee} · Hands-on Training — Python, AI/ML, Full Stack, Cloud
- Section "Our Core Services": the four service cards (Appendix A). Intro sentence: Four verticals, one objective: bridge the gap between research, academic requirements and industry-oriented technology skills.
- Section "About BuildSoftTech", heading **Building Research. Developing Skills. Creating Opportunities.** Text: "BuildSoftTech is a professional research and technology services organization dedicated to supporting researchers, faculty members, Ph.D. scholars, postgraduate and undergraduate students and academic institutions through ethical research publication support, collaborative research opportunities, software training, internships and technology skill development. Our objective is to bridge the gap between research, academic requirements and industry-oriented technology skills through structured, transparent and quality-focused services." Button: Learn More (→ /about). Beside it, "Our Mission — What we stand for" with the first five mission points and a button to /about#mission.
- Section "Who we serve — Built for the Academic Community": four cards with photos — Faculty Members (Research & professional growth; Publication support, collaboration, research profile development) · Students (Learn · Build · Showcase; Software training, internships, final-year and mini projects) · Research Scholars (Problem to publication; Literature survey, methodology, implementation, research writing) · Institutions (Colleges & universities; FDPs, bootcamps, research-development and department programs). The client wants real photos of students/faculty here, not empty cards; current photos are Unsplash placeholders.
- IJEPA band: heading **Research Paper Publication — IJEPA**; text "Publish your original research through IJEPA, a dedicated platform for engineering, technology and interdisciplinary research. BuildSoftTech provides manuscript formatting, submission guidance, peer-review coordination and publication-process support." Buttons: Visit IJEPA ↗ · Submit Your Paper (→ IJEPA submit URL).
- Section "Our Research Publication Workflow": the nine steps (Appendix A).
- Internship promo: **{duration} Internship — {fee}** (admin-editable; defaults 45-Day, ₹3,000/-). Optional "Next batch: …" line. Text: "Get 45 days of practical technology training, hands-on project experience, mentor guidance and an Internship Completion Certificate. Choose from AI/ML, Data Science, Python, Web Development, Full Stack, Cybersecurity, Cloud, IoT and other emerging technologies." Buttons: Program Details (→ /internships) · Apply Now (→ /contact).
- Section "Why Researchers & Students Choose Us": the seven reasons (Appendix A).
- Closing call to action: heading **Have a Research Idea or Want to Develop a New Skill?** Text: "Let's turn your research idea into meaningful research and your learning goals into practical skills." Buttons: Contact Us · Explore Our Services.
- Strip "Verify before you publish": "We encourage researchers to verify a journal's current indexing and coverage status directly with the indexing service (for example, Scopus source lists) rather than relying on claims made by any service provider." Link to /research-ethics.

### 5.2 About Us

Heading "About Us", intro "Building Research. Developing Skills. Creating Opportunities."

Text: "BuildSoftTech was established with the vision of providing a professional platform where academic research and technology education come together. We understand the challenges faced by faculty members, researchers and students in preparing quality manuscripts, identifying suitable journals, responding to reviewers, developing research prototypes and acquiring practical technology skills. Our team provides structured support throughout the research and learning journey — from research idea development and manuscript preparation to journal selection, technical implementation, publication support and skill development."

Blocks: Organisation facts (name, focus, journal link, location) · **Our Vision**: "To become a trusted research and technology partner for academicians, researchers and students by providing ethical, transparent and quality-driven academic and technical services." · **Our Mission**: seven points · **Our Four Verticals** table (section 1) · **Why Researchers & Students Choose Us** (7) · **Quality & Research Integrity**: "BuildSoftTech believes that sustainable academic success must be based on originality, integrity and genuine scholarly contribution." followed by the "we encourage" / "we do not support" lists. Closing CTA: Contact Us · Explore Services.

### 5.3 Services overview

Six service summaries (each links to its page):

- Research Paper Publication Support — IJEPA: Submission guidance, formatting, quality checks, peer-review coordination and publication-process assistance through our own peer-reviewed journal.
- SCI / Scopus Research Collaboration: Contribution-based collaboration on research articles targeted toward suitable SCI/SCIE or Scopus-indexed journals, with transparent authorship policy.
- Research Support Services: Research idea development, literature review, methodology, implementation support and results analysis across the research lifecycle.
- Internship Programs: 45-day paid, industry-oriented internship combining training, hands-on practice, project development, mentoring and certification.
- Software Training & Technology Courses: Practical programs in Python, Data Science, AI/ML, Full Stack, Cloud & DevOps and Cybersecurity for students, faculty and professionals.
- Institutional Programs: Faculty development programs, student bootcamps, research-development workshops and department-level programs for colleges and universities.

Then the nine-step workflow and this note: "Two different offerings: publication through IJEPA (our own journal) and SCI/Scopus research collaboration (contribution-based work on articles targeted toward third-party indexed journals) are separate services. Journal acceptance, indexing and authorship are never guaranteed."

### 5.4 Research Paper Publication Support — IJEPA

Heading **Publish Your Research with IJEPA**. Intro: "BuildSoftTech provides professional research publication support through the International Journal of Engineering Practices and Applications (IJEPA)." Buttons: Visit IJEPA ↗ · Submit Your Paper.

Text: "IJEPA provides a platform for researchers, academicians, faculty members, research scholars and students to disseminate original research and innovative developments across engineering, technology and interdisciplinary research domains. IJEPA is published by BuildSoftTech. The journal runs its own editorial workflow, peer review, issues and author guidelines on its dedicated website; this page explains the support BuildSoftTech provides around that process."

IJEPA at a glance: ISSN 3139-5961 · Open access · Peer reviewed · Monthly. Links: Author Guidelines ↗ · Journal Issues ↗.

Sections (lists in Appendix A): Publication Support Through IJEPA — "Through our dedicated journal platform, BuildSoftTech supports authors with:" (12) · Research Areas Covered — "IJEPA welcomes suitable research contributions from areas including:" (16 + other) · Publication Process (8 steps) · Who Can Submit? — "IJEPA publication services are suitable for:" (8) · Why Publish Through IJEPA? (5).

**Important Publication Ethics Statement** (verbatim): "At BuildSoftTech and IJEPA, we encourage original, ethical and responsible research publication. Authors are responsible for the originality, accuracy and integrity of their submitted work. Manuscripts should not contain plagiarism, fabricated data, manipulated results, duplicate publication or inappropriate authorship. Publication is subject to the journal's editorial and peer-review process. BuildSoftTech/IJEPA does not guarantee acceptance of any manuscript."

Closing CTA: Submit Your Paper ↗ · Ask for Publication Support (→ /contact).

### 5.5 SCI / Scopus Research Collaboration & Publication Support

Intro: "Collaborative research opportunities for researchers and academicians interested in contributing to research articles targeted toward suitable SCI/SCIE or Scopus-indexed journals." Buttons: Browse Available Topics (anchor to the table) · Submit Your Interest (→ /contact).

Text: "BuildSoftTech provides research collaboration and publication-support opportunities for faculty members, research scholars, academicians and professionals interested in contributing to research articles targeted toward suitable SCI/SCIE or Scopus-indexed journals. Researchers can explore our available research topics/titles and select a project based on their research interests, technical background and preferred area of contribution."

Sections: How the Research Collaboration Works (8-step flow) · **Available Research Collaboration Opportunities** — "Researchers interested in joining an ongoing research project can select from the available research topics listed below." Table columns: Sr. No. · Research Paper / Proposed Topic · Research Area · Target Index · Collaboration Duration · Professional Fee · Status (Available / Reserved / Closed) · Apply (only when Available). Rows are admin-editable (section 6.1). Below the table, verbatim: "Note: The research titles, target journals, timelines and fees displayed on this page are indicative and may change depending on the research scope, implementation requirements, journal requirements and collaboration structure." and the **collaboration disclaimer** (Appendix A) directly under the fee table.

Then: What the Collaboration May Include — "Depending on the selected research project and the agreed scope of contribution, the collaboration may involve:" (16) · Collaboration Packages A/B/C (Appendix A; durations and fees admin-editable) · **Author Contribution & Authorship Policy** — "Genuine Research Collaboration. BuildSoftTech follows an ethical and contribution-based authorship approach. Researchers who join a collaborative research project are expected to make a meaningful scholarly contribution to the research work. Depending on the nature and extent of the contribution, eligible collaborators may be considered for authorship in accordance with the authorship requirements of the target journal/publisher. The final author list, author order, corresponding-author designation, research contribution and acknowledgment will be determined based on actual scholarly contributions and applicable journal policies. Important: Author positions are not sold independently of research contribution. The collaboration fee covers the agreed research, technical, publication-support and related professional services. It does not constitute a guarantee of authorship, acceptance or publication."

Closing CTA: **Interested in a Research Collaboration?** "Browse available research topics → select a topic → submit your interest → our research coordinator will contact you."

### 5.6 Research Support Services

Intro: "BuildSoftTech provides research assistance across different stages of the research lifecycle — from the first idea to results and analysis." Five blocks (Appendix A: Research Idea Development, Literature Review, Research Methodology, Implementation Support, Results & Analysis), the nine-step workflow as a timeline, and the seven "why choose us" reasons. CTA: **Start with a free consultation** — "Discuss your research topic, objectives and requirements with our research coordinator."

### 5.7 45-Day Paid Internship Program

Heading **45-Day Industry-Oriented Internship Program**. Intro: "Learn → Practice → Build → Get Certified. A structured, paid internship for students who want practical experience in software technologies, real-world projects and a stronger technical profile."

Fee block: Internship Fee **{fee}** · Duration **{duration}** (admin-editable; defaults ₹3,000/-, 45 Days) · optional Next batch and note · "The program combines guided technical training + hands-on practice + project development + mentor support + internship certification."

Sections (Appendix A): What's Included? (12) · Internship Learning Process (Day 1–5 … Day 41–45) · Available Internship Domains (3 groups) · What Students Will Gain (5) · Internship Program Highlights table · Who Can Apply? (9) with footnote on mode.

Closing CTA: **Start Your 45-Day Practical Learning Journey** — "Gain technical skills. Build a project. Get practical experience. Earn your internship certificate. Internship Fee: {fee}". Buttons: Apply for Internship (→ /contact) · View Internship Domains.

### 5.8 Software Training & Technology Courses

Heading as titled. Intro: "Learn Technology. Build Projects. Develop Your Career. Practical software training programs for students, faculty members, working professionals and researchers." Lead: "Our courses emphasise hands-on learning, project development and real-world applications rather than theory alone." Six course cards (Appendix A) each with optional fee/duration line and an "Ask about this course" link. "How the training works": Hands-on sessions (Every concept is practised in the development environment, not just explained) · Project-based learning (Mini and capstone projects build the portfolio you can show to employers or reviewers) · Customisable batches (Programs can be tailored for students, faculty members, professionals and institutions). Note linking to institutional programs. CTA: **Ready to build a new skill?**

### 5.9 Other pages

- **Research Areas**: the 16 domains + "Other related domains — considered on a case-by-case basis", each with the line "Publication via IJEPA · research collaboration · implementation support".
- **For Faculty Members** — heading "Supporting Academic Research & Professional Growth"; intro "BuildSoftTech provides research and technology services specifically designed for faculty members and academic professionals."; services list; "Research Output for Academic Documentation — Research publications and legitimate scholarly contributions may be relevant to:" list; the NBA/NAAC/NIRF note (verbatim in Appendix A).
- **For Students** — heading "Learn. Build. Implement. Showcase."; intro "BuildSoftTech helps students develop practical skills beyond classroom learning."; services list.
- **For Research Scholars** — heading "From Research Problem to Research Publication"; intro "Our research-support ecosystem helps Ph.D. and research scholars at every stage of the research lifecycle."; list.
- **Institutional Services** — heading "Services for Colleges & Universities"; intro "BuildSoftTech provides customised institutional programs — faculty development, student training, research development and department-level programs."; four program groups; note "Programs can be delivered online, offline or in hybrid mode and tailored to your department's curriculum, accreditation goals and research priorities." CTA: Request a Program Proposal.
- **FAQ** — eight Q&As (Appendix A).
- **Contact Us** — intro "Write to us or call our office for research publication, collaboration, internships, training and institutional programs." Email card (Best for research, publication and institutional enquiries) · Phone card (office hours) · Office block (name, address, email, phone, journal link) · "What to include in your email" (Researchers & Faculty: research area and short description; which service. Students: course or internship domain and preferred batch; degree, year, institution. Institutions: program type, audience size, tentative dates) · Quick email links with pre-filled subjects: Research Enquiry · Apply for Internship · Join a Training Program · Institutional Proposal · Note "We aim to respond to all enquiries within 2–3 business days. Please mention your name, institution and the service you are interested in."
- **Policies**:
  - Research & Publication Ethics: integrity lists + publication ethics statement + "Verify journals yourself" paragraph + "aligned with the UGC academic-integrity framework".
  - Authorship Policy: the authorship text from 5.5.
  - Disclaimer: the global disclaimer + collaboration disclaimer + NBA/NAAC/NIRF note + "indicative information" note.
  - Privacy Policy, Terms & Conditions, Refund & Cancellation: drafted texts exist in the repository (`src/views/Policies.jsx`); they are **drafts awaiting client review**. Key points — no sale of personal data; manuscripts treated as confidential; fees cover professional time, work done is non-refundable; training refund: full before batch start, 50% within first 5 days, none after; journal decisions are not grounds for refund; governing law India, courts at Pune.
- **Global disclaimer** (every page footer and the Disclaimer page): see Appendix A.

---

## 6. Functional specification

### 6.1 Admin — site settings (exists today)

A settings record the admin edits from the dashboard; the public pages read it on every request.

| Group | Fields | Where it shows |
| --- | --- | --- |
| Internship | fee, duration, mode, next batch (optional), note (optional) | Home facts strip and promo; internship page fee block and highlights table; CTA text |
| Courses | ordered list of {title, topics[], fee?, duration?} | Courses page |
| Research topics | ordered rows {title, area, index, duration, fee, status: Available/Reserved/Closed} | Collaboration page table; Apply button only for Available |
| Packages | for A, B, C: duration, fee | Collaboration page packages |
| Contact | email, phone (display), phone (dial digits), hours, address | Header bar, footer, contact page |

Defaults are the values in Appendix A. Storage: Supabase table `site_settings (key text primary key, value jsonb)` with one row `key = 'site'`. Save requires admin role.

### 6.2 Courses — flow

1. **Admin creates a course**: title, description, topics, fee, duration, mode (Online / Offline / Hybrid), start date, Microsoft Teams link, Google Drive folder link, status (draft → open → running → completed → closed). Draft courses are invisible to the public.
2. **Public listing** shows open/running courses with an "Enrol" action. A visitor who is not signed in is sent to register/login and back.
3. **Student enrols** → an enrolment row with status `pending`.
4. **Admin approves** (status `active`) or rejects. Admin separately adds the student to the Teams group (outside the system; the Teams link is stored on the course so students can see it once active).
5. **Classes**: admin adds a session per class — position, title, date, Google Drive **view-only** recording link, notes. Recordings stay on Drive; the site only stores the link. Students see sessions only while their enrolment is `active` or `completed`.
6. **Resources**: admin attaches PDFs (uploaded to a private storage bucket; served to enrolled students through short-lived signed URLs) and links of kind youtube / github / link with a title.
7. **Completion**: admin marks the enrolment `completed` and issues a certificate (section 6.4).

Student course page shows: course details, Teams link, sessions list with recording links, resources, enrolment status, certificate if issued.

### 6.3 Internships — flow

1. **Admin creates an internship**: title, domain, description, fee, duration (default 45 Days), status (draft / open / closed).
2. **Student enrols** → `pending`; admin approves → `active`.
3. **Per student, admin sets**: problem statement (text), number of weeks (1–52, default 6), start date, repository link (shared during the internship, editable any time).
4. **Weekly review**: one row per week 1…N. Admin ticks "reviewed", writes notes and suggestions; the reviewed timestamp is recorded. Student and admin both see the full week-by-week timeline. Unreviewed weeks show as pending.
5. **Completion**: when all weeks are reviewed the admin marks the enrolment `completed` and issues a certificate.

Student internship page shows: internship details, status, problem statement, weeks timeline (reviewed/pending, notes, suggestions), repo link, certificate if issued.

### 6.4 Certificates

- Issued by admin for a completed course or internship enrolment; one certificate per enrolment.
- Fields: certificate number (unique, human-readable, e.g. `BST-C-2026-0001` for courses, `BST-I-2026-0001` for internships), kind, student, title (course/internship name at issue time), issue date, issued by.
- Student sees it on the dashboard and can open/print it.
- Public verification page at `/certificates/[number]` shows: student name, course/internship title, kind, issue date, and "Valid" — nothing else (no contact details). Must work without login.

### 6.5 Students (admin view)

List of all registered users: name, email, mobile, institution, degree, number of course and internship enrolments, joined date; filter/search by name or email. Admin can open a student's enrolments.

### 6.6 Enrolment states

`pending` (student requested) → `active` (admin approved) → `completed` (admin closed it, certificate may be issued). `rejected` is terminal. Only `active`/`completed` grant access to recordings, resources and reviews.

### 6.7 Payments

Not in scope. Fees are displayed; collection happens offline. The admin approval step is where payment confirmation is expected to happen.

---

## 7. Data model and permissions

The complete, runnable schema (tables, trigger, RLS policies, storage bucket) is in Appendix B. It is a Supabase/Postgres schema and can be used as-is in a new Supabase project.

Table summary:

| Table | Key columns |
| --- | --- |
| `profiles` | id (= auth user id), email, full_name, phone, institution, degree, role ('student' \| 'admin'), created_at |
| `courses` | id, title, slug, description, topics[], fee, duration, mode, status, teams_link, drive_folder, start_date |
| `course_enrollments` | id, course_id, student_id, status, note, enrolled_at, completed_at — unique (course, student) |
| `course_sessions` | id, course_id, position, title, session_date, recording_url, notes |
| `course_resources` | id, course_id, kind ('pdf' \| 'youtube' \| 'github' \| 'link'), title, url, storage_path |
| `internships` | id, title, domain, description, fee, duration, status |
| `internship_enrollments` | id, internship_id, student_id, status, problem_statement, weeks_total, repo_url, start_date, enrolled_at, completed_at — unique (internship, student) |
| `internship_reviews` | id, enrollment_id, week_no, reviewed, notes, suggestions, reviewed_at — unique (enrollment, week) |
| `certificates` | id, certificate_no (unique), kind, student_id, enrollment_id, title, issued_at, issued_by — unique (kind, enrollment) |
| `site_settings` | key, value (jsonb) |

Permission rules (enforced by row-level security):

- Students read and update only their own profile; cannot change their own role.
- Anyone can read courses and internships that are not drafts.
- Students read their own enrolments and can insert a `pending` enrolment for themselves; only admins change status.
- Sessions and resources are readable only by students with an active/completed enrolment in that course, and by admins.
- Reviews are readable by the student they belong to; only admins write them.
- Certificates are readable by their student; the public verification page reads with the server-side service key.
- Site settings: public read, admin write.
- Storage bucket `course-resources` is private; admins write; enrolled students read the files of their courses.

Admin is created by registering normally and running once: `update public.profiles set role = 'admin' where email = '<admin email>';`

---

## 8. Integrations and external services

- **Supabase**: Auth (email/password), Postgres, Storage. Environment variables: `NEXT_PUBLIC_SUPABASE_URL` (or `SUPABASE_URL`), `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` (server only).
- **Google Drive**: recordings are uploaded by the admin to Drive as view-only; the site stores the share link per session. No Drive API integration.
- **Microsoft Teams**: classes are held on Teams; the site stores the Teams join link per course. No Teams API integration.
- **Email**: contact is via `mailto:` links with pre-filled subjects. No transactional email yet (Supabase handles auth emails).
- **IJEPA**: external links only (section 1).
- **Hosting**: Vercel, GitHub repository `adityapatil-air/BuildSoftTech`.

---

## 9. Open items the client must supply or decide

1. Real contact email (currently placeholder).
2. Real research collaboration titles, durations, fees (six placeholder rows) and the three package fees.
3. Review and approval of the drafted Privacy, Terms and Refund & Cancellation texts.
4. Own photographs for the "Who we serve" section and anywhere else imagery is used.
5. Supabase project (run Appendix B), keys, and the admin account.
6. Whether course enrolment always needs admin approval before access (current design: yes).
7. How fees are collected (out of scope; offline today).
8. Certificate wording and signatory (name, designation) to print on certificates.
9. "Research Blog" was in the original menu suggestion but no content was supplied; omitted.

---

## Appendix A — Verbatim content lists

### Core services (home cards)
- **Research Publication — IJEPA** — Professional support for peer-reviewed journal publication — from manuscript preparation to submission and revision — through our own journal, IJEPA. (links to /services/research-publication)
- **SCI / Scopus Research Collaboration** — Collaborative research and publication support for researchers and academicians seeking quality indexed-journal opportunities. (links to /services/research-collaboration)
- **Software Training** — Practical training in Python, Data Science, AI/ML, Full Stack Development, Cloud, DevOps and emerging technologies. (links to /courses)
- **Internship Programs** — Hands-on 45-day internships designed to help students develop technical skills through real-world projects and guided implementation. (links to /internships)

### Mission (seven points)
- To facilitate quality research publication through appropriate peer-reviewed journals.
- To support researchers in identifying suitable SCI/Scopus-indexed publication opportunities.
- To promote genuine research collaboration among academicians and researchers.
- To provide industry-oriented software training and internship programs.
- To develop practical skills in emerging technologies.
- To support institutions and individuals in strengthening their research and technical capabilities.
- To maintain transparency, research integrity and professional standards in all our services.

### Research areas (16)
- Artificial Intelligence & Machine Learning
- Data Science & Big Data
- Computer Science & Engineering
- Information Technology
- Internet of Things
- Cloud Computing
- Cybersecurity
- Computer Networks
- Software Engineering
- Electronics & Communication Engineering
- Electrical Engineering
- Mechanical Engineering
- Civil Engineering
- Automation & Robotics
- Emerging Technologies
- Interdisciplinary Engineering
- Other related engineering and technology domains

### IJEPA publication support (12 items)
- Research paper submission guidance
- Manuscript formatting according to journal guidelines
- Technical and language-quality checking
- Reference and citation formatting
- Similarity/plagiarism screening support
- Editorial pre-screening
- Peer-review coordination
- Reviewer-comment and revision guidance
- Final manuscript preparation
- Publication-process assistance
- Author communication and publication-status updates
- E-certificate/publication documentation, where applicable

### IJEPA publication process (8 steps, in order)
1. Manuscript Preparation
2. Online Submission
3. Editorial Screening
4. Peer Review
5. Revision, if Required
6. Final Editorial Decision
7. Publication
8. Author Documentation

### Who can submit to IJEPA
- Faculty Members
- Ph.D. Scholars
- Research Scholars
- M.Tech./M.E. Students
- Undergraduate Students
- Academicians
- Industry Researchers
- Independent Researchers

### Why publish through IJEPA
- **Dedicated Engineering & Technology Platform** — A publication platform focused on engineering, technology and interdisciplinary research.
- **Peer-Review Process** — Manuscripts are subjected to the journal's editorial and peer-review procedures.
- **Author Support** — Authors receive guidance regarding formatting, submission and revision requirements.
- **Multidisciplinary Scope** — Research contributions from diverse engineering and technology domains can be considered.
- **Professional Publication Process** — A structured workflow from manuscript submission through editorial decision and publication.

### Research collaboration flow (8 steps)
1. Browse Available Research Topics
2. Select a Research Topic
3. Discuss Your Research Contribution
4. Finalize Collaboration & Scope
5. Research Implementation & Manuscript Development
6. Journal Selection & Submission
7. Peer Review & Revision
8. Publication, if Accepted

### Research collaboration topics table (PLACEHOLDER rows — client to supply real titles/fees)
| Sr | Title | Area | Target index | Duration | Fee | Status |
|---|---|---|---|---|---|---|
| 1 | Research Title 1 | AI/ML | Scopus | 4–6 Months | ₹XX,XXX | Available |
| 2 | Research Title 2 | Data Science | Scopus | 4–6 Months | ₹XX,XXX | Available |
| 3 | Research Title 3 | Cybersecurity | Scopus/SCI | 5–7 Months | ₹XX,XXX | Available |
| 4 | Research Title 4 | IoT | Scopus | 4–6 Months | ₹XX,XXX | Available |
| 5 | Research Title 5 | Generative AI | Scopus/SCI | 5–8 Months | ₹XX,XXX | Available |
| 6 | Research Title 6 | Computer Vision | Scopus | 4–6 Months | ₹XX,XXX | Available |

### What the collaboration may include (16)
- Research problem identification
- Literature review
- Research-gap analysis
- Research methodology
- Dataset preparation
- Algorithm development
- Software implementation
- Experimental work
- Results and performance analysis
- Research-paper preparation
- Technical editing
- Journal identification
- Manuscript submission
- Reviewer-response preparation
- Manuscript revision
- Publication-process support

### Collaboration packages
**Package A — Research Contributor**
_For researchers who want to contribute to an ongoing research project_
Includes:
- Research topic selection
- Research collaboration
- Literature-review participation
- Technical contribution
- Research meetings/discussions
- Manuscript contribution
- Publication-support guidance
Duration: 3–6 Months · Fee: Starting from ₹XX,XXX · Button: "View Available Topics"

**Package B — Technical Research Collaboration** (highlight as most chosen)
_For researchers interested in technical implementation and research development_
Includes:
- Research-gap identification
- Methodology development
- Programming/implementation
- Dataset preparation
- Experiments
- Results analysis
- Manuscript development
- Journal-selection support
- Submission support
Duration: 4–8 Months · Fee: Starting from ₹XX,XXX · Button: "Explore Research Projects"

**Package C — Advanced Research Collaboration**
_For researchers seeking deeper involvement in SCI/SCIE/Scopus-oriented research_
Includes:
- Advanced research methodology
- Novel algorithm/model development
- Experimental validation
- Research manuscript development
- Technical revision
- Target-journal analysis
- Submission support
- Reviewer-response support
- Revision assistance
Duration: 6–12 Months · Fee: Based on Research Scope · Button: "Discuss Your Research"

### Collaboration disclaimer (must appear directly under the fee table, verbatim)
> Disclaimer: BuildSoftTech provides research collaboration, technical research and publication-support services. Journal acceptance, indexing status, publication timelines and editorial decisions are controlled by the respective journals and publishers. Authorship is based on genuine scholarly contribution and the policies of the target journal. Payment of a professional service fee does not guarantee authorship, a specific author position, manuscript acceptance, publication or indexing.

### Internship — what's included (12)
- 45 days of structured training
- Technology-specific practical sessions
- Hands-on programming exercises
- Real-world/project-based learning
- Guided project development
- Mentor support
- Technical assignments
- Project documentation guidance
- Project demonstration/presentation
- Performance evaluation
- Internship Completion Certificate
- Project Experience Certificate/Documentation, where applicable

### Internship learning process (timeline)
- **Day 1–5 — Orientation & Technology Fundamentals**: Introduction to the selected technology, development environment, tools and project requirements.
- **Day 6–15 — Technical Training**: Hands-on learning through structured sessions, demonstrations and practical assignments.
- **Day 16–30 — Project Development**: Students work on a guided project and apply the concepts learned during training.
- **Day 31–40 — Advanced Implementation**: Project enhancement, testing, debugging, documentation and result analysis.
- **Day 41–45 — Final Evaluation & Presentation**: Project demonstration, technical presentation, evaluation and completion formalities.

### Internship domains
**Software Development**
- Python Programming
- Java Programming
- Web Development
- Full Stack Development
- Software Engineering

**Artificial Intelligence & Data**
- Artificial Intelligence
- Machine Learning
- Data Science
- Data Analytics
- Deep Learning
- Generative AI

**Emerging Technologies**
- Cloud Computing
- DevOps
- Cybersecurity
- Internet of Things
- Computer Vision
- Natural Language Processing

### What students will gain
- **Practical Technical Skills** — Students get an opportunity to apply classroom knowledge to practical development tasks.
- **Project Experience** — Each student works on a structured project relevant to the selected technology/domain.
- **Industry-Oriented Exposure** — Students become familiar with development tools, coding practices, documentation and project workflows.
- **Portfolio Development** — Students can use their project experience as part of their academic and professional portfolio, subject to applicable institutional requirements.
- **Internship Certificate** — Successful completion is accompanied by an Internship Completion Certificate issued by BuildSoftTech, subject to fulfilment of the program requirements.

### Internship highlights table (defaults; fee/duration/mode are admin-editable)
| Feature | Details |
|---|---|
| Program Type | Paid Internship |
| Duration | 45 Days |
| Fee | ₹3,000/- |
| Mode | Online / Offline / Hybrid* |
| Training | Technology-specific practical training |
| Project | Guided project development |
| Mentoring | Technical mentor support |
| Evaluation | Assignment + Project Evaluation |
| Certificate | Internship Completion Certificate |
| Target Audience | UG / PG / Diploma / Engineering Students |

*Availability of online, offline or hybrid mode is specified according to the actual batch.

### Internship — who can apply
- B.E./B.Tech students
- M.E./M.Tech students
- BCA/MCA students
- B.Sc./M.Sc. students
- Diploma students
- Computer Science students
- IT students
- Engineering students from related disciplines
- Students interested in emerging technologies

### Courses (six, with topics; fee and duration are admin-editable, blank by default)
**Python Programming**
- Python Fundamentals
- Object-Oriented Programming
- Libraries & Frameworks
- Data Handling
- Automation
- Mini Projects

**Data Science**
- Python for Data Science
- NumPy
- Pandas
- Data Visualization
- Statistics
- Machine Learning
- Real-world Projects

**Artificial Intelligence & Machine Learning**
- ML Fundamentals
- Supervised Learning
- Unsupervised Learning
- Feature Engineering
- Model Evaluation
- Deep Learning
- AI Projects

**Full Stack Development**
- HTML
- CSS
- JavaScript
- Front-End Development
- Backend Development
- Database
- API Development
- Deployment

**Cloud & DevOps**
- Cloud Fundamentals
- Linux
- Git & GitHub
- CI/CD
- Docker
- Cloud Deployment
- DevOps Practices

**Cybersecurity**
- Cybersecurity Fundamentals
- Network Security
- Web Security
- Vulnerability Assessment
- Security Tools
- Ethical Security Practices

### Research support services
**Research Idea Development** — We help researchers convert broad interests into focused research problems.

**Literature Review** — Support for:
- Literature search strategy
- Research-paper analysis
- Literature classification
- Research-gap identification
- Citation management

**Research Methodology** — Support for:
- Problem formulation
- Research objectives
- Hypothesis development
- Methodology design
- Algorithm selection
- Experimental design

**Implementation Support**
- Python implementation
- Machine Learning
- Deep Learning
- Data Analytics
- IoT
- Simulation
- Web/mobile applications
- Cloud implementation

**Results & Analysis**
- Experimental analysis
- Performance comparison
- Statistical analysis
- Graphs and visualization
- Result interpretation
- Discussion development

### Why researchers & students choose us (7)
- **Research-Focused** — Our services are designed specifically for the academic and research community.
- **Technology Expertise** — We combine academic research knowledge with practical technology skills.
- **End-to-End Support** — From research idea to implementation and publication support, we provide assistance throughout the journey.
- **Ethical Approach** — We emphasise originality, transparency, responsible authorship and research integrity, in line with the UGC academic-integrity framework.
- **Personalized Guidance** — Every research project has different requirements. We provide customised guidance based on the researcher's objectives.
- **Practical Learning** — Our training and internship programs focus on hands-on projects and real-world applications.
- **Professional Documentation** — We assist with research manuscripts, technical reports, project documentation and related academic materials.

### Research publication workflow (9 steps)
1. **Consultation** — Discuss your research topic, objectives and requirements.
2. **Research Assessment** — Evaluate research scope, novelty, methodology and publication suitability.
3. **Research Development** — Support literature review, methodology, implementation and analysis.
4. **Manuscript Preparation** — Prepare and refine the research manuscript according to the target journal requirements.
5. **Quality Check** — Technical review, formatting, references and similarity screening.
6. **Journal Selection** — Identify suitable journals based on scope, publication requirements and current indexing information.
7. **Submission** — Assist with the journal submission process.
8. **Peer Review & Revision** — Support responses to reviewer comments and manuscript revisions.
9. **Publication** — Assist with final publication formalities after editorial acceptance.

### For faculty — services
- Research topic consultation
- Research collaboration
- Manuscript development
- Journal selection
- SCI/Scopus publication support
- Technical implementation
- Research project development
- Literature review support
- Data analysis
- Reviewer-response support
- Research profile development
- Software and AI training

Research output may be relevant to:
- Faculty appraisal
- Promotion documentation
- Research profile
- Departmental research records
- Institutional research output
- NBA documentation
- NAAC documentation
- NIRF-related institutional reporting

> Note: BuildSoftTech does not claim that any publication automatically qualifies for promotion, appraisal, NBA, NAAC or NIRF. Eligibility depends on the applicable rules and the institution/regulatory authority.

### For students — services
- Software training
- Internship programs
- Final-year projects
- Mini projects
- AI/ML projects
- Web development projects
- Data Science projects
- IoT projects
- Project documentation
- Technical presentations
- Research-paper development
- Career-oriented skill development

### For research scholars — services
- Research problem identification
- Literature survey
- Research-gap analysis
- Methodology
- Algorithm development
- Implementation
- Dataset preparation
- Experimental evaluation
- Research writing
- Journal selection
- Reviewer response
- Publication support

### Institutional programs
**Faculty Development Programs**
- AI & Machine Learning
- Data Science
- Generative AI
- Python
- Cybersecurity
- Cloud Computing
- Research Methodology
- Academic Writing
- Research Publication

**Student Training Programs**
- Value-added courses
- Technical workshops
- Bootcamps
- Internship programs
- Project-based learning
- Certification programs

**Research Development Programs**
- Research methodology workshops
- Research writing workshops
- Scopus/SCI publication awareness
- Research implementation workshops
- Grant proposal guidance
- Collaborative research programs

**Department-Level Programs**
- Skill-development programs
- Industry-oriented training
- Project mentoring
- Research cells / R&D support
- Faculty research mentoring

### Quality & research integrity
We encourage:
- Original research
- Proper citation
- Responsible use of AI tools
- Transparent authorship
- Appropriate data usage
- Ethical research practices
- Proper acknowledgment of contributors
- Compliance with journal policies
- Compliance with institutional research policies

We do not support:
- Fabricated research results
- Fake data
- Fake citations
- Plagiarism
- Duplicate publication
- Manipulation of research results
- False authorship
- Guaranteed acceptance claims
- Misrepresentation of journal indexing

### FAQ (8)
**Q. Do you guarantee journal publication?**
A. No. We provide professional research and publication support, but the final decision rests with the journal's editor and peer reviewers.

**Q. Do you guarantee Scopus/SCI publication?**
A. No. We identify potentially suitable journals based on available information and provide publication support. Acceptance depends on the journal's editorial and peer-review process.

**Q. Can you help with research implementation?**
A. Yes. We provide implementation support in areas including AI/ML, Data Science, Python, IoT, Cloud Computing, Cybersecurity and other technology domains.

**Q. Can faculty members collaborate on research papers?**
A. Yes. We facilitate genuine research collaboration. Authorship must be based on actual scholarly contribution and the policies of the target journal.

**Q. Do you provide internships?**
A. Yes. We provide structured internship programs with technology training, project development, mentoring, evaluation and completion documentation.

**Q. Do you provide software courses?**
A. Yes. Training programs can be customised for students, faculty members, professionals and institutions.

**Q. Can you organize training programs for colleges?**
A. Yes. BuildSoftTech can conduct workshops, FDPs, bootcamps, internships, value-added courses and customised technical training programs.

**Q. Do you provide plagiarism checking?**
A. We provide similarity-screening and manuscript-improvement support. Authors remain responsible for proper citation and research originality.

### Global disclaimer (footer of every page, verbatim)
> BuildSoftTech provides research, technical, training and publication-support services. Publication acceptance, indexing status, authorship decisions, promotion eligibility and institutional recognition are determined by the relevant journal, publisher, indexing service, university, employer or regulatory authority. BuildSoftTech does not guarantee publication acceptance, indexing, promotion, appraisal or accreditation outcomes.

### Organisation facts
- Name: BuildSoftTech
- Tagline: Research · Publication · Training · Technology
- Email: info@buildsofttech.com (PLACEHOLDER — client to confirm)
- Phone: +91 8149844901
- Address: Shop No 2, Snehankit Colony, Karve Nagar, Pune-411052, Maharashtra, India
- Journal: IJEPA — International Journal of Engineering Practices and Applications, ISSN 3139-5961
- Journal links: site https://ijepa.vercel.app/ · submit https://ijepa.vercel.app/submitform · author guidelines https://ijepa.vercel.app/author-guidelines · issues https://ijepa.vercel.app/journal-issues

---

## Appendix B — Database schema (Supabase / Postgres, runnable)

```sql
-- BuildSoftTech learning platform — Supabase schema
-- Run this once in the Supabase SQL editor (Dashboard → SQL → New query → paste → Run).
-- Safe to re-run: everything uses IF NOT EXISTS / OR REPLACE.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Profiles (one per auth user)
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  email       text not null,
  full_name   text not null default '',
  phone       text default '',
  institution text default '',
  degree      text default '',
  role        text not null default 'student' check (role in ('student', 'admin')),
  created_at  timestamptz not null default now()
);

-- Create a profile automatically when a user signs up.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name, phone, institution, degree)
  values (
    new.id,
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    coalesce(new.raw_user_meta_data ->> 'phone', ''),
    coalesce(new.raw_user_meta_data ->> 'institution', ''),
    coalesce(new.raw_user_meta_data ->> 'degree', '')
  )
  on conflict (id) do nothing;
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- True when the current user is an admin. Used by every policy below.
create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin');
$$;

-- ---------------------------------------------------------------------------
-- Courses
-- ---------------------------------------------------------------------------
create table if not exists public.courses (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  slug         text unique,
  description  text default '',
  topics       text[] default '{}',
  fee          text default '',
  duration     text default '',
  mode         text default 'Online',
  status       text not null default 'draft' check (status in ('draft', 'open', 'running', 'completed', 'closed')),
  teams_link   text default '',
  drive_folder text default '',
  start_date   date,
  created_at   timestamptz not null default now()
);

create table if not exists public.course_enrollments (
  id           uuid primary key default gen_random_uuid(),
  course_id    uuid not null references public.courses (id) on delete cascade,
  student_id   uuid not null references public.profiles (id) on delete cascade,
  status       text not null default 'pending' check (status in ('pending', 'active', 'completed', 'rejected')),
  note         text default '',
  enrolled_at  timestamptz not null default now(),
  completed_at timestamptz,
  unique (course_id, student_id)
);

create table if not exists public.course_sessions (
  id            uuid primary key default gen_random_uuid(),
  course_id     uuid not null references public.courses (id) on delete cascade,
  position      int not null default 0,
  title         text not null,
  session_date  date,
  recording_url text default '',   -- Google Drive view-only link
  notes         text default '',
  created_at    timestamptz not null default now()
);

create table if not exists public.course_resources (
  id           uuid primary key default gen_random_uuid(),
  course_id    uuid not null references public.courses (id) on delete cascade,
  kind         text not null default 'link' check (kind in ('pdf', 'youtube', 'github', 'link')),
  title        text not null,
  url          text default '',    -- external link, or public/signed URL for uploaded PDFs
  storage_path text default '',    -- path inside the course-resources bucket for PDFs
  created_at   timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Internships
-- ---------------------------------------------------------------------------
create table if not exists public.internships (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  domain      text default '',
  description text default '',
  fee         text default '',
  duration    text default '45 Days',
  status      text not null default 'open' check (status in ('draft', 'open', 'closed')),
  created_at  timestamptz not null default now()
);

create table if not exists public.internship_enrollments (
  id                uuid primary key default gen_random_uuid(),
  internship_id     uuid not null references public.internships (id) on delete cascade,
  student_id        uuid not null references public.profiles (id) on delete cascade,
  status            text not null default 'pending' check (status in ('pending', 'active', 'completed', 'rejected')),
  problem_statement text default '',
  weeks_total       int not null default 6 check (weeks_total between 1 and 52),
  repo_url          text default '',
  start_date        date,
  enrolled_at       timestamptz not null default now(),
  completed_at      timestamptz,
  unique (internship_id, student_id)
);

create table if not exists public.internship_reviews (
  id            uuid primary key default gen_random_uuid(),
  enrollment_id uuid not null references public.internship_enrollments (id) on delete cascade,
  week_no       int not null check (week_no between 1 and 52),
  reviewed      boolean not null default false,
  notes         text default '',
  suggestions   text default '',
  reviewed_at   timestamptz,
  unique (enrollment_id, week_no)
);

-- ---------------------------------------------------------------------------
-- Certificates
-- ---------------------------------------------------------------------------
create table if not exists public.certificates (
  id             uuid primary key default gen_random_uuid(),
  certificate_no text unique not null,
  kind           text not null check (kind in ('course', 'internship')),
  student_id     uuid not null references public.profiles (id) on delete cascade,
  enrollment_id  uuid not null,              -- course_enrollments.id or internship_enrollments.id
  title          text not null,              -- course / internship title at issue time
  issued_at      date not null default current_date,
  issued_by      uuid references public.profiles (id),
  unique (kind, enrollment_id)
);

-- ---------------------------------------------------------------------------
-- Site settings (used by the existing /admin settings panel)
-- ---------------------------------------------------------------------------
create table if not exists public.site_settings (
  key   text primary key,
  value jsonb not null
);

-- ---------------------------------------------------------------------------
-- Row-level security
-- ---------------------------------------------------------------------------
alter table public.profiles               enable row level security;
alter table public.courses                enable row level security;
alter table public.course_enrollments     enable row level security;
alter table public.course_sessions        enable row level security;
alter table public.course_resources       enable row level security;
alter table public.internships            enable row level security;
alter table public.internship_enrollments enable row level security;
alter table public.internship_reviews     enable row level security;
alter table public.certificates           enable row level security;
alter table public.site_settings          enable row level security;

-- profiles: own row read/update; admins everything
drop policy if exists "profiles own read"   on public.profiles;
drop policy if exists "profiles own update" on public.profiles;
drop policy if exists "profiles admin all"  on public.profiles;
create policy "profiles own read"   on public.profiles for select using (id = auth.uid() or public.is_admin());
create policy "profiles own update" on public.profiles for update using (id = auth.uid()) with check (id = auth.uid() and role = 'student');
create policy "profiles admin all"  on public.profiles for all using (public.is_admin()) with check (public.is_admin());

-- courses / internships: anyone can read non-draft listings; admins manage
drop policy if exists "courses public read" on public.courses;
drop policy if exists "courses admin all"   on public.courses;
create policy "courses public read" on public.courses for select using (status <> 'draft' or public.is_admin());
create policy "courses admin all"   on public.courses for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "internships public read" on public.internships;
drop policy if exists "internships admin all"   on public.internships;
create policy "internships public read" on public.internships for select using (status <> 'draft' or public.is_admin());
create policy "internships admin all"   on public.internships for all using (public.is_admin()) with check (public.is_admin());

-- enrollments: student sees and creates own (pending); admin manages
drop policy if exists "course_enr own read"   on public.course_enrollments;
drop policy if exists "course_enr own insert" on public.course_enrollments;
drop policy if exists "course_enr admin all"  on public.course_enrollments;
create policy "course_enr own read"   on public.course_enrollments for select using (student_id = auth.uid() or public.is_admin());
create policy "course_enr own insert" on public.course_enrollments for insert with check (student_id = auth.uid() and status = 'pending');
create policy "course_enr admin all"  on public.course_enrollments for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "intern_enr own read"   on public.internship_enrollments;
drop policy if exists "intern_enr own insert" on public.internship_enrollments;
drop policy if exists "intern_enr admin all"  on public.internship_enrollments;
create policy "intern_enr own read"   on public.internship_enrollments for select using (student_id = auth.uid() or public.is_admin());
create policy "intern_enr own insert" on public.internship_enrollments for insert with check (student_id = auth.uid() and status = 'pending');
create policy "intern_enr admin all"  on public.internship_enrollments for all using (public.is_admin()) with check (public.is_admin());

-- sessions / resources: visible only to actively enrolled students (and admins)
drop policy if exists "sessions enrolled read" on public.course_sessions;
drop policy if exists "sessions admin all"     on public.course_sessions;
create policy "sessions enrolled read" on public.course_sessions for select using (
  public.is_admin() or exists (
    select 1 from public.course_enrollments e
    where e.course_id = course_sessions.course_id and e.student_id = auth.uid() and e.status in ('active', 'completed')
  )
);
create policy "sessions admin all" on public.course_sessions for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "resources enrolled read" on public.course_resources;
drop policy if exists "resources admin all"     on public.course_resources;
create policy "resources enrolled read" on public.course_resources for select using (
  public.is_admin() or exists (
    select 1 from public.course_enrollments e
    where e.course_id = course_resources.course_id and e.student_id = auth.uid() and e.status in ('active', 'completed')
  )
);
create policy "resources admin all" on public.course_resources for all using (public.is_admin()) with check (public.is_admin());

-- reviews: student reads own; admin writes
drop policy if exists "reviews own read"  on public.internship_reviews;
drop policy if exists "reviews admin all" on public.internship_reviews;
create policy "reviews own read" on public.internship_reviews for select using (
  public.is_admin() or exists (
    select 1 from public.internship_enrollments e where e.id = internship_reviews.enrollment_id and e.student_id = auth.uid()
  )
);
create policy "reviews admin all" on public.internship_reviews for all using (public.is_admin()) with check (public.is_admin());

-- certificates: student reads own; public verification is done server-side with the service key
drop policy if exists "certs own read"  on public.certificates;
drop policy if exists "certs admin all" on public.certificates;
create policy "certs own read"  on public.certificates for select using (student_id = auth.uid() or public.is_admin());
create policy "certs admin all" on public.certificates for all using (public.is_admin()) with check (public.is_admin());

-- site_settings: public read, admin write
drop policy if exists "settings public read" on public.site_settings;
drop policy if exists "settings admin write" on public.site_settings;
create policy "settings public read" on public.site_settings for select using (true);
create policy "settings admin write" on public.site_settings for all using (public.is_admin()) with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- Storage bucket for course PDFs (private; files are served via signed URLs)
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('course-resources', 'course-resources', false)
on conflict (id) do nothing;

drop policy if exists "course files admin all"      on storage.objects;
drop policy if exists "course files enrolled read"  on storage.objects;
create policy "course files admin all" on storage.objects for all
  using (bucket_id = 'course-resources' and public.is_admin())
  with check (bucket_id = 'course-resources' and public.is_admin());
create policy "course files enrolled read" on storage.objects for select
  using (
    bucket_id = 'course-resources' and exists (
      select 1 from public.course_resources r
      join public.course_enrollments e on e.course_id = r.course_id
      where r.storage_path = storage.objects.name and e.student_id = auth.uid() and e.status in ('active', 'completed')
    )
  );

-- ---------------------------------------------------------------------------
-- Make yourself admin (run after signing up on the website with that email):
--   update public.profiles set role = 'admin' where email = 'you@example.com';
-- ---------------------------------------------------------------------------
```
