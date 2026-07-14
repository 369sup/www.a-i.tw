export type RepositoryGovernanceConstraintV1 =
  | Readonly<{ status: "unaffiliated"; organizationAccountId: string }>
  | Readonly<{
      status: "governed";
      organizationAccountId: string;
      enterpriseId: string;
      publicRepositoryCreation: "allowed" | "forbidden";
      publicVisibilityChange: "allowed" | "forbidden";
    }>;
export interface RepositoryPolicyDecisionApiV1 {
  constraintsForOrganization(
    organizationAccountId: string,
  ): Promise<RepositoryGovernanceConstraintV1>;
}
