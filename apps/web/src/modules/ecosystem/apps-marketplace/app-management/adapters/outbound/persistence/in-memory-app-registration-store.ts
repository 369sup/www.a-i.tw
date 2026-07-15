import type { AppRegistrationStore } from "../../../application/ports/outbound/app-registration-store-port";
import type { GitHubAppRegistration } from "../../../domain/app-registration/aggregates/github-app-registration";
import { appRegistrationNameKey } from "../../../domain/app-registration/value-objects/app-registration-name";

export function createInMemoryAppRegistrationStore(
  seed: readonly GitHubAppRegistration[] = [],
): AppRegistrationStore {
  const records = new Map(
    seed.map((registration) => [registration.id, registration]),
  );
  return {
    async findByName(name) {
      const key = appRegistrationNameKey(name);
      return [...records.values()].find(
        (registration) => appRegistrationNameKey(registration.name) === key,
      );
    },
    async listByOwner(ownerAccountId) {
      return [...records.values()].filter(
        (registration) => registration.ownerAccountId === ownerAccountId,
      );
    },
    async save(registration) {
      records.set(registration.id, registration);
    },
  };
}
