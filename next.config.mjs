/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "scontent.fnbe1-2.fna.fbcdn.net",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
