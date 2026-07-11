import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";

import { docsLayoutOptions } from "@/src/presentation/docs/layout-options";
import { docsSource } from "@/src/server/content/docs-source";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout tree={docsSource.pageTree} {...docsLayoutOptions()}>
      {children}
    </DocsLayout>
  );
}
