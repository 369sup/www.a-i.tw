// Export only deliberate, versioned Published Language. Never expose Context internals.
export type RepositoryStarV1 = Readonly<{
  principalId: string;
  repositoryId: string;
  starredAt: string;
}>;

export type SocialCurationPrincipalV1 = Readonly<{
  principalId: string;
  status: "active" | "disabled";
}>;

export interface SocialCurationApiV1 {
  star(input: {
    repositoryId: string;
    principal: SocialCurationPrincipalV1;
  }): Promise<RepositoryStarV1>;
  unstar(input: {
    repositoryId: string;
    principal: SocialCurationPrincipalV1;
  }): Promise<void>;
  isStarred(input: {
    repositoryId: string;
    principal: SocialCurationPrincipalV1;
  }): Promise<boolean>;
  list(
    principal: SocialCurationPrincipalV1,
  ): Promise<readonly RepositoryStarV1[]>;
}
