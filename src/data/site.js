// Single place for contact details, external links and labels shared across pages.
// TODO (client): confirm the email address and WhatsApp number before launch.

export const SITE = {
  name: 'BuildSoftTech',
  tagline: 'Research · Publication · Training · Technology',
  email: 'info@buildsofttech.com',
  phoneDisplay: '+91 8149844901',
  phoneLink: '+918149844901',
  whatsappNumber: '918149844901',
  address: 'Shop No 2, Snehankit Colony, Karve Nagar, Pune-411052, Maharashtra, India',
  addressShort: 'Karve Nagar, Pune, India',
};

export const IJEPA = {
  name: 'IJEPA',
  fullName: 'International Journal of Engineering Practices and Applications',
  issn: '3139-5961',
  url: 'https://ijepa.vercel.app/',
  submitUrl: 'https://ijepa.vercel.app/submitform',
  guidelinesUrl: 'https://ijepa.vercel.app/author-guidelines',
  issuesUrl: 'https://ijepa.vercel.app/journal-issues',
};

export const whatsappLink = (text) =>
  `https://wa.me/${SITE.whatsappNumber}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

export const DISCLAIMER =
  'BuildSoftTech provides research, technical, training and publication-support services. Publication acceptance, indexing status, authorship decisions, promotion eligibility and institutional recognition are determined by the relevant journal, publisher, indexing service, university, employer or regulatory authority. BuildSoftTech does not guarantee publication acceptance, indexing, promotion, appraisal or accreditation outcomes.';
