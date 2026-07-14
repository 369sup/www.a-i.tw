export class InvalidProfileWebsiteError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidProfileWebsiteError";
  }
}
