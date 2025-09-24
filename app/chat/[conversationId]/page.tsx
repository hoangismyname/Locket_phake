import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { ChatConversationHeader } from "@/components/chat-conversation-header"
import { MessagesList } from "@/components/messages-list"
import { MessageInput } from "@/components/message-input"

interface ChatConversationPageProps {
  params: Promise<{ conversationId: string }>
}

export default async function ChatConversationPage({ params }: ChatConversationPageProps) {
  const { conversationId } = await params
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  // Verify user is participant in this conversation
  const { data: participant } = await supabase
    .from("conversation_participants")
    .select("*")
    .eq("conversation_id", conversationId)
    .eq("user_id", data.user.id)
    .single()

  if (!participant) {
    redirect("/chat")
  }

  // Get other participants
  const { data: participants } = await supabase
    .from("conversation_participants")
    .select(`
      user_id,
      profiles:user_id (
        username,
        display_name,
        avatar_url
      )
    `)
    .eq("conversation_id", conversationId)
    .neq("user_id", data.user.id)

  // Get messages
  const { data: messages } = await supabase
    .from("messages")
    .select(`
      *,
      profiles:sender_id (
        username,
        display_name,
        avatar_url
      )
    `)
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true })

  const otherParticipant = participants?.[0]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <ChatConversationHeader participant={otherParticipant} />

      <main className="flex-1 max-w-md mx-auto w-full flex flex-col">
        <MessagesList messages={messages || []} currentUserId={data.user.id} />
        <MessageInput conversationId={conversationId} />
      </main>
    </div>
  )
}
