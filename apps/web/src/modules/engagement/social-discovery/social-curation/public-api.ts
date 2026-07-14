// Export only app-facing Application facades. Peer Contexts use contracts/<version>/public.ts.
export {
  createRepositoryStarParticipationAdapter,
  createSocialCurationComposition,
} from "./composition";
export type {
  RepositoryStarV1,
  SocialCurationApiV1,
  SocialCurationPrincipalV1,
} from "./contracts/v1/public";
