import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
      <div className="text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-purple-600 dark:text-purple-400">Locket</h1>
          <p className="text-xl text-muted-foreground max-w-md mx-auto">
            Share spontaneous moments with your closest friends. Real photos, real connections.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700">
            <Link href="/auth/signup">Get Started</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/auth/login">Sign In</Link>
          </Button>
        </div>

        <div className="text-sm text-muted-foreground">Join thousands sharing authentic moments</div>
      </div>
    </div>
  )
}
