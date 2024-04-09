/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['www.w3schools.com', 'live.staticflickr.com'],
  },
  webpack: (config, { isServer }) => {
    // เพิ่ม externals สำหรับ bcrypt ไปยังโมดูลของ Next.js
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        bcrypt: false,
      };
    }
    return config;
  },
};

export default nextConfig;