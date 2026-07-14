export class InvalidInteractionLimitError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidInteractionLimitError";
  }
}
