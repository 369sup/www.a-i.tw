import type { SearchResourceType } from "../../domain/search-discovery/entities/search-document";

export type SearchResult = Readonly<{
  id: string;
  type: SearchResourceType;
  title: string;
  href: string;
  ownerLabel: string;
}>;
