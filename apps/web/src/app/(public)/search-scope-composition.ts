import { searchProductResources } from "@/src/composition/product-composition";
import { docsSource } from "./docs/docs-source-composition";
import { currentPublicAuthentication } from "./public-session-composition";

export interface ScopedSearchResult {
  id: string;
  type: string;
  title: string;
  href: string;
  ownerLabel: string;
}

export async function searchForCurrentSession(query: string) {
  const normalizedQuery = query.trim();
  const authentication = await currentPublicAuthentication();

  if (authentication) {
    return {
      scope: "authenticated-product" as const,
      results: normalizedQuery
        ? await searchProductResources(
            normalizedQuery,
            authentication.principal,
          )
        : [],
    };
  }

  const comparisonQuery = normalizedQuery.toLocaleLowerCase();
  const results: ScopedSearchResult[] = comparisonQuery
    ? docsSource
        .getPages()
        .filter((page) =>
          `${page.data.title} ${page.data.description ?? ""}`
            .toLocaleLowerCase()
            .includes(comparisonQuery),
        )
        .slice(0, 20)
        .map((page) => ({
          id: page.url,
          type: "documentation",
          title: page.data.title,
          href: page.url,
          ownerLabel: "Public documentation",
        }))
    : [];

  return { scope: "public-documentation" as const, results };
}
