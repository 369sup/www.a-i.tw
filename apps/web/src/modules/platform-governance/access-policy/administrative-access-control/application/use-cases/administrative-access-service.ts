import { assignEnterpriseOwner } from "../../domain/administrative-access-control/aggregates/enterprise-owner-assignment";
import type { EnterpriseDirectory } from "../ports/outbound/enterprise-directory-port";
import type { EnterpriseOwnerStore } from "../ports/outbound/enterprise-owner-store-port";

export function createAdministrativeAccessService(
  store: EnterpriseOwnerStore,
  enterprises: EnterpriseDirectory,
  clock: () => Date,
) {
  return {
    async assignFoundingOwner(enterpriseId: string, principalId: string) {
      if (!(await enterprises.exists(enterpriseId))) {
        throw new Error("Enterprise account is unavailable.");
      }
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
    isEnterpriseOwner(enterpriseId: string, principalId: string) {
      return store.has(enterpriseId, principalId);
    },
  };
}
