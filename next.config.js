/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    // Tree-shake these packages so only used icons/exports are bundled
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
}

module.exports = nextConfig
