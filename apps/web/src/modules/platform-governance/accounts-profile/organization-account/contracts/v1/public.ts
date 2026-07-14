export type OrganizationRefV1 = Readonly<{
  accountId: string;
  handle: string;
  displayName: string;
  kind: "organization";
  status: "active" | "suspended";
}>;

export type OrganizationEligibilityV1 = Readonly<{
  account: OrganizationRefV1;
  canOwnRepository: boolean;
}>;

export interface OrganizationAccountDirectoryApiV1 {
  resolve(accountId: string): Promise<OrganizationRefV1 | undefined>;
  eligibility(
    accountId: string,
  ): Promise<OrganizationEligibilityV1 | undefined>;
}
