import type { Resource } from "../domain/resource";

export type ResourceSummary = {
  id: string;
  name: string;
  createdAt: string;
};

export interface NamespaceReferencePort {
  isActive(input: { namespaceId: string }): Promise<boolean>;
}

export interface AccessDecisionPort {
  canCreateResource(input: {
    principalId: string;
    namespaceId: string;
  }): Promise<boolean>;
}

export interface ResourceStore {
  isNameTaken(input: {
    namespaceId: string;
    normalizedName: string;
  }): Promise<boolean>;
  save(resource: Resource): Promise<"saved" | "name-conflict">;
  listByNamespace(input: { namespaceId: string }): Promise<ResourceSummary[]>;
  getById(input: {
    namespaceId: string;
    resourceId: string;
  }): Promise<ResourceSummary | null>;
}

export interface Clock {
  now(): Date;
}

export interface IdGenerator {
  generate(): string;
}
