export class InvalidRepositoryAccessGrantError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidRepositoryAccessGrantError";
  }
}
