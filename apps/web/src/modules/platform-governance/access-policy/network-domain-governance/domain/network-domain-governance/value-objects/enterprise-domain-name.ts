import { InvalidEnterpriseDomainNameError } from "../errors/invalid-enterprise-domain-name-error";

declare const enterpriseDomainNameBrand: unique symbol;
export type EnterpriseDomainName = string & {
  readonly [enterpriseDomainNameBrand]: true;
};

const dnsLabel = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/;

export function createEnterpriseDomainName(
  input: string,
): EnterpriseDomainName {
  const trimmed = input.trim();
  const value = (
    trimmed.endsWith(".") ? trimmed.slice(0, -1) : trimmed
  ).toLowerCase();
  const labels = value.split(".");

  if (
    value.length > 253 ||
    labels.length < 2 ||
    labels.some((label) => !dnsLabel.test(label))
  ) {
    throw new InvalidEnterpriseDomainNameError();
  }

  return value as EnterpriseDomainName;
}
