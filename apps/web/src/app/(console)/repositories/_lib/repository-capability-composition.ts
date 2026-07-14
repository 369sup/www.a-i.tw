import "server-only";

import type { AuthenticationView } from "@/src/presentation/request-context/browser-request-envelope";
import {
  createRepositoryCapabilityContextResolver,
  type RepositoryCapabilityKey,
} from "./repository-capability-context";
import { getProductComposition } from "@/src/composition/product-composition";

export async function resolveRepositoryCapabilityContext(input: {
  authentication: AuthenticationView;
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
  return resolve({
    ...input,
    correlationId: crypto.randomUUID(),
  });
}
