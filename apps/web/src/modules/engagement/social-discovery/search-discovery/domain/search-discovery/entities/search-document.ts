import { InvalidSearchDocumentError } from "../errors/invalid-search-document-error";
import type { SearchQuery } from "../value-objects/search-query";

export const searchResourceTypes = [
  "account",
  "repository",
  "issue",
  "project",
  "discussion",
] as const;

export type SearchResourceType = (typeof searchResourceTypes)[number];

export type SearchDocumentProjection = Readonly<{
  documentId: string;
  resourceId: string;
  resourceType: SearchResourceType;
  title: string;
  body: string;
  href: string;
  ownerLabel: string;
  searchableText: string;
}>;

export type SearchDocumentInput = Readonly<{
  resourceId: string;
  resourceType: SearchResourceType;
  title: string;
  body?: string;
  href: string;
  ownerLabel: string;
}>;

export function createSearchDocument(
  input: SearchDocumentInput,
): SearchDocumentProjection {
  const resourceId = input.resourceId.trim();
  const title = input.title.trim();
  const href = input.href.trim();
  const ownerLabel = input.ownerLabel.trim();
  const body = input.body?.trim() ?? "";
  if (!resourceId)
    throw new InvalidSearchDocumentError(
      "Search Document resource identity must not be empty.",
    );
  if (!searchResourceTypes.includes(input.resourceType))
    throw new InvalidSearchDocumentError(
      "Search Document resource type is not supported.",
    );
  if (!title)
    throw new InvalidSearchDocumentError(
      "Search Document title must not be empty.",
    );
  if (!href.startsWith("/"))
    throw new InvalidSearchDocumentError(
      "Search Document href must be an application-relative path.",
    );
  if (!ownerLabel)
    throw new InvalidSearchDocumentError(
      "Search Document owner label must not be empty.",
    );
  return {
    documentId: `${input.resourceType}:${resourceId}`,
    resourceId,
    resourceType: input.resourceType,
    title,
    body,
    href,
    ownerLabel,
    searchableText: `${title} ${body} ${ownerLabel}`.toLocaleLowerCase(),
  };
}

export function matchesSearch(
  document: SearchDocumentProjection,
  query: SearchQuery,
): boolean {
  return document.searchableText.includes(query.comparisonText);
}
