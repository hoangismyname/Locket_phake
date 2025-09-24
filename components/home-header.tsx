import type { User } from "@supabase/supabase-js"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Settings, UserIcon, MessageCircle } from "lucide-react"
import Link from "next/link"

interface HomeHeaderProps {
  user: User
  profile: any
}

export function HomeHeader({ user, profile }: HomeHeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="max-w-md mx-auto flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={profile?.avatar_url || "/placeholder.svg"} />
            <AvatarFallback>{profile?.display_name?.[0] || user.email?.[0] || "U"}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-xl font-bold text-purple-600 dark:text-purple-400">Locket</h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/chat">
              <MessageCircle className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/profile">
              <UserIcon className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/settings">
              <Settings className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
