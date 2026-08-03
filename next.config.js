/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    // Vercel 무료 플랜 이미지 최적화 한도 초과 시 402가 발생하므로 최적화를 끄고 원본(webp)을 직접 로드
    unoptimized: true,
    domains: ["philip-api.insystem.kr", "localhost"],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

module.exports = nextConfig;
