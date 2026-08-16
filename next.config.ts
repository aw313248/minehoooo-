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
  /* public/ 預設是 max-age=0, must-revalidate — 影片會被瀏覽器與企業代理反覆重抓
     （2026-07-29 Fast Data Transfer 爆量的主因）。媒體檔改成可快取：
     影片檔名不會原地更換內容，給一年 immutable；圖片可能被實拍替換，給一天＋背景更新 */
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        source: "/:path*.:ext(mp4|webm|mov|m4a|mp3)",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/:path*.:ext(jpg|jpeg|png|webp|avif|svg|gif)",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=2592000" }],
      },
    ];
  },
  // Short redirects so IG/Threads bot can share shorter links
  async redirects() {
    return [
      { source: "/seedance",   destination: "/field-notes/seedance-aerial", permanent: false },
      { source: "/飛天小女警", destination: "/field-notes/seedance-aerial", permanent: false },
      { source: "/notes",      destination: "/field-notes",                 permanent: true  },
    ];
  },
};

export default nextConfig;
