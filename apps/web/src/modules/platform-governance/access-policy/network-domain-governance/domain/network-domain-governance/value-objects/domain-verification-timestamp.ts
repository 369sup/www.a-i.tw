export function createDomainVerificationTimestamp(input: string): string {
  if (!input || Number.isNaN(Date.parse(input))) {
    throw new Error("A valid domain verification timestamp is required.");
  }
  return input;
}
