export class InvalidDnsTxtChallengeError extends Error {
  constructor() {
    super("A DNS TXT verification token is required.");
    this.name = "InvalidDnsTxtChallengeError";
  }
}
