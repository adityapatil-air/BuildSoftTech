/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Paths used by the Lovable design, kept working.
  async redirects() {
    return [
      { source: '/journal-publication', destination: '/services/research-publication', permanent: true },
      { source: '/software-classes', destination: '/courses', permanent: true },
      { source: '/internship-training', destination: '/internships', permanent: true },
      { source: '/research-collaboration', destination: '/services/research-collaboration', permanent: true },
    ];
  },
};

export default nextConfig;
