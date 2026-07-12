import "server-only";

import type { AuthenticatedPrincipalV1 } from "@/src/modules/identity-access/contracts/identity-access/public";
import {
  createRepositoryCapabilityContextResolver,
  type RepositoryCapabilityKey,
} from "@/src/presentation/request-context/repository-capability-context";
import { getProductWorkspace } from "./product-workspace";

export async function resolveRepositoryCapabilityContext(input: {
  authentication: AuthenticatedPrincipalV1;
  activeScopeAccountId: string;
  repositoryId: string;
  capabilityKey: RepositoryCapabilityKey;
}) {
  const workspace = getProductWorkspace();
  const resolve = createRepositoryCapabilityContextResolver(
    { resolve: (accountId) => workspace.accounts.resolve(accountId) },
    {
      resolve: async (repositoryId, principal) =>
        (await workspace.repositories.get(repositoryId, principal))?.repository,
      authorize: (request) => workspace.repositories.participation(request),
    },
  );
  return resolve({
    ...input,
    correlationId: crypto.randomUUID(),
  });
}
