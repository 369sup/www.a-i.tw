export type RepositoryGovernanceConstraintV1 =
  | Readonly<{
      status: "unaffiliated";
      organizationAccountId: string;
    }>
  | Readonly<{
      status: "governed";
      organizationAccountId: string;
      enterpriseId: string;
      publicRepositoryCreation: "allowed" | "forbidden";
      publicVisibilityChange: "allowed" | "forbidden";
    }>;

export interface EnterpriseRepositoryGovernanceApiV1 {
  constraintsForOrganization(
    organizationAccountId: string,
  ): Promise<RepositoryGovernanceConstraintV1>;
}

export type EnterpriseSummaryV1 = Readonly<{
  enterpriseId: string;
  name: string;
  organizationAccountIds: readonly string[];
  repositoryVisibilityPolicy: Readonly<{
    publicRepositoryCreation: "allowed" | "forbidden";
    publicVisibilityChange: "allowed" | "forbidden";
  }>;
}>;
