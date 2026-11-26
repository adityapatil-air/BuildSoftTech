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
  authorBooks: [],
  // Patents listed in the table on /patents. status: 'open' or 'sold'. Empty list = table hidden.
  patentListings: [],
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
