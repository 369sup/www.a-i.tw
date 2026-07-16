import type { VerificationTokenGenerator } from "../../../application/ports/outbound/verification-token-generator";

export class GeneratedVerificationToken implements VerificationTokenGenerator {
  constructor(private readonly generate: () => string) {}

  next() {
    return this.generate();
  }
}
