export class InvalidRepositoryUrlError extends Error {
  constructor() {
    super("Repository homepage URL must use HTTP or HTTPS.");
    this.name = "InvalidRepositoryUrlError";
  }
}
