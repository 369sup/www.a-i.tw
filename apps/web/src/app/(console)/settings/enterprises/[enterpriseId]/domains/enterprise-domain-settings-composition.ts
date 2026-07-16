import "server-only";

import { requireConsoleAuthentication } from "@/src/app/(console)/console-session-composition";
import { getProductComposition } from "@/src/composition/product-composition";
import type { EnterpriseDomainVerificationViewModel } from "@/src/modules/platform-governance/access-policy/network-domain-governance/public-api";

export async function getEnterpriseDomainVerificationViewModel(
  enterpriseId: string,
): Promise<EnterpriseDomainVerificationViewModel> {
  const session = await requireConsoleAuthentication();
  return getProductComposition().networkDomainGovernance.list({
    enterpriseId,
    actorPrincipalId: session.principal.principalId,
  });
}
