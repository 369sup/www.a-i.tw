import "server-only";

import { getProductComposition } from "@/src/composition/product-composition";
import {
  createRepositoryCapabilityContextResolver,
  type RepositoryAuthenticationView,
  type RepositoryCapabilityKey,
} from "@/src/modules/collaboration/repository-work/repository-governance/public-api";

export async function resolveRepositoryCapabilityContext(input: {
  authentication: RepositoryAuthenticationView;
  activeScopeAccountId: string;
  repositoryId: string;
  capabilityKey: RepositoryCapabilityKey;
}) {
  const composition = getProductComposition();
  const resolve = createRepositoryCapabilityContextResolver(
    { resolve: (accountId) => composition.accounts.resolve(accountId) },
    {
      resolve: async (repositoryId, principal) =>
        (await composition.repositories.get(repositoryId, principal))
          ?.repository,
      authorize: async (request) => {
        const decision = await composition.repositories.participation(request);
        return { ...decision, action: request.action };
      },
    },
  );

  return resolve({ ...input, correlationId: crypto.randomUUID() });
}
