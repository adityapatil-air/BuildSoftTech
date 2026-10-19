// Default values for everything the admin can change from /admin.
// The live values come from the settings store (src/lib/store.js); these are used when
// nothing has been saved yet, and to fill in any field the saved copy is missing.
import { SITE } from './site';
import { COLLAB_TOPICS, COURSES, PACKAGES } from './content';

export const DEFAULT_SETTINGS = {
  contact: {
    email: SITE.email,
    phoneDisplay: SITE.phoneDisplay,
    phoneLink: SITE.phoneLink,
    address: SITE.address,
    hours: 'Mon–Sat, 10:00 AM – 6:00 PM IST',
  },
  internship: {
    fee: '₹3,000/-',
    duration: '45 Days',
    mode: 'Online / Offline / Hybrid*',
    nextBatch: '',
    note: '',
  },
  courses: COURSES.map((c) => ({ title: c.title, icon: c.icon, items: c.items, fee: '', duration: '' })),
  topics: COLLAB_TOPICS.map((t) => ({ ...t })),
  packages: PACKAGES.map((p) => ({ letter: p.letter, title: p.title, duration: p.duration, fee: p.fee })),
  updatedAt: null,
};

// Shallow-merge each section so a partially saved settings object still renders.
export function mergeSettings(saved) {
  if (!saved || typeof saved !== 'object') return DEFAULT_SETTINGS;
  return {
    contact: { ...DEFAULT_SETTINGS.contact, ...(saved.contact || {}) },
    internship: { ...DEFAULT_SETTINGS.internship, ...(saved.internship || {}) },
    courses: Array.isArray(saved.courses) && saved.courses.length ? saved.courses : DEFAULT_SETTINGS.courses,
    topics: Array.isArray(saved.topics) ? saved.topics : DEFAULT_SETTINGS.topics,
    packages: Array.isArray(saved.packages) && saved.packages.length ? saved.packages : DEFAULT_SETTINGS.packages,
    updatedAt: saved.updatedAt || null,
  };
}
