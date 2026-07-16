export type NetworkDomainEnterprise = Readonly<{
  enterpriseId: string;
  name: string;
}>;

export interface NetworkDomainEnterpriseDirectory {
  resolve(enterpriseId: string): Promise<NetworkDomainEnterprise | undefined>;
}
