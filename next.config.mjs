/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
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

// export default nextConfig;

import removeImports from "next-remove-imports";
export default removeImports()({
  ...nextConfig,
  webpack: function (config) {
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader",
    });
    return config;
  },
});
