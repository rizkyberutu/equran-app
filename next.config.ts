/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "equran.id",
      },
    ],
  },
};

export default nextConfig;
