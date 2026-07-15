export class InvalidUserAccountIdError extends Error {
  constructor() {
    super("User Account id is required.");
    this.name = "InvalidUserAccountIdError";
  }
}
