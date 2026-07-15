export class InvalidPrincipalIdError extends Error {
  constructor(message = "Principal ID is required.") {
    super(message);
    this.name = "InvalidPrincipalIdError";
  }
}
