export class EnterpriseNotFoundError extends Error {
  constructor() {
    super("Enterprise not found.");
    this.name = "EnterpriseNotFoundError";
  }
}
