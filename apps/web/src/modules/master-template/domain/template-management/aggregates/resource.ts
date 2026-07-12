import type { ResourceName } from "../value-objects/resource-name";

export class Resource {
  private constructor(
    readonly id: string,
    readonly namespaceId: string,
    readonly name: ResourceName,
    readonly createdAt: Date,
  ) {}

  static create(input: {
    id: string;
    namespaceId: string;
    name: ResourceName;
    createdAt: Date;
  }): Resource {
    return new Resource(
      input.id,
      input.namespaceId,
      input.name,
      input.createdAt,
    );
  }
}
