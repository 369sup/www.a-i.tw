export class InvalidTeamIdError extends Error {
  constructor() {
    super("Team id is invalid.");
    this.name = "InvalidTeamIdError";
  }
}
