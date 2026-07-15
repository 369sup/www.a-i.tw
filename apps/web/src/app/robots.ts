import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/accept-invitation",
        "/account",
        "/api/product-search",
        "/dashboard",
        "/forgot-password",
        "/logout",
        "/notifications",
        "/repositories",
        "/reset-password",
        "/settings",
        "/sign-in",
        "/sign-up",
        "/verify-email",
      ],
    },
    sitemap: "https://www.a-i.tw/sitemap.xml",
    host: "https://www.a-i.tw",
  };
}
