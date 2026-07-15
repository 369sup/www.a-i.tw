export class InvalidDiscussionValueError extends Error {
  constructor(field: string) {
    super(`Invalid Discussion ${field}.`);
    this.name = "InvalidDiscussionValueError";
  }
}
