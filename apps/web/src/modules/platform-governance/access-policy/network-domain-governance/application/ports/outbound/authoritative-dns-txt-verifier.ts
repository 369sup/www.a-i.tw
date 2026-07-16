export type DnsTxtVerificationResult =
  "matched" | "missing" | "mismatched" | "unavailable";

export interface AuthoritativeDnsTxtVerifier {
  verify(
    recordName: string,
    expectedValue: string,
  ): Promise<DnsTxtVerificationResult>;
}
