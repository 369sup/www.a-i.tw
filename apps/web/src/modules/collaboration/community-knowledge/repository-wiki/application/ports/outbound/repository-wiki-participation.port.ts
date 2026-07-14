import type { RepositoryWikiPrincipal } from "../inbound/repository-wiki-principal";

export type RepositoryWikiScope = Readonly<{
  repositoryId: string;
  status: "active" | "archived" | "disabled";
  wikiEnabled: boolean;
}>;

export interface RepositoryWikiParticipation {
  scope(repositoryId: string): Promise<RepositoryWikiScope | undefined>;
  allowed(input: {
    repositoryId: string;
    principal: RepositoryWikiPrincipal;
    action: "read" | "write";
  }): Promise<boolean>;
}
