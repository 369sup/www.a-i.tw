export interface AdministrativeAccessApiV1 {
  requireEnterpriseOwner(
    enterpriseId: string,
    principalId: string,
  ): Promise<void>;
}
