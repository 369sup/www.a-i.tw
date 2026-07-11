export type PrincipalStatus = "active" | "disabled";

export type Principal = Readonly<{
  id: string;
  handle: string;
  displayName: string;
  status: PrincipalStatus;
}>;

export function assertCanAuthenticate(principal: Principal): void {
  if (principal.status !== "active") {
    throw new Error("Disabled principals cannot authenticate.");
  }
}
