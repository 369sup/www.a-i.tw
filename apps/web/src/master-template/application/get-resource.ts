import type { ResourceStore, ResourceSummary } from "./ports";

export function createGetResource(resources: ResourceStore) {
  return {
    async execute(input: {
      namespaceId: string;
      resourceId: string;
    }): Promise<ResourceSummary | null> {
      return resources.getById(input);
    },
  };
}
