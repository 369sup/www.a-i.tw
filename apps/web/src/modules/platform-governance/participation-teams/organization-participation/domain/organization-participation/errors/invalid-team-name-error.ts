export class InvalidTeamNameError extends Error {
  constructor() {
    super("Team name is invalid.");
    this.name = "InvalidTeamNameError";
  }
}
