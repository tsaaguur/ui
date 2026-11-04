/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  // the library ships TypeScript source, Next compiles it
  transpilePackages: ["@tsaaguur/ui"],
  images: { unoptimized: true },
  async headers() {
    return [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }];
  },
};
export default nextConfig;
