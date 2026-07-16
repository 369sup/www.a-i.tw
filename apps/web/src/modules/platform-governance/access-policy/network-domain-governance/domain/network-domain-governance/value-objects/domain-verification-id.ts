export function createDomainVerificationId(input: string): string {
  const value = input.trim();
  if (!value) throw new Error("Domain verification identity is required.");
  return value;
}
