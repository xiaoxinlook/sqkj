/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['package-name'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'v2.shizizuodh.com',
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