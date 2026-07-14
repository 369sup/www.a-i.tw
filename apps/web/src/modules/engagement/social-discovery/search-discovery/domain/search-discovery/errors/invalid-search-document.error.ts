export class InvalidSearchDocumentError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidSearchDocumentError";
  }
}
