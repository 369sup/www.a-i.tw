import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = "https://www.a-i.tw";

  return ["", "/docs", "/privacy", "/terms", "/accessibility"].map(
    (path, index) => ({
      url: `${origin}${path}`,
      changeFrequency: index === 0 ? "weekly" : "monthly",
      priority: index === 0 ? 1 : 0.6,
    }),
  );
}
