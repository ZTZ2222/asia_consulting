"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { MessageCircleX } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { pusherClient } from "@/server/pusher"
import { zChatRead } from "@/types/chat.schema"

type Props = {
  initialChats: zChatRead[] | null
  className?: string
}

const ChatSidebar: React.FC<Props> = ({ initialChats, className }) => {
  const [chats, setChats] = useState<zChatRead[] | null>(initialChats)
  const [unreadMessages, setUnreadMessages] = useState<Record<string, boolean>>(
    {},
  )

  useEffect(() => {
    const handleNewMessage = (data: zChatRead) => {
      console.log("Received new message:", data) // Debugging line

      setChats(prevChats => {
        if (!prevChats) return [data]

        const chatExists = prevChats.find(chat => chat.chatId === data.chatId)
        if (chatExists) {
          return prevChats.map(chat =>
            chat.chatId === data.chatId ? data : chat,
          )
        }

        return [data, ...prevChats]
      })

      setUnreadMessages(prev => ({ ...prev, [data.chatId]: true }))
    }

    pusherClient.bind("support-chat", (data: zChatRead) => {
      console.log("Received new message:", data)
    })
  }, [])

  if (!chats?.length)
    return (
      <div className="mt-[calc(50vh-200px)] flex h-full flex-col items-center justify-center gap-5 lg:hidden">
        <MessageCircleX className="size-12 text-red-550" />
        <span className="text-lg font-semibold lg:text-xl">Нет сообщений</span>
        <p className="max-w-[311px] text-center text-gray-500">
          У Вас пока нет сообщений. <br />
          Все исходящие и входящие сообщения будут Вас ждать тут.
        </p>
      </div>
    )

  return (
    <div
      className={cn(
        "group relative flex h-[660px] flex-col rounded-[10px] bg-white lg:w-[382px] lg:pb-5 lg:shadow-[0px_0px_4px_0px_#9090904D] xl:h-[680px] xl:w-[410px]",
        className,
      )}
    >
      <div className="hidden items-center justify-between px-7 py-[22px] lg:flex">
        <p className="font-medium text-gray-500">Сообщения</p>
      </div>
      <ScrollArea>
        <nav className={cn("flex flex-col gap-2.5", "pb-12 md:pb-20 lg:pb-0")}>
          {chats?.map(chat => (
            <Link
              href={`/admin/chat/${chat.chatId}`}
              key={chat.chatId}
              prefetch
              onClick={() =>
                setUnreadMessages(prev => ({ ...prev, [chat.chatId]: false }))
              }
            >
              <Card className="container relative flex min-h-[78px] items-center justify-between gap-4 rounded-none border-0 border-y border-gray-200 bg-gray-50 pb-3 pt-1.5 transition-colors duration-500 hover:bg-gray-200">
                <div className="flex w-full max-w-[160px] flex-col justify-between xs:max-w-[215px] md:max-w-[480px] lg:max-w-[208px] xl:max-w-[235px]">
                  <span className="truncate font-semibold text-gray-800">
                    {chat.chatId}
                  </span>
                  <p className="truncate font-light text-gray-500">
                    {chat.messages.length > 0 && chat.messages[0].content}
                  </p>
                </div>
                {unreadMessages[chat.chatId] && (
                  <div className="absolute right-3 top-3 size-2.5 rounded-full bg-red-550" />
                )}
              </Card>
            </Link>
          ))}
        </nav>
      </ScrollArea>
    </div>
  )
}

export default ChatSidebar
