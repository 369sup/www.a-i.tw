import type { EnterpriseOwnerAssignment } from "../../../domain/administrative-access-control/aggregates/enterprise-owner-assignment";

export interface EnterpriseOwnerStore {
  save(assignment: EnterpriseOwnerAssignment): Promise<void>;
  has(enterpriseId: string, principalId: string): Promise<boolean>;
}
