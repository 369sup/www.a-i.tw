import type {
  AccessDecisionPort,
  Clock,
  IdGenerator,
  NamespaceReferencePort,
} from "../../../application/template-management/ports/outbound/ports";

export class DemoNamespaceReference implements NamespaceReferencePort {
  async isActive(input: { namespaceId: string }): Promise<boolean> {
    return input.namespaceId.length > 0;
  }
}

export class DemoAccessDecision implements AccessDecisionPort {
  async canCreateResource(input: {
    principalId: string;
    namespaceId: string;
  }): Promise<boolean> {
    return (
      input.principalId === "template-principal" && input.namespaceId.length > 0
    );
  }
}

export const systemClock: Clock = { now: () => new Date() };
export const randomIdGenerator: IdGenerator = {
  generate: () => crypto.randomUUID(),
};
