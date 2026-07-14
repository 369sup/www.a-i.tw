export class InvalidAuthenticationAssuranceError extends Error {
  constructor() {
    super("Authentication assurance is invalid.");
    this.name = "InvalidAuthenticationAssuranceError";
  }
}
