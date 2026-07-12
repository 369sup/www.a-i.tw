import { Resource } from "../../../domain/template-management/aggregates/resource";
import { ResourceName } from "../../../domain/template-management/value-objects/resource-name";
import type {
  AccessDecisionPort,
  Clock,
  IdGenerator,
  NamespaceReferencePort,
  ResourceStore,
} from "../ports/outbound/ports";

export type CreateResourceCommand = {
  principalId: string;
  namespaceId: string;
  name: string;
};

export type CreateResourceResult =
  | { ok: true; resourceId: string }
  | {
      ok: false;
      code:
        "INVALID_NAME" | "NAME_TAKEN" | "FORBIDDEN" | "NAMESPACE_UNAVAILABLE";
    };

type Dependencies = {
  access: AccessDecisionPort;
  clock: Clock;
  ids: IdGenerator;
  namespaces: NamespaceReferencePort;
  resources: ResourceStore;
};

export function createCreateResource(dependencies: Dependencies) {
  return {
    async execute(
      command: CreateResourceCommand,
    ): Promise<CreateResourceResult> {
      const authorized = await dependencies.access.canCreateResource({
        principalId: command.principalId,
        namespaceId: command.namespaceId,
      });
      if (!authorized) return { ok: false, code: "FORBIDDEN" };

      const namespaceIsActive = await dependencies.namespaces.isActive({
        namespaceId: command.namespaceId,
      });
      if (!namespaceIsActive)
        return { ok: false, code: "NAMESPACE_UNAVAILABLE" };

      const name = ResourceName.create(command.name);
      if (!name.ok) return { ok: false, code: "INVALID_NAME" };

      const nameTaken = await dependencies.resources.isNameTaken({
        namespaceId: command.namespaceId,
        normalizedName: name.value.value,
      });
      if (nameTaken) return { ok: false, code: "NAME_TAKEN" };

      const resource = Resource.create({
        id: dependencies.ids.generate(),
        namespaceId: command.namespaceId,
        name: name.value,
        createdAt: dependencies.clock.now(),
      });
      const saved = await dependencies.resources.save(resource);

      return saved === "saved"
        ? { ok: true, resourceId: resource.id }
        : { ok: false, code: "NAME_TAKEN" };
    },
  };
}
