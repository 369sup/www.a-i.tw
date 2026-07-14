import { createFromSource } from "fumadocs-core/search/server";

import { docsSource } from "@/src/app/(public)/docs/docs-source-composition";

export const revalidate = false;

export const GET = createFromSource(docsSource, {
  language: "english",
}).GET;
