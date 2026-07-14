export interface EnterpriseRepositoryGovernance {
  constraintsForOwner(ownerAccountId: string): Promise<
    Readonly<{
      publicRepositoryCreation: "allowed" | "forbidden";
      publicVisibilityChange: "allowed" | "forbidden";
    }>
  >;
}
