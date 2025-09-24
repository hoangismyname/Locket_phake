"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Camera, X } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

interface CreatePostModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CreatePostModal({ isOpen, onClose }: CreatePostModalProps) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [caption, setCaption] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedImage) return

    setIsUploading(true)
    const supabase = createClient()

    try {
      console.log("[v0] CreatePost - Starting post creation")

      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error("Not authenticated")

      console.log("[v0] CreatePost - User authenticated:", user.id)

      const fileExt = selectedImage.name.split(".").pop()
      const fileName = `${user.id}/${Date.now()}.${fileExt}`

      console.log("[v0] CreatePost - Uploading image:", fileName)

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("posts")
        .upload(fileName, selectedImage)

      if (uploadError) {
        console.error("[v0] CreatePost - Upload error:", uploadError)
        throw uploadError
      }

      // Get public URL for the uploaded image
      const {
        data: { publicUrl },
      } = supabase.storage.from("posts").getPublicUrl(fileName)

      console.log("[v0] CreatePost - Image uploaded successfully:", publicUrl)

      // Create post
      const { data: postData, error } = await supabase
        .from("posts")
        .insert({
          user_id: user.id,
          image_url: publicUrl,
          caption: caption.trim() || null,
        })
        .select()

      console.log("[v0] CreatePost - Insert result:", { postData, error })

      if (error) throw error

      console.log("[v0] CreatePost - Post created successfully!")

      // Reset form and close modal
      setSelectedImage(null)
      setImagePreview(null)
      setCaption("")
      onClose()

      // Refresh the page to show new post
      router.refresh()
    } catch (error) {
      console.error("[v0] CreatePost - Error creating post:", error)
      alert("Failed to create post. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }

  const handleClose = () => {
    if (!isUploading) {
      setSelectedImage(null)
      setImagePreview(null)
      setCaption("")
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share a moment</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Image Upload */}
          <div className="space-y-2">
            <Label>Photo</Label>
            {imagePreview ? (
              <div className="relative">
                <img
                  src={imagePreview || "/placeholder.svg"}
                  alt="Preview"
                  className="w-full aspect-square object-cover rounded-lg"
                />
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => {
                    setSelectedImage(null)
                    setImagePreview(null)
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div
                className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center cursor-pointer hover:border-muted-foreground/50 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <Camera className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Click to select a photo</p>
              </div>
            )}
            <Input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageSelect} className="hidden" />
          </div>

          {/* Caption */}
          <div className="space-y-2">
            <Label htmlFor="caption">Caption (optional)</Label>
            <Textarea
              id="caption"
              placeholder="What's happening?"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              rows={3}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isUploading}
              className="flex-1 bg-transparent"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!selectedImage || isUploading}
              className="flex-1 bg-purple-600 hover:bg-purple-700"
            >
              {isUploading ? "Sharing..." : "Share"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
