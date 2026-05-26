/** @type {import('next').NextConfig} */
const nextConfig = {
  // This tells Vercel to ignore ESLint formatting errors during deployment
  eslint: {
    ignoreDuringBuilds: true,
  },
  // This tells Vercel to ignore strict TypeScript errors during deployment
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
