import type { User } from "@supabase/supabase-js"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface AccountInfoProps {
  user: User
  profile: any
}

export function AccountInfo({ user, profile }: AccountInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={profile?.avatar_url || "/placeholder.svg"} />
            <AvatarFallback className="text-lg">{profile?.display_name?.[0] || user.email?.[0] || "U"}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">{profile?.display_name || "User"}</h3>
            <p className="text-sm text-muted-foreground">@{profile?.username || "username"}</p>
          </div>
        </div>

        <div className="space-y-2">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Email</label>
            <p className="text-sm">{user.email}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Member since</label>
            <p className="text-sm">{new Date(user.created_at).toLocaleDateString()}</p>
          </div>
          {profile?.bio && (
            <div>
              <label className="text-sm font-medium text-muted-foreground">Bio</label>
              <p className="text-sm">{profile.bio}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
