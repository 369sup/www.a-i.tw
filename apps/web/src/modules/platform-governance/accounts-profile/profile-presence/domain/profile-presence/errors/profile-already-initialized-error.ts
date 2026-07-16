export class ProfileAlreadyInitializedError extends Error {
  constructor() {
    super("Profile is already initialized with different presentation data.");
    this.name = "ProfileAlreadyInitializedError";
  }
}
