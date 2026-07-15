import Link from "next/link";
import { Button } from "@a-i/shadcn/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@a-i/shadcn/ui/card";

export default function SignUpPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 p-6">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>建立個人帳號</CardTitle>
          <CardDescription>Registration delivery foundation</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            目前的 Identity 能力只支援既有 Principal 登入，尚未提供 credential
            registration。此頁不會建立無法登入的 Account，也不會模擬註冊成功。
          </p>
          <Button asChild className="mt-6">
            <Link href="/sign-in">前往登入</Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
