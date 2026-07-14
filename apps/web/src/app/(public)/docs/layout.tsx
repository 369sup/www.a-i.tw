import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";

import { docsLayoutOptions } from "@/src/app/(public)/docs/_lib/layout-options";
import { docsSource } from "@/src/app/(public)/docs/_lib/docs-source";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout tree={docsSource.pageTree} {...docsLayoutOptions()}>
      {children}
    </DocsLayout>
  );
}
