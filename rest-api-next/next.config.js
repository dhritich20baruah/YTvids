/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig

module.exports = {
    experimental: {
        serverActions: true, //enable experimental server action flag
        serverComponentsExternalPackages: ['mongoose']
    }
}