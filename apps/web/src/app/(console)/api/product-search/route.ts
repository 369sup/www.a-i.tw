import { NextResponse } from "next/server";

import { requireConsoleAuthentication } from "@/src/app/(console)/console-session-composition";
import { searchProductResources } from "@/src/composition/product-composition";

export async function GET(request: Request) {
  const authentication = await requireConsoleAuthentication();
  const query = new URL(request.url).searchParams.get("q")?.trim() ?? "";
  if (!query) return NextResponse.json({ results: [] });
  const results = await searchProductResources(query, authentication.principal);
  return NextResponse.json({ results });
}
