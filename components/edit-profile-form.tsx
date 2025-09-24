"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Camera } from "lucide-react"

interface EditProfileFormProps {
  profile: any
  userId: string
}

export function EditProfileForm({ profile, userId }: EditProfileFormProps) {
  const [displayName, setDisplayName] = useState(profile?.display_name || "")
  const [username, setUsername] = useState(profile?.username || "")
  const [bio, setBio] = useState(profile?.bio || "")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const supabase = createClient()

    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          display_name: displayName.trim(),
          username: username.trim(),
          bio: bio.trim() || null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", userId)

      if (error) throw error

      router.push("/profile")
      router.refresh()
    } catch (error: any) {
      setError(error.message || "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Avatar */}
          <div className="text-center space-y-4">
            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-2xl font-bold relative">
              {profile?.avatar_url ? (
                <img
                  src={profile.avatar_url || "/placeholder.svg"}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                displayName?.[0] || username?.[0] || "U"
              )}
              <Button
                type="button"
                size="sm"
                className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0 bg-purple-600 hover:bg-purple-700"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">Tap to change profile photo</p>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="displayName">Display Name</Label>
              <Input
                id="displayName"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Your display name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Your username"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell us about yourself..."
                rows={3}
              />
            </div>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/profile")}
              disabled={isLoading}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="flex-1 bg-purple-600 hover:bg-purple-700">
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
