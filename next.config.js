/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
});

module.exports = withPWA({
  reactStrictMode: true,
  images: {
    domains: [
      "localhost",
      "api.alimortazavi.org",
      "ali-mortazavi.cyclic.app",
      "alimor.liara.run",
    ],
  },
});
