"use client"

import React from "react"
import { ChevronLeft, Phone } from "lucide-react"
import { useRouter } from "@/lib/i18n-navigation"
import { cn, formatTimeDistanceCustom } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import ChatDotsDropdownMenu from "@/components/chat/chat-settings"
import { zChatRead } from "@/types/chat.schema"

type Props = {
  chat: zChatRead
  className?: string
}

const ChatTopBar: React.FC<Props> = ({ chat, className }) => {
  const router = useRouter()

  return (
    <>
      <div
        className={cn(
          "container flex h-16 items-center justify-between border-b border-gray-200 md:justify-start md:gap-5",
          className,
        )}
      >
        <Button
          className="flex h-fit w-fit shrink-0 justify-start p-1 lg:hidden"
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <div className="flex items-center justify-end gap-0.5">
          <Avatar className="mr-2.5 size-[30px] lg:size-[50px]">
            <AvatarImage
              src="/assets/placeholder-user.jpg"
              className="object-cover"
            />
            <AvatarFallback
              className={cn("text-sm font-medium lg:text-xl", "bg-indigo-200")}
            >
              AN
            </AvatarFallback>
          </Avatar>
          <div className="max-w-[140px] text-left xs:max-w-[185px] sm:max-w-[250px]">
            <h1 className="truncate text-lg font-semibold lg:text-nowrap">
              Чат - {chat.chatId}
            </h1>
            <p className="truncate text-sm font-light leading-tight text-gray-500">
              Чат был создан{" "}
              {formatTimeDistanceCustom(new Date(chat.createdAt))} назад
            </p>
          </div>
        </div>

        <Button variant="ghost" size="icon" className="p-0 md:hidden">
          <Phone className="h-6 w-6 text-fuchsia-500" />
        </Button>

        <ChatDotsDropdownMenu className="md:ml-auto" />
      </div>
    </>
  )
}

export default ChatTopBar
