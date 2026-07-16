import { requireConsoleAuthentication } from "@/src/app/(console)/console-session-composition";
import { getProductComposition } from "@/src/composition/product-composition";

export async function currentAuditEvidence() {
  const authentication = await requireConsoleAuthentication();
  const entries = await getProductComposition().audit.query({
    actorPrincipalId: authentication.principal.principalId,
  });

  return {
    actorHandle: authentication.principal.handle,
    entries,
  } as const;
}
