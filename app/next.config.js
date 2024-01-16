/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  //ignore build errors
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
