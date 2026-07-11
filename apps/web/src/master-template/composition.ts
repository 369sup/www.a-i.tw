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

export type MasterTemplateDependencies = {
  access: AccessDecisionPort;
  clock: Clock;
  ids: IdGenerator;
  namespaces: NamespaceReferencePort;
  resources: ResourceStore;
};

export function createMasterTemplateModule(
  dependencies: MasterTemplateDependencies,
) {
  return {
    createResource: createCreateResource(dependencies),
    getResource: createGetResource(dependencies.resources),
    listResources: createListResources(dependencies.resources),
  };
}
