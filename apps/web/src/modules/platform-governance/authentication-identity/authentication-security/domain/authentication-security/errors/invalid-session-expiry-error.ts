export class InvalidSessionExpiryError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidSessionExpiryError";
  }
}
