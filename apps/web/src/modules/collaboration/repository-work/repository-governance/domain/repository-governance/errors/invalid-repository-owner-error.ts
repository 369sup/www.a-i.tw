export class InvalidRepositoryOwnerError extends Error {
  constructor() {
    super(
      "Repository owner requires an Account id, login, and supported Account kind.",
    );
    this.name = "InvalidRepositoryOwnerError";
  }
}
