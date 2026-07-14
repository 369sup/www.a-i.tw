export class DuplicateWikiPageTitleError extends Error {
  constructor() {
    super("Wiki page title already exists in this Wiki.");
    this.name = "DuplicateWikiPageTitleError";
  }
}
