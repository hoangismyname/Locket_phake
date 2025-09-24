import { Button } from "@/components/ui/button"
import { ArrowLeft, Plus } from "lucide-react"
import Link from "next/link"

export function ChatHeader() {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="max-w-md mx-auto flex items-center justify-between p-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/home">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="font-semibold">Messages</h1>
        <Button variant="ghost" size="sm" disabled>
          <Plus className="h-5 w-5" />
        </Button>
      </div>
    </header>
  )
}
