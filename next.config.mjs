/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["mui-one-time-password-input"],
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
