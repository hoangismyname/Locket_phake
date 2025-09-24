import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export function ProfileHeader() {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="max-w-md mx-auto flex items-center justify-between p-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/home">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="font-semibold">Profile</h1>
        <div className="w-9" /> {/* Spacer */}
      </div>
    </header>
  )
}
