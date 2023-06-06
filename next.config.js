/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  // Add the following if you need to allow specific paths within the domain
  // The path can be adjusted based on your requirements
  async rewrites() {
    return [
      {
        source: '/a/:path*',
        destination: 'https://lh3.googleusercontent.com/a/:path*',
      },
    ];
  },
};

module.exports = nextConfig
