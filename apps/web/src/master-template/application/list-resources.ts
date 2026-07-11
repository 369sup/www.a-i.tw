import type { ResourceStore, ResourceSummary } from "./ports";

export function createListResources(resources: ResourceStore) {
  return {
    async execute(input: { namespaceId: string }): Promise<ResourceSummary[]> {
      return resources.listByNamespace(input);
    },
  };
}
