// Page copy supplied by the client (Nov 2026 content pack). Lists live here; short prose
// lives in the page views. Fees, stats and other admin-editable values are in defaults.js.

// Colour per service, used across pages so visitors learn the map.
export const COLORS = ['#2547d0', '#0b9d9a', '#6d3be6', '#f2711c', '#d61f6f', '#c98f00', '#127a4b'];

export const COURSES = [
  { title: 'Data Science', duration: '4–6 months', summary: 'Python, statistics, EDA, machine learning, deep learning basics, NLP, deployment', tags: ['Python', 'Pandas', 'Scikit-learn', 'TensorFlow'], icon: 'brain' },
  { title: 'Data Engineering', duration: '4 months', summary: 'SQL, data modelling, ETL/ELT pipelines, Spark, Airflow, warehouses, cloud data services', tags: ['SQL', 'PySpark', 'Airflow', 'Kafka', 'AWS'], icon: 'database' },
  { title: 'Data Analytics', duration: '3 months', summary: 'Excel, SQL, statistics, dashboards and storytelling with data', tags: ['Excel', 'MySQL', 'Power BI', 'Tableau'], icon: 'chart' },
  { title: 'DevOps', duration: '3–4 months', summary: 'Linux, Git, CI/CD, Docker, Kubernetes, infrastructure as code, monitoring, cloud', tags: ['Jenkins', 'Docker', 'Kubernetes', 'Terraform'], icon: 'infinity' },
  { title: 'Python for Data Science', duration: '2 months', summary: 'Python basics, NumPy, Pandas, visualisation and an introduction to ML', tags: ['Python', 'NumPy', 'Matplotlib', 'Seaborn'], icon: 'flask' },
  { title: 'Python Programming', duration: '6–8 weeks', summary: 'Syntax, data structures, OOP, files, modules, exceptions and mini projects', tags: ['Python', 'VS Code', 'Git'], icon: 'terminal' },
  { title: 'Web Development with Django', duration: '3 months', summary: 'HTML/CSS/JS basics, Django MVT, ORM, authentication, REST APIs, deployment', tags: ['Django', 'DRF', 'PostgreSQL', 'Git'], icon: 'globe' },
];

export const TRAINING_MODES = [
  { title: 'Online live', text: 'Zoom / Meet classes with recordings', icon: 'monitor', color: 'c-blue' },
  { title: 'Classroom', text: 'In-person at our Pune centre', icon: 'school', color: 'c-teal' },
  { title: 'Weekend', text: 'Sat–Sun for working people', icon: 'calendar', color: 'c-orange' },
  { title: 'Fast-track', text: 'Daily intensive batches', icon: 'zap', color: 'c-pink' },
  { title: 'Corporate / College', text: 'Custom workshops and FDPs', icon: 'building', color: 'c-violet' },
];

export const TRAINING_INCLUDES = [
  'Live instructor-led sessions with class recordings',
  '2–4 capstone projects for your portfolio and GitHub',
  'Assignments, quizzes and doubt-solving sessions',
  'Course completion certificate with verification ID',
  'Resume building, LinkedIn review and mock interviews',
  'Placement assistance with interview referrals where available',
];

export const DS_SYLLABUS = [
  'Python for Data Science', 'Statistics and Probability', 'Data Wrangling and EDA', 'Data Visualisation',
  'ML: Regression, Classification, Clustering', 'Model Evaluation and Feature Engineering',
  'Deep Learning and Neural Networks', 'NLP and Generative AI basics', 'Deployment with Flask / Streamlit', 'Capstone Project',
];

export const INTERNSHIP_HIGHLIGHTS = [
  'Duration: 45 days minimum, or 2, 3 or 6 months',
  'Online, offline or hybrid',
  '1 major + 2 mini live projects',
  'Weekly mentor reviews and progress reports',
  'Offer letter on joining',
  'Completion certificate with verification ID',
  'Letter of recommendation for top performers',
  'Project report support for college submission',
];

export const INTERNSHIP_DOMAINS = [
  { title: 'Data Science & ML', icon: 'brain', color: 'c-blue' },
  { title: 'Data Analytics', icon: 'chart', color: 'c-violet' },
  { title: 'Data Engineering', icon: 'database', color: 'c-teal' },
  { title: 'DevOps & Cloud', icon: 'cloud', color: 'c-orange' },
  { title: 'Python Development', icon: 'terminal', color: 'c-sun' },
  { title: 'Full-Stack Django', icon: 'globe', color: 'c-pink' },
  { title: 'AI / Generative AI', icon: 'sparkles', color: 'c-blue' },
  { title: 'Blockchain Development', icon: 'blocks', color: 'c-teal' },
];

export const INTERNSHIP_STEPS = [
  ['Apply online', 'Choose your domain'],
  ['Orientation call', 'Short screening chat'],
  ['Offer letter', 'Onboarding kit'],
  ['Learn & build', 'Weekly tasks'],
  ['Final review', 'Project presentation'],
  ['Certificate', 'Plus project report'],
];

export const JOURNAL_SERVICES = [
  'Topic selection and literature review guidance',
  'Methodology, data analysis and result interpretation support',
  'Manuscript structuring (IMRaD) and English editing',
  'Plagiarism and AI-content check report',
  'Journal selection by scope, indexing (SCI/SCIE, Scopus, ESCI, WoS) and timeline',
  'Formatting to journal template, reference styling',
  'Cover letter and submission assistance',
  'Point-by-point reviewer response and revisions',
];

export const COLLABORATION = [
  'Matches researchers with mentors and co-researchers who bring complementary expertise',
  'Every co-author makes a real intellectual contribution, following COPE and ICMJE',
  'Contribution statement (CRediT) agreed in writing before work starts',
  'We never sell or trade authorship positions',
];

export const CONFERENCE_SERVICES = [
  'Alerts for upcoming IEEE, Springer (LNNS, LNEE, AISC, CCIS) and other indexed conferences',
  'Writing and formatting in IEEE / Springer LNCS templates',
  'IEEE PDF eXpress compatibility check',
  'Similarity reduction through proper rewriting and citation',
  'Registration and camera-ready submission guidance',
  'Presentation slides and video preparation',
];

export const CHAPTER_SERVICES = [
  'Tracking open chapter calls from publishers such as Bentham Science, IGI Global, CRC Press (Taylor & Francis), Springer, Elsevier, Wiley and De Gruyter',
  'Chapter proposal (abstract) writing and submission',
  'Full chapter writing guidance, editing and formatting',
  'Copyright form and author agreement assistance',
];

export const BOOK_SERVICES = [
  'Textbooks, reference books, edited books, thesis-to-book',
  'ISBN allotment through the national ISBN agency',
  'Editing, proofreading, typesetting and cover design',
  'Paperback, hardcover and e-book editions',
  'Listing on Amazon, Flipkart and Google Books',
  'Copyright and author agreement support',
];

export const BOOK_PACKAGES = [
  { name: 'Basic', text: 'E-book + ISBN', color: 'c-teal' },
  { name: 'Standard', text: 'Print + e-book + ISBN', color: 'c-blue' },
  { name: 'Premium', text: 'Standard + cover design + online listing', color: 'c-orange' },
];

export const PATENT_SERVICES = [
  'Free invention discussion under NDA',
  'Prior-art / patentability search report',
  'Provisional specification drafting',
  'Complete specification with claims and drawings',
  'Filing via a registered patent agent (startup / small entity / institution rates)',
  'Request for early publication',
  'Request for examination, including expedited',
  'First Examination Report (FER) response and hearing support',
  'Grant follow-up and renewal reminders',
  'Design and copyright registration support',
  'International (PCT) filing guidance',
];

export const PATENT_STEPS = [
  ['Idea & NDA', 'Confidential discussion'],
  ['Search', 'Patentability report'],
  ['Drafting', 'Provisional or complete'],
  ['Filing', 'Indian Patent Office'],
  ['Publication', 'Patent Journal'],
  ['Examination', 'FER response'],
  ['Grant', 'Decided by Patent Office'],
];

export const CORE_VALUES = [
  { title: 'Integrity', text: 'Honest guidance and ethical research practice.', icon: 'shield', color: 'c-blue' },
  { title: 'Practical learning', text: 'Every concept backed by hands-on projects.', icon: 'laptop', color: 'c-teal' },
  { title: 'Learner first', text: 'Small batches, doubt-solving and mentoring.', icon: 'heart', color: 'c-orange' },
  { title: 'Quality', text: 'Original work, plagiarism-free content, timely delivery.', icon: 'award', color: 'c-violet' },
  { title: 'Confidentiality', text: 'Your research ideas and data stay protected.', icon: 'lock', color: 'c-pink' },
];

export const AUDIENCES = [
  'UG / PG students (B.E., B.Tech, BCA, MCA, M.E., M.Tech, B.Sc, M.Sc)',
  'Fresh graduates and job seekers',
  'Working professionals moving into data or DevOps roles',
  'Ph.D. scholars and faculty members',
  'Colleges and universities (FDPs, workshops, corporate training)',
];

export const WHY_US = [
  { title: 'Experienced mentors', text: 'Trainers with industry, teaching and research backgrounds.', icon: 'users', color: 'c-blue' },
  { title: 'Project-based learning', text: 'Real datasets, real tools, portfolio-ready projects.', icon: 'laptop', color: 'c-teal' },
  { title: 'Flexible batches', text: 'Online, classroom and weekend options.', icon: 'calendar', color: 'c-orange' },
  { title: 'Ethical research guidance', text: 'Transparent process, no shortcuts, no false promises.', icon: 'shield', color: 'c-violet' },
  { title: 'Verifiable certificates', text: 'Every certificate carries a unique verification ID.', icon: 'award', color: 'c-pink' },
  { title: 'Placement assistance', text: 'Resume building, mock interviews and referrals.', icon: 'target', color: 'c-sun' },
];

export const FAQS = [
  {
    group: 'Training', color: 'var(--brand)', items: [
      ['Do I need a programming background?', 'No. Python Programming and Data Analytics start from basics. Advanced courses list their prerequisites.'],
      ['Are class recordings available?', 'Yes, for all online batches.'],
      ['Do you provide placement?', 'We provide placement assistance (resume, mock interviews and referrals) but do not guarantee jobs.'],
      ['Can I pay in instalments?', 'Yes, instalment options are available on most courses.'],
    ],
  },
  {
    group: 'Internship', color: 'var(--teal)', items: [
      ['Is the certificate valid for college submission?', 'Yes. You receive an offer letter, a completion certificate with verification ID and a project report.'],
      ['Can I do the internship online?', 'Yes. Online, offline and hybrid modes are available.'],
    ],
  },
  {
    group: 'Research & publication', color: 'var(--violet)', items: [
      ['Do you guarantee publication?', 'No. Acceptance is decided by the journal’s independent peer review. We improve your chances through quality writing, correct journal selection and strong revisions.'],
      ['Will you write my paper for me?', 'We guide, edit and mentor. The research ideas, data and conclusions must be your own work.'],
      ['How do you check a journal is genuine?', 'We check the Scopus source list, the Web of Science Master Journal List and the UGC-CARE list before recommending any journal.'],
      ['Is my research kept confidential?', 'Yes. We sign an NDA on request and never share your work.'],
    ],
  },
  {
    group: 'Patents', color: 'var(--orange)', items: [
      ['How long does a patent grant take?', 'Usually 2–5 years; expedited examination can shorten this where eligible.'],
      ['Who files the patent?', 'A registered patent agent files on your behalf.'],
    ],
  },
];

export const POLICIES = [
  {
    id: 'ethics', title: 'Publication ethics policy', items: [
      'We follow COPE and ICMJE guidelines.',
      'We do not ghost-write papers, fabricate or manipulate data, or sell authorship.',
      'Authorship is given only for real contributions, documented in a contribution statement.',
      'We recommend only journals verified in Scopus, Web of Science or UGC-CARE lists, and avoid predatory and cloned journals.',
      'Clients are responsible for the originality of their ideas, data and results.',
    ],
  },
  {
    id: 'disclaimer', title: 'Disclaimer', items: [
      'BuildSoftTech provides guidance, training and editorial support. Acceptance is decided by journals, conferences and publishers; patent grants by the Patent Office.',
      'BuildSoftTech is not affiliated with IEEE, Springer, Elsevier, Bentham Science, IGI Global, CRC Press or any indexing agency. Names are used only to describe venues.',
      'Placement assistance does not guarantee employment.',
    ],
  },
  {
    id: 'privacy', title: 'Privacy policy', items: [
      'We collect name, contact details and uploaded documents only to deliver our services.',
      'We do not sell personal data. We share it only with payment gateways and partners needed to deliver the service.',
      'Manuscripts and invention details are kept confidential.',
      'Data is handled in line with India’s Digital Personal Data Protection Act, 2023. Email {email} to access or delete your data.',
    ],
  },
  {
    id: 'refund', title: 'Refund & cancellation policy', items: [
      'Training: full refund before the batch starts; [50%] within the first [7] days; none after that.',
      'Internship: refund within [3] days of joining, minus a registration fee of ₹[XXX].',
      'Research and patent services: refund for work not yet started. Government, publisher (APC) and registration fees are non-refundable.',
      'Refunds are processed within [7–10] working days.',
    ],
  },
  {
    id: 'terms', title: 'Terms & conditions', items: [
      'Fees are payable as per the agreed schedule.',
      'Course content and materials are for personal use only.',
      'Certificates are issued after meeting attendance and project requirements.',
      'BuildSoftTech may reschedule batches with prior notice.',
      'Disputes are subject to the jurisdiction of courts in Pune, Maharashtra.',
    ],
  },
];
