/** @type {import('next').NextConfig}  */

const nextConfig = {
  transpilePackages: ["@postpulse/db", "@postpulse/validators"],
  // images: {
  //   domains: ["img.clerk.com"],
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
