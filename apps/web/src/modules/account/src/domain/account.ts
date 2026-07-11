export type AccountKind = "personal" | "organization";
export type AccountStatus = "active" | "suspended";

export type Account = Readonly<{
  id: string;
  handle: string;
  displayName: string;
  kind: AccountKind;
  status: AccountStatus;
  ownerPrincipalId: string;
}>;

export function normalizeHandle(value: string): string {
  const handle = value.trim().toLowerCase();
  if (!/^[a-z0-9](?:[a-z0-9-]{0,37}[a-z0-9])?$/.test(handle)) {
    throw new Error(
      "Account handle must use letters, numbers, or single hyphens.",
    );
  }
  return handle;
}

export function createAccount(
  input: Omit<Account, "handle" | "status"> & { handle: string },
): Account {
  const displayName = input.displayName.trim();
  if (!displayName) throw new Error("Account display name is required.");
  return {
    ...input,
    displayName,
    handle: normalizeHandle(input.handle),
    status: "active",
  };
}
