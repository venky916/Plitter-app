/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ["pages", "utils"], // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
  },
  // eslint: {
  //   ignoreDuringBuilds: true, // Ignore ESLint errors during the build
  // },
};

export default nextConfig;
