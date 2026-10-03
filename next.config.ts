import type { NextConfig } from "next";

const config: NextConfig = {
  poweredByHeader: false,
  experimental: { globalNotFound: true },
  turbopack: { root: process.cwd() },
  outputFileTracingRoot: process.cwd(),
};
export default config;
