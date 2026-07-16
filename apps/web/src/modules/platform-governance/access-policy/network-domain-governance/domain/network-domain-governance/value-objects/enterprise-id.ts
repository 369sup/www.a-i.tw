export function createEnterpriseId(input: string): string {
  const value = input.trim();
  if (!value) throw new Error("Enterprise identity is required.");
  return value;
}
