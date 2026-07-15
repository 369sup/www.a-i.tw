export class InvalidPrincipalKindError extends Error {
  constructor() {
    super("Principal kind is invalid.");
    this.name = "InvalidPrincipalKindError";
  }
}
