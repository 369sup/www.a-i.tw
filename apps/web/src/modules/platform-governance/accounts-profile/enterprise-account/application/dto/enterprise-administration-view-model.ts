export type EnterpriseOrganizationOption = {
  accountId: string;
  displayName: string;
  handle: string;
};

export type EnterpriseAdministrationViewModel = {
  enterprises: Array<{
    enterpriseId: string;
    name: string;
  }>;
  selected?: {
    enterpriseId: string;
    name: string;
    organizations: EnterpriseOrganizationOption[];
    availableOrganizations: EnterpriseOrganizationOption[];
  };
};

export type EnterpriseAdministrationActions = {
  createEnterprise(formData: FormData): Promise<void>;
  affiliateOrganization(formData: FormData): Promise<void>;
};
