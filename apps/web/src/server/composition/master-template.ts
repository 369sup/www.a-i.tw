import "server-only";

import { createMasterTemplateModule } from "@/src/master-template/composition";
import {
  DemoAccessDecision,
  DemoNamespaceReference,
  randomIdGenerator,
  systemClock,
} from "@/src/master-template/infrastructure/demo-adapters";
import { InMemoryResourceStore } from "@/src/master-template/infrastructure/in-memory-resource-store";

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
      });
  }
  return globalForMasterTemplate.masterTemplateApplication;
}
