export class InvalidPrincipalReferenceError extends Error {
  constructor() {
    super("User Account principal is required.");
    this.name = "InvalidPrincipalReferenceError";
  }
}
