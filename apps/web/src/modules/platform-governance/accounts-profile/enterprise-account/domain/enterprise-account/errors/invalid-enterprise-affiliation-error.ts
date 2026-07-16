export class InvalidEnterpriseAffiliationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidEnterpriseAffiliationError";
  }
}
