import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function VerifyEmailPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">Locket</h1>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Check your email</CardTitle>
              <CardDescription>We&apos;ve sent you a verification link</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Please check your email and click the verification link to activate your account. Once verified, you can
                sign in and start sharing moments with friends!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
