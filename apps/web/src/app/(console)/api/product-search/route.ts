import { NextResponse } from "next/server";

import { requireAuthentication } from "@/src/presentation/authentication/browser-session";
import { searchProductResources } from "@/src/composition/product-composition";

export async function GET(request: Request) {
  const authentication = await requireAuthentication();
  const query = new URL(request.url).searchParams.get("q")?.trim() ?? "";
  if (!query) return NextResponse.json({ results: [] });
  const results = await searchProductResources(query, authentication.principal);
  return NextResponse.json({ results });
}
