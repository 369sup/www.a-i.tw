import "server-only";

import { createMasterTemplateModule } from "@/src/modules/master-template/composition";
import {
  DemoAccessDecision,
  DemoNamespaceReference,
  randomIdGenerator,
  systemClock,
} from "@/src/modules/master-template/infrastructure/template-management/external-services/demo-adapters";
import { InMemoryResourceStore } from "@/src/modules/master-template/infrastructure/template-management/repositories/in-memory-resource-store";
import { InMemorySubTemplateCatalog } from "@/src/modules/master-template/infrastructure/sub-template/repositories/in-memory-sub-template-catalog";

type MasterTemplateApplication = ReturnType<typeof createMasterTemplateModule>;

const globalForMasterTemplate = globalThis as typeof globalThis & {
  masterTemplateApplication?: MasterTemplateApplication;
};

export function getMasterTemplateApplication() {
  if (!globalForMasterTemplate.masterTemplateApplication) {
    globalForMasterTemplate.masterTemplateApplication =
      createMasterTemplateModule({
        access: new DemoAccessDecision(),
        clock: systemClock,
        ids: randomIdGenerator,
        namespaces: new DemoNamespaceReference(),
        resources: new InMemoryResourceStore(),
        subTemplates: new InMemorySubTemplateCatalog([
          {
            id: "landing-page",
            title: "Landing page",
            content:
              "# Landing page\n\nIntroduce a product with a focused offer.",
            status: "active",
          },
          {
            id: "release-notes",
            title: "Release notes",
            content:
              "# Release notes\n\nSummarize changes and migration impact.",
            status: "active",
          },
        ]),
      });
  }
  return globalForMasterTemplate.masterTemplateApplication;
}
