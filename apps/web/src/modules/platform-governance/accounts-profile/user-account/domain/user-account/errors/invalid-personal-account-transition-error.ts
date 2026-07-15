export class InvalidPersonalAccountTransitionError extends Error {
  constructor(from: string, to: string) {
    super(`Personal Account cannot transition from ${from} to ${to}.`);
    this.name = "InvalidPersonalAccountTransitionError";
  }
}
