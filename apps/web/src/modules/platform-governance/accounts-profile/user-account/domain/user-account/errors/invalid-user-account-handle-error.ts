export class InvalidUserAccountHandleError extends Error {
  constructor() {
    super("User Account handle is invalid.");
    this.name = "InvalidUserAccountHandleError";
  }
}
