/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['lh3.googleusercontent.com', 'graph.facebook.com', 'source.unsplash.com', 'cdn.sanity.io']
  }
}

module.exports = nextConfig
