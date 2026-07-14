// Export only deliberate, versioned Published Language. Never expose Context internals.
export type WikiPageV1 = Readonly<{
  pageId: string;
  title: string;
  content: string;
  publicationState: "published";
}>;

export interface KnowledgeWikiApiV1 {
  createPage(input: {
    repositoryId: string;
    pageId: string;
    title: string;
    content: string;
    principal: Readonly<{
      principalId: string;
      status: "active" | "disabled";
    }>;
  }): Promise<WikiPageV1>;
  getPage(input: {
    repositoryId: string;
    pageId: string;
    principal: Readonly<{
      principalId: string;
      status: "active" | "disabled";
    }>;
  }): Promise<WikiPageV1 | undefined>;
}
