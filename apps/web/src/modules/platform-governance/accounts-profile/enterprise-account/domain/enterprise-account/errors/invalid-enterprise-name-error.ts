export class InvalidEnterpriseNameError extends Error {
  constructor() {
    super("Enterprise name is required.");
    this.name = "InvalidEnterpriseNameError";
  }
}
