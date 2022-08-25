/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  //ignore build errors
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
