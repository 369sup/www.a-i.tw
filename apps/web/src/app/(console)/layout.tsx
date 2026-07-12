import type { ReactNode } from "react";
import { requireAuthentication } from "@/src/server/auth/session";

export default async function ConsoleLayout({
  children,
}: {
  children: ReactNode;
}) {
  await requireAuthentication();
  return children;
}
