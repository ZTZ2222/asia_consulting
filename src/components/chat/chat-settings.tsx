"use client"

import React from "react"
import { useParams } from "next/navigation"
import { Settings } from "lucide-react"
import { useAction } from "next-safe-action/hooks"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { clearChat } from "@/server/actions/chat-action"

type Props = {
  className?: string
}

export default function ChatSettings({ className }: Props) {
  const { chatId } = useParams()
  const { execute } = useAction(clearChat)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn("size-fit px-2 py-1", className)}
        >
          <Settings />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="-translate-x-4 translate-y-2">
        <DropdownMenuItem onClick={() => execute({ chatId: chatId as string })}>
          Очистить чат
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
