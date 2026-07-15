import type {
  AppManagementApiV1,
  GitHubAppRegistrationV1,
} from "../../contracts/v1/public";
import { createGitHubAppRegistration } from "../../domain/app-registration/aggregates/github-app-registration";
import { appRegistrationNameKey } from "../../domain/app-registration/value-objects/app-registration-name";
import type { AppRegistrationStore } from "../ports/outbound/app-registration-store-port";
import type { PersonalAppOwnerDirectory } from "../ports/outbound/personal-app-owner-directory-port";

const toContract = (
  registration: GitHubAppRegistrationV1,
): GitHubAppRegistrationV1 => ({ ...registration });

async function requireOwner(
  owners: PersonalAppOwnerDirectory,
  principalId: string,
) {
  const owner = await owners.resolveByPrincipal(principalId.trim());
  if (!owner || owner.status !== "active")
    throw new Error("Active Personal Account owner is required.");
  return owner;
}

export function createAppManagementService(
  store: AppRegistrationStore,
  owners: PersonalAppOwnerDirectory,
  nextId: () => string,
  now: () => Date,
): AppManagementApiV1 {
  return {
    async register(input) {
      const owner = await requireOwner(owners, input.principalId);
      const nameKey = appRegistrationNameKey(input.name);
      if (await store.findByName(nameKey))
        throw new Error("GitHub App name is already registered.");
      const registration = createGitHubAppRegistration({
        id: nextId(),
        ownerAccountId: owner.accountId,
        name: input.name,
        description: input.description,
        homepageUrl: input.homepageUrl,
        callbackUrl: input.callbackUrl,
        createdAt: now(),
      });
      await store.save(registration);
      return toContract(registration);
    },
    async listOwned(principalId) {
      const owner = await requireOwner(owners, principalId);
      return (await store.listByOwner(owner.accountId))
        .map(toContract)
        .sort((left, right) => right.createdAt.localeCompare(left.createdAt));
    },
  };
}
