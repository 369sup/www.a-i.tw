export class InvalidEnterpriseDomainNameError extends Error {
  constructor() {
    super("A valid Enterprise domain name is required.");
    this.name = "InvalidEnterpriseDomainNameError";
  }
}
