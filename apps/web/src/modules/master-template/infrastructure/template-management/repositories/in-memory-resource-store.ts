import type {
  ResourceStore,
  ResourceSummary,
} from "../../../application/template-management/ports/outbound/ports";
import type { Resource } from "../../../domain/template-management/aggregates/resource";

export class InMemoryResourceStore implements ResourceStore {
  private readonly resources = new Map<string, Resource>();

  async isNameTaken(input: {
    namespaceId: string;
    normalizedName: string;
  }): Promise<boolean> {
    return [...this.resources.values()].some(
      (resource) =>
        resource.namespaceId === input.namespaceId &&
        resource.name.value === input.normalizedName,
    );
  }

  async save(resource: Resource): Promise<"saved" | "name-conflict"> {
    if (
      await this.isNameTaken({
        namespaceId: resource.namespaceId,
        normalizedName: resource.name.value,
      })
    ) {
      return "name-conflict";
    }
    this.resources.set(resource.id, resource);
    return "saved";
  }

  async listByNamespace(input: {
    namespaceId: string;
  }): Promise<ResourceSummary[]> {
    return [...this.resources.values()]
      .filter((resource) => resource.namespaceId === input.namespaceId)
      .map(toSummary)
      .toSorted((left, right) => right.createdAt.localeCompare(left.createdAt));
  }

  async getById(input: {
    namespaceId: string;
    resourceId: string;
  }): Promise<ResourceSummary | null> {
    const resource = this.resources.get(input.resourceId);
    return resource?.namespaceId === input.namespaceId
      ? toSummary(resource)
      : null;
  }
}

function toSummary(resource: Resource): ResourceSummary {
  return {
    id: resource.id,
    name: resource.name.value,
    createdAt: resource.createdAt.toISOString(),
  };
}
