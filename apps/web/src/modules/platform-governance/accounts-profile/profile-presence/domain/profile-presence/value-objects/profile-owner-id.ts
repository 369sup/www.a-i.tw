export type ProfileOwnerId = string & { readonly __brand: "ProfileOwnerId" };

export function createProfileOwnerId(value: string): ProfileOwnerId {
  const id = value.trim();
  if (!id) throw new Error("Profile owner ID is required.");
  return id as ProfileOwnerId;
}
