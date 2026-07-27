/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["philip-api.insystem.kr", "localhost"],
    // avif는 인코딩이 webp 대비 수 배 느려 첫 로딩 딜레이의 주범이라 제외 (원본이 이미 webp)
    formats: ["image/webp"],
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
