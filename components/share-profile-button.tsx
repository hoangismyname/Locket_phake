"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Share2, Copy, Check } from "lucide-react"

interface ShareProfileButtonProps {
  username: string
}

export function ShareProfileButton({ username }: ShareProfileButtonProps) {
  const [copied, setCopied] = useState(false)
  const profileUrl = `${window.location.origin}/profile/${username}`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(profileUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Failed to copy:", error)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Share2 className="h-4 w-4 mr-2" />
          Share Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Your Profile</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">Share this link with friends so they can find and follow you!</p>
          <div className="flex gap-2">
            <Input value={profileUrl} readOnly className="flex-1" />
            <Button onClick={handleCopy} size="sm">
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
          {copied && <p className="text-sm text-green-600">Link copied to clipboard!</p>}
        </div>
      </DialogContent>
    </Dialog>
  )
}
