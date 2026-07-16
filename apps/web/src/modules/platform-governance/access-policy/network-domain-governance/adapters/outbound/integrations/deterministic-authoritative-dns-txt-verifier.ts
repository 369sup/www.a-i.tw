import type {
  AuthoritativeDnsTxtVerifier,
  DnsTxtVerificationResult,
} from "../../../application/ports/outbound/authoritative-dns-txt-verifier";

export class DeterministicAuthoritativeDnsTxtVerifier implements AuthoritativeDnsTxtVerifier {
  constructor(private readonly result: DnsTxtVerificationResult = "matched") {}

  async verify() {
    return this.result;
  }
}
