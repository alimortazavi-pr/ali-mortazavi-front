/** @type {import('next').NextConfig} */

const isDev = process.env.NODE_ENV === "development";

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  disable: isDev,
});

module.exports = withPWA({
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "7778",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "7778",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.alimor.ir",
        pathname: "/**",
      },
    ],
  },
});
