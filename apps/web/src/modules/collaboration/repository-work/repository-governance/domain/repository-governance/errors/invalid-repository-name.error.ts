export class InvalidRepositoryNameError extends Error {
  constructor() {
    super(
      "Repository name must contain 1-100 letters, numbers, dots, hyphens, or underscores.",
    );
    this.name = "InvalidRepositoryNameError";
  }
}
