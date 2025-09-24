"use client"

import { useEffect, useRef } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatDistanceToNow } from "date-fns"

interface Message {
  id: string
  content: string
  sender_id: string
  created_at: string
  profiles: {
    username: string
    display_name: string
    avatar_url: string
  }
}

interface MessagesListProps {
  messages: Message[]
  currentUserId: string
}

export function MessagesList({ messages, currentUserId }: MessagesListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="text-center text-muted-foreground">
          <p>No messages yet</p>
          <p className="text-sm">Send a message to start the conversation!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => {
        const isCurrentUser = message.sender_id === currentUserId

        return (
          <div key={message.id} className={`flex gap-2 ${isCurrentUser ? "justify-end" : "justify-start"}`}>
            {!isCurrentUser && (
              <Avatar className="h-8 w-8">
                <AvatarImage src={message.profiles?.avatar_url || "/placeholder.svg"} />
                <AvatarFallback>
                  {message.profiles?.display_name?.[0] || message.profiles?.username?.[0] || "U"}
                </AvatarFallback>
              </Avatar>
            )}

            <div className={`max-w-[70%] ${isCurrentUser ? "order-first" : ""}`}>
              <div
                className={`rounded-2xl px-4 py-2 ${
                  isCurrentUser ? "bg-purple-600 text-white" : "bg-muted text-foreground"
                }`}
              >
                <p className="text-sm">{message.content}</p>
              </div>
              <p className="text-xs text-muted-foreground mt-1 px-2">
                {formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}
              </p>
            </div>

            {isCurrentUser && (
              <Avatar className="h-8 w-8">
                <AvatarImage src={message.profiles?.avatar_url || "/placeholder.svg"} />
                <AvatarFallback>
                  {message.profiles?.display_name?.[0] || message.profiles?.username?.[0] || "U"}
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        )
      })}
      <div ref={messagesEndRef} />
    </div>
  )
}
