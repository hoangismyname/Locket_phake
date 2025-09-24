"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Heart, MessageCircle, MoreHorizontal, Trash2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { formatDistanceToNow } from "date-fns"
import { useRouter } from "next/navigation"

interface PostCardProps {
  post: {
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
  currentUserId: string
}

export function PostCard({ post, currentUserId }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(post.likes?.[0]?.count || 0)
  const [isLiking, setIsLiking] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  const handleLike = async () => {
    if (isLiking) return

    setIsLiking(true)
    const supabase = createClient()

    try {
      if (isLiked) {
        // Unlike
        await supabase.from("likes").delete().eq("post_id", post.id).eq("user_id", currentUserId)

        setIsLiked(false)
        setLikeCount((prev) => Math.max(0, prev - 1))
      } else {
        // Like
        await supabase.from("likes").insert({
          post_id: post.id,
          user_id: currentUserId,
        })

        setIsLiked(true)
        setLikeCount((prev) => prev + 1)
      }
    } catch (error) {
      console.error("Error toggling like:", error)
    } finally {
      setIsLiking(false)
    }
  }

  const handleDelete = async () => {
    if (isDeleting) return

    if (!confirm("Are you sure you want to delete this post?")) return

    setIsDeleting(true)

    try {
      const response = await fetch(`/api/posts/${post.id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        router.refresh()
      } else {
        throw new Error("Failed to delete post")
      }
    } catch (error) {
      console.error("Error deleting post:", error)
      alert("Failed to delete post. Please try again.")
    } finally {
      setIsDeleting(false)
    }
  }

  const profileData = post.profile || { username: "Unknown", display_name: "Unknown User", avatar_url: null }
  const isOwnPost = post.user_id === currentUserId

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        {/* Header */}
        <div className="flex items-center justify-between p-4 pb-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={profileData.avatar_url || "/placeholder.svg"} />
              <AvatarFallback>{profileData.display_name?.[0] || profileData.username?.[0] || "U"}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-sm">{profileData.display_name || profileData.username}</p>
              <p className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
              </p>
            </div>
          </div>
          {isOwnPost && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" disabled={isDeleting}>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={handleDelete}
                  className="text-red-600 focus:text-red-600"
                  disabled={isDeleting}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  {isDeleting ? "Deleting..." : "Delete"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Image */}
        <div className="aspect-square relative bg-muted">
          <img
            src={post.image_url || "/placeholder.svg"}
            alt={post.caption || "Post image"}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Actions */}
        <div className="p-4">
          <div className="flex items-center gap-4 mb-3">
            <Button variant="ghost" size="sm" onClick={handleLike} disabled={isLiking} className="p-0 h-auto">
              <Heart className={`h-6 w-6 ${isLiked ? "fill-red-500 text-red-500" : "text-foreground"}`} />
            </Button>
            <Button variant="ghost" size="sm" className="p-0 h-auto">
              <MessageCircle className="h-6 w-6" />
            </Button>
          </div>

          {/* Like count */}
          {likeCount > 0 && (
            <p className="font-semibold text-sm mb-2">
              {likeCount} {likeCount === 1 ? "like" : "likes"}
            </p>
          )}

          {/* Caption */}
          {post.caption && (
            <p className="text-sm">
              <span className="font-semibold">{profileData.username}</span> {post.caption}
            </p>
          )}

          {/* Comments count */}
          {post.comments?.[0]?.count > 0 && (
            <p className="text-sm text-muted-foreground mt-2">View all {post.comments[0].count} comments</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
