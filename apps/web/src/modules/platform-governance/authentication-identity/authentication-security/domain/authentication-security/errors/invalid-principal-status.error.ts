export class InvalidPrincipalStatusError extends Error {
  constructor() {
    super("Principal status is invalid.");
    this.name = "InvalidPrincipalStatusError";
  }
}
