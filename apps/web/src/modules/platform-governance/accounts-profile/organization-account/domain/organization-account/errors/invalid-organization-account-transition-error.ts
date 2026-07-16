export class InvalidOrganizationAccountTransitionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidOrganizationAccountTransitionError";
  }
}
