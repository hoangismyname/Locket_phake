import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { HomeHeader } from "@/components/home-header"
import { PostFeed } from "@/components/post-feed"
import { CreatePostButton } from "@/components/create-post-button"

export default async function HomePage() {
  let supabase
  try {
    supabase = await createClient()
  } catch (error) {
    console.log("[v0] Home page - Supabase client error:", error)
    redirect("/auth/login")
  }

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    console.log("[v0] Home page - Auth error or no user:", error)
    redirect("/auth/login")
  }

  console.log("[v0] Home page - User authenticated:", data.user.id)

  // Get user profile
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", data.user.id)
    .single()
  console.log("[v0] Home page - Profile query result:", { profile, profileError })

  const { data: posts, error: postsError } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false })

  console.log("[v0] Home page - Posts query result:", { posts, postsError, postsCount: posts?.length || 0 })

  let postsWithProfiles = []
  if (posts && posts.length > 0) {
    const userIds = [...new Set(posts.map((post) => post.user_id))]
    const { data: profiles } = await supabase
      .from("profiles")
      .select("id, username, display_name, avatar_url")
      .in("id", userIds)

    // Combine posts with their author profiles
    postsWithProfiles = posts.map((post) => ({
      ...post,
      profile: profiles?.find((profile) => profile.id === post.user_id) || null,
    }))
  }

  console.log("[v0] Home page - Posts with profiles:", { postsWithProfiles, count: postsWithProfiles.length })

  return (
    <div className="min-h-screen bg-background">
      <HomeHeader user={data.user} profile={profile} />

      <main className="max-w-md mx-auto pb-20">
        <div className="p-4">
          <CreatePostButton />
        </div>

        <PostFeed posts={postsWithProfiles || []} currentUserId={data.user.id} />
      </main>
    </div>
  )
}
