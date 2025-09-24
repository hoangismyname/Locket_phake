import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { SettingsSubHeader } from "@/components/settings-sub-header"
import { NotificationSettings } from "@/components/notification-settings"

export default async function NotificationSettingsPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  return (
    <div className="min-h-screen bg-background">
      <SettingsSubHeader title="Notifications" />

      <main className="max-w-md mx-auto p-4">
        <NotificationSettings />
      </main>
    </div>
  )
}
