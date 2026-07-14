import { assignEnterpriseOwner } from "../../domain/administrative-access-control/aggregates/enterprise-owner-assignment";
import type { EnterpriseOwnerStore } from "../ports/outbound/enterprise-owner-store.port";

export function createAdministrativeAccessService(
  store: EnterpriseOwnerStore,
  clock: () => Date,
) {
  return {
    async assignFoundingOwner(enterpriseId: string, principalId: string) {
      await store.save(
        assignEnterpriseOwner({
          enterpriseId,
          principalId,
          assignedAt: clock().toISOString(),
        }),
      );
    },
    async requireEnterpriseOwner(enterpriseId: string, principalId: string) {
      if (!(await store.has(enterpriseId, principalId)))
        throw new Error("Enterprise owner authorization denied.");
    },
  };
}
