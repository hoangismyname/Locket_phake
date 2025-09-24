import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface ChatConversationHeaderProps {
  participant?: {
    user_id: string
    profiles: {
      username: string
      display_name: string
      avatar_url: string
    }
  }
}

export function ChatConversationHeader({ participant }: ChatConversationHeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="max-w-md mx-auto flex items-center gap-3 p-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/chat">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>

        <Avatar className="h-8 w-8">
          <AvatarImage src={participant?.profiles?.avatar_url || "/placeholder.svg"} />
          <AvatarFallback>
            {participant?.profiles?.display_name?.[0] || participant?.profiles?.username?.[0] || "U"}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <h1 className="font-semibold">
            {participant?.profiles?.display_name || participant?.profiles?.username || "User"}
          </h1>
        </div>
      </div>
    </header>
  )
}
