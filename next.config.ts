import type { NextConfig } from "next";

// GitHub Pages serves static files only, under the repo subpath.
const nextConfig: NextConfig = {
  output: "export",
  basePath: "/cairin-landing",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
