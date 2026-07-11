import { createFromSource } from "fumadocs-core/search/server";

import { docsSource } from "@/src/server/content/docs-source";

export const revalidate = false;

export const GET = createFromSource(docsSource, {
  language: "english",
}).GET;
