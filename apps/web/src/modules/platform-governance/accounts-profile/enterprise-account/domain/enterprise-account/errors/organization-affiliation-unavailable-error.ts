export class OrganizationAffiliationUnavailableError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "OrganizationAffiliationUnavailableError";
  }
}
