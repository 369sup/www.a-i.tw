export class InvalidAuthenticationMethodError extends Error {
  constructor() {
    super("Authentication method is invalid.");
    this.name = "InvalidAuthenticationMethodError";
  }
}
