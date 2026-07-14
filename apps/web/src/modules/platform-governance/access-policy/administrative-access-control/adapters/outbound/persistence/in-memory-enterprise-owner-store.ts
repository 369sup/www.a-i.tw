import type { EnterpriseOwnerStore } from "../../../application/ports/outbound/enterprise-owner-store.port";
import type { EnterpriseOwnerAssignment } from "../../../domain/administrative-access-control/aggregates/enterprise-owner-assignment";

export class InMemoryEnterpriseOwnerStore implements EnterpriseOwnerStore {
  private readonly assignments = new Map<string, EnterpriseOwnerAssignment>();
  async save(assignment: EnterpriseOwnerAssignment) {
    this.assignments.set(
      `${assignment.enterpriseId}:${assignment.principalId}`,
      assignment,
    );
  }
  async has(enterpriseId: string, principalId: string) {
    return this.assignments.has(`${enterpriseId}:${principalId}`);
  }
}
