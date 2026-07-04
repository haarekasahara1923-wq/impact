import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/tutorials/admin',
        permanent: true,
      },
    ]
  },
  // Allow large file uploads (up to 100MB) for Cloudinary media uploads
  experimental: {
    serverActions: {
      bodySizeLimit: '100mb',
    },
  },
  // Allow Cloudinary images to be displayed
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
};

export default nextConfig;
