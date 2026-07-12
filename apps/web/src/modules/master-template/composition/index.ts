import { createCreateResource } from "../application/template-management/use-cases/create-resource";
import { createGetResource } from "../application/template-management/use-cases/get-resource";
import { createListResources } from "../application/template-management/use-cases/list-resources";
import type {
  AccessDecisionPort,
  Clock,
  IdGenerator,
  NamespaceReferencePort,
  ResourceStore,
} from "../application/template-management/ports/outbound/ports";
import { createSubTemplateModule } from "./sub-template";
import type { SubTemplateCatalog } from "../application/sub-template/ports/outbound/ports";

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
