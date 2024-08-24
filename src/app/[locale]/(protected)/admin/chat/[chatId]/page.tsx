import React from "react"
import { MessageCircleX } from "lucide-react"
import ChatBottombar from "@/components/chat/chat-bottom-bar"
import { ChatMessages } from "@/components/chat/chat-messages"
import ChatSidebar from "@/components/chat/chat-sidebar"
import ChatTopBar from "@/components/chat/chat-top-bar"
import { getAllChats, getChatById } from "@/server/data-access-layer/chat"

interface ChatProps {
  params: {
    chatId: string
  }
}

export default async function ChatDetail({ params }: ChatProps) {
  const chatList = await getAllChats()
  const chat = await getChatById(params.chatId)

  return (
    <main className="lg:container lg:my-10 lg:flex lg:gap-5">
      <ChatSidebar chats={chatList} className="hidden lg:flex" />
      <div className="bg-white lg:w-[590px] lg:rounded-[10px] lg:shadow-[0px_0px_4px_0px_#9090904D] xl:w-[738px]">
        {chat && chat.messages.length > 0 ? (
          <>
            <ChatTopBar chat={chat} />
            <div className="container relative px-0">
              <ChatMessages
                initialMessages={chat.messages}
                chatId={chat.chatId}
              />
              <ChatBottombar chatId={chat.chatId} />
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-5">
            <MessageCircleX className="size-12 text-red-550" />
            <span className="text-lg font-semibold lg:text-xl">
              Нет сообщений
            </span>
            <p className="max-w-[311px] text-center text-gray-500">
              У вас пока нет сообщений. <br />
              Все исходящие и входящие сообщения будут Вас ждать тут.
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
