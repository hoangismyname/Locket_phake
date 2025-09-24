"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatDistanceToNow } from "date-fns"
import Link from "next/link"

interface Conversation {
  id: string
  created_at: string
  updated_at: string
  participants: Array<{
    user_id: string
    profiles: {
      username: string
      display_name: string
      avatar_url: string
    }
  }>
  latestMessage?: {
    content: string
    created_at: string
    sender_id: string
    profiles: {
      username: string
      display_name: string
    }
  }
}

interface ConversationsListProps {
  conversations: Conversation[]
  currentUserId: string
}

export function ConversationsList({ conversations, currentUserId }: ConversationsListProps) {
  if (conversations.length === 0) {
    return (
      <div className="text-center py-12 px-4">
        <div className="text-muted-foreground">
          <p className="text-lg mb-2">No conversations yet</p>
          <p className="text-sm">Start chatting with friends!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="divide-y">
      {conversations.map((conversation) => {
        const otherParticipant = conversation.participants[0]
        const isCurrentUserSender = conversation.latestMessage?.sender_id === currentUserId

        return (
          <Link
            key={conversation.id}
            href={`/chat/${conversation.id}`}
            className="flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors"
          >
            <Avatar className="h-12 w-12">
              <AvatarImage src={otherParticipant?.profiles?.avatar_url || "/placeholder.svg"} />
              <AvatarFallback>
                {otherParticipant?.profiles?.display_name?.[0] || otherParticipant?.profiles?.username?.[0] || "U"}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold truncate">
                  {otherParticipant?.profiles?.display_name || otherParticipant?.profiles?.username || "User"}
                </h3>
                {conversation.latestMessage && (
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(conversation.latestMessage.created_at), { addSuffix: true })}
                  </span>
                )}
              </div>

              {conversation.latestMessage ? (
                <p className="text-sm text-muted-foreground truncate">
                  {isCurrentUserSender ? "You: " : ""}
                  {conversation.latestMessage.content}
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">No messages yet</p>
              )}
            </div>
          </Link>
        )
      })}
    </div>
  )
}
