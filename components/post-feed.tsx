"use client"

import { PostCard } from "@/components/post-card"

interface Post {
  id: string
  user_id: string
  image_url: string
  caption: string
  created_at: string
  profile: {
    username: string
    display_name: string
    avatar_url: string
  } | null
  likes?: { count: number }[]
  comments?: { count: number }[]
}

interface PostFeedProps {
  posts: Post[]
  currentUserId: string
}

export function PostFeed({ posts, currentUserId }: PostFeedProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12 px-4">
        <div className="text-muted-foreground">
          <p className="text-lg mb-2">No posts yet!</p>
          <p className="text-sm">Share your first moment to get started.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} currentUserId={currentUserId} />
      ))}
    </div>
  )
}
