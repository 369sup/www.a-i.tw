import type { SocialCurationPrincipal } from "../inbound/social-curation-principal";

export interface RepositoryStarParticipation {
  canRead(input: {
    repositoryId: string;
    principal: SocialCurationPrincipal;
  }): Promise<boolean>;
}
