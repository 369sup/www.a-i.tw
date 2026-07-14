import type { AccountPrincipal } from "../../ports/inbound/account-principal";

export type CreateAccountCommand = Readonly<{
  principal: AccountPrincipal;
  handle: string;
  displayName: string;
  kind: "organization";
}>;
