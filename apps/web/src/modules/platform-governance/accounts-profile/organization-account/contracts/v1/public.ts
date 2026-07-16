export type OrganizationRefV1 = Readonly<{
  accountId: string;
  handle: string;
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

export type ProvisionOrganizationAccountV1 = Readonly<{
  principal: Readonly<{
    principalId: string;
    status: "active" | "disabled";
  }>;
  handle: string;
  displayName: string;
}>;

export interface OrganizationAccountProvisioningApiV1 {
  provision(input: ProvisionOrganizationAccountV1): Promise<OrganizationRefV1>;
}

export interface OrganizationAccountApiV1
  extends
    OrganizationAccountDirectoryApiV1,
    OrganizationAccountProvisioningApiV1 {}
