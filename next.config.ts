import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static export — the app is entirely client-rendered (Zustand
  // in-memory state, no server data), so we ship plain HTML/CSS/JS to the
  // CDN. This sidesteps Vercel's serverless output mapping entirely.
  output: "export",
  // Static export has no image optimizer, so serve images as-is.
  images: { unoptimized: true },
  // Silence/lock the workspace-root inference (multiple lockfiles exist
  // above this dir on some machines) so build traces root here.
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
