/** @type {import('next').NextConfig} */
const nextConfig = { 
  images: {
    domains: ['pbs.twimg.com'],
  },
  env: {  POSTGRES_URL: process.env.POSTGRES_URL }
}

module.exports = nextConfig
