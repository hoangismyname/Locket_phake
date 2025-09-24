"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Camera } from "lucide-react"
import { CreatePostModal } from "@/components/create-post-modal"

export function CreatePostButton() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Button
        onClick={() => setIsModalOpen(true)}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white"
        size="lg"
      >
        <Camera className="h-5 w-5 mr-2" />
        Share a moment
      </Button>

      <CreatePostModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
