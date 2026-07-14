export class InvalidSessionIdError extends Error {
  constructor() {
    super("Session ID is required.");
    this.name = "InvalidSessionIdError";
  }
}
