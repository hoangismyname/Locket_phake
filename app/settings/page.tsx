import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { SettingsHeader } from "@/components/settings-header"
import { SettingsMenu } from "@/components/settings-menu"

export default async function SettingsPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  // Get user profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", data.user.id).single()

  return (
    <div className="min-h-screen bg-background">
      <SettingsHeader />

      <main className="max-w-md mx-auto">
        <SettingsMenu user={data.user} profile={profile} />
      </main>
    </div>
  )
}
