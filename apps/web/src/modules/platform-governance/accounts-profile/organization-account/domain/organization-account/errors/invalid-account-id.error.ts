export class InvalidAccountIdError extends Error {
  constructor() {
    super("Account identity is required.");
    this.name = "InvalidAccountIdError";
  }
}
