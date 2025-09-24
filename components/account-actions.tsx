"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { LogOut, Shield, HelpCircle } from "lucide-react"

export function AccountActions() {
  const router = useRouter()

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Privacy & Security</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button variant="ghost" className="w-full justify-start" disabled>
            <Shield className="h-4 w-4 mr-2" />
            Privacy Settings
          </Button>
          <Button variant="ghost" className="w-full justify-start" disabled>
            <HelpCircle className="h-4 w-4 mr-2" />
            Help & Support
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <Button variant="destructive" className="w-full" onClick={handleSignOut}>
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
