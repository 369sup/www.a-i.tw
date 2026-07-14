export type EnterpriseSummaryV1 = Readonly<{
  enterpriseId: string;
  name: string;
  organizationAccountIds: readonly string[];
}>;

export interface EnterpriseAccountDirectoryApiV1 {
  resolve(enterpriseId: string): Promise<EnterpriseSummaryV1 | undefined>;
  findByOrganization(
    organizationAccountId: string,
  ): Promise<EnterpriseSummaryV1 | undefined>;
}
