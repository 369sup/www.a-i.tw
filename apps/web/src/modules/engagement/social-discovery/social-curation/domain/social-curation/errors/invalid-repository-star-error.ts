export class InvalidRepositoryStarError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidRepositoryStarError";
  }
}
