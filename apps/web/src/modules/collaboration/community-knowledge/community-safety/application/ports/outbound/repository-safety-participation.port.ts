import type { CommunitySafetyPrincipal } from "../inbound/community-safety-principal";

export interface RepositorySafetyParticipation {
  scope(repositoryId: string): Promise<
    | Readonly<{
        repositoryId: string;
        visibility: "public" | "private" | "internal";
        status: "active" | "archived" | "disabled";
      }>
    | undefined
  >;
  allowed(input: {
    repositoryId: string;
    principal: CommunitySafetyPrincipal;
    action: "manage" | "interact";
  }): Promise<boolean>;
}
