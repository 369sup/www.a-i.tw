export type PrincipalStatus = "active" | "disabled";

export type Principal = Readonly<{
  id: string;
  kind: "user" | "app";
  status: PrincipalStatus;
}>;

export function assertCanAuthenticate(principal: Principal): void {
  if (principal.status !== "active") {
    throw new Error("Disabled principals cannot authenticate.");
  }
}
