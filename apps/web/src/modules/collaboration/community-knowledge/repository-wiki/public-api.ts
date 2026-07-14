// Export only app-facing Application facades. Peer Contexts use contracts/<version>/public.ts.
export { createKnowledgeWikiComposition } from "./composition";
export type { KnowledgeWikiApiV1, WikiPageV1 } from "./contracts/v1/public";
