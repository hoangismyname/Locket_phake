"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function NotificationSettings() {
  const [settings, setSettings] = useState({
    pushNotifications: true,
    newPosts: true,
    likes: true,
    comments: true,
    messages: true,
    follows: true,
    emailNotifications: false,
    weeklyDigest: false,
  })

  const handleToggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Push Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="push-notifications" className="flex-1">
              <div>
                <p className="font-medium">Enable Push Notifications</p>
                <p className="text-sm text-muted-foreground">Receive notifications on your device</p>
              </div>
            </Label>
            <Switch
              id="push-notifications"
              checked={settings.pushNotifications}
              onCheckedChange={() => handleToggle("pushNotifications")}
            />
          </div>

          <div className="space-y-4 pl-4 border-l-2 border-muted">
            <div className="flex items-center justify-between">
              <Label htmlFor="new-posts" className="flex-1">
                <div>
                  <p className="font-medium">New Posts</p>
                  <p className="text-sm text-muted-foreground">When friends share new moments</p>
                </div>
              </Label>
              <Switch
                id="new-posts"
                checked={settings.newPosts}
                onCheckedChange={() => handleToggle("newPosts")}
                disabled={!settings.pushNotifications}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="likes" className="flex-1">
                <div>
                  <p className="font-medium">Likes</p>
                  <p className="text-sm text-muted-foreground">When someone likes your posts</p>
                </div>
              </Label>
              <Switch
                id="likes"
                checked={settings.likes}
                onCheckedChange={() => handleToggle("likes")}
                disabled={!settings.pushNotifications}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="comments" className="flex-1">
                <div>
                  <p className="font-medium">Comments</p>
                  <p className="text-sm text-muted-foreground">When someone comments on your posts</p>
                </div>
              </Label>
              <Switch
                id="comments"
                checked={settings.comments}
                onCheckedChange={() => handleToggle("comments")}
                disabled={!settings.pushNotifications}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="messages" className="flex-1">
                <div>
                  <p className="font-medium">Messages</p>
                  <p className="text-sm text-muted-foreground">When you receive new messages</p>
                </div>
              </Label>
              <Switch
                id="messages"
                checked={settings.messages}
                onCheckedChange={() => handleToggle("messages")}
                disabled={!settings.pushNotifications}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="follows" className="flex-1">
                <div>
                  <p className="font-medium">New Followers</p>
                  <p className="text-sm text-muted-foreground">When someone follows you</p>
                </div>
              </Label>
              <Switch
                id="follows"
                checked={settings.follows}
                onCheckedChange={() => handleToggle("follows")}
                disabled={!settings.pushNotifications}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Email Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="email-notifications" className="flex-1">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-muted-foreground">Receive important updates via email</p>
              </div>
            </Label>
            <Switch
              id="email-notifications"
              checked={settings.emailNotifications}
              onCheckedChange={() => handleToggle("emailNotifications")}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="weekly-digest" className="flex-1">
              <div>
                <p className="font-medium">Weekly Digest</p>
                <p className="text-sm text-muted-foreground">Weekly summary of activity</p>
              </div>
            </Label>
            <Switch
              id="weekly-digest"
              checked={settings.weeklyDigest}
              onCheckedChange={() => handleToggle("weeklyDigest")}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
