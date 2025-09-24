import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { ChatHeader } from "@/components/chat-header"
import { ConversationsList } from "@/components/conversations-list"

export default async function ChatPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  // Get user's conversations with latest message and participant info
  const { data: conversations } = await supabase
    .from("conversation_participants")
    .select(`
      conversation_id,
      conversations:conversation_id (
        id,
        created_at,
        updated_at
      )
    `)
    .eq("user_id", data.user.id)

  // Get conversation details with participants and latest messages
  const conversationIds = conversations?.map((c) => c.conversation_id) || []

  let conversationsWithDetails = []
  if (conversationIds.length > 0) {
    // Get participants for each conversation
    const { data: participants } = await supabase
      .from("conversation_participants")
      .select(`
        conversation_id,
        user_id,
        profiles:user_id (
          username,
          display_name,
          avatar_url
        )
      `)
      .in("conversation_id", conversationIds)

    // Get latest message for each conversation
    const { data: latestMessages } = await supabase
      .from("messages")
      .select(`
        conversation_id,
        content,
        created_at,
        sender_id,
        profiles:sender_id (
          username,
          display_name
        )
      `)
      .in("conversation_id", conversationIds)
      .order("created_at", { ascending: false })

    // Combine the data
    conversationsWithDetails =
      conversations?.map((conv) => {
        const convParticipants = participants?.filter((p) => p.conversation_id === conv.conversation_id) || []
        const otherParticipants = convParticipants.filter((p) => p.user_id !== data.user.id)
        const latestMessage = latestMessages?.find((m) => m.conversation_id === conv.conversation_id)

        return {
          ...conv.conversations,
          participants: otherParticipants,
          latestMessage,
        }
      }) || []
  }

  return (
    <div className="min-h-screen bg-background">
      <ChatHeader />

      <main className="max-w-md mx-auto">
        <ConversationsList conversations={conversationsWithDetails} currentUserId={data.user.id} />
      </main>
    </div>
  )
}
