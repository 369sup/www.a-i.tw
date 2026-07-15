export class InvalidWikiPageError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidWikiPageError";
  }
}
