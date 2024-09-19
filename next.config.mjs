/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true, // 빌드 시 타입 에러 무시
  },
  reactStrictMode: false,
  swcMinify: true,
};

export default nextConfig;
