export class InvalidProfileBioError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidProfileBioError";
  }
}
