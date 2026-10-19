// Content lifted from the client's BuildSoftTech brief (buildsofttech.docx), grouped by section.

export const CORE_SERVICES = [
  {
    to: '/services/research-publication',
    icon: 'fileText',
    title: 'Research Publication — IJEPA',
    text: 'Professional support for peer-reviewed journal publication — from manuscript preparation to submission and revision — through our own journal, IJEPA.',
  },
  {
    to: '/services/research-collaboration',
    icon: 'users',
    title: 'SCI / Scopus Research Collaboration',
    text: 'Collaborative research and publication support for researchers and academicians seeking quality indexed-journal opportunities.',
  },
  {
    to: '/courses',
    icon: 'code',
    title: 'Software Training',
    text: 'Practical training in Python, Data Science, AI/ML, Full Stack Development, Cloud, DevOps and emerging technologies.',
  },
  {
    to: '/internships',
    icon: 'briefcase',
    title: 'Internship Programs',
    text: 'Hands-on 45-day internships designed to help students develop technical skills through real-world projects and guided implementation.',
  },
];

export const MISSION = [
  'To facilitate quality research publication through appropriate peer-reviewed journals.',
  'To support researchers in identifying suitable SCI/Scopus-indexed publication opportunities.',
  'To promote genuine research collaboration among academicians and researchers.',
  'To provide industry-oriented software training and internship programs.',
  'To develop practical skills in emerging technologies.',
  'To support institutions and individuals in strengthening their research and technical capabilities.',
  'To maintain transparency, research integrity and professional standards in all our services.',
];

export const RESEARCH_AREAS = [
  { title: 'Artificial Intelligence & Machine Learning', icon: 'cpu' },
  { title: 'Data Science & Big Data', icon: 'database' },
  { title: 'Computer Science & Engineering', icon: 'code' },
  { title: 'Information Technology', icon: 'layers' },
  { title: 'Internet of Things', icon: 'wifi' },
  { title: 'Cloud Computing', icon: 'cloud' },
  { title: 'Cybersecurity', icon: 'lock' },
  { title: 'Computer Networks', icon: 'globe' },
  { title: 'Software Engineering', icon: 'briefcase' },
  { title: 'Electronics & Communication Engineering', icon: 'cpu' },
  { title: 'Electrical Engineering', icon: 'trending' },
  { title: 'Mechanical Engineering', icon: 'target' },
  { title: 'Civil Engineering', icon: 'building' },
  { title: 'Automation & Robotics', icon: 'rocket' },
  { title: 'Emerging Technologies', icon: 'lightbulb' },
  { title: 'Interdisciplinary Engineering', icon: 'layers' },
];

export const PUBLICATION_SUPPORT = [
  'Research paper submission guidance',
  'Manuscript formatting according to journal guidelines',
  'Technical and language-quality checking',
  'Reference and citation formatting',
  'Similarity/plagiarism screening support',
  'Editorial pre-screening',
  'Peer-review coordination',
  'Reviewer-comment and revision guidance',
  'Final manuscript preparation',
  'Publication-process assistance',
  'Author communication and publication-status updates',
  'E-certificate/publication documentation, where applicable',
];

export const PUBLICATION_PROCESS = [
  'Manuscript Preparation', 'Online Submission', 'Editorial Screening', 'Peer Review',
  'Revision, if Required', 'Final Editorial Decision', 'Publication', 'Author Documentation',
];

export const WHO_CAN_SUBMIT = [
  'Faculty Members', 'Ph.D. Scholars', 'Research Scholars', 'M.Tech./M.E. Students',
  'Undergraduate Students', 'Academicians', 'Industry Researchers', 'Independent Researchers',
];

export const WHY_IJEPA = [
  { icon: 'target', title: 'Dedicated Engineering & Technology Platform', text: 'A publication platform focused on engineering, technology and interdisciplinary research.' },
  { icon: 'shieldCheck', title: 'Peer-Review Process', text: "Manuscripts are subjected to the journal's editorial and peer-review procedures." },
  { icon: 'users', title: 'Author Support', text: 'Authors receive guidance regarding formatting, submission and revision requirements.' },
  { icon: 'layers', title: 'Multidisciplinary Scope', text: 'Research contributions from diverse engineering and technology domains can be considered.' },
  { icon: 'check', title: 'Professional Publication Process', text: 'A structured workflow from manuscript submission through editorial decision and publication.' },
];

export const COLLAB_FLOW = [
  'Browse Available Research Topics', 'Select a Research Topic', 'Discuss Your Research Contribution',
  'Finalize Collaboration & Scope', 'Research Implementation & Manuscript Development',
  'Journal Selection & Submission', 'Peer Review & Revision', 'Publication, if Accepted',
];

// TODO (client): replace the placeholder titles, durations and fees with the real research list.
export const COLLAB_TOPICS = [
  { id: 1, title: 'Research Title 1', area: 'AI/ML', index: 'Scopus', duration: '4–6 Months', fee: '₹XX,XXX', status: 'Available' },
  { id: 2, title: 'Research Title 2', area: 'Data Science', index: 'Scopus', duration: '4–6 Months', fee: '₹XX,XXX', status: 'Available' },
  { id: 3, title: 'Research Title 3', area: 'Cybersecurity', index: 'Scopus/SCI', duration: '5–7 Months', fee: '₹XX,XXX', status: 'Available' },
  { id: 4, title: 'Research Title 4', area: 'IoT', index: 'Scopus', duration: '4–6 Months', fee: '₹XX,XXX', status: 'Available' },
  { id: 5, title: 'Research Title 5', area: 'Generative AI', index: 'Scopus/SCI', duration: '5–8 Months', fee: '₹XX,XXX', status: 'Available' },
  { id: 6, title: 'Research Title 6', area: 'Computer Vision', index: 'Scopus', duration: '4–6 Months', fee: '₹XX,XXX', status: 'Available' },
];

export const COLLAB_INCLUDES = [
  'Research problem identification', 'Literature review', 'Research-gap analysis', 'Research methodology',
  'Dataset preparation', 'Algorithm development', 'Software implementation', 'Experimental work',
  'Results and performance analysis', 'Research-paper preparation', 'Technical editing', 'Journal identification',
  'Manuscript submission', 'Reviewer-response preparation', 'Manuscript revision', 'Publication-process support',
];

export const PACKAGES = [
  {
    letter: 'Package A', title: 'Research Contributor',
    forWho: 'For researchers who want to contribute to an ongoing research project',
    includes: ['Research topic selection', 'Research collaboration', 'Literature-review participation', 'Technical contribution', 'Research meetings/discussions', 'Manuscript contribution', 'Publication-support guidance'],
    duration: '3–6 Months', fee: 'Starting from ₹XX,XXX', cta: 'View Available Topics', to: '/services/research-collaboration#topics',
  },
  {
    letter: 'Package B', title: 'Technical Research Collaboration', featured: true,
    forWho: 'For researchers interested in technical implementation and research development',
    includes: ['Research-gap identification', 'Methodology development', 'Programming/implementation', 'Dataset preparation', 'Experiments', 'Results analysis', 'Manuscript development', 'Journal-selection support', 'Submission support'],
    duration: '4–8 Months', fee: 'Starting from ₹XX,XXX', cta: 'Explore Research Projects', to: '/services/research-collaboration#topics',
  },
  {
    letter: 'Package C', title: 'Advanced Research Collaboration',
    forWho: 'For researchers seeking deeper involvement in SCI/SCIE/Scopus-oriented research',
    includes: ['Advanced research methodology', 'Novel algorithm/model development', 'Experimental validation', 'Research manuscript development', 'Technical revision', 'Target-journal analysis', 'Submission support', 'Reviewer-response support', 'Revision assistance'],
    duration: '6–12 Months', fee: 'Based on Research Scope', cta: 'Discuss Your Research', to: '/enquire?service=collaboration',
  },
];

export const COLLAB_DISCLAIMER =
  'Disclaimer: BuildSoftTech provides research collaboration, technical research and publication-support services. Journal acceptance, indexing status, publication timelines and editorial decisions are controlled by the respective journals and publishers. Authorship is based on genuine scholarly contribution and the policies of the target journal. Payment of a professional service fee does not guarantee authorship, a specific author position, manuscript acceptance, publication or indexing.';

export const INTERNSHIP_INCLUDES = [
  '45 days of structured training', 'Technology-specific practical sessions', 'Hands-on programming exercises',
  'Real-world/project-based learning', 'Guided project development', 'Mentor support', 'Technical assignments',
  'Project documentation guidance', 'Project demonstration/presentation', 'Performance evaluation',
  'Internship Completion Certificate', 'Project Experience Certificate/Documentation, where applicable',
];

export const INTERNSHIP_TIMELINE = [
  { label: 'Day 1–5', title: 'Orientation & Technology Fundamentals', text: 'Introduction to the selected technology, development environment, tools and project requirements.' },
  { label: 'Day 6–15', title: 'Technical Training', text: 'Hands-on learning through structured sessions, demonstrations and practical assignments.' },
  { label: 'Day 16–30', title: 'Project Development', text: 'Students work on a guided project and apply the concepts learned during training.' },
  { label: 'Day 31–40', title: 'Advanced Implementation', text: 'Project enhancement, testing, debugging, documentation and result analysis.' },
  { label: 'Day 41–45', title: 'Final Evaluation & Presentation', text: 'Project demonstration, technical presentation, evaluation and completion formalities.' },
];

export const INTERNSHIP_DOMAINS = [
  { icon: 'code', title: 'Software Development', items: ['Python Programming', 'Java Programming', 'Web Development', 'Full Stack Development', 'Software Engineering'] },
  { icon: 'cpu', title: 'Artificial Intelligence & Data', items: ['Artificial Intelligence', 'Machine Learning', 'Data Science', 'Data Analytics', 'Deep Learning', 'Generative AI'] },
  { icon: 'cloud', title: 'Emerging Technologies', items: ['Cloud Computing', 'DevOps', 'Cybersecurity', 'Internet of Things', 'Computer Vision', 'Natural Language Processing'] },
];

export const INTERNSHIP_GAINS = [
  { icon: 'code', title: 'Practical Technical Skills', text: 'Students get an opportunity to apply classroom knowledge to practical development tasks.' },
  { icon: 'briefcase', title: 'Project Experience', text: 'Each student works on a structured project relevant to the selected technology/domain.' },
  { icon: 'trending', title: 'Industry-Oriented Exposure', text: 'Students become familiar with development tools, coding practices, documentation and project workflows.' },
  { icon: 'layers', title: 'Portfolio Development', text: 'Students can use their project experience as part of their academic and professional portfolio, subject to applicable institutional requirements.' },
  { icon: 'award', title: 'Internship Certificate', text: 'Successful completion is accompanied by an Internship Completion Certificate issued by BuildSoftTech, subject to fulfilment of the program requirements.' },
];

export const INTERNSHIP_HIGHLIGHTS = [
  ['Program Type', 'Paid Internship'], ['Duration', '45 Days'], ['Fee', '₹3,000/-'], ['Mode', 'Online / Offline / Hybrid*'],
  ['Training', 'Technology-specific practical training'], ['Project', 'Guided project development'], ['Mentoring', 'Technical mentor support'],
  ['Evaluation', 'Assignment + Project Evaluation'], ['Certificate', 'Internship Completion Certificate'], ['Target Audience', 'UG / PG / Diploma / Engineering Students'],
];

export const INTERNSHIP_ELIGIBLE = [
  'B.E./B.Tech students', 'M.E./M.Tech students', 'BCA/MCA students', 'B.Sc./M.Sc. students', 'Diploma students',
  'Computer Science students', 'IT students', 'Engineering students from related disciplines', 'Students interested in emerging technologies',
];

export const COURSES = [
  { icon: 'code', title: 'Python Programming', items: ['Python Fundamentals', 'Object-Oriented Programming', 'Libraries & Frameworks', 'Data Handling', 'Automation', 'Mini Projects'] },
  { icon: 'database', title: 'Data Science', items: ['Python for Data Science', 'NumPy', 'Pandas', 'Data Visualization', 'Statistics', 'Machine Learning', 'Real-world Projects'] },
  { icon: 'cpu', title: 'Artificial Intelligence & Machine Learning', items: ['ML Fundamentals', 'Supervised Learning', 'Unsupervised Learning', 'Feature Engineering', 'Model Evaluation', 'Deep Learning', 'AI Projects'] },
  { icon: 'layers', title: 'Full Stack Development', items: ['HTML', 'CSS', 'JavaScript', 'Front-End Development', 'Backend Development', 'Database', 'API Development', 'Deployment'] },
  { icon: 'cloud', title: 'Cloud & DevOps', items: ['Cloud Fundamentals', 'Linux', 'Git & GitHub', 'CI/CD', 'Docker', 'Cloud Deployment', 'DevOps Practices'] },
  { icon: 'lock', title: 'Cybersecurity', items: ['Cybersecurity Fundamentals', 'Network Security', 'Web Security', 'Vulnerability Assessment', 'Security Tools', 'Ethical Security Practices'] },
];

export const RESEARCH_SUPPORT = [
  { icon: 'lightbulb', title: 'Research Idea Development', text: 'We help researchers convert broad interests into focused research problems.', items: [] },
  { icon: 'bookOpen', title: 'Literature Review', text: 'Support for:', items: ['Literature search strategy', 'Research-paper analysis', 'Literature classification', 'Research-gap identification', 'Citation management'] },
  { icon: 'target', title: 'Research Methodology', text: 'Support for:', items: ['Problem formulation', 'Research objectives', 'Hypothesis development', 'Methodology design', 'Algorithm selection', 'Experimental design'] },
  { icon: 'code', title: 'Implementation Support', text: '', items: ['Python implementation', 'Machine Learning', 'Deep Learning', 'Data Analytics', 'IoT', 'Simulation', 'Web/mobile applications', 'Cloud implementation'] },
  { icon: 'trending', title: 'Results & Analysis', text: '', items: ['Experimental analysis', 'Performance comparison', 'Statistical analysis', 'Graphs and visualization', 'Result interpretation', 'Discussion development'] },
];

export const WHY_US = [
  { icon: 'flask', title: 'Research-Focused', text: 'Our services are designed specifically for the academic and research community.' },
  { icon: 'cpu', title: 'Technology Expertise', text: 'We combine academic research knowledge with practical technology skills.' },
  { icon: 'layers', title: 'End-to-End Support', text: 'From research idea to implementation and publication support, we provide assistance throughout the journey.' },
  { icon: 'shieldCheck', title: 'Ethical Approach', text: 'We emphasise originality, transparency, responsible authorship and research integrity, in line with the UGC academic-integrity framework.' },
  { icon: 'user', title: 'Personalized Guidance', text: "Every research project has different requirements. We provide customised guidance based on the researcher's objectives." },
  { icon: 'code', title: 'Practical Learning', text: 'Our training and internship programs focus on hands-on projects and real-world applications.' },
  { icon: 'fileText', title: 'Professional Documentation', text: 'We assist with research manuscripts, technical reports, project documentation and related academic materials.' },
];

export const WORKFLOW = [
  { title: 'Consultation', text: 'Discuss your research topic, objectives and requirements.' },
  { title: 'Research Assessment', text: 'Evaluate research scope, novelty, methodology and publication suitability.' },
  { title: 'Research Development', text: 'Support literature review, methodology, implementation and analysis.' },
  { title: 'Manuscript Preparation', text: 'Prepare and refine the research manuscript according to the target journal requirements.' },
  { title: 'Quality Check', text: 'Technical review, formatting, references and similarity screening.' },
  { title: 'Journal Selection', text: 'Identify suitable journals based on scope, publication requirements and current indexing information.' },
  { title: 'Submission', text: 'Assist with the journal submission process.' },
  { title: 'Peer Review & Revision', text: 'Support responses to reviewer comments and manuscript revisions.' },
  { title: 'Publication', text: 'Assist with final publication formalities after editorial acceptance.' },
];

export const FACULTY_SERVICES = [
  'Research topic consultation', 'Research collaboration', 'Manuscript development', 'Journal selection', 'SCI/Scopus publication support',
  'Technical implementation', 'Research project development', 'Literature review support', 'Data analysis', 'Reviewer-response support',
  'Research profile development', 'Software and AI training',
];
export const FACULTY_OUTPUT = [
  'Faculty appraisal', 'Promotion documentation', 'Research profile', 'Departmental research records',
  'Institutional research output', 'NBA documentation', 'NAAC documentation', 'NIRF-related institutional reporting',
];
export const STUDENT_SERVICES = [
  'Software training', 'Internship programs', 'Final-year projects', 'Mini projects', 'AI/ML projects', 'Web development projects',
  'Data Science projects', 'IoT projects', 'Project documentation', 'Technical presentations', 'Research-paper development', 'Career-oriented skill development',
];
export const SCHOLAR_SERVICES = [
  'Research problem identification', 'Literature survey', 'Research-gap analysis', 'Methodology', 'Algorithm development', 'Implementation',
  'Dataset preparation', 'Experimental evaluation', 'Research writing', 'Journal selection', 'Reviewer response', 'Publication support',
];
export const INSTITUTIONAL_PROGRAMS = [
  { icon: 'graduation', title: 'Faculty Development Programs', items: ['AI & Machine Learning', 'Data Science', 'Generative AI', 'Python', 'Cybersecurity', 'Cloud Computing', 'Research Methodology', 'Academic Writing', 'Research Publication'] },
  { icon: 'user', title: 'Student Training Programs', items: ['Value-added courses', 'Technical workshops', 'Bootcamps', 'Internship programs', 'Project-based learning', 'Certification programs'] },
  { icon: 'flask', title: 'Research Development Programs', items: ['Research methodology workshops', 'Research writing workshops', 'Scopus/SCI publication awareness', 'Research implementation workshops', 'Grant proposal guidance', 'Collaborative research programs'] },
  { icon: 'building', title: 'Department-Level Programs', items: ['Skill-development programs', 'Industry-oriented training', 'Project mentoring', 'Research cells / R&D support', 'Faculty research mentoring'] },
];

export const INTEGRITY_YES = [
  'Original research', 'Proper citation', 'Responsible use of AI tools', 'Transparent authorship', 'Appropriate data usage',
  'Ethical research practices', 'Proper acknowledgment of contributors', 'Compliance with journal policies', 'Compliance with institutional research policies',
];
export const INTEGRITY_NO = [
  'Fabricated research results', 'Fake data', 'Fake citations', 'Plagiarism', 'Duplicate publication',
  'Manipulation of research results', 'False authorship', 'Guaranteed acceptance claims', 'Misrepresentation of journal indexing',
];

export const FAQS = [
  { q: 'Do you guarantee journal publication?', a: "No. We provide professional research and publication support, but the final decision rests with the journal's editor and peer reviewers." },
  { q: 'Do you guarantee Scopus/SCI publication?', a: "No. We identify potentially suitable journals based on available information and provide publication support. Acceptance depends on the journal's editorial and peer-review process." },
  { q: 'Can you help with research implementation?', a: 'Yes. We provide implementation support in areas including AI/ML, Data Science, Python, IoT, Cloud Computing, Cybersecurity and other technology domains.' },
  { q: 'Can faculty members collaborate on research papers?', a: 'Yes. We facilitate genuine research collaboration. Authorship must be based on actual scholarly contribution and the policies of the target journal.' },
  { q: 'Do you provide internships?', a: 'Yes. We provide structured internship programs with technology training, project development, mentoring, evaluation and completion documentation.' },
  { q: 'Do you provide software courses?', a: 'Yes. Training programs can be customised for students, faculty members, professionals and institutions.' },
  { q: 'Can you organize training programs for colleges?', a: 'Yes. BuildSoftTech can conduct workshops, FDPs, bootcamps, internships, value-added courses and customised technical training programs.' },
  { q: 'Do you provide plagiarism checking?', a: 'We provide similarity-screening and manuscript-improvement support. Authors remain responsible for proper citation and research originality.' },
];
