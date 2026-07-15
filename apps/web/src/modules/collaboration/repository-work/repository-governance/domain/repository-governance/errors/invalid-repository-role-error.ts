export class InvalidRepositoryRoleError extends Error {
  constructor() {
    super("Repository Role must be read, triage, write, maintain, or admin.");
    this.name = "InvalidRepositoryRoleError";
  }
}
