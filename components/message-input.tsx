"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

interface MessageInputProps {
  conversationId: string
}

export function MessageInput({ conversationId }: MessageInputProps) {
  const [message, setMessage] = useState("")
  const [isSending, setIsSending] = useState(false)
  const router = useRouter()

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim() || isSending) return

    setIsSending(true)
    const supabase = createClient()

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error("Not authenticated")

      const { error } = await supabase.from("messages").insert({
        conversation_id: conversationId,
        sender_id: user.id,
        content: message.trim(),
      })

      if (error) throw error

      // Update conversation updated_at
      await supabase.from("conversations").update({ updated_at: new Date().toISOString() }).eq("id", conversationId)

      setMessage("")
      router.refresh()
    } catch (error) {
      console.error("Error sending message:", error)
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="border-t p-4">
      <form onSubmit={handleSend} className="flex gap-2">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          disabled={isSending}
          className="flex-1"
        />
        <Button
          type="submit"
          size="sm"
          disabled={!message.trim() || isSending}
          className="bg-purple-600 hover:bg-purple-700"
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  )
}
