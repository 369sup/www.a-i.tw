import { createMDX } from "fumadocs-mdx/next";

/** @type {import('next').NextConfig} */
const config = {
  typedRoutes: true,
};

const withMDX = createMDX();

export default withMDX(config);
