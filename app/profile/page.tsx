import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { ProfileHeader } from "@/components/profile-header"
import { ProfileStats } from "@/components/profile-stats"
import { ProfilePosts } from "@/components/profile-posts"
import { ShareProfileButton } from "@/components/share-profile-button"
import { Button } from "@/components/ui/button"
import { Edit3 } from "lucide-react"
import Link from "next/link"

export default async function ProfilePage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  // Get user profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", data.user.id).single()

  // Get user's posts
  const { data: posts } = await supabase
    .from("posts")
    .select(`
      *,
      likes (count),
      comments (count)
    `)
    .eq("user_id", data.user.id)
    .order("created_at", { ascending: false })

  // Get stats
  const { count: postsCount } = await supabase
    .from("posts")
    .select("*", { count: "exact", head: true })
    .eq("user_id", data.user.id)

  const { count: followersCount } = await supabase
    .from("follows")
    .select("*", { count: "exact", head: true })
    .eq("following_id", data.user.id)

  const { count: followingCount } = await supabase
    .from("follows")
    .select("*", { count: "exact", head: true })
    .eq("follower_id", data.user.id)

  return (
    <div className="min-h-screen bg-background">
      <ProfileHeader />

      <main className="max-w-md mx-auto">
        <div className="p-4 space-y-6">
          {/* Profile Info */}
          <div className="text-center space-y-4">
            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-2xl font-bold">
              {profile?.avatar_url ? (
                <img
                  src={profile.avatar_url || "/placeholder.svg"}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                profile?.display_name?.[0] || data.user.email?.[0] || "U"
              )}
            </div>

            <div>
              <h1 className="text-xl font-bold">{profile?.display_name || profile?.username || "User"}</h1>
              <p className="text-muted-foreground">@{profile?.username || "username"}</p>
              {profile?.bio && <p className="text-sm mt-2">{profile.bio}</p>}
            </div>

            <div className="flex gap-2 justify-center">
              <Button asChild className="bg-purple-600 hover:bg-purple-700 flex-1">
                <Link href="/profile/edit">
                  <Edit3 className="h-4 w-4 mr-2" />
                  Edit Profile
                </Link>
              </Button>
              <ShareProfileButton username={profile?.username || "user"} />
            </div>
          </div>

          {/* Stats */}
          <ProfileStats
            postsCount={postsCount || 0}
            followersCount={followersCount || 0}
            followingCount={followingCount || 0}
          />

          {/* Posts Grid */}
          <ProfilePosts posts={posts || []} />
        </div>
      </main>
    </div>
  )
}
