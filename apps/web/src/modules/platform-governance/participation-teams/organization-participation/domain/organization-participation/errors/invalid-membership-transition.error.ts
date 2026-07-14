export class InvalidMembershipTransitionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidMembershipTransitionError";
  }
}
