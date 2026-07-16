export type OrganizationAccountProvisioningRequest = Readonly<{
  principal: Readonly<{
    principalId: string;
    status: "active" | "disabled";
  }>;
  handle: string;
  displayName: string;
}>;

export type ProvisionedOrganizationAccount = Readonly<{
  accountId: string;
  handle: string;
  kind: "organization";
  status: "active" | "suspended";
}>;

export interface OrganizationAccountProvisioner {
  provision(
    input: OrganizationAccountProvisioningRequest,
  ): Promise<ProvisionedOrganizationAccount>;
}
