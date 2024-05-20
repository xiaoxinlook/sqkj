/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['package-name'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'taotaodaohang.taotaodaohang.cc',
        port: '',
        pathname: '/**',
      },
    ],
    minimumCacheTTL: 6000,
    contentDispositionType: 'inline',
  },
  reactStrictMode: true,
}

module.exports = nextConfig