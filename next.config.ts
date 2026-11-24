
import type { NextConfig } from "next";
import { codeInspectorPlugin } from "code-inspector-plugin";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  output: "export",
  trailingSlash: true,

  images: {
    formats: ["image/avif", "image/webp"],
    unoptimized: true,
  },

  turbopack: {
    rules: codeInspectorPlugin({
      bundler: "turbopack",
    }),
  },
};

export default nextConfig;
