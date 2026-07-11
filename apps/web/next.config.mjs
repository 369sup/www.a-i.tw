import { createMDX } from "fumadocs-mdx/next";

/** @type {import('next').NextConfig} */
const config = {
  allowedDevOrigins: ["127.0.0.1"],
  typedRoutes: true,
};

const withMDX = createMDX();

export default withMDX(config);
