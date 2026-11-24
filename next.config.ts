import type { NextConfig } from "next";
import { codeInspectorPlugin } from "code-inspector-plugin";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    formats: ["image/avif", "image/webp"],
  },

  turbopack: {
    rules: codeInspectorPlugin({
      bundler: "turbopack",
    }),
  },
};

export default nextConfig;

