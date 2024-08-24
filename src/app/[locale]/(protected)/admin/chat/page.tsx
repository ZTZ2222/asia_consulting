import React from "react"
import { MessageCircleX, MessagesSquare } from "lucide-react"
import ChatSidebar from "@/components/chat/chat-sidebar"
import { getAllChats } from "@/server/data-access-layer/chat"

export default async function ChatList() {
  const chatList = await getAllChats()

  return (
    <main className="lg:container lg:my-10 lg:flex lg:gap-5">
      <ChatSidebar chats={chatList} />
      <div className="hidden w-full rounded-[10px] shadow-[0px_0px_4px_0px_#9090904D] lg:block">
        <div className="flex size-full flex-col gap-2.5">
          {chatList && chatList.length > 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-5">
              <MessagesSquare className="size-12 text-cyan-400" />
              <span className="text-lg font-semibold lg:text-xl">
                Выберите чат, чтобы начать разговор
              </span>
              <p className="max-w-[311px] text-center text-gray-500">
                Пожалуйста, выберите один из чатов в боковой панели слева.
              </p>
            </div>
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-5">
              <MessageCircleX className="size-12 text-red-550" />
              <span className="text-lg font-semibold lg:text-xl">
                Нет сообщений
              </span>
              <p className="max-w-[311px] text-center text-gray-500">
                У Вас пока нет сообщений. <br />
                Все исходящие и входящие сообщения будут Вас ждать тут.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
