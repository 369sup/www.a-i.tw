export class InvalidProfileDisplayNameError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidProfileDisplayNameError";
  }
}
