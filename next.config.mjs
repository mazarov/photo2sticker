import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  outputFileTracingRoot: __dirname,
  async redirects() {
    return [
      { source: "/stiker-iz-foto", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
