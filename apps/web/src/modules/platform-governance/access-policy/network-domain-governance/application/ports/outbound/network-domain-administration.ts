export interface NetworkDomainAdministration {
  requireEnterpriseOwner(
    enterpriseId: string,
    principalId: string,
  ): Promise<void>;
}
