import type { NextConfig } from "next";

/* Build-time env: commit hash + build time
   Vercel exposes VERCEL_GIT_COMMIT_SHA automatically.
   Locally we fall back to whatever git gives us via env. */
const COMMIT = (
  process.env.VERCEL_GIT_COMMIT_SHA ||
  process.env.NEXT_PUBLIC_COMMIT_SHA ||
  "dev"
).slice(0, 7);

const BUILD_TIME = new Date().toISOString().slice(0, 16).replace("T", " ");

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_COMMIT_SHA: COMMIT,
    NEXT_PUBLIC_BUILD_TIME: BUILD_TIME,
  },
};

export default nextConfig;
