import Link from "next/link";
import { Button } from "@a-i/shadcn/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@a-i/shadcn/ui/card";

export default function ForgotPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 p-6">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>忘記密碼</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Password recovery 尚未具備 reset token、期限、一次性消耗與通知
            delivery 能力，因此現在不會收集 Email 或顯示虛假的寄送結果。
          </p>
          <Button asChild className="mt-6" variant="outline">
            <Link href="/sign-in">回到登入</Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
