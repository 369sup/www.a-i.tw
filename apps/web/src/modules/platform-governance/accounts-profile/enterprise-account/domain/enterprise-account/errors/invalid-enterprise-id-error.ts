export class InvalidEnterpriseIdError extends Error {
  constructor() {
    super("Enterprise identity is required.");
    this.name = "InvalidEnterpriseIdError";
  }
}
