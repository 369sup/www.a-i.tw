export class InvalidRepositoryIdError extends Error {
  constructor() {
    super("Repository id must not be empty.");
    this.name = "InvalidRepositoryIdError";
  }
}
