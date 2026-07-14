export interface EnterpriseDirectory {
  exists(enterpriseId: string): Promise<boolean>;
}
