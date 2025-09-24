import { SettingsSubHeader } from "@/components/settings-sub-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <SettingsSubHeader title="About" />

      <main className="max-w-md mx-auto p-4 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-purple-600 dark:text-purple-400">Locket</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <div>
              <p className="text-sm text-muted-foreground">Version</p>
              <p className="font-semibold">1.0.0</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Built with</p>
              <p className="font-semibold">Next.js & Supabase</p>
            </div>

            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                Share spontaneous moments with your closest friends. Real photos, real connections.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Legal</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-sm">
              <p className="font-medium">Terms of Service</p>
              <p className="text-muted-foreground">Last updated: January 2025</p>
            </div>
            <div className="text-sm">
              <p className="font-medium">Privacy Policy</p>
              <p className="text-muted-foreground">Last updated: January 2025</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
