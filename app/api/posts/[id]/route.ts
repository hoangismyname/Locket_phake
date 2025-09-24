import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = await createClient()

    // Get current user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get the post to verify ownership
    const { data: post, error: fetchError } = await supabase
      .from("posts")
      .select("user_id, image_url")
      .eq("id", params.id)
      .single()

    if (fetchError || !post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    // Check if user owns the post
    if (post.user_id !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    // Delete the image from storage if it's not a placeholder
    if (post.image_url && !post.image_url.includes("placeholder.svg")) {
      const imagePath = post.image_url.split("/").pop()
      if (imagePath) {
        await supabase.storage.from("posts").remove([`${user.id}/${imagePath}`])
      }
    }

    // Delete the post
    const { error: deleteError } = await supabase.from("posts").delete().eq("id", params.id)

    if (deleteError) {
      return NextResponse.json({ error: "Failed to delete post" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting post:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
