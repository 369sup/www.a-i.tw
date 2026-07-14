"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Badge } from "@a-i/shadcn/ui/badge";
import { Button } from "@a-i/shadcn/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@a-i/shadcn/ui/command";
import { Kbd } from "@a-i/shadcn/ui/kbd";

type SearchResult = Readonly<{
  type: string;
  id: string;
  href: string;
  title: string;
  ownerLabel: string;
}>;

export function ProductSearch({ endpoint }: Readonly<{ endpoint: string }>) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState<{
    query: string;
    results: readonly SearchResult[];
  }>({ query: "", results: [] });

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (
        !(
          (event.key === "k" && (event.metaKey || event.ctrlKey)) ||
          event.key === "/"
        ) ||
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
      ) {
        return;
      }
      event.preventDefault();
      setOpen(true);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const requestedQuery = query.trim();
    if (!open || !requestedQuery) return;

    const controller = new AbortController();
    const timeout = window.setTimeout(async () => {
      try {
        const result = await fetch(
          `${endpoint}?q=${encodeURIComponent(requestedQuery)}`,
          { signal: controller.signal },
        );
        if (!result.ok) {
          setResponse({ query: requestedQuery, results: [] });
          return;
        }
        const body = (await result.json()) as {
          results: readonly SearchResult[];
        };
        setResponse({ query: requestedQuery, results: body.results });
      } catch (error) {
        if (!(error instanceof DOMException && error.name === "AbortError")) {
          setResponse({ query: requestedQuery, results: [] });
        }
      }
    }, 150);

    return () => {
      controller.abort();
      window.clearTimeout(timeout);
    };
  }, [endpoint, open, query]);

  const results = response.query === query.trim() ? response.results : [];

  return (
    <>
      <Button
        className="hidden w-56 justify-start lg:flex"
        onClick={() => setOpen(true)}
        size="sm"
        variant="outline"
      >
        <Search data-icon="inline-start" />
        <span className="flex-1 text-left">Search products</span>
        <Kbd>Ctrl K</Kbd>
      </Button>
      <CommandDialog
        description="Search accessible product resources"
        onOpenChange={setOpen}
        open={open}
        title="Product search"
      >
        <CommandInput
          onValueChange={setQuery}
          placeholder="Search accounts, repositories, issues, projects, discussions…"
          value={query}
        />
        <CommandList>
          <CommandEmpty>
            {query
              ? "No accessible resources found."
              : "Start typing to search."}
          </CommandEmpty>
          <CommandGroup heading="Results">
            {results.map((result) => (
              <CommandItem
                key={`${result.type}:${result.id}`}
                onSelect={() => {
                  setOpen(false);
                  router.push(result.href as never);
                }}
                value={`${result.title} ${result.ownerLabel}`}
              >
                <Badge variant="secondary">{result.type}</Badge>
                <span className="min-w-0 flex-1 truncate">{result.title}</span>
                <span className="truncate text-xs text-muted-foreground">
                  {result.ownerLabel}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
