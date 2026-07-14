export class InvalidMembershipInvitationExpiryError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidMembershipInvitationExpiryError";
  }
}
