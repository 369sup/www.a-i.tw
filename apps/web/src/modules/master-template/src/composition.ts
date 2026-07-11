import { createCreateResource } from "./application/create-resource";
import { createGetResource } from "./application/get-resource";
import { createListResources } from "./application/list-resources";
import type {
  AccessDecisionPort,
  Clock,
  IdGenerator,
  NamespaceReferencePort,
  ResourceStore,
} from "./application/ports";
import { createSubTemplateModule } from "./subdomains/sub-template/composition";
import type { SubTemplateCatalog } from "./subdomains/sub-template/application/ports";

export type MasterTemplateDependencies = {
  access: AccessDecisionPort;
  clock: Clock;
  ids: IdGenerator;
  namespaces: NamespaceReferencePort;
  resources: ResourceStore;
  subTemplates: SubTemplateCatalog;
};

export function createMasterTemplateModule(
  dependencies: MasterTemplateDependencies,
) {
  return {
    createResource: createCreateResource(dependencies),
    getResource: createGetResource(dependencies.resources),
    listResources: createListResources(dependencies.resources),
    subTemplates: createSubTemplateModule(dependencies.subTemplates),
  };
}
