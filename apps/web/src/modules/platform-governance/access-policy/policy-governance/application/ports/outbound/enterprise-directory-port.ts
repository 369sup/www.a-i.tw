export interface PolicyEnterpriseDirectory {
  findByOrganization(
    organizationAccountId: string,
  ): Promise<Readonly<{ enterpriseId: string }> | undefined>;
}
