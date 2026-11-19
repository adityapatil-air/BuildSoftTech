/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Pages from earlier versions of the site, sent to where that content lives now.
  async redirects() {
    const to = (source, destination) => ({ source, destination, permanent: true });
    return [
      to('/courses', '/training'),
      to('/software-classes', '/training'),
      to('/internships', '/internship'),
      to('/internship-training', '/internship'),
      to('/journal-publication', '/research#journal'),
      to('/research-collaboration', '/research#journal'),
      to('/services', '/'),
      to('/services/research-publication', '/research#journal'),
      to('/services/research-collaboration', '/research#journal'),
      to('/services/research-support', '/research'),
      to('/research-areas', '/research'),
      to('/for-faculty', '/about'),
      to('/for-students', '/about'),
      to('/for-research-scholars', '/about'),
      to('/for-institutions', '/about'),
      to('/faq', '/faqs'),
      to('/privacy-policy', '/policies#privacy'),
      to('/terms', '/policies#terms'),
      to('/refund-policy', '/policies#refund'),
      to('/research-ethics', '/policies#ethics'),
      to('/authorship-policy', '/policies#ethics'),
      to('/disclaimer', '/policies#disclaimer'),
    ];
  },
};

export default nextConfig;
