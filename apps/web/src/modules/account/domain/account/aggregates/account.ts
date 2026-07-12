export type AccountStatus = "active" | "suspended";

type AccountBase = Readonly<{
  id: string;
  handle: string;
  status: AccountStatus;
}>;

export type PersonalAccount = AccountBase &
  Readonly<{
    kind: "personal";
    principalId: string;
  }>;

export type Organization = AccountBase &
  Readonly<{
    kind: "organization";
  }>;

export type Account = PersonalAccount | Organization;
export type AccountKind = Account["kind"];

export function normalizeHandle(value: string): string {
  const handle = value.trim().toLowerCase();
  if (!/^[a-z0-9](?:[a-z0-9-]{0,37}[a-z0-9])?$/.test(handle))
    throw new Error(
      "Account handle must use letters, numbers, or single hyphens.",
    );
  return handle;
}

export function createPersonalAccount(input: {
  id: string;
  handle: string;
  principalId: string;
}): PersonalAccount {
  if (!input.principalId)
    throw new Error("Personal Account principal is required.");
  return {
    id: input.id,
    handle: normalizeHandle(input.handle),
    principalId: input.principalId,
    kind: "personal",
    status: "active",
  };
}

export function createOrganization(input: {
  id: string;
  handle: string;
}): Organization {
  return {
    id: input.id,
    handle: normalizeHandle(input.handle),
    kind: "organization",
    status: "active",
  };
}
