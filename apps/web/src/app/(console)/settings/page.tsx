import Link from "next/link";
import { Building2, BuildingIcon, ScrollText, Settings2 } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@a-i/shadcn/ui/card";
import { requireConsoleAuthentication } from "../console-session-composition";

const destinations = [
  {
    href: "/settings/organizations",
    title: "Organizations",
    description: "Organization Account 與 membership-scoped 管理入口。",
    icon: Building2,
  },
  {
    href: "/settings/enterprises",
    title: "Enterprises",
    description: "Enterprise governance 與 affiliated Organization 管理入口。",
    icon: BuildingIcon,
  },
  {
    href: "/settings/apps",
    title: "GitHub Apps",
    description: "Personal Account 擁有的 App registration 管理入口。",
    icon: Settings2,
  },
  {
    href: "/settings/audit",
    title: "Audit evidence",
    description: "目前 actor 的 append-only administrative evidence。",
    icon: ScrollText,
  },
] as const;

export default async function SettingsPage() {
  await requireConsoleAuthentication();

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-6 py-10">
      <p className="text-sm text-muted-foreground">Account settings</p>
      <h1 className="mt-1 text-3xl font-semibold">Settings</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
        此頁只導向各自 owner 的設定能力，不建立通用 Settings Domain。
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {destinations.map((destination) => {
          const Icon = destination.icon;
          return (
            <Link href={destination.href} key={destination.href}>
              <Card className="h-full transition-colors hover:bg-muted/40">
                <CardHeader>
                  <Icon className="size-5 text-muted-foreground" />
                  <CardTitle>{destination.title}</CardTitle>
                  <CardDescription>{destination.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
