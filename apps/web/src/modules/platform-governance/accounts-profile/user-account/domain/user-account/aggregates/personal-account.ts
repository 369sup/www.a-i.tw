export type PersonalAccount = Readonly<{
  id: string;
  handle: string;
  principalId: string;
  status: "active" | "suspended";
}>;

export function createPersonalAccount(input: {
  id: string;
  handle: string;
  principalId: string;
}): PersonalAccount {
  const id = input.id.trim();
  const handle = input.handle.trim().toLowerCase();
  if (!id) throw new Error("Personal Account id is required.");
  if (!/^[a-z0-9](?:[a-z0-9-]{0,37}[a-z0-9])?$/.test(handle))
    throw new Error("Personal Account handle is invalid.");
  if (!input.principalId.trim())
    throw new Error("Personal Account principal is required.");
  return { id, handle, principalId: input.principalId, status: "active" };
}
