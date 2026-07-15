import Link from "next/link";
import { Button } from "@a-i/shadcn/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@a-i/shadcn/ui/card";

export default function ResetPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 p-6">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>重設密碼</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            尚未啟用可驗證且一次性使用的 password reset challenge。本頁保留
            recovery 入口，但不接受或消耗未受 Domain 規則保護的 token。
          </p>
          <Button asChild className="mt-6" variant="outline">
            <Link href="/forgot-password">返回復原說明</Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
