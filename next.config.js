/** @type {import('next').NextConfig} */
const nextConfig = {
    // twoje opcje konfiguracyjne
    reactStrictMode: true,
    images: {
      domains: ['localhost'],
    },
    env: {
      CUSTOM_KEY: 'my-value',
    },
  };
  
  module.exports = nextConfig;
  