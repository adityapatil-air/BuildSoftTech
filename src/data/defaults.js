// Default values for everything the admin can change from /admin.
// The live values come from the settings store (src/lib/store.js); these are used when
// nothing has been saved yet, and to fill in any field a saved copy is missing.
//
// SETTINGS_VERSION 2 = the Nov 2026 redesign. Settings saved by the earlier design (no
// version) had a different shape, so only their contact details are carried over.
import { SITE } from './site';
import { COURSES } from './content';

export const SETTINGS_VERSION = 2;

export const DEFAULT_SETTINGS = {
  version: SETTINGS_VERSION,
  contact: {
    email: SITE.email,
    researchEmail: SITE.researchEmail,
    phoneDisplay: SITE.phoneDisplay,
    phoneLink: SITE.phoneLink,
    whatsapp: '',
    address: SITE.address,
    hours: SITE.hours,
    mapQuery: '',
  },
  social: { linkedin: '', youtube: '', instagram: '', facebook: '' },
  topbar: { pill: 'New', text: 'Weekend batches open', linkLabel: 'Enroll now', link: '/training' },
  // Counts shown under the home page hero. Replace with real numbers when available.
  stats: [
    { value: '7', label: 'Job-ready courses' },
    { value: '8', label: 'Internship tracks' },
    { value: '45+', label: 'Day internships' },
    { value: '20+ yrs', label: 'Team experience' },
  ],
  courses: COURSES.map((c) => ({ title: c.title, duration: c.duration, summary: c.summary, tags: c.tags, icon: c.icon, fee: '' })),
  internshipPlans: [
    { name: 'Basic', duration: '45 days', fee: '', features: ['Training', '1 project', 'Certificate'], featured: false },
    { name: 'Standard', duration: '2 months', fee: '', features: ['Training', '2 projects', 'Certificate', 'LOR on merit'], featured: true },
    { name: 'Advanced', duration: '3–6 months', fee: '', features: ['Training', 'Industry-level project', 'Certificate + LOR', 'Interview preparation'], featured: false },
  ],
  researchPackages: [
    { name: 'Editing & Formatting', includes: 'Language editing, formatting, plagiarism report', fee: '' },
    { name: 'Complete Support', includes: 'Above + journal selection, submission, revision support', fee: '' },
    { name: 'Research Mentoring', includes: 'End-to-end guidance from topic to final revision', fee: '' },
  ],
  patentPlans: [
    { name: 'Provisional Filing', fee: '', features: ['Patentability search', 'Provisional draft', 'Filing'], featured: false },
    { name: 'Complete Filing & Publication', fee: '', features: ['Complete specification', 'Filing', 'Early publication'], featured: true },
    { name: 'End-to-End Grant Support', fee: '', features: ['Everything in Complete', 'Examination request', 'FER response + hearing'], featured: false },
  ],
  // "Become an author" books on /books. status: 'open' or 'sold'. Empty list = page shows a contact note.
  // SAMPLE rows (Nov 2026, until the client sends real ones). Delete them in admin or here.
  authorBooks: [
    { title: 'Advances in Machine Learning Applications (sample)', role: 'Chapter author', details: 'Edited book with ISBN. Topics: ML in healthcare, finance and agriculture.', price: '₹ 3,000', status: 'open' },
    { title: 'Data Science for Engineers (sample)', role: 'Co-author', details: 'Reference book with ISBN, print and e-book.', price: '₹ 5,000', status: 'open' },
    { title: 'Internet of Things: Concepts and Case Studies (sample)', role: 'Chapter author', details: 'Edited book with ISBN. Topics: smart cities, sensors, edge computing.', price: '₹ 3,000', status: 'open' },
    { title: 'Blockchain Technology and Industry 4.0 (sample)', role: 'Chapter author', details: 'Edited book with ISBN. Topics: supply chain, security, smart contracts.', price: '₹ 3,500', status: 'open' },
    { title: 'Python Programming for Beginners (sample)', role: 'Co-author', details: 'Textbook with ISBN for UG students.', price: '₹ 4,500', status: 'open' },
    { title: 'Cyber Security: Threats and Defences (sample)', role: 'Chapter author', details: 'Edited book with ISBN.', price: '₹ 3,000', status: 'open' },
    { title: 'Cloud Computing and DevOps Practices (sample)', role: 'Co-author', details: 'Reference book with ISBN.', price: '₹ 5,000', status: 'open' },
    { title: 'Artificial Intelligence in Education (sample)', role: 'Chapter author', details: 'Edited book with ISBN.', price: '₹ 3,000', status: 'open' },
    { title: 'Renewable Energy Systems and Smart Grids (sample)', role: 'Chapter author', details: 'Edited book with ISBN.', price: '₹ 3,500', status: 'open' },
    { title: 'Research Methodology for Engineering Scholars (sample)', role: 'Co-author', details: 'Textbook with ISBN for PG and Ph.D. scholars.', price: '₹ 4,000', status: 'open' },
  ],
  // Patents listed in the table on /patents. status: 'open' or 'sold'. Empty list = table hidden.
  // SAMPLE rows, as above.
  patentListings: [
    { title: 'Smart irrigation system using IoT soil-moisture sensors (sample)', applicationNo: 'SAMPLE-0001', date: '12 Jan 2026', field: 'Agriculture, IoT', price: '₹ 15,000', status: 'open' },
    { title: 'Blockchain-based academic certificate verification system (sample)', applicationNo: 'SAMPLE-0002', date: '28 Jan 2026', field: 'Blockchain', price: '₹ 18,000', status: 'open' },
    { title: 'Machine-learning model for early crop disease detection (sample)', applicationNo: 'SAMPLE-0003', date: '10 Feb 2026', field: 'AI, Agriculture', price: '₹ 15,000', status: 'open' },
    { title: 'Wearable health monitoring band with fall detection (sample)', applicationNo: 'SAMPLE-0004', date: '02 Mar 2026', field: 'Healthcare, IoT', price: '₹ 20,000', status: 'open' },
    { title: 'Solar-powered smart street light with traffic sensing (sample)', applicationNo: 'SAMPLE-0005', date: '19 Mar 2026', field: 'Energy', price: '₹ 12,000', status: 'open' },
    { title: 'AI-based attendance system using face recognition (sample)', applicationNo: 'SAMPLE-0006', date: '05 Apr 2026', field: 'AI, Education', price: '₹ 15,000', status: 'open' },
    { title: 'Smart waste bin with fill-level alert and route planning (sample)', applicationNo: 'SAMPLE-0007', date: '22 Apr 2026', field: 'Smart city', price: '₹ 12,000', status: 'open' },
    { title: 'Secure cloud file sharing using attribute-based encryption (sample)', applicationNo: 'SAMPLE-0008', date: '08 May 2026', field: 'Cloud, Security', price: '₹ 18,000', status: 'open' },
    { title: 'Drone-based pesticide spraying control system (sample)', applicationNo: 'SAMPLE-0009', date: '26 May 2026', field: 'Agriculture, Robotics', price: '₹ 20,000', status: 'open' },
    { title: 'NLP chatbot for student counselling and admission queries (sample)', applicationNo: 'SAMPLE-0010', date: '11 Jun 2026', field: 'AI, Education', price: '₹ 15,000', status: 'open' },
  ],
  // Real reviews only, shared with the learner's permission. Empty = section hidden.
  testimonials: [],
  updatedAt: null,
};

const list = (saved, key) => (Array.isArray(saved?.[key]) ? saved[key] : DEFAULT_SETTINGS[key]);
const filled = (saved, key) => (Array.isArray(saved?.[key]) && saved[key].length ? saved[key] : DEFAULT_SETTINGS[key]);

// Shallow-merge each section so a partially saved settings object still renders.
export function mergeSettings(saved) {
  if (!saved || typeof saved !== 'object') return DEFAULT_SETTINGS;
  if (saved.version !== SETTINGS_VERSION) {
    // Earlier design: keep the phone and address the admin set. Email and office hours
    // changed with the client's new content, so the old values are not carried over.
    const old = saved.contact || {};
    const contact = { ...DEFAULT_SETTINGS.contact };
    ['phoneDisplay', 'phoneLink', 'address'].forEach((k) => { if (old[k]) contact[k] = old[k]; });
    return { ...DEFAULT_SETTINGS, contact, updatedAt: saved.updatedAt || null };
  }
  const contact = { ...DEFAULT_SETTINGS.contact, ...(saved.contact || {}) };
  return {
    version: SETTINGS_VERSION,
    contact,
    social: { ...DEFAULT_SETTINGS.social, ...(saved.social || {}) },
    topbar: { ...DEFAULT_SETTINGS.topbar, ...(saved.topbar || {}) },
    stats: list(saved, 'stats'),
    courses: filled(saved, 'courses'),
    internshipPlans: filled(saved, 'internshipPlans'),
    researchPackages: filled(saved, 'researchPackages'),
    patentPlans: filled(saved, 'patentPlans'),
    testimonials: list(saved, 'testimonials'),
    authorBooks: list(saved, 'authorBooks'),
    patentListings: list(saved, 'patentListings'),
    updatedAt: saved.updatedAt || null,
  };
}
