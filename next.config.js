/** @type {import("next").NextConfig} */
const nextConfig = {
  // NOTE: Do NOT use output:"export" with @cloudflare/next-on-pages
  // Cloudflare Pages handles the build via npx @cloudflare/next-on-pages@1
  trailingSlash: true,
  images: { unoptimized: true },
  experimental: {
    // Required for @cloudflare/next-on-pages compatibility
  },
}
module.exports = nextConfig
