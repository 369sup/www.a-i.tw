"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Button } from "@a-i/shadcn/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@a-i/shadcn/ui/command";

type SearchResult = Readonly<{
  id: string;
  type: "account" | "repository" | "issue" | "project" | "discussion";
  title: string;
  href: string;
  ownerLabel: string;
}>;

export function ProductSearch() {
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
        (event.key === "k" && (event.metaKey || event.ctrlKey)) ||
        event.key === "/"
      ) {
        if (
          event.target instanceof HTMLInputElement ||
          event.target instanceof HTMLTextAreaElement
        )
          return;
        event.preventDefault();
        setOpen(true);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!open || !query.trim()) return;
    const requestedQuery = query.trim();
    const controller = new AbortController();
    const timeout = window.setTimeout(async () => {
      try {
        const result = await fetch(
          `/api/product-search?q=${encodeURIComponent(requestedQuery)}`,
          { signal: controller.signal },
        );
        if (result.ok)
          setResponse({
            query: requestedQuery,
            results: (await result.json()).results,
          });
      } catch (error) {
        if (!(error instanceof DOMException && error.name === "AbortError"))
          throw error;
      }
    }, 150);
    return () => {
      controller.abort();
      window.clearTimeout(timeout);
    };
  }, [open, query]);

  const results = response.query === query.trim() ? response.results : [];

  return (
    <>
      <Button
        className="hidden w-56 justify-start text-muted-foreground lg:flex"
        onClick={() => setOpen(true)}
        size="sm"
        variant="outline"
      >
        <Search className="size-4" />
        <span className="flex-1 text-left">Search products</span>
        <kbd className="font-mono text-[10px]">Ctrl K</kbd>
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
                <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] uppercase">
                  {result.type}
                </span>
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
