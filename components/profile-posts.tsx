"use client"

interface Post {
  id: string
  image_url: string
  caption: string
  created_at: string
  likes: { count: number }[]
  comments: { count: number }[]
}

interface ProfilePostsProps {
  posts: Post[]
}

export function ProfilePosts({ posts }: ProfilePostsProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-muted-foreground">
          <p className="text-lg mb-2">No posts yet</p>
          <p className="text-sm">Share your first moment!</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h2 className="font-semibold mb-4">Posts</h2>
      <div className="grid grid-cols-3 gap-1">
        {posts.map((post) => (
          <div key={post.id} className="aspect-square bg-muted rounded-sm overflow-hidden">
            <img
              src={post.image_url || "/placeholder.svg"}
              alt={post.caption || "Post"}
              className="w-full h-full object-cover hover:opacity-90 transition-opacity cursor-pointer"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
