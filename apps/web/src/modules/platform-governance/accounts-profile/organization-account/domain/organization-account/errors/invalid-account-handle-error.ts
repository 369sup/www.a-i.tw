export class InvalidAccountHandleError extends Error {
  constructor() {
    super(
      "Account handle must contain 1-39 lowercase letters, numbers, or single hyphens.",
    );
    this.name = "InvalidAccountHandleError";
  }
}
