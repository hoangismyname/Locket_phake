import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { EditProfileForm } from "@/components/edit-profile-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default async function EditProfilePage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  // Get user profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", data.user.id).single()

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="max-w-md mx-auto flex items-center justify-between p-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/profile">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="font-semibold">Edit Profile</h1>
          <div className="w-9" /> {/* Spacer */}
        </div>
      </header>

      <main className="max-w-md mx-auto p-4">
        <EditProfileForm profile={profile} userId={data.user.id} />
      </main>
    </div>
  )
}
