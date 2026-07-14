import Link from "next/link";
import {
  Archive,
  Building2,
  Check,
  ChevronRight,
  Eye,
  FolderGit2,
  KeyRound,
  LockKeyhole,
  Plus,
  ShieldCheck,
  UserRound,
} from "lucide-react";

export const fieldClass =
  "h-9 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring";
export const buttonClass =
  "inline-flex h-9 items-center justify-center gap-2 rounded-md bg-foreground px-3 text-sm font-medium text-background hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring";
export const quietButtonClass =
  "inline-flex h-9 items-center justify-center gap-2 rounded-md border bg-background px-3 text-sm font-medium hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring";

export function RepositoryManagementPanelHeading({
  icon,
  title,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex h-14 items-center justify-between border-b px-4">
      <div className="flex min-w-0 items-center gap-2 text-sm font-semibold">
        {icon}
        <span className="truncate">{title}</span>
      </div>
      {action}
    </div>
  );
}

export function AccountKindIcon({
  kind,
}: {
  kind: "personal" | "organization";
}) {
  return kind === "organization" ? (
    <Building2 className="size-4" />
  ) : (
    <UserRound className="size-4" />
  );
}

export function RepositoryVisibilityIcon({
  visibility,
}: {
  visibility: "public" | "private" | "internal";
}) {
  return visibility === "public" ? (
    <Eye className="size-3.5" />
  ) : (
    <LockKeyhole className="size-3.5" />
  );
}

export function RepositoryEmptyState({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center px-6 text-center">
      <FolderGit2 className="mb-3 size-8 text-muted-foreground" />
      <p className="text-sm font-medium">{title}</p>
      <p className="mt-1 max-w-64 text-sm text-muted-foreground">{body}</p>
    </div>
  );
}

export function RepositoryDecisionMark({ allowed }: { allowed: boolean }) {
  return allowed ? (
    <Check className="size-4 text-emerald-600" />
  ) : (
    <KeyRound className="size-4 text-rose-600" />
  );
}

export { Archive, ChevronRight, Plus, ShieldCheck, Link };
