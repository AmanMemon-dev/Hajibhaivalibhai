/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',          // static export → deploy `out/` anywhere
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  transpilePackages: ['three'],
};
export default nextConfig;
