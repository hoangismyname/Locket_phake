import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AccountHeader } from "@/components/account-header"
import { AccountInfo } from "@/components/account-info"
import { AccountActions } from "@/components/account-actions"

export default async function AccountPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  // Get user profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", data.user.id).single()

  return (
    <div className="min-h-screen bg-background">
      <AccountHeader />

      <main className="max-w-md mx-auto p-4 space-y-6">
        <AccountInfo user={data.user} profile={profile} />
        <AccountActions />
      </main>
    </div>
  )
}
