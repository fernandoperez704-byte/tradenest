import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "tradenestx.vercel.app",
          },
        ],
        destination: "https://www.tradenestxacademy.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;