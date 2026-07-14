export class InvalidMembershipIdError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidMembershipIdError";
  }
}
