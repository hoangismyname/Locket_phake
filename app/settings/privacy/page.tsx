import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { SettingsSubHeader } from "@/components/settings-sub-header"
import { PrivacySettings } from "@/components/privacy-settings"

export default async function PrivacySettingsPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  return (
    <div className="min-h-screen bg-background">
      <SettingsSubHeader title="Privacy & Security" />

      <main className="max-w-md mx-auto p-4">
        <PrivacySettings />
      </main>
    </div>
  )
}
