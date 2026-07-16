import { InvalidDnsTxtChallengeError } from "../errors/invalid-dns-txt-challenge-error";
import type { EnterpriseDomainName } from "./enterprise-domain-name";

export type DnsTxtChallenge = Readonly<{
  recordName: string;
  expectedValue: string;
}>;

export function createDnsTxtChallenge(
  domainName: EnterpriseDomainName,
  token: string,
): DnsTxtChallenge {
  const expectedValue = token.trim();
  if (!expectedValue) throw new InvalidDnsTxtChallengeError();

  return {
    recordName: `_a-i-domain-verification.${domainName}`,
    expectedValue,
  };
}
