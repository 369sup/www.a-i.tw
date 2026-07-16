import type { RepositoryWikiPrincipal } from "../../../application/ports/inbound/repository-wiki-principal";
import type { KnowledgeWikiService } from "../../../application/use-cases/repository-wiki-service";

function requiredValue(formData: FormData, key: string) {
  const value = String(formData.get(key) ?? "").trim();
  if (!value) throw new Error(`${key} is required.`);
  return value;
}

export function createWikiPageFromForm(
  wiki: KnowledgeWikiService,
  principal: RepositoryWikiPrincipal,
  formData: FormData,
) {
  return wiki.createPage({
    repositoryId: requiredValue(formData, "repositoryId"),
    pageId: requiredValue(formData, "pageId"),
    title: requiredValue(formData, "title"),
    content: requiredValue(formData, "content"),
    principal,
  });
}
