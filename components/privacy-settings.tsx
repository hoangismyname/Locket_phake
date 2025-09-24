"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function PrivacySettings() {
  const [settings, setSettings] = useState({
    privateAccount: false,
    showOnlineStatus: true,
    allowMessageRequests: true,
    dataCollection: true,
  })

  const [whoCanSeeMyPosts, setWhoCanSeeMyPosts] = useState("everyone")
  const [whoCanMessageMe, setWhoCanMessageMe] = useState("everyone")

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
          <CardTitle>Account Privacy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="private-account" className="flex-1">
              <div>
                <p className="font-medium">Private Account</p>
                <p className="text-sm text-muted-foreground">Only approved followers can see your posts</p>
              </div>
            </Label>
            <Switch
              id="private-account"
              checked={settings.privateAccount}
              onCheckedChange={() => handleToggle("privateAccount")}
            />
          </div>

          <div className="space-y-2">
            <Label>Who can see my posts</Label>
            <Select value={whoCanSeeMyPosts} onValueChange={setWhoCanSeeMyPosts}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="everyone">Everyone</SelectItem>
                <SelectItem value="followers">Followers only</SelectItem>
                <SelectItem value="close-friends">Close friends only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Messages</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Who can message me</Label>
            <Select value={whoCanMessageMe} onValueChange={setWhoCanMessageMe}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="everyone">Everyone</SelectItem>
                <SelectItem value="followers">Followers only</SelectItem>
                <SelectItem value="no-one">No one</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="message-requests" className="flex-1">
              <div>
                <p className="font-medium">Allow Message Requests</p>
                <p className="text-sm text-muted-foreground">Let people you don't follow send message requests</p>
              </div>
            </Label>
            <Switch
              id="message-requests"
              checked={settings.allowMessageRequests}
              onCheckedChange={() => handleToggle("allowMessageRequests")}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Activity Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="online-status" className="flex-1">
              <div>
                <p className="font-medium">Show Online Status</p>
                <p className="text-sm text-muted-foreground">Let others see when you're active</p>
              </div>
            </Label>
            <Switch
              id="online-status"
              checked={settings.showOnlineStatus}
              onCheckedChange={() => handleToggle("showOnlineStatus")}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Data & Privacy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="data-collection" className="flex-1">
              <div>
                <p className="font-medium">Analytics & Improvement</p>
                <p className="text-sm text-muted-foreground">Help improve the app with usage data</p>
              </div>
            </Label>
            <Switch
              id="data-collection"
              checked={settings.dataCollection}
              onCheckedChange={() => handleToggle("dataCollection")}
            />
          </div>

          <div className="pt-4 border-t space-y-2">
            <Button variant="outline" className="w-full bg-transparent" disabled>
              Download My Data
            </Button>
            <Button variant="outline" className="w-full bg-transparent" disabled>
              Delete My Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
