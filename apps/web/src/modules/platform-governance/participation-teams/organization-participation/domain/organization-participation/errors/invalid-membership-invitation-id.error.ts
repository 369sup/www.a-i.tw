export class InvalidMembershipInvitationIdError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidMembershipInvitationIdError";
  }
}
