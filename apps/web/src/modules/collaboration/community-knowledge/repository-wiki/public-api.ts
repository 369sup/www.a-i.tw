// Export only app-facing Application facades. Peer Contexts use contracts/<version>/public.ts.
export { createWikiPageFromForm } from "./adapters/inbound/server-actions/create-wiki-page";
export { RepositoryWikiUi } from "./adapters/inbound/ui/repository-wiki-ui";
export { createKnowledgeWikiComposition } from "./composition";
export type { KnowledgeWikiApiV1, WikiPageV1 } from "./contracts/v1/public";
