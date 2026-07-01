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
};

export default nextConfig;
