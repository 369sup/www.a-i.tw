import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";

import { docsLayoutOptions } from "@/src/app/(public)/docs/docs-layout-composition";
import { docsSource } from "@/src/app/(public)/docs/docs-source-composition";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout tree={docsSource.pageTree} {...docsLayoutOptions()}>
      {children}
    </DocsLayout>
  );
}
